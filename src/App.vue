<script>
export default {}
</script>

<style>
page { background: #faf9f6; color: #30312d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; font-size: 14px; }
view, text, button, input, textarea, uni-view, uni-text, uni-button, uni-input, uni-textarea { box-sizing: border-box; }
.app-shell button, .app-shell uni-button { margin: 0; padding: 0; border: 0; font-size: inherit; font-weight: inherit; line-height: 1.4; border-radius: 0; background: transparent; color: inherit; }
.app-shell button::after, .app-shell uni-button::after { border: 0; }
.app-shell button[disabled], .app-shell uni-button[disabled] { opacity: .4; }
/* #ifdef H5 */
html, body, #app { touch-action: pan-x pan-y; }
button, uni-button { cursor: pointer; }
button:focus-visible, uni-button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 2px solid #ed7655; outline-offset: 4px; }
body { margin: 0; }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: #deddd5; border-radius: 8px; }
/* #endif */
</style>
