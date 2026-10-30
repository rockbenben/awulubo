/* 《啊呜噜啵！》互动：热点 → 反馈 → 翻页。
   互动表见设计规格 §7.6：每页一个动作，互动只做庆祝性反馈，不做分支。 */
(function (global) {
  'use strict';

  /* 每页的临时计数（喂了三样、吃了几口、找到几个）。
     读者会走回头路：p25 摸噜啵、p30 再读一次，都会跳回 p05 重读一遍。
     所以**进入某页时要把这页的计数清零**，否则第二遍读到这里时，
     计数已经满了，"按顺序点三样"会因为顺序对不上而永远卡住。 */
  var counters = {};

  /* 点错次数**单独记**，不能混进 counters：
     p13 的"按顺序点三样"、p15 的"喂三口"都共用 counters，
     点错一下就把顺序挤偏——孩子的第一次正确点击会被判成"顺序错了"（摇头、苹果不吃）。 */
  var misses = {};

  function missCount(page) {
    var id = page.getAttribute('data-id');
    if (misses[id] === undefined) misses[id] = 0;
    return misses[id];
  }

  /* 有进展就清零：点错是"连续"的，中间隔了一次正确操作就不算连着错 */
  function clearMisses(page) {
    misses[page.getAttribute('data-id')] = 0;
  }

  function countOf(page) {
    var id = page.getAttribute('data-id');
    if (counters[id] === undefined) counters[id] = 0;
    return counters[id];
  }

  function bump(page) {
    var id = page.getAttribute('data-id');
    counters[id] = countOf(page) + 1;
    return counters[id];
  }

  /* 进入页面时把这一页的互动状态复位。
     读者会走回头路：p25 摸噜啵、p30 再读一次，都会跳回 p05 重读一遍。
     所以**进入某页时要把这页的计数清零**，否则第二遍读到这里时，
     计数已经满了，"按顺序点三样"会因为顺序对不上而永远卡住。
     同理，这一页"已经演出过的效果"也要复位：p23 的灯变暗、p19 的彩纸开花、
     p17 的螺旋角度、p15 的越吃越圆——不复位的话，读者第二次进来会看到
     "效果已经演过了"的样子：点月亮没反应、点肚子直接就翻页，看起来像坏了。 */
  function reset(page) {
    counters[page.getAttribute('data-id')] = 0;
    clearMisses(page);
    page.removeAttribute('data-found');

    /* 页面级的效果状态 */
    page.classList.remove('is-dim', 'is-bloom');

    /* 揉肚子的螺旋：累计角度归零，转回原位 */
    var spiral = page.querySelector('.spiral');
    if (spiral) {
      spiral.dataset.deg = '0';
      spiral.style.transform = '';
      spiral.classList.remove('is-rubbing');
    }

    /* 越吃越圆：缩放回到基准值（基准写在 data-base-scale 上） */
    var scaled = page.querySelectorAll('[data-base-scale]');
    for (var i = 0; i < scaled.length; i++) {
      var el = scaled[i];
      var base = parseFloat(el.getAttribute('data-base-scale'));
      var t = el.getAttribute('transform') || '';
      if (isNaN(base) || !/scale\([\d.]+\)/.test(t)) continue;
      el.setAttribute('transform', t.replace(/scale\([\d.]+\)/, 'scale(' + base + ')'));
    }

    /* 道具复原：被吃掉/被找到的道具会停在 10% 不透明度。
       不复位的话，回头重进这一页时它们还是"已经没了"的样子，
       提示却还在让人点它们（p13 的三样、p27 的三样都这样）。 */
    var flown = page.querySelectorAll('.is-flying');
    for (var f = 0; f < flown.length; f++) {
      flown[f].classList.remove('is-flying');
    }

    /* 揉肚子的手势在进页面时就绑好。
       以前是第一次 click 才绑——那一击的 pointerdown/pointerup 已经过去了，
       所以第一下点完什么都没发生，孩子要戳第二下才看到螺旋转。 */
    var rub = page.querySelector('.hotspot[data-action="rub"]');
    if (rub) bindRub(page, rub);
  }

  /* 点错地方：摇一下头，让孩子接着找。
     规格 §7.6「找一找：点对计数发音，点错摇头」。
     以前点错会直接落到"翻页"逻辑上：多步互动的页面（按顺序点三样 / 再喂一口 /
     揉肚子 / 找一找）被一戳跳过，"找一找"更是直接跳到"你都找到了吗？"——
     孩子一个都没找到，书却问他找到了没有。
     标了 trap 的页面：点空白（书页内外都算）不翻页，只摇一下头。 */
  function wrong(page) {
    global.AudioBook.play('pop');
    shake(page);
    /* 连着点错 5 下就放人走——别把人困在这一页。
       这里原来挂了个 600 ms 计时器，继续点就把计时器一直顶掉，
       于是"点错 5 次就翻页"永远不触发，这一页就成了死路。
       现在直接翻，不留计时器。 */
    var id = page.getAttribute('data-id');
    misses[id] = missCount(page) + 1;
    if (misses[id] < 5) return;
    misses[id] = 0;
    global.Book.next();
  }

  global.BookInteractions = { reset: reset, wrong: wrong };

  function wobble(page) {
    var char = page.querySelector('.char');
    if (!char) return;
    char.classList.remove('is-wobble');
    void char.getBoundingClientRect(); /* 重新触发动画 */
    char.classList.add('is-wobble');
  }

  function fly(page, target) {
    var el = page.querySelector('.prop-' + target);
    if (!el) return;
    el.classList.remove('is-flying');
    void el.getBoundingClientRect();
    el.classList.add('is-flying');
  }

  /* 吃掉的道具要回来。
     p15 要连喂三口：第一口之后苹果就停在 10% 不透明度、缩成 1/4，看不见了，
     可提示还写着"再喂一口！"——孩子面前没有东西可喂，只能去戳那颗不能点的星星，
     一戳就翻页，"越吃越圆"这场戏没了。喂完一口就把道具放回原位。 */
  function restoreProp(page, target, delay) {
    var el = page.querySelector('.prop-' + target);
    if (!el) return;
    setTimeout(function () {
      el.classList.remove('is-flying');
    }, delay || 720);
  }

  function popConfetti(page) {
    /* 彩纸变淡，小花从彩纸里冒出来（CSS 负责淡入淡出） */
    page.classList.add('is-bloom');
  }

  function shake(page) {
    var char = page.querySelector('.char');
    if (!char) return;
    char.classList.remove('is-shake');
    void char.getBoundingClientRect();
    char.classList.add('is-shake');
  }

  /* 揉肚子：在肚子上画圈，螺旋跟着转。
     绑定只做一次——重复绑定会让每次画圈的转角被叠加 N 倍，螺旋越转越快。
     **判定放在手势结束时做，不靠 click**：触屏上拖动画圈不会产生 click，
     只在 click 里判定的话，平板/手机上的孩子永远过不了这一关。 */
  function bindRub(page, hotspot) {
    var spiral = page.querySelector('.spiral');
    if (!spiral || spiral.dataset.rubBound === '1') return;
    spiral.dataset.rubBound = '1';

    /* 旋转中心就用触点（触点正落在肚子上），
       不用猜螺旋在角色局部坐标里的位置——那会让中心随角色摆放而偏。 */
    function pivot() {
      var r = hotspot.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }

    function angleAt(clientX, clientY) {
      var c = pivot();
      return (Math.atan2(clientY - c.y, clientX - c.x) * 180) / Math.PI;
    }

    var last = null;
    var moved = false;

    function turnTo(deg) {
      spiral.dataset.deg = String(deg);
      spiral.style.transform = 'rotate(' + deg.toFixed(1) + 'deg)';
    }

    function endGesture() {
      if (last === null) return;
      if (!moved) {
        /* 点一下也算揉：螺旋转一格，孩子看得见反应。
           "在肚子上画个圈"是 3 岁孩子做不到的动作，连点三下的兜底不能是"点了没反应"；
           转 3 格 = 360°，正好也过"画满一圈"那关。 */
        turnTo(parseFloat(spiral.dataset.deg || '0') + 120);
      }
      last = null;
      /* 画满一圈（累计 300° 以上）就过关——在手势结束时判定，
         不依赖 click（触屏拖动没有 click）。 */
      if (Math.abs(parseFloat(spiral.dataset.deg || '0')) >= 300) {
        global.AudioBook.play('gulu');
        global.Book.after(700, function () {
          global.Book.next();
        }, page);
      }
    }

    hotspot.addEventListener('pointerdown', function (ev) {
      spiral.classList.add('is-rubbing');
      last = angleAt(ev.clientX, ev.clientY);
      moved = false;
    });
    hotspot.addEventListener('pointermove', function (ev) {
      if (last === null) return;
      var a = angleAt(ev.clientX, ev.clientY);
      if (a === null) return;
      var d = a - last;
      if (d > 180) d -= 360;
      if (d < -180) d += 360;
      if (Math.abs(d) > 0.5) moved = true;
      /* 累计角度不取模：画满一圈要能看出"转过了 300°" */
      turnTo(parseFloat(spiral.dataset.deg || '0') + d);
      last = a;
    });
    hotspot.addEventListener('pointerup', endGesture);
    hotspot.addEventListener('pointercancel', endGesture);
    /* 手势在热区外结束也要收尾：不然 last 留着陈旧的角度，
       之后只是把鼠标在肚子上晃（不按）也会累加，
       攒够 300° 后点一下就直接翻页。 */
    document.addEventListener('pointerup', endGesture);
    document.addEventListener('pointercancel', endGesture);
  }

  var actions = {
    /* 封面：解锁声音，进入本书 */
    start: function (page) {
      global.AudioBook.unlock();
      global.AudioBook.play('chirp');
      global.Book.next();
    },

    /* 点肚子：咕噜声 + 噜啵晃一下 → 翻页 */
    belly: function (page) {
      global.AudioBook.play('gulu');
      wobble(page);
      global.Book.after(750, function () {
        global.Book.next();
      }, page);
    },

    /* 点食物：啊呜声 + 食物飞进嘴 → 翻页 */
    feed: function (page, target) {
      global.AudioBook.play('chomp');
      fly(page, target);
      clearMisses(page);
      var n = bump(page);
      if (page.getAttribute('data-id') === 'p15') {
        /* 还要还要：一口一口地吃，越吃越圆。
           基准缩放取 data-base-scale（页面数据里的原值），
           不能读当前 transform——那已经是上一次改过的值，会越叠越大。 */
        var char = page.querySelector('#grow-char');
        if (char) {
          var baseScale = parseFloat(char.dataset.baseScale || '0.56');
          var scale = Math.min(baseScale + n * 0.06, baseScale + 0.18);
          var base = char.getAttribute('transform') || '';
          char.setAttribute(
            'transform',
            base.replace(/scale\([\d.]+\)/, 'scale(' + scale.toFixed(2) + ')')
          );
        }
        if (n < 3) {
          /* 还要喂：把苹果放回原位，下一口还有东西可喂 */
          restoreProp(page, target);
          return;
        }
      }
      global.Book.after(750, function () {
        global.Book.next();
      }, page);
    },

    /* 三样依次点：数 1、2、3 → 第三样后翻到彩虹页 */
    feed3: function (page, target) {
      var order = ['apple', 'fish', 'star'];
      var n = countOf(page);
      if (order[n] !== target) {
        /* 顺序不对：摇一下头，不计数 */
        shake(page);
        global.AudioBook.play('pop');
        return;
      }
      global.AudioBook.play('chomp');
      fly(page, target);
      clearMisses(page);
      bump(page);
      if (countOf(page) >= 3) {
        global.AudioBook.play('rainbow');
        global.Book.after(800, function () {
          global.Book.next();
        }, page);
      }
    },

    /* 揉肚子：螺旋跟着手指转 + 咕噜声 → 翻页到彩纸页。
       画满一圈（累计 300° 以上）与连点三下，都在手势结束时判定
       （见 bindRub）——触屏拖动不产生 click，判定不能挂在 click 上。 */
    rub: function (page) {
      global.AudioBook.play('gulu');
      clearMisses(page);
    },

    /* 点彩纸：彩纸变成小花 + 啵声 → 翻页 */
    confetti: function (page) {
      global.AudioBook.play('pop');
      popConfetti(page);
      global.Book.after(700, function () {
        global.Book.next();
      }, page);
    },

    /* 点月亮：灯光变暗 + 呼噜声 → 翻页 */
    moon: function (page) {
      global.AudioBook.play('snore');
      page.classList.add('is-dim');
      global.Book.after(800, function () {
        global.Book.next();
      }, page);
    },

    /* 摸噜啵：打哈欠 + 咕噜声 → 回到第一跨页 */
    yawn: function (page) {
      global.AudioBook.play('gulu');
      global.AudioBook.play('chirp');
      wobble(page);
      global.Book.after(800, function () {
        global.Book.goToId('p05');
      }, page);
    },

    /* 找一找：点对计数发音，点错摇一下头 */
    find: function (page, target) {
      /* 数"找到几个"，不能拿拼起来的字符串长度当数量
         （'apple' 就有 5 个字符，找到一个就会被误判成找齐了）。 */
      var found = (page.getAttribute('data-found') || '').split(',').filter(Boolean);
      if (found.indexOf(target) >= 0) {
        global.AudioBook.play('pop');
        return;
      }
      global.AudioBook.play('chirp');
      clearMisses(page);
      found.push(target);
      page.setAttribute('data-found', found.join(','));
      fly(page, target);
      if (found.length >= 3) {
        global.Book.after(700, function () {
          global.Book.next();
        }, page);
      }
    },

    /* 再读一次：转回第一跨页 */
    again: function (page) {
      global.AudioBook.play('chirp');
      global.Book.after(400, function () {
        global.Book.goToId('p05');
      }, page);
    }
  };

  function handle(ev) {
    var btn = ev.target.closest('.hotspot');
    if (!btn) return;
    ev.stopPropagation();
    ev.preventDefault();

    var page = btn.closest('.page');
    var pageId = page ? page.getAttribute('data-id') : null;

    /* 只跳过"本页"还没播完的效果：上一页残留的计时器不该吃掉这一页的点击。
       跳过时执行效果本来的结局——摸噜啵/再读一次是"回到 p05"，不是"翻下一页"。
       走 Book.turn 是为了跟空白处点击用同一套节流：孩子的点击不会被吞掉。 */
    var pending = global.Book.skipPending(pageId);
    if (pending) {
      global.Book.turn(pending);
      return;
    }

    var action = btn.getAttribute('data-action');
    var target = btn.getAttribute('data-target') || '';
    var fn = actions[action];
    if (!fn || !page) {
      global.Book.next();
      return;
    }
    if (action === 'rub') bindRub(page, btn);
    fn(page, target);
  }

  function bind() {
    document.addEventListener('click', handle, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})(window);
