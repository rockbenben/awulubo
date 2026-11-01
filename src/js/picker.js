/* 选页器：让孩子（和大人）能直接跳到任意一页，不必一页一页翻。
   —— 44 页版只有「上一页 / 下一页 / 回第一页」三种走法，
      想找「数一数」那页要从头翻十几页。64 页版更得有个入口。

   缩略图不是另外画的：把每一页画面层里的 SVG 克隆一份放进格子里。
   SVG 有 viewBox，放多大都对；克隆的是节点，不是位图，缩放不糊。

   格子是懒建的：60 页的 SVG 全克隆出来有几千个节点，
   第一次打开时建，之后复用（页面数据不会中途变）。
*/
(function (global) {
  'use strict';

  var grid = null;
  var built = false;
  var builtBook = '';

  function isStatic() {
    return document.body.classList.contains('static');
  }

  /* 只列**当前册**的页：两册的页码各自从 p01 开始，
     铺在一起会出现两个 p01——点哪个都说不清是哪一册的哪一页。 */
  function pages() {
    var book = global.Book && global.Book.book ? global.Book.book() : '';
    return Array.prototype.slice
      .call(document.querySelectorAll('.page'))
      .filter(function (p) {
        return !book || p.getAttribute('data-book') === book;
      });
  }

  /* 这一页的缩略图：克隆画面层的 SVG（不含 HTML 文字层——文字层是绝对定位的，
     缩到指甲盖大小也看不清，徒增节点） */
  function thumbOf(page) {
    var svg = page.querySelector('.art > svg');
    if (!svg) return null;
    var clone = svg.cloneNode(true);
    clone.removeAttribute('style');
    clone.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    return clone;
  }

  function build(panel) {
    var book = global.Book && global.Book.book ? global.Book.book() : '';
    /* 换册了要重建：格子里是上一册的缩略图 */
    if (built && builtBook === book) return;
    if (grid && grid.parentNode) grid.parentNode.removeChild(grid);
    grid = null;
    var list = pages();
    grid = document.createElement('div');
    grid.className = 'picker-grid';
    list.forEach(function (page, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'picker-cell';
      btn.setAttribute('data-index', String(i));
      var id = page.getAttribute('data-id');
      var t = thumbOf(page);
      if (t) btn.appendChild(t);
      var label = document.createElement('span');
      label.className = 'picker-num';
      label.textContent = String(i + 1);
      btn.appendChild(label);
      btn.setAttribute('aria-label', '跳到第 ' + (i + 1) + ' 页');
      grid.appendChild(btn);
    });
    panel.appendChild(grid);
    built = true;
    builtBook = book;
  }

  function sync(panel) {
    if (!grid) return;
    /* 摊开成跨页时，当前一组有两页：两个格子都要亮。
       只亮一个的话，读者看着满屏两页、却只有一个格子被框住，像坏了。 */
    var group = global.Book && global.Book.currentGroup ? global.Book.currentGroup() : null;
    var on = {};
    if (group && group.length) {
      for (var g = 0; g < group.length; g++) {
        var idx = pages().indexOf(group[g]);
        if (idx >= 0) on[idx] = true;
      }
    } else {
      var active = global.Book && global.Book.currentIndex ? global.Book.currentIndex() : -1;
      on[active] = true;
    }
    var cells = grid.children;
    for (var i = 0; i < cells.length; i++) {
      cells[i].classList.toggle('is-current', !!on[i]);
    }
  }

  function open(panel, btn) {
    build(panel);
    panel.hidden = false;
    panel.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    sync(panel);
  }

  function close(panel, btn) {
    panel.hidden = true;
    panel.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  function init() {
    if (isStatic()) return;
    var panel = document.getElementById('picker');
    var btn = document.getElementById('page-btn');
    if (!panel || !btn) return;

    btn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (panel.hidden) open(panel, btn);
      else close(panel, btn);
    });

    /* 点格子＝跳到那一页。点面板别处（不是格子）＝关掉。 */
    panel.addEventListener('click', function (ev) {
      var cell = ev.target.closest ? ev.target.closest('.picker-cell') : null;
      if (cell) {
        var i = parseInt(cell.getAttribute('data-index'), 10);
        if (!isNaN(i) && global.Book && global.Book.goToIndex) global.Book.goToIndex(i);
        close(panel, btn);
        return;
      }
      if (ev.target === panel) close(panel, btn);
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !panel.hidden) close(panel, btn);
    });

    /* 翻到哪一页，页码按钮上的数字就跟着变。
       编号是**屏幕版的序号**（1…60），不是印刷页码：
       屏幕版跳过版权页、给大人的话、后环衬、封底四页，
       按印刷页码编号的话格子会缺 4、61、63、64 几个数，看着像坏了。
       摊开成跨页时显示的是**这一组**：8–9/60。 */
    var label = document.getElementById('page-num');
    var total = pages().length;
    function setLabel(i) {
      if (!label) return;
      var range = global.Book && global.Book.currentRange ? global.Book.currentRange() : null;
      var text;
      if (range && range.length > 1) {
        text = range[0] + '–' + range[range.length - 1];
      } else if (range && range.length === 1) {
        text = String(range[0]);
      } else {
        text = String(i + 1);
      }
      label.textContent = text + '/' + total;
    }
    if (global.Book && global.Book.onChange) {
      global.Book.onChange(function (i) {
        setLabel(i);
        sync(panel);
      });
    }
    setLabel(global.Book && global.Book.currentIndex ? global.Book.currentIndex() : 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.BookPicker = { sync: sync };
})(window);
