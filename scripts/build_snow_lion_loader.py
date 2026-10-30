"""Animate the supplied photograph through a continuous two-arm skeletal warp.

No generated painting, replacement anatomy or frame-by-frame redrawing is used.
Requires Pillow and NumPy. The original RGBA photograph is the only texture.
"""
import argparse
import base64
import io
import json
import math
from pathlib import Path
import xml.etree.ElementTree as ET

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


CYCLE_MS = 2400
FRAMES = 72
WIDTH, HEIGHT = 640, 576
FIGURE_CENTER_Y = 320
LOGO_DIAMETER = 60


def smoothstep(start, end, value):
    value = np.clip((value - start) / (end - start), 0, 1)
    return value * value * (3 - 2 * value)


def rotate(x, y, center, angle):
    c, s = math.cos(angle), math.sin(angle)
    dx, dy = x - center[0], y - center[1]
    return center[0] + c * dx - s * dy, center[1] + s * dx + c * dy


def beat(phase, lag=0):
    # A periodic, zero-at-rest envelope; joint delays also meet at the seam.
    return 0.5 * (math.cos(2 * math.pi * lag) - math.cos(2 * math.pi * (phase - lag)))


def arm(x, y, phase, shoulder, elbow, wrist, direction):
    # The existing push is unchanged; the right hand follows half a cycle later.
    if direction > 0:
        phase += 0.5
    a = direction * 0.17 * beat(phase)
    b = -direction * 0.13 * beat(phase, 0.035)
    c = direction * 0.03 * beat(phase, 0.055)
    upper_x, upper_y = rotate(x, y, shoulder, a)
    moved_elbow = rotate(*elbow, shoulder, a)
    lower_x, lower_y = rotate(x, y, elbow, a + b)
    lower_x += moved_elbow[0] - elbow[0]
    lower_y += moved_elbow[1] - elbow[1]
    moved_wrist = rotate(*wrist, elbow, a + b)
    moved_wrist = (moved_wrist[0] + moved_elbow[0] - elbow[0], moved_wrist[1] + moved_elbow[1] - elbow[1])
    hand_x, hand_y = rotate(x, y, wrist, a + b + c)
    hand_x += moved_wrist[0] - wrist[0]
    hand_y += moved_wrist[1] - wrist[1]
    # Each bone rotates about its own joint. Smooth skinning is confined to
    # elbows/wrists, so the claws and painted forearm retain their shape.
    if direction < 0:
        forearm = 1 - smoothstep(225, 345, x)
    else:
        forearm = smoothstep(1000, 1110, x)
    forearm = np.maximum(forearm, 1 - smoothstep(330, 420, y))
    hand = 1 - smoothstep(150, 235, y)
    lower_x = lower_x * (1 - hand) + hand_x * hand
    lower_y = lower_y * (1 - hand) + hand_y * hand
    return upper_x * (1 - forearm) + lower_x * forearm, upper_y * (1 - forearm) + lower_y * forearm


def deform(x, y, phase, part="figure"):
    if part == "tail":
        return x, y
    # The feet and tail stay planted. Chest/neck response is much smaller than
    # arm motion; the face moves as a unit, preserving its expression.
    chest = (1 - smoothstep(650, 980, y)) * (1 - smoothstep(960, 1160, x))
    chest_x, chest_y = rotate(x, y, (740, 930), 0.004 * math.sin(2 * math.pi * phase))
    chest_x = (chest_x - x + 1.7 * math.sin(2 * math.pi * phase)) * chest
    chest_y = (chest_y - y + 5 * beat(phase, 0.025)) * chest
    head = (1 - smoothstep(435, 535, y)) * smoothstep(235, 320, x)
    hx, hy = rotate(x, y, (730, 460), 0.005 * math.sin(2 * math.pi * phase))
    dx, dy = chest_x, chest_y
    dx += (hx - x) * head
    dy += (hy - y) * head
    left_edge = np.interp(y, [0, 100, 250, 330, 380, 400, 414, 450, 500, 550, 610], [320, 310, 260, 243, 230, 225, 245, 440, 490, 465, 350])
    right_edge = np.interp(y, [0, 180, 250, 330, 380, 400, 414, 430, 440, 490, 540, 590], [990, 1025, 1040, 1040, 1053, 1060, 1055, 1015, 945, 875, 925, 1250])
    left_weight = (1 - smoothstep(left_edge - 80, left_edge + 20, x)) * (1 - smoothstep(600, 700, y))
    right_weight = smoothstep(right_edge - 20, right_edge + 80, x) * (1 - smoothstep(535, 650, y))
    lx, ly = arm(x, y, phase, (465, 500), (168, 455), (165, 215), -1)
    rx, ry = arm(x, y, phase, (895, 488), (1135, 449), (1112, 237), 1)
    dx += (lx - x) * left_weight + (rx - x) * right_weight
    dy += (ly - y) * left_weight + (ry - y) * right_weight
    return x + dx, y + dy


