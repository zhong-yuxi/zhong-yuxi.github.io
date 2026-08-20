(() => {
  document.querySelectorAll('[data-making-gallery]').forEach((gallery) => {
    const photos = Array.from(gallery.querySelectorAll('.making-photo'));
    const grid = gallery.querySelector('[data-making-grid]');
    const strings = Array.from(gallery.querySelectorAll('.making-string'));
    const dialog = gallery.querySelector('.making-lightbox');
    const image = dialog?.querySelector('[data-making-full]');
    const caption = dialog?.querySelector('[data-making-caption]');
    const close = dialog?.querySelector('[data-making-close]');
    const previous = dialog?.querySelector('[data-direction="previous"]');
    const next = dialog?.querySelector('[data-direction="next"]');
    let activeIndex = 0;

    const alignStrings = () => {
      if (!grid || !strings.length || !photos.length) return;

      const gridRect = grid.getBoundingClientRect();
      const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;

      strings.forEach((string, column) => {
        if (column >= columns) {
          string.style.display = 'none';
          return;
        }

        const columnPhotos = photos.filter((_, index) => index % columns === column);
        const firstRect = columnPhotos[0].getBoundingClientRect();
        const lastRect = columnPhotos[columnPhotos.length - 1].getBoundingClientRect();
        const topOverlap = 30;
        const tail = window.innerWidth <= 768 ? 30 : 44;

        string.style.display = 'block';
        string.style.left = `${firstRect.left - gridRect.left + firstRect.width / 2}px`;
        string.style.height = `${lastRect.bottom - gridRect.top + topOverlap + tail}px`;
      });
    };

    let resizeTimer;
    const scheduleStringAlignment = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => requestAnimationFrame(alignStrings), 80);
    };

    alignStrings();
    window.addEventListener('load', alignStrings, { once: true });
    window.addEventListener('resize', scheduleStringAlignment);
    photos.forEach((photo) => {
      const thumbnail = photo.querySelector('img');
      if (thumbnail && !thumbnail.complete) thumbnail.addEventListener('load', alignStrings, { once: true });
    });

    if (!dialog || !image || !caption || !photos.length) return;

    const showPhoto = (index) => {
      activeIndex = Math.max(0, Math.min(index, photos.length - 1));
      const photo = photos[activeIndex];
      image.src = photo.dataset.full;
      image.alt = photo.dataset.description;
      caption.textContent = photo.dataset.description;
      previous.hidden = activeIndex === 0;
      next.hidden = activeIndex === photos.length - 1;
    };

    photos.forEach((photo, index) => {
      photo.addEventListener('click', () => {
        showPhoto(index);
        dialog.showModal();
      });
    });

    close?.addEventListener('click', () => dialog.close());
    previous?.addEventListener('click', () => showPhoto(activeIndex - 1));
    next?.addEventListener('click', () => showPhoto(activeIndex + 1));
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' && activeIndex > 0) showPhoto(activeIndex - 1);
      if (event.key === 'ArrowRight' && activeIndex < photos.length - 1) showPhoto(activeIndex + 1);
    });
  });
})();
