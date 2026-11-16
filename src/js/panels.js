/* 浮层统一拥有焦点与输入，关闭后还给打开它的按钮。 */
let active = null;

export function closePanel(panel) {
  if (!active || active.panel !== panel) return;
  const trigger = active.trigger;
  panel.hidden = true;
  panel.classList.remove('is-open');
  trigger.setAttribute('aria-expanded', 'false');
  document.getElementById('stage').inert = false;
  active = null;
  trigger.focus();
}

export function openPanel(panel, trigger) {
  if (active) closePanel(active.panel);
  active = { panel, trigger };
  panel.hidden = false;
  panel.classList.add('is-open');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  trigger.setAttribute('aria-expanded', 'true');
  document.getElementById('stage').inert = true;
  panel.querySelector('button, a[href]')?.focus();
}

export function panelIsOpen() {
  return active !== null;
}

document.addEventListener('keydown', event => {
  if (!active) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closePanel(active.panel);
    return;
  }
  if (event.key !== 'Tab') return;
  const controls = [...active.panel.querySelectorAll('button, a[href]')];
  const index = controls.indexOf(document.activeElement);
  const direction = event.shiftKey ? -1 : 1;
  const next = (index + direction + controls.length) % controls.length;
  event.preventDefault();
  controls[next]?.focus();
}, true);