def sample_field(field, x, y, gx, gy):
    # Bilinear sampling of a continuous forward-displacement field.
    px = np.clip((x - gx[0]) / (gx[-1] - gx[0]) * (len(gx) - 1), 0, len(gx) - 1.001)
    py = np.clip((y - gy[0]) / (gy[-1] - gy[0]) * (len(gy) - 1), 0, len(gy) - 1.001)
    ix, iy = px.astype(np.int32), py.astype(np.int32)
    fx, fy = px - ix, py - iy
    return (field[iy, ix] * (1 - fx) + field[iy, ix + 1] * fx) * (1 - fy) + (field[iy + 1, ix] * (1 - fx) + field[iy + 1, ix + 1] * fx) * fy


def render(source, phase, part="figure"):
    scale = min((WIDTH - 56) / 1448, (HEIGHT - 56) / 1086)
    center_x, center_y = 748.5, 545
    # Invert the smooth warp on a fine grid, then interpolate to output size.
    qx, qy = np.meshgrid(np.linspace(0, WIDTH - 1, 214), np.linspace(0, HEIGHT - 1, 172))
    qx = (qx - WIDTH / 2) / scale + center_x
    qy = (qy - FIGURE_CENTER_Y) / scale + center_y
    gx, gy = np.linspace(-180, 1640, 184), np.linspace(-180, 1260, 146)
    sx, sy = np.meshgrid(gx, gy)
    fx, fy = deform(sx, sy, phase, part)
    dx, dy = fx - sx, fy - sy
    dx_y, dx_x = np.gradient(dx, gy, gx)
    dy_y, dy_x = np.gradient(dy, gy, gx)
    px, py = qx.copy(), qy.copy()
    # Converge by residual, rather than assuming every pose needs 20 steps.
    # Alternating arms can take longer near the transparent tail/torso gap;
    # the visible-residual assertion below still rejects an invalid frame.
    for _ in range(60):
        ex = px + sample_field(dx, px, py, gx, gy) - qx
        ey = py + sample_field(dy, px, py, gx, gy) - qy
        if np.hypot(ex, ey).max(initial=0) < 1e-6:
            break
        a = 1 + sample_field(dx_x, px, py, gx, gy)
        b = sample_field(dx_y, px, py, gx, gy)
        c = sample_field(dy_x, px, py, gx, gy)
        d = 1 + sample_field(dy_y, px, py, gx, gy)
        determinant = np.maximum(a * d - b * c, 0.15)
        step_x, step_y = (d * ex - b * ey) / determinant, (a * ey - c * ex) / determinant
        damping = np.minimum(1, 30 / np.maximum(np.hypot(step_x, step_y), 1e-8))
        px -= step_x * damping
        py -= step_y * damping
    error = np.hypot(px + sample_field(dx, px, py, gx, gy) - qx, py + sample_field(dy, px, py, gx, gy) - qy)
    map_x = np.asarray(Image.fromarray(px.astype(np.float32)).resize((WIDTH, HEIGHT), Image.Resampling.BICUBIC))
    map_y = np.asarray(Image.fromarray(py.astype(np.float32)).resize((WIDTH, HEIGHT), Image.Resampling.BICUBIC))
    valid = (map_x >= 0) & (map_x < source.shape[1] - 1) & (map_y >= 0) & (map_y < source.shape[0] - 1)
    ix = np.clip(map_x, 0, source.shape[1] - 2).astype(np.int32)
    iy = np.clip(map_y, 0, source.shape[0] - 2).astype(np.int32)
    ux, uy = (map_x - ix)[..., None], (map_y - iy)[..., None]
    rgba = (source[iy, ix] * (1 - ux) + source[iy, ix + 1] * ux) * (1 - uy) + (source[iy + 1, ix] * (1 - ux) + source[iy + 1, ix + 1] * ux) * uy
    # Interpolate premultiplied alpha, then unpremultiply: no dark fringe.
    rgba[..., :3] /= np.maximum(rgba[..., 3:], 1 / 255)
    rgba[~valid] = 0
    frame = Image.fromarray(np.uint8(np.clip(rgba, 0, 1) * 255 + 0.5), "RGBA")
    jacobian = np.gradient(fx, gy, gx)[1] * np.gradient(fy, gy, gx)[0] - np.gradient(fx, gy, gx)[0] * np.gradient(fy, gy, gx)[1]
    occupied = source[np.clip(sy, 0, source.shape[0] - 1).astype(int), np.clip(sx, 0, source.shape[1] - 1).astype(int), 3] > 0.5
    mapped_occupied = source[np.clip(py, 0, source.shape[0] - 1).astype(int), np.clip(px, 0, source.shape[1] - 1).astype(int), 3] > 0.5
    return frame, float(error[mapped_occupied].max(initial=0)), float(jacobian[occupied].min(initial=1))


