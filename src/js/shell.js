/* 外壳：选册 + 换显示方式。

   **一册 = 一本书 = 64 页。** 网页端默认以「网页」方式展示；
   选册之后可以切到打印版等模式——每册都能单独印、单独读。

   册的清单由构建时注入（<script type="application/json" id="books-manifest">），
   浏览器端拿不到文件系统，册的列表必须显式带进来。

   ⚠️ **「打印版」是链接，不是就地换版式。**
   印刷版与屏幕版的**文案不同**（纸上点不动，"点一下，往后翻"要改成"翻过来找找看"，
   共 4 页有差别），就地换 body 的 class 印出来的还是屏幕版的字。
   真正的印刷版是 print.html——它是用印刷文案单独构建的那一份。 */
(function (global) {
  'use strict';

  var MODES = [
    { id: 'web', label: '网页', hint: '一页一屏，会叫会回应', file: 'index.html' },
    { id: 'print', label: '打印版', hint: '整册 64 页摊平，直接送印厂', file: 'print.html' },
    { id: 'booklet', label: '骑马钉拼版', hint: 'A4 双面拼版，对折即成书', file: 'booklet.html' },
  ];

  function manifest() {
    var el = document.getElementById('books-manifest');
    if (!el) return [];
    try {
      return JSON.parse(el.textContent || '[]');
    } catch (e) {
      return [];
    }
  }

  function isStatic() {
    return document.body.classList.contains('static');
  }

  function currentBook() {
    return global.Book && global.Book.book ? global.Book.book() : '';
  }

  function buildPanel(panel, books) {
    panel.innerHTML = '';

    var h1 = document.createElement('p');
    h1.className = 'shell-h';
    h1.textContent = '选一册';
    panel.appendChild(h1);

    var bookRow = document.createElement('div');
    bookRow.className = 'shell-row';
    books.forEach(function (b) {
      var b2 = document.createElement('button');
      b2.type = 'button';
      b2.className = 'shell-btn';
      b2.setAttribute('data-book', b.id);
      b2.textContent = '第 ' + (b.no || 1) + ' 册《' + b.title + '》';
      b2.addEventListener('click', function () {
        if (global.Book && global.Book.setBook) global.Book.setBook(b.id);
        sync(panel);
      });
      bookRow.appendChild(b2);
    });
    panel.appendChild(bookRow);

    var h2 = document.createElement('p');
    h2.className = 'shell-h';
    h2.textContent = '看它的方式';
    panel.appendChild(h2);

    var modeRow = document.createElement('div');
    modeRow.className = 'shell-row';
    MODES.forEach(function (m) {
      var a = document.createElement('a');
      a.className = 'shell-btn shell-link';
      a.setAttribute('data-mode', m.id);
      a.textContent = m.label;
      a.title = m.hint;
      a.href = m.file + '?book=' + encodeURIComponent(currentBook());
      modeRow.appendChild(a);
    });
    panel.appendChild(modeRow);
  }

  function sync(panel) {
    if (!panel) return;
    var book = currentBook();
    /* 当前在哪个文件里：文件名就是模式（index / print / booklet） */
    var file = (location.pathname.split('/').pop() || 'index.html').split('?')[0];
    var btns = panel.querySelectorAll('.shell-btn');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      var on = b.hasAttribute('data-book')
        ? b.getAttribute('data-book') === book
        : b.getAttribute('data-mode') === modeOfFile(file);
      b.classList.toggle('is-on', on);
    }
  }

  function modeOfFile(file) {
    for (var i = 0; i < MODES.length; i++) {
      if (MODES[i].file === file) return MODES[i].id;
    }
    return 'web';
  }

  function init() {
    if (isStatic()) return;
    var panel = document.getElementById('shell');
    var btn = document.getElementById('shell-btn');
    if (!panel || !btn) return;
    var books = manifest();

    buildPanel(panel, books);

    btn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      var open = panel.hidden;
      panel.hidden = !open;
      panel.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      sync(panel);
    });

    panel.addEventListener('click', function (ev) {
      if (ev.target === panel) {
        panel.hidden = true;
        panel.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !panel.hidden) {
        panel.hidden = true;
        panel.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    /* 模式不用在这里切：各模式是各自的文件，链接过去就是切过去了。
       这里只把「当前是哪一个」标出来。 */
    document.body.setAttribute('data-mode', modeOfFile((location.pathname.split('/').pop() || 'index.html')));
    sync(panel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.BookShell = { modes: MODES };
})(window);
