(() => {
  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  };

  ready(() => {
    const shell = document.querySelector("[data-xiangcheng-book]");
    if (!shell || !window.St?.PageFlip) return;

    const book = shell.querySelector(".xiangcheng-book");
    const stage = shell.querySelector(".xiangcheng-book-stage");
    const pages = book?.querySelectorAll(":scope > .xiangcheng-book-page");
    const previousSpread = shell.querySelector(".xiangcheng-book-arrow--previous");
    const nextSpread = shell.querySelector(".xiangcheng-book-arrow--next");
    const indicator = shell.querySelector(".xiangcheng-spread-indicator");
    const dialog = document.querySelector(".xiangcheng-lightbox");

    if (!book || !stage || !pages?.length || !previousSpread || !nextSpread || !indicator || !dialog) return;

    document.body.classList.add("xiangcheng-book-active");

    const spreadCount = Math.ceil(pages.length / 2);
    const dots = Array.from({ length: spreadCount }, (_, index) => {
      const dot = document.createElement("span");
      if (index === 0) dot.classList.add("is-active");
      indicator.append(dot);
      return dot;
    });

    const pageFlip = new window.St.PageFlip(book, {
      width: 460,
      height: 570,
      size: "fixed",
      drawShadow: true,
      flippingTime: 1050,
      usePortrait: false,
      startPage: 0,
      autoSize: false,
      maxShadowOpacity: 0.34,
      showCover: false,
      mobileScrollSupport: false,
      clickEventForward: true,
      useMouseEvents: true,
      disableFlipByClick: true,
    });

    let currentPage = 0;

    const updateSpread = (pageIndex) => {
      currentPage = Number.isFinite(pageIndex) ? pageIndex : 0;
      const activeSpread = Math.min(spreadCount - 1, Math.floor(currentPage / 2));
      const first = currentPage <= 0;
      const last = currentPage >= pages.length - 2;

      previousSpread.classList.toggle("is-hidden", first);
      previousSpread.tabIndex = first ? -1 : 0;
      previousSpread.setAttribute("aria-hidden", String(first));

      nextSpread.classList.toggle("is-hidden", last);
      nextSpread.tabIndex = last ? -1 : 0;
      nextSpread.setAttribute("aria-hidden", String(last));

      dots.forEach((dot, index) => dot.classList.toggle("is-active", index === activeSpread));
      stage.setAttribute("aria-label", `${shell.dataset.spreadLabel || "Photography book spread"} ${activeSpread + 1} / ${spreadCount}`);
    };

    pageFlip.on("flip", (event) => updateSpread(event.data));
    pageFlip.loadFromHTML(pages);
    updateSpread(0);

    previousSpread.addEventListener("click", () => pageFlip.flipPrev("bottom"));
    nextSpread.addEventListener("click", () => pageFlip.flipNext("bottom"));

    const photoButtons = Array.from(shell.querySelectorAll(".xiangcheng-book-photo"));
    const lightboxImage = dialog.querySelector(".xiangcheng-lightbox__image");
    const lightboxIndex = dialog.querySelector(".xiangcheng-lightbox__index");
    const lightboxLocation = dialog.querySelector(".xiangcheng-lightbox__location");
    const lightboxDescription = dialog.querySelector(".xiangcheng-lightbox__description");
    const lightboxCaption = dialog.querySelector(".xiangcheng-lightbox__caption");
    const lightboxClose = dialog.querySelector(".xiangcheng-lightbox__close");
    const lightboxPrevious = dialog.querySelector(".xiangcheng-lightbox__nav--previous");
    const lightboxNext = dialog.querySelector(".xiangcheng-lightbox__nav--next");
    let activePhoto = 0;
    let returnFocus = null;

    const renderLightbox = () => {
      const button = photoButtons[activePhoto];
      const image = button.querySelector("img");
      const showCaption = button.dataset.showCaption !== "false";
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxIndex.textContent = button.dataset.id || "";
      lightboxLocation.textContent = button.dataset.location || "";
      lightboxDescription.textContent = button.dataset.description || image.alt;
      lightboxCaption.hidden = !showCaption;
      dialog.classList.toggle("is-captionless", !showCaption);

      const first = activePhoto === 0;
      const last = activePhoto === photoButtons.length - 1;
      lightboxPrevious.classList.toggle("is-hidden", first);
      lightboxPrevious.tabIndex = first ? -1 : 0;
      lightboxNext.classList.toggle("is-hidden", last);
      lightboxNext.tabIndex = last ? -1 : 0;
    };

    const openLightbox = (button) => {
      const index = photoButtons.indexOf(button);
      if (index < 0) return;
      activePhoto = index;
      returnFocus = button;
      renderLightbox();
      dialog.showModal();
      document.body.classList.add("xiangcheng-viewer-open");
      lightboxClose.focus();
    };

    const closeLightbox = () => {
      if (dialog.open) dialog.close();
    };

    const moveLightbox = (offset) => {
      const next = activePhoto + offset;
      if (next < 0 || next >= photoButtons.length) return;
      activePhoto = next;
      renderLightbox();
    };

    stage.addEventListener("click", (event) => {
      const button = event.target.closest(".xiangcheng-book-photo");
      if (button) openLightbox(button);
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrevious.addEventListener("click", () => moveLightbox(-1));
    lightboxNext.addEventListener("click", () => moveLightbox(1));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeLightbox();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("xiangcheng-viewer-open");
      if (returnFocus?.isConnected) returnFocus.focus();
    });

    window.addEventListener("keydown", (event) => {
      if (dialog.open) {
        if (event.key === "ArrowLeft") moveLightbox(-1);
        if (event.key === "ArrowRight") moveLightbox(1);
        return;
      }

      if (event.key === "ArrowLeft" && currentPage > 0) pageFlip.flipPrev("bottom");
      if (event.key === "ArrowRight" && currentPage < pages.length - 2) pageFlip.flipNext("bottom");
    });
  });
})();
