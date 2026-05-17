# Bolt's Journal ⚡

## 2026-05-16 - Throttling high-frequency events

**Learning:** High-frequency events like `pointermove` or `scroll` can fire dozens of times per second, far exceeding the browser's refresh rate. Updating CSS variables or the DOM on every event can lead to main-thread jank and wasted CPU cycles.
**Action:** Always use `requestAnimationFrame` or a debounce/throttle utility for high-frequency event listeners to align updates with the display's refresh rate (typically 60Hz or 120Hz).

## 2026-05-16 - Modern image formats and CDN preconnecting
**Learning:** Serving images in modern formats like WebP or AVIF can significantly reduce payload size without quality loss. Preconnecting to image CDNs reduces the latency of the initial request by performing DNS/TLS handshakes early.
**Action:** Use `.auto('format')` in Sanity's image builder and add `<link rel="preconnect" href="https://cdn.sanity.io" />` to the document head.

## 2026-05-16 - Avoiding layout flashes and improving reactivity
**Learning:** In TanStack Start, anonymous component functions in route definitions can lead to unnecessary remounts or missed updates. Using named components and ensuring layout-level styles are applied consistently prevents the "white flash" during navigation.
**Action:** Always use named components in route definitions and apply global backgrounds to the main component container instead of relying solely on the body tag.

## 2026-05-17 - Solving white flashes and visibility jank
**Learning:** In highly animated sites, switching routes can cause elements to reset to an invisible state if their reveal logic doesn't account for the transition. Additionally, relying on route-level components for global backgrounds can cause "white flashes" if the layout isn't painted before the component mounts.
**Action:** Move global background styles to the root layout shell and ensure scroll-reveal hooks are reactive to language and content changes.
