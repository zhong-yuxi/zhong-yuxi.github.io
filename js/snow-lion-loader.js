/* Animate the supplied photograph with a continuous, source-calibrated mesh. */
(() => {
    'use strict';

    if (document.documentElement.dataset.loaderVariant !== 'snow-lion') return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const loader = document.querySelector('.snow-lion-loader');
    const preloader = document.getElementById('my-preloader');
    const canvas = loader && loader.querySelector('canvas');
    const logo = loader && loader.querySelector('.snow-lion-logo');
    const logoImage = logo && logo.querySelector('img');
    if (!canvas || !logoImage || !preloader || preloader.style.opacity === '0' || preloader.style.display === 'none') return;

    let gl;
    try {
        gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true, depth: false });
    } catch (_) {
        return;
    }
    if (!gl) return;

    const vertexSource = `
        precision highp float;
        attribute vec2 aPosition;
        uniform float uPhase;
        uniform float uLayer;
        varying vec2 vSource;
        const float TAU = 6.28318530718;

        float interpolate(float y, float start, float end, float a, float b) {
            return mix(a, b, clamp((y - start) / (end - start), 0.0, 1.0));
        }
        float leftEdge(float y) {
            if (y < 100.0) return interpolate(y, 0.0, 100.0, 320.0, 310.0);
            if (y < 250.0) return interpolate(y, 100.0, 250.0, 310.0, 260.0);
            if (y < 330.0) return interpolate(y, 250.0, 330.0, 260.0, 243.0);
            if (y < 380.0) return interpolate(y, 330.0, 380.0, 243.0, 230.0);
            if (y < 400.0) return interpolate(y, 380.0, 400.0, 230.0, 225.0);
            if (y < 414.0) return interpolate(y, 400.0, 414.0, 225.0, 245.0);
            if (y < 450.0) return interpolate(y, 414.0, 450.0, 245.0, 440.0);
            if (y < 500.0) return interpolate(y, 450.0, 500.0, 440.0, 490.0);
            if (y < 550.0) return interpolate(y, 500.0, 550.0, 490.0, 465.0);
            return interpolate(y, 550.0, 610.0, 465.0, 350.0);
        }
        float rightEdge(float y) {
            if (y < 180.0) return interpolate(y, 0.0, 180.0, 990.0, 1025.0);
            if (y < 250.0) return interpolate(y, 180.0, 250.0, 1025.0, 1040.0);
            if (y < 330.0) return 1040.0;
            if (y < 380.0) return interpolate(y, 330.0, 380.0, 1040.0, 1053.0);
            if (y < 400.0) return interpolate(y, 380.0, 400.0, 1053.0, 1060.0);
            if (y < 414.0) return interpolate(y, 400.0, 414.0, 1060.0, 1055.0);
            if (y < 430.0) return interpolate(y, 414.0, 430.0, 1055.0, 1015.0);
            if (y < 440.0) return interpolate(y, 430.0, 440.0, 1015.0, 945.0);
            if (y < 490.0) return interpolate(y, 440.0, 490.0, 945.0, 875.0);
            if (y < 540.0) return interpolate(y, 490.0, 540.0, 875.0, 925.0);
            return interpolate(y, 540.0, 590.0, 925.0, 1250.0);
        }
        vec2 rotateAt(vec2 point, vec2 center, float angle) {
            float c = cos(angle), s = sin(angle);
            return center + mat2(c, s, -s, c) * (point - center);
        }
        float beatAt(float phase, float lag) {
            return 0.5 * (cos(TAU * lag) - cos(TAU * (phase - lag)));
        }
        float beat(float lag) {
            return beatAt(uPhase, lag);
        }
        vec2 arm(vec2 point, vec2 shoulder, vec2 elbow, vec2 wrist, float direction) {
            float phase = uPhase + (direction > 0.0 ? 0.5 : 0.0);
            float a = direction * 0.17 * beatAt(phase, 0.0);
            float b = -direction * 0.13 * beatAt(phase, 0.035);
            float c = direction * 0.03 * beatAt(phase, 0.055);
            vec2 upper = rotateAt(point, shoulder, a);
            vec2 movedElbow = rotateAt(elbow, shoulder, a);
            vec2 lower = rotateAt(point, elbow, a + b) + movedElbow - elbow;
            vec2 movedWrist = rotateAt(wrist, elbow, a + b) + movedElbow - elbow;
            vec2 hand = rotateAt(point, wrist, a + b + c) + movedWrist - wrist;
            float forearm = direction < 0.0
                ? 1.0 - smoothstep(225.0, 345.0, point.x)
                : smoothstep(1000.0, 1110.0, point.x);
            forearm = max(forearm, 1.0 - smoothstep(330.0, 420.0, point.y));
            lower = mix(lower, hand, 1.0 - smoothstep(150.0, 235.0, point.y));
            return mix(upper, lower, forearm);
        }
        vec2 deform(vec2 point) {
            float chest = (1.0 - smoothstep(650.0, 980.0, point.y))
                * (1.0 - smoothstep(960.0, 1160.0, point.x));
            float sway = sin(TAU * uPhase);
            vec2 chestMovement = (rotateAt(point, vec2(740.0, 930.0), 0.004 * sway) - point
                + vec2(1.7 * sway, 5.0 * beat(0.025))) * chest;
            float head = (1.0 - smoothstep(435.0, 535.0, point.y))
                * smoothstep(235.0, 320.0, point.x);
            vec2 movement = chestMovement
                + (rotateAt(point, vec2(730.0, 460.0), 0.005 * sway) - point) * head;
            float left = (1.0 - smoothstep(leftEdge(point.y) - 80.0, leftEdge(point.y) + 20.0, point.x))
                * (1.0 - smoothstep(600.0, 700.0, point.y));
            float right = smoothstep(rightEdge(point.y) - 20.0, rightEdge(point.y) + 80.0, point.x)
                * (1.0 - smoothstep(535.0, 650.0, point.y));
            movement += (arm(point, vec2(465.0, 500.0), vec2(168.0, 455.0), vec2(165.0, 215.0), -1.0) - point) * left;
            movement += (arm(point, vec2(895.0, 488.0), vec2(1135.0, 449.0), vec2(1112.0, 237.0), 1.0) - point) * right;
            return point + movement;
        }
        void main() {
            vSource = aPosition;
            vec2 point = uLayer < 0.5 ? aPosition : deform(aPosition);
            // Keep the photograph's scale; the extra 64px above holds the arc.
            float scale = 584.0 / 1448.0;
            gl_Position = vec4((point.x - 748.5) * scale / 320.0,
                -((point.y - 545.0) * scale + 32.0) / 288.0, 0.0, 1.0);
        }
    `;
    const fragmentSource = `
        #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
        #else
        precision mediump float;
        #endif
        uniform sampler2D uTexture;
        uniform float uLayer;
        varying vec2 vSource;
        float interpolate(float y, float start, float end, float a, float b) {
            return mix(a, b, clamp((y - start) / (end - start), 0.0, 1.0));
        }
        float tailEdge(float y) {
            if (y < 460.0) return interpolate(y, 450.0, 460.0, 1240.0, 1230.0);
            if (y < 470.0) return interpolate(y, 460.0, 470.0, 1230.0, 1216.0);
            if (y < 480.0) return interpolate(y, 470.0, 480.0, 1216.0, 1206.0);
            if (y < 490.0) return interpolate(y, 480.0, 490.0, 1206.0, 1197.0);
            if (y < 500.0) return interpolate(y, 490.0, 500.0, 1197.0, 1187.0);
            if (y < 510.0) return interpolate(y, 500.0, 510.0, 1187.0, 1176.0);
            if (y < 520.0) return interpolate(y, 510.0, 520.0, 1176.0, 1167.0);
            if (y < 530.0) return interpolate(y, 520.0, 530.0, 1167.0, 1155.0);
            if (y < 545.0) return interpolate(y, 530.0, 545.0, 1155.0, 1145.0);
            if (y < 600.0) return interpolate(y, 545.0, 600.0, 1145.0, 1120.0);
            if (y < 700.0) return 1120.0;
            if (y < 790.0) return interpolate(y, 700.0, 790.0, 1120.0, 1250.0);
            return interpolate(y, 790.0, 850.0, 1250.0, 1380.0);
        }
        void main() {
            float edge = tailEdge(vSource.y);
            float tail = smoothstep(edge - 2.0, edge + 2.0, vSource.x)
                * smoothstep(448.0, 455.0, vSource.y)
                * (1.0 - smoothstep(790.0, 850.0, vSource.y));
            vec4 color = texture2D(uTexture, (vSource + 0.5) / vec2(1448.0, 1086.0));
            // Texture is uploaded premultiplied; mask all four channels.
            gl_FragColor = color * (uLayer < 0.5 ? tail : 1.0 - tail);
        }
    `;

    // The palm anchors use the same deformation as the mesh, not an unrelated
    // path. Keep these calibrated coordinates in source-image pixels.
    const tau = 2 * Math.PI;
    const leftEdgePoints = [[0, 320], [100, 310], [250, 260], [330, 243], [380, 230], [400, 225], [414, 245], [450, 440], [500, 490], [550, 465], [610, 350]];
    const rightEdgePoints = [[0, 990], [180, 1025], [250, 1040], [330, 1040], [380, 1053], [400, 1060], [414, 1055], [430, 1015], [440, 945], [490, 875], [540, 925], [590, 1250]];
    function smoothstep(start, end, value) {
        const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
        return t * t * (3 - 2 * t);
    }
    function edgeAt(points, y) {
        if (y <= points[0][0]) return points[0][1];
        for (let i = 1; i < points.length; i++) {
            if (y <= points[i][0]) {
                const [start, a] = points[i - 1], [end, b] = points[i];
                return a + (b - a) * (y - start) / (end - start);
            }
        }
        return points[points.length - 1][1];
    }
    function mixPoint(a, b, amount) {
        return [a[0] + (b[0] - a[0]) * amount, a[1] + (b[1] - a[1]) * amount];
    }
    function rotateAt(point, center, angle) {
        const c = Math.cos(angle), s = Math.sin(angle);
        const dx = point[0] - center[0], dy = point[1] - center[1];
        return [center[0] + c * dx - s * dy, center[1] + s * dx + c * dy];
    }
    function beatAt(phase, lag = 0) {
        return 0.5 * (Math.cos(tau * lag) - Math.cos(tau * (phase - lag)));
    }
    function armAt(point, phase, shoulder, elbow, wrist, direction) {
        const localPhase = phase + (direction > 0 ? 0.5 : 0);
        const a = direction * 0.17 * beatAt(localPhase);
        const b = -direction * 0.13 * beatAt(localPhase, 0.035);
        const c = direction * 0.03 * beatAt(localPhase, 0.055);
        const upper = rotateAt(point, shoulder, a);
        const movedElbow = rotateAt(elbow, shoulder, a);
        const lower = rotateAt(point, elbow, a + b);
        lower[0] += movedElbow[0] - elbow[0];
        lower[1] += movedElbow[1] - elbow[1];
        const movedWrist = rotateAt(wrist, elbow, a + b);
        movedWrist[0] += movedElbow[0] - elbow[0];
        movedWrist[1] += movedElbow[1] - elbow[1];
        const hand = rotateAt(point, wrist, a + b + c);
        hand[0] += movedWrist[0] - wrist[0];
        hand[1] += movedWrist[1] - wrist[1];
        const forearm = Math.max(direction < 0 ? 1 - smoothstep(225, 345, point[0])
            : smoothstep(1000, 1110, point[0]), 1 - smoothstep(330, 420, point[1]));
        return mixPoint(upper, mixPoint(lower, hand, 1 - smoothstep(150, 235, point[1])), forearm);
    }
    function palmAt(side, phase) {
        const point = side === 'left' ? [180, 65] : [1135, 90];
        const [x, y] = point;
        const sway = Math.sin(tau * phase);
        const chest = (1 - smoothstep(650, 980, y)) * (1 - smoothstep(960, 1160, x));
        const chestPoint = rotateAt(point, [740, 930], 0.004 * sway);
        let dx = (chestPoint[0] - x + 1.7 * sway) * chest;
        let dy = (chestPoint[1] - y + 5 * beatAt(phase, 0.025)) * chest;
        const head = (1 - smoothstep(435, 535, y)) * smoothstep(235, 320, x);
        const headPoint = rotateAt(point, [730, 460], 0.005 * sway);
        dx += (headPoint[0] - x) * head;
        dy += (headPoint[1] - y) * head;
        const leftEdge = edgeAt(leftEdgePoints, y), rightEdge = edgeAt(rightEdgePoints, y);
        const left = (1 - smoothstep(leftEdge - 80, leftEdge + 20, x)) * (1 - smoothstep(600, 700, y));
        const right = smoothstep(rightEdge - 20, rightEdge + 80, x) * (1 - smoothstep(535, 650, y));
        const leftArm = armAt(point, phase, [465, 500], [168, 455], [165, 215], -1);
        const rightArm = armAt(point, phase, [895, 488], [1135, 449], [1112, 237], 1);
        dx += (leftArm[0] - x) * left + (rightArm[0] - x) * right;
        dy += (leftArm[1] - y) * left + (rightArm[1] - y) * right;
        const scale = 584 / 1448;
        return [320 + (x + dx - 748.5) * scale, 320 + (y + dy - 545) * scale - 30];
    }
    const rightRelease = palmAt('right', 0.25), leftCatch = palmAt('left', 0.5);
    const leftRelease = palmAt('left', 0.75), rightCatch = palmAt('right', 1);
    const rightReleaseVelocity = palmVelocity('right', 0.25), leftCatchVelocity = palmVelocity('left', 0.5);
    const leftReleaseVelocity = palmVelocity('left', 0.75), rightCatchVelocity = palmVelocity('right', 1);
    const flightBlend = 1 / 15; // 40ms of each 600ms flight, at either hand.
    function palmVelocity(side, phase) {
        const epsilon = 0.00001;
        const before = palmAt(side, phase - epsilon), after = palmAt(side, phase + epsilon);
        // Model pixels per full-cycle phase, not pixels per second.
        return [(after[0] - before[0]) / (2 * epsilon), (after[1] - before[1]) / (2 * epsilon)];
    }
    function scaledPoint(point, scale) {
        return [point[0] * scale, point[1] * scale];
    }
    function ballisticAt(start, end, t) {
        const point = mixPoint(start, end, t);
        point[1] -= 4 * 55 * t * (1 - t);
        return point;
    }
    function ballisticVelocity(start, end, t) {
        // Derivative with respect to the normalized flight parameter t.
        return [end[0] - start[0], end[1] - start[1] - 4 * 55 + 8 * 55 * t];
    }
    function hermiteAt(start, end, startTangent, endTangent, t) {
        const t2 = t * t, t3 = t2 * t;
        const a = 2 * t3 - 3 * t2 + 1, b = t3 - 2 * t2 + t;
        const c = -2 * t3 + 3 * t2, d = t3 - t2;
        return [a * start[0] + b * startTangent[0] + c * end[0] + d * endTangent[0],
            a * start[1] + b * startTangent[1] + c * end[1] + d * endTangent[1]];
    }
    function flightAt(start, end, releaseVelocity, catchVelocity, t) {
        const delta = flightBlend;
        // A flight spans 1/4 of the full-cycle phase. Convert its palm
        // derivatives to tangents over each short Hermite interval.
        if (t < delta) {
            return hermiteAt(start, ballisticAt(start, end, delta),
                scaledPoint(releaseVelocity, delta / 4),
                scaledPoint(ballisticVelocity(start, end, delta), delta), t / delta);
        }
        if (t > 1 - delta) {
            return hermiteAt(ballisticAt(start, end, 1 - delta), end,
                scaledPoint(ballisticVelocity(start, end, 1 - delta), delta),
                scaledPoint(catchVelocity, delta / 4), (t - 1 + delta) / delta);
        }
        return ballisticAt(start, end, t);
    }
    function logoAt(phase) {
        if (phase < 0.25) return palmAt('right', phase);
        if (phase < 0.5) {
            return flightAt(rightRelease, leftCatch, rightReleaseVelocity, leftCatchVelocity, (phase - 0.25) * 4);
        }
        if (phase < 0.75) return palmAt('left', phase);
        return flightAt(leftRelease, rightCatch, leftReleaseVelocity, rightCatchVelocity, (phase - 0.75) * 4);
    }
    function updateLogo(phase) {
        const [x, y] = logoAt(phase);
        const rotation = 8 * Math.cos(tau * phase) + 8 * Math.sin(2 * tau * phase);
        logo.style.left = `${x / 640 * 100}%`;
        logo.style.top = `${y / 576 * 100}%`;
        logo.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    }

    const shaders = [];
    let program, positions, indices, texture, frame = 0, observer;
    let stopped = false, elapsed = 0, previousTime = null;
    const image = new Image();

    function stop(fallback) {
        if (stopped) return;
        stopped = true;
        cancelAnimationFrame(frame);
        if (observer) observer.disconnect();
        document.removeEventListener('visibilitychange', visibilityChanged);
        reducedMotion.removeEventListener('change', motionChanged);
        window.removeEventListener('resize', resize);
        logoImage.removeEventListener('error', logoFailed);
        if (fallback) loader.classList.remove('is-animated');
        image.onload = image.onerror = null;
        if (!gl.isContextLost()) {
            if (texture) gl.deleteTexture(texture);
            if (positions) gl.deleteBuffer(positions);
            if (indices) gl.deleteBuffer(indices);
            if (program) gl.deleteProgram(program);
            shaders.forEach(shader => gl.deleteShader(shader));
        }
    }
    function visibilityChanged() {
        cancelAnimationFrame(frame);
        previousTime = null;
        if (!document.hidden && !stopped && texture) frame = requestAnimationFrame(draw);
    }
    function motionChanged(event) {
        if (event.matches) stop(true);
    }
    function logoFailed() {
        stop(true);
    }
    function resize() {
        const bounds = canvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round((bounds.width || 640) * ratio));
        canvas.height = Math.max(1, Math.round((bounds.height || 576) * ratio));
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    function compile(type, source) {
        const shader = gl.createShader(type);
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Snow lion shader unavailable');
        return shader;
    }

    let phaseLocation, layerLocation, indexCount;
    function draw(time) {
        if (stopped) return;
        if (preloader.style.opacity === '0' || preloader.style.display === 'none') {
            stop(false);
            return;
        }
        if (document.hidden) {
            previousTime = null;
            return;
        }
        if (previousTime !== null) elapsed += time - previousTime;
        previousTime = time;
        try {
            const phase = (elapsed % 2400) / 2400;
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniform1f(phaseLocation, phase);
            gl.uniform1f(layerLocation, 0);
            gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);
            gl.uniform1f(layerLocation, 1);
            gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);
            if (gl.getError() !== gl.NO_ERROR) throw new Error('Snow lion rendering unavailable');
            updateLogo(phase);
            if (logoImage.complete && logoImage.naturalWidth > 0) loader.classList.add('is-animated');
            frame = requestAnimationFrame(draw);
        } catch (_) {
            stop(true);
        }
    }

    canvas.addEventListener('webglcontextlost', event => {
        event.preventDefault();
        stop(true);
    }, { once: true });

    try {
        program = gl.createProgram();
        gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
        gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Snow lion program unavailable');
        gl.useProgram(program);

        const columns = Math.ceil(1448 / 8), rows = Math.ceil(1086 / 8);
        const points = new Float32Array((columns + 1) * (rows + 1) * 2);
        const triangles = new Uint16Array(columns * rows * 6);
        let pointIndex = 0, triangleIndex = 0;
        for (let y = 0; y <= rows; y++) {
            for (let x = 0; x <= columns; x++) {
                points[pointIndex++] = x * 1448 / columns;
                points[pointIndex++] = y * 1086 / rows;
                if (x < columns && y < rows) {
                    const a = y * (columns + 1) + x, b = a + 1, c = a + columns + 1, d = c + 1;
                    triangles.set([a, c, b, b, c, d], triangleIndex);
                    triangleIndex += 6;
                }
            }
        }
        indexCount = triangles.length;
        positions = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positions);
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
        const positionLocation = gl.getAttribLocation(program, 'aPosition');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        indices = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangles, gl.STATIC_DRAW);
        phaseLocation = gl.getUniformLocation(program, 'uPhase');
        layerLocation = gl.getUniformLocation(program, 'uLayer');
        gl.uniform1i(gl.getUniformLocation(program, 'uTexture'), 0);
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        resize();

        observer = new MutationObserver(() => {
            if (preloader.style.opacity === '0' || preloader.style.display === 'none') stop(false);
        });
        observer.observe(preloader, { attributes: true, attributeFilter: ['style'] });
        document.addEventListener('visibilitychange', visibilityChanged);
        reducedMotion.addEventListener('change', motionChanged);
        window.addEventListener('resize', resize);
        logoImage.addEventListener('error', logoFailed, { once: true });
        image.onload = () => {
            if (stopped) return;
            try {
                texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                if (gl.getError() !== gl.NO_ERROR) throw new Error('Snow lion texture unavailable');
                if (!document.hidden) frame = requestAnimationFrame(draw);
            } catch (_) {
                stop(true);
            }
        };
        image.onerror = () => stop(true);
        image.src = '/images/snow-lion-texture.webp';
    } catch (_) {
        stop(true);
    }
})();
