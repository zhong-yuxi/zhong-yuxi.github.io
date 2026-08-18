(() => {
    const getMeta = (name, fallback = "") =>
        document.querySelector(`meta[name="${name}"]`)?.content || fallback;

    const style = getMeta("gallery-preview-style", "grid");
    const variant = getMeta("gallery-preview-variant", "default");
    const theme = getMeta("gallery-preview-theme", "light");
    const featureIndex = Math.max(0, Number.parseInt(getMeta("gallery-preview-feature", "1"), 10) - 1);

    const normalizeText = (value = "") => {
        const parser = new DOMParser();
        return parser.parseFromString(value.replace(/<br\s*\/?\s*>/gi, "\n"), "text/html").body.textContent.trim();
    };

    const readLegacyCaption = (item, image) => {
        const handler = item.getAttribute("onclick") || "";
        const match = handler.match(/,\s*'(\(\d+\))'\s*,\s*'([^']*)'\s*\)/);
        if (!match) {
            return { location: "", description: image.alt || "" };
        }

        const lines = normalizeText(match[2]).split("\n").map((line) => line.trim()).filter(Boolean);
        return {
            location: lines.shift() || "",
            description: lines.join(" — ")
        };
    };

    const buildLightbox = (items) => {
        const dialog = document.createElement("dialog");
        dialog.className = "gallery-lightbox";
        dialog.setAttribute("aria-label", "Photo viewer");
        dialog.innerHTML = `
            <button class="gallery-lightbox__close" type="button" aria-label="Close photo viewer">
                <i class="bi bi-x-lg" aria-hidden="true"></i>
            </button>
            <button class="gallery-lightbox__nav gallery-lightbox__nav--previous" type="button" aria-label="Previous photo">
                <i class="bi bi-chevron-left" aria-hidden="true"></i>
            </button>
            <figure class="gallery-lightbox__figure">
                <img class="gallery-lightbox__image" alt="">
            </figure>
            <button class="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" aria-label="Next photo">
                <i class="bi bi-chevron-right" aria-hidden="true"></i>
            </button>
            <figcaption class="gallery-lightbox__caption">
                <span class="gallery-lightbox__counter"></span>
                <span class="gallery-lightbox__description"></span>
            </figcaption>
        `;
        document.body.append(dialog);

        const image = dialog.querySelector(".gallery-lightbox__image");
        const counter = dialog.querySelector(".gallery-lightbox__counter");
        const description = dialog.querySelector(".gallery-lightbox__description");
        const closeButton = dialog.querySelector(".gallery-lightbox__close");
        const previousButton = dialog.querySelector(".gallery-lightbox__nav--previous");
        const nextButton = dialog.querySelector(".gallery-lightbox__nav--next");
        let current = 0;
        let returnFocus = null;

        const render = () => {
            const entry = items[current];
            image.src = entry.image.currentSrc || entry.image.src;
            image.alt = entry.image.alt || "";
            counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
            description.textContent = [entry.caption.location, entry.caption.description].filter(Boolean).join(" — ");
            previousButton.disabled = items.length < 2;
            nextButton.disabled = items.length < 2;
        };

        const show = (index, trigger) => {
            current = index;
            returnFocus = trigger;
            render();
            dialog.showModal();
            document.body.classList.add("gallery-lightbox-open");
            closeButton.focus();
        };

        const close = () => dialog.close();
        const move = (offset) => {
            current = (current + offset + items.length) % items.length;
            render();
        };

        closeButton.addEventListener("click", close);
        previousButton.addEventListener("click", () => move(-1));
        nextButton.addEventListener("click", () => move(1));
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) close();
        });
        dialog.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") move(-1);
            if (event.key === "ArrowRight") move(1);
            if (event.key === "Escape") {
                event.preventDefault();
                close();
            }
        });
        dialog.addEventListener("close", () => {
            document.body.classList.remove("gallery-lightbox-open");
            returnFocus?.focus();
        });

        return show;
    };

    const assignEditorialLayout = (gallery, items) => {
        if (!items.length) return;

        if (featureIndex > 0 && featureIndex < items.length) {
            gallery.insertBefore(items[featureIndex], items[0]);
            items = Array.from(gallery.querySelectorAll(":scope > .photo-item"));
        }

        if (variant === "field-notes" && items.length > 2) {
            gallery.insertBefore(items[2], items[1]);
            items = Array.from(gallery.querySelectorAll(":scope > .photo-item"));
        }

        items[0]?.classList.add("gallery-primary");
        items[1]?.classList.add("gallery-support-a");
        items[2]?.classList.add("gallery-support-b");

        const side = document.createElement("div");
        side.className = "gallery-lead-side";
        gallery.insertBefore(side, items[1] || null);
        if (items[1]) side.append(items[1]);
        if (items[2]) side.append(items[2]);

        const sequenceClasses = [
            "gallery-sequence-wide",
            "gallery-sequence-left",
            "gallery-sequence-right",
            "gallery-sequence-centered",
            "gallery-sequence-left",
            "gallery-sequence-right"
        ];
        items.slice(3).forEach((item, index) => {
            item.classList.add("gallery-sequence", sequenceClasses[index % sequenceClasses.length]);
        });
    };

    const assignCinematicLayout = (items) => {
        items.forEach((item) => {
            const image = item.querySelector("img");
            const classify = () => {
                item.classList.toggle("is-portrait", image.naturalHeight > image.naturalWidth);
                item.classList.toggle("is-landscape", image.naturalHeight <= image.naturalWidth);
            };
            if (image.complete) classify();
            else image.addEventListener("load", classify, { once: true });
        });
    };

    const prioritizeVisibleImages = (entries) => {
        requestAnimationFrame(() => {
            const nearby = entries
                .filter(({ item }) => {
                    const rect = item.getBoundingClientRect();
                    return rect.bottom > 0 && rect.top < window.innerHeight * 1.5;
                })
                .sort((a, b) => {
                    const aRect = a.item.getBoundingClientRect();
                    const bRect = b.item.getBoundingClientRect();
                    return aRect.top - bRect.top || aRect.left - bRect.left;
                });

            nearby.forEach(({ image }, index) => {
                image.loading = "eager";
                image.decoding = "async";
                if ("fetchPriority" in image) {
                    image.fetchPriority = index < 3 ? "high" : "auto";
                }
            });
        });
    };

    document.addEventListener("DOMContentLoaded", () => {
        document.body.classList.add("gallery-preview-active", `gallery-style-${style}`, `gallery-variant-${variant}`);
        if (theme === "dark") document.body.classList.add("gallery-theme-dark");

        document.querySelector(".spotlight-modal")?.remove();

        let gallery;
        let elements;
        if (style === "grid") {
            gallery = document.querySelector(".masonry-gallery");
            elements = gallery ? Array.from(gallery.querySelectorAll(":scope > .paige-shortcode-image")) : [];
        } else {
            gallery = document.querySelector(".scroll-track");
            elements = gallery ? Array.from(gallery.querySelectorAll(":scope > .photo-item")) : [];
        }

        if (!gallery || !elements.length) return;

        if (style === "editorial") {
            assignEditorialLayout(gallery, elements);
            elements = Array.from(gallery.querySelectorAll(".photo-item"));
        }
        if (style === "cinematic") assignCinematicLayout(elements);

        const entries = elements.map((item, index) => {
            const image = item.querySelector("img");
            const caption = readLegacyCaption(item, image);
            item.removeAttribute("onclick");
            item.setAttribute("role", "button");
            item.setAttribute("tabindex", "0");
            item.setAttribute("aria-label", `View photo ${index + 1}${caption.location ? `, ${caption.location}` : ""}`);
            return { item, image, caption };
        });

        prioritizeVisibleImages(entries);

        const showLightbox = buildLightbox(entries);
        entries.forEach((entry, index) => {
            const open = (event) => {
                event.preventDefault();
                showLightbox(index, entry.item);
            };
            entry.item.addEventListener("click", open);
            entry.item.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") open(event);
            });
        });
    });
})();
