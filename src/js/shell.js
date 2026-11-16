import { openPanel, closePanel } from './panels.js';
import { readerModes, readerLabels } from '../content/reader-ui.js';
/* 外壳：选册 + 换显示方式。

   **一册 = 一本书 = 64 页。** 网页端默认以「网页」方式展示；
   选册之后可以切到打印版等模式——每册都能单独印、单独读。

   册的清单由构建时注入（<script type="application/json" id="books-manifest">），
   浏览器端拿不到文件系统，册的列表必须显式带进来。

   ⚠️ **「打印版」是链接，不是就地换版式。**
   印刷版与屏幕版的**文案不同**（纸上点不动，各册在纸书上均有专属的共读提示文案），
   就地换 body 的 class 印出来的还是屏幕版的字。
   真正的印刷版是 print.html——它是用印刷文案单独构建的那一份。 */
(function (global) {
  'use strict';

  var MODES = readerModes;

  /* 纸书 p61「给大人的话」标了 screen: false，屏幕版一页都看不到。
     可屏幕恰恰是孩子最容易自己拿起平板读的形态——把每册最要紧的一条
     补在 ☰ 浮层里；完整版仍在各册纸书 p61。 */
  function adultTip(book) {
    var books = manifest();
    for (var i = 0; i < books.length; i++) {
      if (books[i].id === book) return books[i].adultTip || readerLabels.adultDefault;
    }
    return readerLabels.adultDefault;
  }

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
    h1.textContent = readerLabels.chooseBook;
    panel.appendChild(h1);

    var bookRow = document.createElement('div');
    bookRow.className = 'shell-row';
    books.forEach(function (b) {
      var b2 = document.createElement('button');
      b2.type = 'button';
      b2.className = 'shell-btn';
      b2.setAttribute('data-book', b.id);
      b2.textContent = readerLabels.bookPrefix + (b.no || 1) + readerLabels.bookSuffix + '《' + b.title + '》';
      b2.addEventListener('click', function () {
        if (global.Book && global.Book.setBook) global.Book.setBook(b.id);
        sync(panel);
      });
      bookRow.appendChild(b2);
    });
    panel.appendChild(bookRow);

    var h2 = document.createElement('p');
    h2.className = 'shell-h';
    h2.textContent = readerLabels.chooseMode;
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

    var h3 = document.createElement('p');
    h3.className = 'shell-h';
    h3.textContent = readerLabels.adultHeading;
    panel.appendChild(h3);

    var tip = document.createElement('p');
    tip.className = 'shell-tip';
    tip.setAttribute('data-tip', '1');
    tip.textContent = adultTip(currentBook());
    panel.appendChild(tip);

    var more = document.createElement('p');
    more.className = 'shell-tip';
    more.textContent = readerLabels.adultMore;
    panel.appendChild(more);
  }

  function sync(panel) {
    if (!panel) return;
    var book = currentBook();
    /* 换册之后共读提示也要换：五册各自最要紧的那句不一样。 */
    var tip = panel.querySelector('[data-tip]');
    if (tip) tip.textContent = adultTip(book);
    /* 换册之后，「看它的方式」三个链接要跟着指向这一册。
       链接是 buildPanel 时建的；只标高亮、不换 href 的话，
       切到第二册再点「打印版」，打开的还是第一册。 */
    var links = panel.querySelectorAll('.shell-link[data-mode]');
    for (var l = 0; l < links.length; l++) {
      var linkMode = links[l].getAttribute('data-mode');
      for (var m = 0; m < MODES.length; m++) {
        if (MODES[m].id === linkMode) {
          links[l].setAttribute(
            'href',
            MODES[m].file + '?book=' + encodeURIComponent(book)
          );
        }
      }
    }
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
      if (open) openPanel(panel, btn);
      else closePanel(panel);
      sync(panel);
    });

    panel.addEventListener('click', function (ev) {
      if (ev.target === panel) {
        closePanel(panel);
      }
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !panel.hidden) {
        closePanel(panel);
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
})(window);
