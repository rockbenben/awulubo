/* 《啊呜噜啵！》页面状态机：翻页、导航、朗读播报。
   页面切换规则见设计规格 §7.5；键盘与无障碍见 §7.9。 */
(function (global) {
  'use strict';

  var allPages = Array.prototype.slice.call(document.querySelectorAll('.page'));
  /* 当前读的册。页码在每册内独立（每册都从 p01 开始），
     所以「当前页」是**册内序号**，不是全局序号。 */
  var activeBook = null;
  var pages = allPages.slice();
  var current = 0;
  /* 换页时通知外面（选页器的页码、当前页高亮）。
     不用事件总线：这里只有一处要听。 */
  var changeListeners = [];

  function setBookPages(id) {
    activeBook = id;
    var own = allPages.filter(function (p) {
      return p.getAttribute('data-book') === id;
    });
    /* 一册都没有（页面数据没带册 id）时退回全部页面——
       少一册总比读不出书强。 */
    pages = own.length ? own : allPages.slice();
    applyBookVisibility(id);
    syncTitle(id);
  }

  /* 别册的页面藏起来。
     打印/拼版模式下页面是平铺的，不藏就会把两册拼在一起印——
     每一册都是一本独立的书，骑马钉的帖序也在册内各算各的。 */
  function applyBookVisibility(id) {
    for (var k = 0; k < allPages.length; k++) {
      var b = allPages[k].getAttribute('data-book');
      allPages[k].classList.toggle('is-off-book', !!id && b !== id);
    }
    /* 骑马钉拼版：每一「面」是一册的一帖，别册的面也要藏起来 */
    var sheets = document.querySelectorAll('.sheet[data-book]');
    for (var j = 0; j < sheets.length; j++) {
      var sb = sheets[j].getAttribute('data-book');
      sheets[j].classList.toggle('is-off-book', !!id && sb !== id);
    }
  }

  function isStatic() {
    return document.body.classList.contains('static');
  }

  /* 地址栏里的 ?book=<册 id>。
     页码在册内独立：只留 #p31 说不清是哪一册的哪一页——
     刷新一下或把链接发出去，打开的都会是清单里的第一册。
     这个参数进（start 读它）和出（切册写它）是同一个键，两边对得上。 */
  function syncBookQuery(id) {
    if (!id) return;
    var url;
    try {
      url = new URL(location.href);
    } catch (e) {
      return;
    }
    if (url.searchParams.get('book') === id) return;
    url.searchParams.set('book', id);
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }

  /* 浏览器标签上的书名（印刷 PDF 的标题也取自它）。
     换册要换标题：一直写着第一册的名字，读第二册时标签页是错的，
     印出来的那本 PDF 的书名也是错的。
     标题的后半截按**显示方式**走（印刷版 / 拼版），屏幕版用该册的副标题——
     每个入口在 <body> 上用 data-title-mode 说明自己是谁。 */
  function syncTitle(id) {
    var el = document.getElementById('books-manifest');
    var books = [];
    try {
      books = JSON.parse(el ? el.textContent : '[]') || [];
    } catch (e) {
      books = [];
    }
    for (var k = 0; k < books.length; k++) {
      if (books[k].id !== id) continue;
      var mode = document.body.getAttribute('data-title-mode') || 'subtitle';
      var sub = mode === 'subtitle' ? books[k].subtitle || '' : mode;
      document.title = sub ? books[k].title + '｜' + sub : books[k].title;
      return;
    }
  }

  function currentPageId() {
    var p = pages[current];
    return p ? p.getAttribute('data-id') : null;
  }

  function announce() {
    var live = document.getElementById('live');
    if (!live) return;
    live.textContent = pages[current].getAttribute('aria-label') || '';
  }

  function notifyChange() {
    for (var i = 0; i < changeListeners.length; i++) {
      changeListeners[i](current, pages.length);
    }
  }

  function show(i) {
    if (!pages.length) return;
    var n = Math.max(0, Math.min(pages.length - 1, i));
    for (var k = 0; k < allPages.length; k++) {
      allPages[k].classList.toggle('is-active', k >= 0 && allPages[k] === pages[n]);
    }
    current = n;
    var id = pages[current].getAttribute('data-id');
    /* 换页：上一页还在计时的效果、还没兑现的翻页请求，都作废 */
    clearPending();
    clearQueued();
    if (id && location.hash.slice(1) !== id) {
      history.replaceState(null, '', '#' + id);
    }
    /* 进入页面时把这一页的互动计数清零：读者会走回头路（p29 摸噜啵、p62 再读一次
       都会跳回 p05 重读），不清零的话第二遍读到"按顺序点三样"就会永远卡住。 */
    if (global.BookInteractions && global.BookInteractions.reset) {
      global.BookInteractions.reset(pages[current]);
    }
    /* 这一页自己的音效：页面数据里写了 sound 就播出来（大字拟声词的声音）。
       以前只有互动动作有声音，这一层是空的——data-sound 写进了 DOM 却没人读它，
       全书的拟声词从来没响过。 */
    var pageSound = pages[current].getAttribute('data-sound');
    if (pageSound) global.AudioBook.play(pageSound);
    announce();
    notifyChange();
  }

  function next() {
    if (isStatic()) return;
    if (current >= pages.length - 1) return;
    show(current + 1);
  }

  function prev() {
    if (isStatic()) return;
    if (current <= 0) return;
    show(current - 1);
  }

  /* 翻页节流：最短 350 ms 翻一页，防止一帧里跳两页。
     以前是"锁住就丢掉"——孩子连点六下只有两下有反应，另外四下"点了没反应"，
     听起来就是坏的。现在锁住期间的翻页请求会被记住，锁一开就补上：
     每次点击都算数，只是最快 350 ms 一页。 */
  var LOCK_MS = 350;
  var lockUntil = 0;
  var queuedFn = null;
  var queuedTimer = null;

  function withLock(fn) {
    var now = Date.now();
    if (now < lockUntil) {
      /* 锁着：把这次翻页记下来，锁一开就补上（不丢输入） */
      queuedFn = fn;
      if (!queuedTimer) queuedTimer = setTimeout(runQueued, lockUntil - now);
      return;
    }
    lockUntil = now + LOCK_MS;
    fn();
  }

  function runQueued() {
    queuedTimer = null;
    var fn = queuedFn;
    queuedFn = null;
    if (!fn) return;
    lockUntil = Date.now() + LOCK_MS;
    fn();
  }

  /* 换页即作废还没兑现的翻页请求。
     排队中的请求是"上一页还没翻的那一下"，页面一旦换走（跳页、效果到期），
     它就该作废——否则它会在新页面上突然翻一页，把读者带去不该去的地方。 */
  function clearQueued() {
    if (queuedTimer) {
      clearTimeout(queuedTimer);
      queuedTimer = null;
    }
    queuedFn = null;
  }

  /* 待定计时器按页各存一个。
     以前只有一个全局计时器：上一页还没播完的效果会被下一页的点击吃掉——
     "跳过效果"变成了"跳过上一页、翻到下一页"，读起来像按钮失灵。
     存 {timer, fn} 是为了让"跳过"能执行效果本来的结局（翻页 or 回到 p05），
     而不是一律 next()。 */
  var pendingTimers = {};

  /* 计时器的键必须是页面的 data-id 字符串。
     调用方有的传页面元素（interactions.js 传的是 page 元素）、有的传 id 字符串，
     混着传会让 key 退化成 "[object HTMLDivElement]"——所有页面挤进同一个键，
     于是"这一页的效果"和"别页的效果"分不开。统一在这里归一化。 */
  function pageKey(page) {
    if (!page) return 'default';
    if (typeof page === 'string') return page;
    if (typeof page.getAttribute === 'function') {
      return page.getAttribute('data-id') || 'default';
    }
    /* 静默当成 'default' 会把所有页面挤进同一个键，计时器互相打架。
       直接报错，让人一眼看出是调用方传错了类型。 */
    throw new Error('pageKey: 期望页 id 字符串或页面元素，收到 ' + typeof page);
  }

  /* 效果进行中：计时器 + 跳过。
     page 传页面元素或 data-id 都行，内部归一化成 id。 */
  function after(ms, fn, page) {
    var key = pageKey(page);
    /* 页面开始演一个效果，就说明读者要的是这个互动，不是"翻一页"——
       排队里的翻页请求这时该作废，否则它会把这个效果腰斩
       （孩子点肚子，120ms 后就被翻到下一页，咕噜声还没演完）。 */
    clearQueued();
    if (pendingTimers[key]) clearTimeout(pendingTimers[key].timer);
    var entry = { timer: null, fn: fn };
    entry.timer = setTimeout(function () {
      delete pendingTimers[key];
      /* 到期时读者可能已经翻到别的页（走回头路，或另一页的效果还在播）。
         这时再翻页，翻的是"读者正在看的那页"——不是这个效果该去的页，
         读者会莫名其妙被翻走。页面对不上就丢弃。 */
      if (key !== 'default' && currentPageId() !== key) return;
      fn();
    }, ms);
    pendingTimers[key] = entry;
  }

  /* 跳过本页还没播完的效果：返回该效果本来的结局（没有待定效果则 false） */
  function skipPending(page) {
    var key = pageKey(page);
    var entry = pendingTimers[key];
    if (!entry) return false;
    clearTimeout(entry.timer);
    delete pendingTimers[key];
    return entry.fn;
  }

  /* 换页即作废在飞效果。
     不变量：任一时刻最多只有一个待定效果，且它一定属于读者当前所在页。
     以前换页不清计时器，读者离开后上一页的"翻页"还会继续计时；
     等他回头再进那一页，计时器到期会把他莫名翻走。 */
  function clearPending() {
    for (var k in pendingTimers) {
      if (Object.prototype.hasOwnProperty.call(pendingTimers, k)) {
        clearTimeout(pendingTimers[k].timer);
      }
    }
    pendingTimers = {};
  }

  function bind() {
    if (isStatic()) return;

    document.addEventListener('click', function (ev) {
      if (ev.target.closest('.hotspot, button, a')) return;
      var cur = pages[current];
      /* 拍一拍：点在噜啵身上，它晃一下、叫一声，然后照样翻页。
         不用逐页摆热区——点在角色上这件事，事件目标自己会告诉我们
         （点到的就是 SVG 里角色的那个 <use>），不用猜它的可见框在哪。
         多步互动的页面（trap）除外：那些页在等一个特定动作，
         点哪儿都不该翻过去。 */
      if (
        cur &&
        cur.getAttribute('data-pat') === '1' &&
        !cur.hasAttribute('data-trap') &&
        ev.target.closest &&
        ev.target.closest('.char') &&
        global.BookInteractions &&
        global.BookInteractions.pat
      ) {
        global.BookInteractions.pat(cur);
        return;
      }
      /* 多步互动的页面（按顺序点三样 / 再喂一口 / 揉肚子 / 找一找）：
         点空白不翻页，摇一下头让孩子接着来。
         以前一戳就跳页——"找一找"还会跳到"你都找到了吗？"，
         孩子一个都没找到，书却问他找到了没有。
         书页之外的留白也算（手机竖屏时书只占中间，上下都是空的）。 */
      if (cur && cur.hasAttribute('data-trap')) {
        if (global.BookInteractions && global.BookInteractions.wrong) {
          global.BookInteractions.wrong(cur);
        }
        return;
      }
      /* 跳过在飞效果与普通翻页走同一条节流通道：
         孩子点一下只该翻一页，但也不能被节流吞掉。 */
      withLock(skipPending(currentPageId()) || next);
    });

    document.addEventListener('keydown', function (ev) {
      var k = ev.key;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Enter') {
        if (ev.target.closest('button')) return;
        ev.preventDefault();
        withLock(skipPending(currentPageId()) || next);
      } else if (k === 'ArrowLeft' || k === 'PageUp') {
        ev.preventDefault();
        withLock(prev);
      } else if (k === 'Home') {
        ev.preventDefault();
        show(0);
      } else if (k === 'End') {
        ev.preventDefault();
        show(pages.length - 1);
      } else if (k === 'm' || k === 'M') {
        global.AudioBook.toggleMute();
        syncMuteButton();
      }
    });

    /* 左右滑动翻页 */
    var startX = null;
    var startY = null;
    var startOnHotspot = false;
    document.addEventListener('touchstart', function (ev) {
      if (ev.touches.length !== 1) return;
      startX = ev.touches[0].clientX;
      startY = ev.touches[0].clientY;
      /* 手势起点在热区上就别翻页：
         "揉肚子画圈"画到一半横向偏移就会超过 50px，
         被当成滑动把这一页翻走，揉肚子的戏一秒没演。 */
      startOnHotspot = !!(
        ev.target &&
        ev.target.closest &&
        ev.target.closest('.hotspot')
      );
    }, { passive: true });

    document.addEventListener('touchend', function (ev) {
      if (startX === null) return;
      var t = ev.changedTouches[0];
      var dx = t ? t.clientX - startX : 0;
      var dy = t ? t.clientY - startY : 0;
      startX = null;
      if (startOnHotspot) {
        startOnHotspot = false;
        return;
      }
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        /* 往前滑：跟点击一样，先看有没有在演的效果——
           有就让它演完（"摸噜啵回到开头"不能被一次滑动顶掉）。
           往后滑是明确的"回去看"，不跳过。 */
        if (dx < 0) {
          /* 滑过去的动静：真的书翻页是沙沙一声（点着翻页不响，手指翻才响） */
          global.AudioBook.play('paper');
          withLock(skipPending(currentPageId()) || next);
        } else {
          withLock(prev);
        }
      }
    }, { passive: true });

    global.addEventListener('hashchange', function () {
      var id = location.hash.slice(1);
      for (var k = 0; k < pages.length; k++) {
        if (pages[k].getAttribute('data-id') === id) {
          show(k);
          return;
        }
      }
    });
  }

  function syncMuteButton() {
    var btn = document.getElementById('mute');
    if (!btn) return;
    btn.setAttribute('aria-pressed', global.AudioBook.isMuted() ? 'true' : 'false');
    btn.textContent = global.AudioBook.isMuted() ? '🔇' : '🔊';
  }

  function start() {
    /* 选册：地址栏 ?book=<册 id> 优先，否则用清单里的第一册。
       页码在册内独立，所以「哪一册」必须单独带——
       只留 #p31 的话，打开的是哪一册说不清。
       放在最前面：拼版（static）与印刷版也要按册过滤，
       否则两册的页面会拼在一起印。 */
    var ids = [];
    for (var b = 0; b < allPages.length; b++) {
      var bid = allPages[b].getAttribute('data-book');
      if (bid && ids.indexOf(bid) < 0) ids.push(bid);
    }
    var wanted = '';
    try {
      wanted = new URLSearchParams(location.search).get('book') || '';
    } catch (e) {
      wanted = '';
    }
    if (!wanted || ids.indexOf(wanted) < 0) wanted = ids[0] || '';
    if (wanted) {
      setBookPages(wanted);
      document.body.setAttribute('data-book', wanted);
    }

    /* ?static=1：全部页面平铺，用于联系表与逐页截图 */
    if ((location.search || '').indexOf('static=1') >= 0) {
      document.body.classList.add('static');
      return;
    }

    /* 印刷版不需要交互 */
    if (document.body.classList.contains('print')) return;

    /* 屏幕版：地址栏写明是哪一册。
       拼版（static）是联系表，两册都摊开，写册 id 反而误导；印刷版的册是
       由链接里的 ?book= 决定的（外壳切模式时带上），不用在这里改地址栏。 */
    syncBookQuery(wanted);

    var id = location.hash.slice(1);
    /* 找起始页，然后**只调一次** show()。
       以前是 show(k) 之后又 show(current)——地址栏带 #pXX 打开时，
       这一页的进场音效会响两遍（同时），页面状态也被复位两次。 */
    var start = 0;
    for (var k = 0; k < pages.length; k++) {
      if (pages[k].getAttribute('data-id') === id) {
        start = k;
        break;
      }
    }
    show(start);

    var mute = document.getElementById('mute');
    if (mute) {
      mute.addEventListener('click', function (ev) {
        ev.stopPropagation();
        global.AudioBook.unlock();
        global.AudioBook.toggleMute();
        syncMuteButton();
      });
      syncMuteButton();
    }

    /* 封面/首屏的第一次点击解锁音频 */
    document.addEventListener('pointerdown', function () {
      global.AudioBook.unlock();
    }, { once: true });

    /* 键盘也要能解锁：只用键盘读书的孩子不点屏幕，
       pointerdown 永远不来，音频上下文就一直是挂起的——整本书没有声音。
       方向键/回车/空格都算一次用户手势。 */
    document.addEventListener('keydown', function () {
      global.AudioBook.unlock();
    }, { once: true });

    bind();
  }

  global.Book = {
    pages: pages,
    next: next,
    prev: prev,
    show: show,
    after: after,
    skipPending: skipPending,
    /* 带节流的翻页：最短 350 ms 一页，但期间的请求会被记住而不是丢掉 */
    turn: withLock,
    goToId: function (id, book) {
      /* 页码在册内独立：两册都有 p05，只给页码会跳到**当前册**的那一页。
         带册 id 进来时先切册——检查脚本要按册逐页量，量错册等于没量。 */
      if (book && book !== activeBook) {
        setBookPages(book);
        document.body.setAttribute('data-book', book);
      }
      for (var k = 0; k < pages.length; k++) {
        if (pages[k].getAttribute('data-id') === id) {
          show(k);
          return;
        }
      }
    },
    /* 切册：一册 = 一本书 = 64 页。切过去回到那一册的第一页。 */
    setBook: function (id) {
      if (!id || id === activeBook) return false;
      setBookPages(id);
      document.body.setAttribute('data-book', id);
      syncBookQuery(id);
      show(0);
      return true;
    },
    book: function () {
      return activeBook;
    },
    books: function () {
      var ids = [];
      for (var k = 0; k < allPages.length; k++) {
        var b = allPages[k].getAttribute('data-book');
        if (b && ids.indexOf(b) < 0) ids.push(b);
      }
      return ids;
    },
    current: function () {
      return current;
    },
    /* 选页器用：当前页的序号（从 0 起） */
    currentIndex: function () {
      return current;
    },
    /* 选页器用：直接跳到第 i 页（从 0 起）。
       跳页不经过 350ms 的翻页节流——那节流是防"一帧里跳两页"的，
       而选页是读者明确指定的一个目标，不是连点。 */
    goToIndex: function (i) {
      show(i);
    },
    /* 换页通知：fn(当前页序号, 总页数) */
    onChange: function (fn) {
      if (typeof fn === 'function') changeListeners.push(fn);
    },
    page: function () {
      return pages[current];
    },
    /* 诊断用：还有哪些页面的效果在计时。
       正常情况下最多一个，而且必定是读者当前所在页——
       这条不变量破了，说明换页没作废在飞效果。 */
    pendingPages: function () {
      return Object.keys(pendingTimers);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})(window);
