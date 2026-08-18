(() => {
    const previewHosts = new Set(["zhong-yuxi.github.io", "localhost", "127.0.0.1"]);

    document.querySelectorAll("img[src]").forEach((image) => {
        try {
            const source = new URL(image.getAttribute("src"), window.location.href);
            if (!previewHosts.has(source.hostname)) return;
            image.setAttribute("src", `${source.pathname}${source.search}${source.hash}`);
        } catch (_) {
            // Keep malformed or non-URL sources untouched.
        }
    });
})();
