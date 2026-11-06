import { createSSRApp } from 'vue'
import App from './App.vue'

// #ifdef H5
// Older iOS WebViews can ignore the viewport scale limits.
document.addEventListener('touchmove', event => {
  if (event.touches.length > 1 && event.cancelable) event.preventDefault()
}, { passive: false })
for (const type of ['gesturestart', 'gesturechange']) {
  document.addEventListener(type, event => event.preventDefault(), { passive: false })
}
// #endif

export function createApp() {
  return { app: createSSRApp(App) }
}
