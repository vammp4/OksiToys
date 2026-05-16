# Bolt's Journal ⚡

## 2026-05-16 - Throttling high-frequency events

**Learning:** High-frequency events like `pointermove` or `scroll` can fire dozens of times per second, far exceeding the browser's refresh rate. Updating CSS variables or the DOM on every event can lead to main-thread jank and wasted CPU cycles.
**Action:** Always use `requestAnimationFrame` or a debounce/throttle utility for high-frequency event listeners to align updates with the display's refresh rate (typically 60Hz or 120Hz).
