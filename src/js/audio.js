/* 《啊呜噜啵！》音效：全部用 Web Audio 合成，不用任何音频文件。
   音色表见设计规格 §14.6：gulu / chomp / burp / snore / pop。 */
(function (global) {
  'use strict';

  var ctx = null;
  var master = null;
  var muted = false;

  function ensure() {
    if (!ctx) {
      var AC = global.AudioContext || global.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.25;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended' && ctx.resume) {
      var resumed = ctx.resume();
      /* 没有用户手势时 Safari 会拿 NotAllowedError 拒绝这个 promise：
         不接住就是一个未处理的 rejection（控制台红字）。
         拒绝就拒绝——等读者真的点了屏幕，下一次 ensure() 会再试。 */
      if (resumed && typeof resumed.catch === 'function') {
        resumed.catch(function () {});
      }
    }
    return ctx;
  }

  function noiseBuffer(seconds) {
    var len = Math.max(1, Math.floor(ctx.sampleRate * seconds));
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  /* 把一个节点接到带包络的增益上，再接到主音量 */
  function envelope(node, t, peak, dur) {
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    node.connect(g);
    g.connect(master);
    return g;
  }

  var recipes = {
    /* 咕噜——：90 Hz 正弦 + 6 Hz 颤音 */
    gulu: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(90, t);
      var lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 6;
      var lfoGain = ctx.createGain();
      lfoGain.gain.value = 20;
      lfo.connect(lfoGain);
      lfoGain.connect(o.frequency);
      envelope(o, t, 0.9, 0.6);
      o.start(t);
      o.stop(t + 0.62);
      lfo.start(t);
      lfo.stop(t + 0.62);
    },

    /* 啊呜：0.06 s 噪声 + 120→80 Hz 正弦 */
    chomp: function () {
      var t = ctx.currentTime;
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer(0.06);
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.5, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
      src.connect(g);
      g.connect(master);
      src.start(t);

      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(120, t);
      o.frequency.exponentialRampToValueAtTime(80, t + 0.15);
      envelope(o, t, 0.8, 0.15);
      o.start(t);
      o.stop(t + 0.17);
    },

    /* 嗝——啵：110→70 Hz 锯齿 + 500→150 Hz 滑音 */
    burp: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(110, t);
      o.frequency.exponentialRampToValueAtTime(70, t + 0.45);
      envelope(o, t, 0.55, 0.45);
      o.start(t);
      o.stop(t + 0.47);

      var p = ctx.createOscillator();
      p.type = 'sine';
      p.frequency.setValueAtTime(500, t + 0.3);
      p.frequency.exponentialRampToValueAtTime(150, t + 0.45);
      envelope(p, t + 0.3, 0.7, 0.15);
      p.start(t + 0.3);
      p.stop(t + 0.47);
    },

    /* 呼噜……：低通噪声 + 60 Hz 正弦 */
    snore: function () {
      var t = ctx.currentTime;
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer(1.8);
      var lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 500;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.35, t + 0.4);
      g.gain.linearRampToValueAtTime(0.0001, t + 1.8);
      src.connect(lp);
      lp.connect(g);
      g.connect(master);
      src.start(t);

      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(60, t);
      envelope(o, t, 0.5, 1.8);
      o.start(t);
      o.stop(t + 1.82);
    },

    /* 啵：600→200 Hz */
    pop: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(600, t);
      o.frequency.exponentialRampToValueAtTime(200, t + 0.1);
      envelope(o, t, 0.8, 0.1);
      o.start(t);
      o.stop(t + 0.12);
    },

    /* 啾：一声轻快的小叫（啊呜） */
    chirp: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.setValueAtTime(780, t);
      o.frequency.exponentialRampToValueAtTime(1240, t + 0.1);
      envelope(o, t, 0.5, 0.12);
      o.start(t);
      o.stop(t + 0.14);
    },

    /* 噗噜：气泡（变蓝那页） */
    bubble: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(280, t);
      o.frequency.exponentialRampToValueAtTime(760, t + 0.22);
      envelope(o, t, 0.45, 0.25);
      o.start(t);
      o.stop(t + 0.27);
    },

    /* 闪：短促的高音（闪闪闪） */
    sparkle: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(1200, t);
      o.frequency.exponentialRampToValueAtTime(2100, t + 0.12);
      envelope(o, t, 0.4, 0.14);
      o.start(t);
      o.stop(t + 0.16);
    },

    /* 彩虹：四个音往上跑 */
    rainbow: function () {
      var t = ctx.currentTime;
      var notes = [523, 659, 784, 1046];
      for (var i = 0; i < notes.length; i++) {
        var o = ctx.createOscillator();
        o.type = 'triangle';
        o.frequency.setValueAtTime(notes[i], t + i * 0.11);
        var g = envelope(o, t + i * 0.11, 0.45, 0.16);
        o.start(t + i * 0.11);
        o.stop(t + i * 0.11 + 0.18);
      }
    },

    /* ——— 绘本常用音色 ———
       噜啵自己的动静在上面；这一组是"场景的声音"：
       翻页、拍手、铃铛、笑声、风、叹气、水花、还有动物叫。
       全部短、软、不刺耳——三岁小孩是贴着耳朵听的。 */

    /* 沙沙：翻页。噪声过带通，增益快速抖一下 */
    paper: function () {
      var t = ctx.currentTime;
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer(0.22);
      var bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 2400;
      bp.Q.value = 0.7;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.45, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      /* 纸声不是一条直线，要抖 */
      var lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 24;
      var lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.14;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      src.connect(bp);
      bp.connect(g);
      g.connect(master);
      src.start(t);
      lfo.start(t);
      lfo.stop(t + 0.24);
    },

    /* 啪：拍手。两下极短的宽带噪声 */
    clap: function () {
      var t = ctx.currentTime;
      for (var i = 0; i < 2; i++) {
        var at = t + i * 0.055;
        var s = ctx.createBufferSource();
        s.buffer = noiseBuffer(0.035);
        var hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 1100;
        var g = ctx.createGain();
        g.gain.setValueAtTime(0.55, at);
        g.gain.exponentialRampToValueAtTime(0.0001, at + 0.035);
        s.connect(hp);
        hp.connect(g);
        g.connect(master);
        s.start(at);
        s.stop(at + 0.045);
      }
    },

    /* 咚：跺脚。低频正弦下滑 + 一下闷响（纸上是看不出来的，屏幕版才听得见） */
    thud: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(150, t);
      o.frequency.exponentialRampToValueAtTime(45, t + 0.18);
      envelope(o, t, 0.9, 0.26);
      o.start(t);
      o.stop(t + 0.28);

      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer(0.05);
      var lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 400;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.4, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      src.connect(lp);
      lp.connect(g);
      g.connect(master);
      src.start(t);
      src.stop(t + 0.06);
    },

    /* 弹：弹簧/果冻。滑下去再弹回来 */
    boing: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.setValueAtTime(520, t);
      o.frequency.exponentialRampToValueAtTime(120, t + 0.12);
      o.frequency.exponentialRampToValueAtTime(430, t + 0.32);
      envelope(o, t, 0.5, 0.34);
      o.start(t);
      o.stop(t + 0.36);
    },

    /* 呼：一阵风。带通中心频率扫上去再扫下来 */
    whoosh: function () {
      var t = ctx.currentTime;
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer(0.5);
      var bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.Q.value = 1.4;
      bp.frequency.setValueAtTime(400, t);
      bp.frequency.exponentialRampToValueAtTime(2200, t + 0.18);
      bp.frequency.exponentialRampToValueAtTime(300, t + 0.5);
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.38, t + 0.16);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      src.connect(bp);
      bp.connect(g);
      g.connect(master);
      src.start(t);
    },

    /* 噗：魔法消失。低通噪声一路下滑 */
    poof: function () {
      var t = ctx.currentTime;
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer(0.25);
      var lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(1800, t);
      lp.frequency.exponentialRampToValueAtTime(220, t + 0.25);
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.5, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      src.connect(lp);
      lp.connect(g);
      g.connect(master);
      src.start(t);
    },

    /* 叮：铃铛。基频加两个泛音，尾巴拖长 */
    ding: function () {
      var t = ctx.currentTime;
      var partials = [1046, 2093, 3139];
      for (var i = 0; i < partials.length; i++) {
        var o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = partials[i];
        envelope(o, t, 0.5 / (i + 1), 1.1 - i * 0.25);
        o.start(t);
        o.stop(t + 1.2);
      }
    },

    /* 咯咯笑：四声短"哈"，一个比一个高 */
    giggle: function () {
      var t = ctx.currentTime;
      for (var i = 0; i < 4; i++) {
        var at = t + i * 0.07;
        var o = ctx.createOscillator();
        o.type = 'triangle';
        o.frequency.setValueAtTime(300 + i * 45, at);
        envelope(o, at, 0.18, 0.06);
        o.start(at);
        o.stop(at + 0.08);
      }
    },

    /* 叹气：气往下走 */
    sigh: function () {
      var t = ctx.currentTime;
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer(0.7);
      var lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(900, t);
      lp.frequency.exponentialRampToValueAtTime(220, t + 0.7);
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.26, t + 0.12);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
      src.connect(lp);
      lp.connect(g);
      g.connect(master);
      src.start(t);
    },

    /* 吸溜：吸一口。音高上滑 + 一点气声 */
    slurp: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(180, t);
      o.frequency.exponentialRampToValueAtTime(620, t + 0.28);
      envelope(o, t, 0.38, 0.3);
      o.start(t);
      o.stop(t + 0.32);
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer(0.3);
      var bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 900;
      bp.Q.value = 2;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.16, t + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      src.connect(bp);
      bp.connect(g);
      g.connect(master);
      src.start(t);
    },

    /* 咔嚓：咬一口。三声越来越亮的碎响 */
    crunch: function () {
      var t = ctx.currentTime;
      for (var i = 0; i < 3; i++) {
        var at = t + i * 0.045;
        var s = ctx.createBufferSource();
        s.buffer = noiseBuffer(0.03);
        var bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 1800 + i * 700;
        bp.Q.value = 3;
        var g = ctx.createGain();
        g.gain.setValueAtTime(0.45, at);
        g.gain.exponentialRampToValueAtTime(0.0001, at + 0.03);
        s.connect(bp);
        bp.connect(g);
        g.connect(master);
        s.start(at);
        s.stop(at + 0.04);
      }
    },

    /* 哗啦：水花。高通噪声 + 抖动的增益 */
    splash: function () {
      var t = ctx.currentTime;
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer(0.4);
      var hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 700;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.4, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      var lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 18;
      var lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.12;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      src.connect(hp);
      hp.connect(g);
      g.connect(master);
      src.start(t);
      lfo.start(t);
      lfo.stop(t + 0.42);
    },

    /* 吱：小玩具/小老鼠。高一点的滑音 */
    squeak: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(900, t);
      o.frequency.exponentialRampToValueAtTime(1600, t + 0.08);
      o.frequency.exponentialRampToValueAtTime(700, t + 0.2);
      var lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 2600;
      o.connect(lp);
      envelope(lp, t, 0.3, 0.22);
      o.start(t);
      o.stop(t + 0.24);
    },

    /* 喵：猫。两段滑音 + 一点颤 */
    meow: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(520, t);
      o.frequency.linearRampToValueAtTime(760, t + 0.12);
      o.frequency.linearRampToValueAtTime(430, t + 0.42);
      var lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 22;
      var lfoGain = ctx.createGain();
      lfoGain.gain.value = 40;
      lfo.connect(lfoGain);
      lfoGain.connect(o.frequency);
      var lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 2200;
      o.connect(lp);
      envelope(lp, t, 0.32, 0.45);
      o.start(t);
      o.stop(t + 0.47);
      lfo.start(t);
      lfo.stop(t + 0.47);
    },

    /* 汪：狗。两声短促的下滑 */
    woof: function () {
      var t = ctx.currentTime;
      for (var i = 0; i < 2; i++) {
        var at = t + i * 0.16;
        var o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(320, at);
        o.frequency.exponentialRampToValueAtTime(150, at + 0.13);
        var lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 1400;
        o.connect(lp);
        envelope(lp, at, 0.38, 0.14);
        o.start(at);
        o.stop(at + 0.16);
      }
    },

    /* 哞：牛。长音，带颤 */
    moo: function () {
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(150, t);
      o.frequency.linearRampToValueAtTime(132, t + 0.5);
      var lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 5;
      var lfoGain = ctx.createGain();
      lfoGain.gain.value = 8;
      lfo.connect(lfoGain);
      lfoGain.connect(o.frequency);
      var lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 900;
      o.connect(lp);
      envelope(lp, t, 0.34, 0.75);
      o.start(t);
      o.stop(t + 0.78);
      lfo.start(t);
      lfo.stop(t + 0.78);
    }
  };

  global.AudioBook = {
    unlock: ensure,
    play: function (name) {
      if (muted) return;
      if (!ensure()) return;
      var fn = recipes[name];
      if (!fn) return;
      try {
        fn();
      } catch (e) {
        /* 音频出问题也不该挡住翻页——但要留个痕，
           否则音色写错了永远没人知道（页面上只是"没声音"）。 */
        if (global.console && console.warn) console.warn('音效出错：' + name, e);
      }
    },
    /* 测试用：放一个音色，量它的峰值。
       音色有可能接错节点而"不报错、只是没声音"——
       页面上听不出来，但这里量得到：静音的音色峰值是 0。 */
    probe: function (name, ms) {
      if (!ensure()) return Promise.resolve(0);
      var fn = recipes[name];
      if (!fn) return Promise.resolve(0);
      var analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      /* 量信号，但不把它再放一遍。
         以前 analyser 直接接到 ctx.destination，于是同一个声音走了两条路
         （master→destination 和 master→analyser→destination）——听着是双份，
         而主音量已经是 0.25，双份就变响，测出来的音色跟实际听见的对不上。
         现在 analyser 后面接一个增益为 0 的哑节点：图照样被拉动
         （AnalyserNode 不接到终点就不出数据），但这条路不出声。 */
      var silent = ctx.createGain();
      silent.gain.value = 0;
      master.connect(analyser);
      analyser.connect(silent);
      silent.connect(ctx.destination);
      var buf = new Float32Array(analyser.fftSize);
      var peak = 0;
      var started = Date.now();
      var windowMs = ms || 300;
      function detach() {
        /* 无论从哪条路出来，这条旁路都得拆掉：
           漏拆的话，量过的音色从此一直双份，后面的测试全被污染。 */
        try {
          master.disconnect(analyser);
          analyser.disconnect();
          silent.disconnect();
        } catch (e) {
          /* 断开失败不影响结论 */
        }
      }
      try {
        fn();
      } catch (e) {
        detach();
        return Promise.resolve(0);
      }
      return new Promise(function (resolve) {
        function tick() {
          analyser.getFloatTimeDomainData(buf);
          for (var i = 0; i < buf.length; i++) {
            var v = buf[i] < 0 ? -buf[i] : buf[i];
            if (v > peak) peak = v;
          }
          if (Date.now() - started < windowMs) {
            setTimeout(tick, 25);
          } else {
            detach();
            resolve(peak);
          }
        }
        tick();
      });
    },
    /* 音色清单（测试与文档用） */
    names: function () {
      return Object.keys(recipes);
    },
    toggleMute: function () {
      muted = !muted;
      return muted;
    },
    isMuted: function () {
      return muted;
    }
  };
})(window);