def split_source(source):
    y, x = np.mgrid[0:source.shape[0], 0:source.shape[1]]
    # Keep the visible green tail on its own stationary layer. Everything else
    # shares one continuous deformation, so shoulders cannot split open.
    edge = np.interp(y, [450, 460, 470, 480, 490, 500, 510, 520, 530, 545, 600, 700, 790, 850], [1240, 1230, 1216, 1206, 1197, 1187, 1176, 1167, 1155, 1145, 1120, 1120, 1250, 1380])
    tail = smoothstep(edge - 2, edge + 2, x) * smoothstep(448, 455, y) * (1 - smoothstep(790, 850, y))
    return [("tail", source * tail[..., None]), ("figure", source * (1 - tail[..., None]))]


def hand_center(side, phase):
    point = (180.0, 65.0) if side == "left" else (1135.0, 90.0)
    x, y = deform(*point, phase)
    scale = (WIDTH - 56) / 1448
    return np.array([WIDTH / 2 + (x - 748.5) * scale,
                     FIGURE_CENTER_Y + (y - 545.0) * scale - LOGO_DIAMETER / 2])


def hand_velocity(side, phase):
    epsilon = 1e-5
    return (hand_center(side, phase + epsilon) - hand_center(side, phase - epsilon)) / (2 * epsilon)


def flight_center(start, end, release_velocity, catch_velocity, u):
    # Match the live loader: only 40ms at either palm is softened; the rest
    # remains a constant-horizontal-speed, gravity-shaped arc, not an ease.
    delta = 1 / 15

    def ballistic(t):
        point = start * (1 - t) + end * t
        point[1] -= 4 * 55 * t * (1 - t)
        return point

    def velocity(t):
        return end - start + np.array([0, -4 * 55 + 8 * 55 * t])

    def hermite(a, b, va, vb, t):
        t2, t3 = t * t, t * t * t
        return (2 * t3 - 3 * t2 + 1) * a + (t3 - 2 * t2 + t) * va + (-2 * t3 + 3 * t2) * b + (t3 - t2) * vb

    if u < delta:
        return hermite(start, ballistic(delta), release_velocity * delta / 4, velocity(delta) * delta, u / delta)
    if u > 1 - delta:
        return hermite(ballistic(1 - delta), end, velocity(1 - delta) * delta, catch_velocity * delta / 4, (u - 1 + delta) / delta)
    return ballistic(u)


def logo_pose(phase):
    phase %= 1
    if phase < 0.25:
        center = hand_center("right", phase)
    elif phase < 0.5:
        u = (phase - 0.25) / 0.25
        center = flight_center(hand_center("right", 0.25), hand_center("left", 0.5),
                               hand_velocity("right", 0.25), hand_velocity("left", 0.5), u)
    elif phase < 0.75:
        center = hand_center("left", phase)
    else:
        u = (phase - 0.75) / 0.25
        center = flight_center(hand_center("left", 0.75), hand_center("right", 1),
                               hand_velocity("left", 0.75), hand_velocity("right", 1), u)
    angle = 8 * math.cos(2 * math.pi * phase) + 8 * math.sin(4 * math.pi * phase)
    return center, angle


