/* 《啊呜噜啵！》页面状态机：翻页、导航、朗读播报。
   页面切换规则见设计规格 §7.5；键盘与无障碍见 §7.9。 */
(function (global) {
  'use strict';

  var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
  var current = 0;

  function isStatic() {
    return document.body.classList.contains('static');
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

  function show(i) {
    if (!pages.length) return;
    var n = Math.max(0, Math.min(pages.length - 1, i));
    for (var k = 0; k < pages.length; k++) {
      pages[k].classList.toggle('is-active', k === n);
    }
    current = n;
    var id = pages[current].getAttribute('data-id');
    /* 换页：上一页还在计时的效果、还没兑现的翻页请求，都作废 */
    clearPending();
    clearQueued();
    if (id && location.hash.slice(1) !== id) {
      history.replaceState(null, '', '#' + id);
    }
    /* 进入页面时把这一页的互动计数清零：读者会走回头路（p25 摸噜啵、p42 再读一次
       都会跳回 p05 重读），不清零的话第二遍读到"按顺序点三样"就会永远卡住。 */
    if (global.BookInteractions && global.BookInteractions.reset) {
      global.BookInteractions.reset(pages[current]);
    }
    /* 这一页自己的音效：页面数据里写了 sound 就播出来（大字拟声词的声音）。
       以前只有互动动作有声音，这一层是空的——data-sound 写进了 DOM 却没人读它，
       24 页的拟声词从来没响过。 */
    var pageSound = pages[current].getAttribute('data-sound');
    if (pageSound) global.AudioBook.play(pageSound);
    announce();
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
    /* ?static=1：全部页面平铺，用于联系表与逐页截图 */
    if ((location.search || '').indexOf('static=1') >= 0) {
      document.body.classList.add('static');
      return;
    }
    /* 印刷版不需要交互 */
    if (document.body.classList.contains('print')) return;

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
    goToId: function (id) {
      for (var k = 0; k < pages.length; k++) {
        if (pages[k].getAttribute('data-id') === id) {
          show(k);
          return;
        }
      }
    },
    current: function () {
      return current;
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
