# Bolt's Journal ⚡

## 2026-05-16 - Throttling high-frequency events

**Learning:** High-frequency events like `pointermove` or `scroll` can fire dozens of times per second, far exceeding the browser's refresh rate. Updating CSS variables or the DOM on every event can lead to main-thread jank and wasted CPU cycles.
**Action:** Always use `requestAnimationFrame` or a debounce/throttle utility for high-frequency event listeners to align updates with the display's refresh rate (typically 60Hz or 120Hz).

## 2026-05-16 - Modern image formats and CDN preconnecting
**Learning:** Serving images in modern formats like WebP or AVIF can significantly reduce payload size without quality loss. Preconnecting to image CDNs reduces the latency of the initial request by performing DNS/TLS handshakes early.
**Action:** Use `.auto('format')` in Sanity's image builder and add `<link rel="preconnect" href="https://cdn.sanity.io" />` to the document head.
