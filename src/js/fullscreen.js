import { panelIsOpen } from './panels.js';
import { readerLabels } from '../content/reader-ui.js';

/* 整个文档进入全屏，保留选册、选页和退出入口。仅在成人明确操作时请求。 */
function init() {
  if (!document.body.matches('.screen:not(.static)')) return;
  const button = document.getElementById('fullscreen-btn');
  const status = document.getElementById('fullscreen-status');
  if (!button || !status) return;
  const root = document.documentElement;
  const standard = !!(root.requestFullscreen && document.exitFullscreen && document.fullscreenEnabled);
  const supported = standard || !!(root.webkitRequestFullscreen && document.webkitExitFullscreen && document.webkitFullscreenEnabled);
  const current = () => document.fullscreenElement || document.webkitFullscreenElement;
  let pending = false;
  let transition = null;

  function sync() {
    button.textContent = current() ? readerLabels.fullscreenExit : readerLabels.fullscreen;
    button.title = current() ? readerLabels.fullscreenExitHint : readerLabels.fullscreenEnterHint;
    button.setAttribute('aria-label', button.title);
  }

  async function toggle() {
    if (pending || panelIsOpen()) return;
    if (!supported) {
      status.textContent = readerLabels.fullscreenUnavailable;
      return;
    }
    pending = true;
    button.setAttribute('aria-disabled', 'true');
    status.textContent = '';
    let timeout;
    try {
      // 旧 WebKit 返回 void，以事件确认完成；不能 await undefined 后立即解除防连点。
      await new Promise((resolve, reject) => {
        transition = { resolve, reject };
        timeout = setTimeout(() => reject(new Error('fullscreen timeout')), 5000);
        const result = current()
          ? (standard ? document.exitFullscreen() : document.webkitExitFullscreen())
          : (standard ? root.requestFullscreen() : root.webkitRequestFullscreen());
        if (result && typeof result.then === 'function') result.then(resolve, reject);
      });
    } catch {
      status.textContent = readerLabels.fullscreenFailed;
    } finally {
      clearTimeout(timeout);
      transition = null;
      pending = false;
      button.removeAttribute('aria-disabled');
      sync();
    }
  }

  button.hidden = false;
  sync();
  button.addEventListener('click', event => {
    event.stopPropagation();
    void toggle();
  });
  for (const name of ['fullscreenchange', 'webkitfullscreenchange']) {
    document.addEventListener(name, () => { status.textContent = ''; sync(); transition?.resolve(); });
  }
  for (const name of ['fullscreenerror', 'webkitfullscreenerror']) {
    document.addEventListener(name, () => transition?.reject(new Error(name)));
  }
  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.repeat || event.ctrlKey || event.altKey || event.metaKey || panelIsOpen()) return;
    if (event.target.closest('input, textarea, select, [contenteditable]')) return;
    if (event.key.toLowerCase() !== 'f') return;
    event.preventDefault();
    void toggle();
  });
  // 只拦书页的菜单和拖拽，保留浮层链接的常规操作。
  for (const type of ['contextmenu', 'dragstart']) {
    document.getElementById('stage').addEventListener(type, event => event.preventDefault());
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
