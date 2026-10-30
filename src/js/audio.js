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
    if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
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
        /* 音频出问题也不该挡住翻页 */
      }
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