def make_logo(svg_path):
    # Reuse the exact raster embedded in the existing favicon, not a redrawing.
    root = ET.parse(svg_path).getroot()
    node = root.find("{http://www.w3.org/2000/svg}image")
    href = node.get("{http://www.w3.org/1999/xlink}href") or node.get("href")
    original = Image.open(io.BytesIO(base64.b64decode(href.split(",", 1)[1]))).convert("RGBA")
    # The same black mark used on the mouse's pale paper sticker, in both modes.
    mark = Image.new("RGBA", original.size, (0, 0, 0, 0))
    mark.putalpha(original.getchannel("A"))
    scale, margin = 4, 18
    size = (LOGO_DIAMETER + margin * 2) * scale
    sticker = Image.new("RGBA", (size, size))
    bounds = [margin * scale, margin * scale, (margin + LOGO_DIAMETER) * scale - 1, (margin + LOGO_DIAMETER) * scale - 1]
    shadow = Image.new("RGBA", sticker.size)
    ImageDraw.Draw(shadow).ellipse([bounds[0], bounds[1] + 4 * scale, bounds[2], bounds[3] + 4 * scale], fill=(44, 112, 154, 46))
    sticker = Image.alpha_composite(sticker, shadow.filter(ImageFilter.GaussianBlur(4 * scale)))
    paper = Image.new("RGBA", sticker.size)
    ImageDraw.Draw(paper).ellipse(bounds, fill=(247, 253, 255, 245), outline=(130, 199, 250, 143), width=2 * scale)
    sticker = Image.alpha_composite(sticker, paper)
    mark.thumbnail((round(LOGO_DIAMETER * 0.68 * scale),) * 2, Image.Resampling.LANCZOS)
    sticker.alpha_composite(mark, ((size - mark.width) // 2, (size - mark.height) // 2))
    return sticker.resize((size // scale, size // scale), Image.Resampling.LANCZOS)


def render_pose(layers, phase, logo):
    result = Image.new("RGBA", (WIDTH, HEIGHT))
    errors, jacobians = [], []
    for part, layer in layers:
        frame, error, jacobian = render(layer, phase, part)
        result = Image.alpha_composite(result, frame)
        errors.append(error)
        jacobians.append(jacobian)
    center, angle = logo_pose(phase)
    # Pillow's positive rotation is counterclockwise; CSS uses clockwise.
    prop = logo.rotate(-angle, Image.Resampling.BICUBIC, expand=True)
    result.alpha_composite(prop, (round(center[0] - prop.width / 2), round(center[1] - prop.height / 2)))
    return result, max(errors), min(jacobians)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--preview-only", action="store_true")
    parser.add_argument("--logo-svg", type=Path, default=Path(__file__).resolve().parents[1] / "static/favicon.svg")
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    original = Image.open(args.source).convert("RGBA")
    assert original.size == (1448, 1086), "Rig coordinates are calibrated to the supplied photograph."
    source = np.asarray(original, dtype=np.float32) / 255
    source[..., :3] *= source[..., 3:]
    layers = split_source(source)
    logo = make_logo(args.logo_svg)
    phases = [0, 9, 18, 27, 36, 45, 54, 63] if args.preview_only else range(FRAMES)
    frames, metrics = [], []
    for index in phases:
        frame, error, jacobian = render_pose(layers, index / FRAMES, logo)
        frames.append(frame)
        metrics.append({"frame": index, "inverse_error_px": error, "minimum_jacobian": jacobian, "bbox": frame.getbbox()})
        assert error < 0.1 and jacobian > 0.4, "Invalid visible deformation."
        left, top, right, bottom = frame.getbbox()
        assert min(left, top, WIDTH - right, HEIGHT - bottom) >= 4, "Character and sticker must stay inside the canvas."
        if index in [0, 18, 36, 54]:
            frame.save(args.output / f"pose-{index:02}.png")
        if index % 12 == 0:
            print(f"Rendered {index + 1}/{FRAMES}", flush=True)
    if not args.preview_only:
        frames[0].save(args.output / "snow-lion-still.webp", quality=88, method=6)
        original.save(args.output / "snow-lion-texture.webp", quality=92, method=6)
        # 33/34 ms frame durations maintain exactly 2.4 seconds at 30 fps.
        durations = [round((n + 1) * CYCLE_MS / FRAMES) - round(n * CYCLE_MS / FRAMES) for n in range(FRAMES)]
        frames[0].save(args.output / "snow-lion-loading.webp", save_all=True, append_images=frames[1:], duration=durations, loop=0, quality=82, method=4, allow_mixed=False)
        last, _, _ = render_pose(layers, 1, logo)
        assert np.array_equal(np.asarray(frames[0]), np.asarray(last)), "Loop must meet exactly."
    # Source-derived contact sheet, for checking anatomy and the arc of movement.
    cell_w, cell_h = 360, 310
    sheet = Image.new("RGB", (cell_w * 4, cell_h * 2), "#e9eff1")
    draw = ImageDraw.Draw(sheet)
    for n, index in enumerate([0, 9, 18, 27, 36, 45, 54, 63]):
        frame = frames[n] if args.preview_only else frames[index]
        thumb = frame.copy()
        thumb.thumbnail((350, 280), Image.Resampling.LANCZOS)
        x, y = n % 4 * cell_w + (cell_w - thumb.width) // 2, n // 4 * cell_h
        sheet.paste(thumb, (x, y), thumb)
        draw.text((n % 4 * cell_w + 12, y + 285), f"{index * CYCLE_MS / FRAMES / 1000:.2f}s", fill="#263f49")
    sheet.save(args.output / "contact-sheet.jpg", quality=94)
    (args.output / "qa.json").write_text(json.dumps(metrics, indent=2))
    print("Worst inverse error:", max(m["inverse_error_px"] for m in metrics))
    print("Minimum Jacobian:", min(m["minimum_jacobian"] for m in metrics))
    print("Output:", args.output)


if __name__ == "__main__":
    main()
