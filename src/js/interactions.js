/* 《啊呜噜啵！》互动：热点 → 反馈 → 翻页。
   互动表见设计规格 §7.6：每页一个动作，互动只做庆祝性反馈，不做分支。 */
(function (global) {
  'use strict';

  /* 每页的临时计数（喂了三样、吃了几口、找到几个）。
     读者会走回头路：p25 摸噜啵、p42 再读一次，都会跳回 p05 重读一遍。
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
     读者会走回头路：p25 摸噜啵、p42 再读一次，都会跳回 p05 重读一遍。
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

    /* 飞、转圈、跺脚都会改角色的 transform 属性：
       回头再进这一页，它得回到原来的位置——
       不然它就停在"飞到一半"的地方，看着像坏了。
       原始位置由渲染器写在 data-base-transform 上。 */
    var based = page.querySelector('.char[data-base-transform]');
    if (based) {
      based.setAttribute('transform', based.getAttribute('data-base-transform'));
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

    /* 数一数：数字与"数过了"的痕迹都要复位。
       不复位的话，回头再进这一页，数字已经全亮着——数一遍就翻页，没法再数。 */
    var nums = page.querySelectorAll('.number.is-on');
    for (var n2 = 0; n2 < nums.length; n2++) {
      nums[n2].classList.remove('is-on');
    }
    var counted = page.querySelectorAll('.count-item.is-counted');
    for (var c = 0; c < counted.length; c++) {
      counted[c].classList.remove('is-counted');
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

  /* 拍一拍：点在噜啵身上 → 它晃一下、叫一声 → 照样翻页。
     孩子最先戳的就是它。不回应的话，它在全书都只是一张贴图——
     "点它有反应"这件事，只在喂食那几页成立。
     翻页照旧：点了有反应、页也翻了，孩子不会觉得卡住。 */
  function pat(page) {
    global.AudioBook.play('boing');
    wobble(page);
    global.Book.after(450, function () {
      global.Book.next();
    }, page);
  }

  global.BookInteractions = { reset: reset, wrong: wrong, pat: pat };

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

  /* 每样东西有自己的声音：苹果咔嚓、小鱼哗啦、星星叮一声。
     喂食、找一找、点三样都用它——孩子点的是那个东西，
     响的就该是那个东西的声音，不是统一的"啊呜"。 */
  function thingSound(target) {
    if (target === 'apple') return 'crunch';
    if (target === 'fish') return 'splash';
    if (target === 'star') return 'ding';
    return 'chirp';
  }

  /* —— 角色动起来的那几页（飞 / 转圈 / 跺脚 / 蹦一下）——
     角色的位置写在 SVG 的 transform 属性上（translate + scale）。
     CSS 的 transform 一设就把那个属性整个顶掉，角色会跳回原点，
     所以这里改的是**属性本身**，而且逐帧改。 */

  /* 系统开了"减少动态效果"就别做位移动画（一步到位到结果） */
  function reducedMotion() {
    return (
      typeof global.matchMedia === 'function' &&
      global.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /* 角色的原始位置：translate + scale，从 data-base-transform 读 */
  function charBase(char) {
    var raw = char.getAttribute('data-base-transform') || '';
    var m = raw.match(/translate\(([-\d.]+),\s*([-\d.]+)\)\s*scale\(([-\d.]+)\)/);
    if (!m) return null;
    return { tx: parseFloat(m[1]), ty: parseFloat(m[2]), sc: parseFloat(m[3]) };
  }

  /* 角色在自己那 1000×1000 的画布里，中心在哪儿。
     旋转必须绕自己的中心转：绕页面原点转会把角色甩到角落里。 */
  function charCenter(char) {
    try {
      var b = char.getBBox();
      if (b && b.width > 0) return [b.x + b.width / 2, b.y + b.height / 2];
    } catch (e) {
      /* 页面还没显示时 getBBox 会抛，忽略 */
    }
    return [500, 500];
  }

  /* 逐帧改角色的 transform 属性 */
  function tweenChar(char, duration, frame) {
    if (reducedMotion()) {
      frame(1);
      return;
    }
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      frame(t);
      if (t < 1) global.requestAnimationFrame(step);
    }
    global.requestAnimationFrame(step);
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
      /* 同一套动作，两种声音：
         p05 是"肚子饿了"的咕噜；p16 是"越吃越圆"，身子弹一下（果冻声）。 */
      if (page.getAttribute('data-id') === 'p16') {
        global.AudioBook.play('boing');
      } else {
        global.AudioBook.play('gulu');
      }
      wobble(page);
      global.Book.after(750, function () {
        global.Book.next();
      }, page);
    },

    /* 点食物：食物自己的声音 + 飞进嘴 → 翻页 */
    feed: function (page, target) {
      global.AudioBook.play(thingSound(target));
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
      global.AudioBook.play(thingSound(target));
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
      global.AudioBook.play(thingSound(target));
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

    /* 数一数：点一个苹果，旁边的数字就冒出来；数满三个才翻页。
       数字藏在这个数的位置上（num-1/num-2/num-3），不是一张统一的字条——
       这样"数到第三个"在画面上是看得见的。 */
    count: function (page, target, btn) {
      var index = btn ? parseInt(btn.getAttribute('data-index') || '0', 10) : 0;
      if (!index) return;
      var num = page.querySelector('.num-' + index);
      if (num && num.classList.contains('is-on')) {
        /* 已经数过这个了：再点一下不重复数（否则数字会跳着来） */
        global.AudioBook.play('pop');
        return;
      }
      var n = bump(page);
      clearMisses(page);
      global.AudioBook.play('chirp');
      if (num) num.classList.add('is-on');
      var item = page.querySelectorAll('.count-item')[index - 1];
      if (item) {
        item.classList.remove('is-counted');
        void item.getBoundingClientRect();
        item.classList.add('is-counted');
      }
      if (n >= 3) {
        /* 数对了：鼓个掌——给的是大人的鼓励声，不是机器人的 */
        global.AudioBook.play('clap');
        global.Book.after(700, function () {
          global.Book.next();
        }, page);
      }
    },

    /* 飞：彩纸把它送到天上以后，点它，它横着飞过天空。
       全书唯一一次「它自己在动」——p20 那句"送到天上啦"就在这一页兑现，
       不另起一页：另起一页的话，承诺和兑现之间还隔着"玩累了""晚安"，
       孩子的注意力早就跟不上了。 */
    fly: function (page) {
      global.AudioBook.play('whoosh');
      var char = page.querySelector('.char');
      var base = char && charBase(char);
      if (char && base) {
        tweenChar(char, 900, function (t) {
          var x = base.tx + 660 * t;
          var y = base.ty - 210 * Math.sin(t * Math.PI);
          char.setAttribute(
            'transform',
            'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ') scale(' + base.sc + ')'
          );
        });
      }
      global.Book.after(950, function () {
        global.Book.next();
      }, page);
    },

    /* 拍手：它拍一下手，啪一声。孩子跟着拍。 */
    clap: function (page) {
      global.AudioBook.play('clap');
      wobble(page);
      global.Book.after(800, function () {
        global.Book.next();
      }, page);
    },

    /* 转圈：它原地转一圈，呼—— */
    spin: function (page) {
      global.AudioBook.play('whoosh');
      var char = page.querySelector('.char');
      var base = char && charBase(char);
      if (char && base) {
        var c = charCenter(char);
        tweenChar(char, 800, function (t) {
          var deg = (360 * t).toFixed(1);
          char.setAttribute(
            'transform',
            'translate(' + base.tx + ',' + base.ty + ') scale(' + base.sc + ') rotate(' + deg + ',' + c[0] + ',' + c[1] + ')'
          );
        });
      }
      global.Book.after(850, function () {
        global.Book.next();
      }, page);
    },

    /* 跺脚：它往下一沉，地面跟着颤一下。
       纸上是看不出震的，屏幕版才有——所以这一页一定要在屏幕上试。 */
    stomp: function (page) {
      global.AudioBook.play('thud');
      var char = page.querySelector('.char');
      var base = char && charBase(char);
      if (char && base) {
        tweenChar(char, 420, function (t) {
          /* 前 35% 砸下去，之后弹回来 */
          var dip = t < 0.35 ? t / 0.35 : 1 - (t - 0.35) / 0.65;
          var y = base.ty + 70 * dip;
          var sc = base.sc * (1 + 0.12 * dip);
          char.setAttribute(
            'transform',
            'translate(' + base.tx + ',' + y.toFixed(1) + ') scale(' + sc.toFixed(3) + ')'
          );
        });
      }
      if (!reducedMotion() && typeof page.animate === 'function') {
        page.animate(
          [
            { translate: '0 0' },
            { translate: '7px -5px' },
            { translate: '-6px 4px' },
            { translate: '3px -2px' },
            { translate: '0 0' },
          ],
          { duration: 340, easing: 'ease-in-out' }
        );
      }
      global.Book.after(820, function () {
        global.Book.next();
      }, page);
    },

    /* 喊它：喊一声，回声荡开；喊满三声，它才听见。
       喊不够就不翻页：翻过去就错过了"它听见了"这一拍。 */
    shout: function (page) {
      var n = bump(page);
      global.AudioBook.play('chirp');
      clearMisses(page);
      /* 回声：拟声词放大又淡出去——孩子要看见自己的声音有回音 */
      var s = page.querySelector('.sound');
      if (s && !reducedMotion() && typeof s.animate === 'function') {
        s.animate(
          [
            { opacity: 1, scale: 1 },
            { opacity: 0.2, scale: 1.7 },
          ],
          { duration: 700, easing: 'ease-out' }
        );
      }
      if (n >= 3) {
        global.Book.after(700, function () {
          global.Book.next();
        }, page);
      }
    },

    /* 它看见你：它蹦一下，笑着说。 */
    seen: function (page) {
      global.AudioBook.play('giggle');
      var char = page.querySelector('.char');
      var base = char && charBase(char);
      if (char && base) {
        tweenChar(char, 600, function (t) {
          var hop = Math.sin(t * Math.PI);
          var y = base.ty - 90 * hop;
          var sc = base.sc * (1 + 0.1 * hop);
          char.setAttribute(
            'transform',
            'translate(' + base.tx + ',' + y.toFixed(1) + ') scale(' + sc.toFixed(3) + ')'
          );
        });
      }
      global.Book.after(800, function () {
        global.Book.next();
      }, page);
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
    fn(page, target, btn);
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
