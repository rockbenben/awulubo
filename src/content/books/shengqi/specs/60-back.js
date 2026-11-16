/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "pages": [
    {
      "id": "p60",
      "template": "t-plain",
      "screen": false,
      "noSound": true,
      "aria": "《生气啦！》\n一个也会生气的小怪物\n文字与插画：rockbenben\n出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月\n作品内容：CC BY-NC-ND 4.0，非商业分享请署名。\n字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。\n\n编者说：情绪被同伴看见；第二次挫折时仍能继续，主动约定明天。读到犹豫的地方，可以停一停，听孩子怎么说。",
      "props": [
        {
          "id": "spiral-1",
          "kind": "spiral",
          "at": [
            430,
            640
          ],
          "scale": 0.14
        }
      ],
      "text": {
        "narration": {
          "at": [
            140,
            120
          ],
          "size": 3.4,
          "width": 600,
          "text": "《生气啦！》"
        },
        "adult": {
          "at": [
            140,
            240
          ],
          "size": 2.2,
          "width": 720,
          "text": [
            "一个也会生气的小怪物",
            "文字与插画：rockbenben",
            "出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月",
            "作品内容：CC BY-NC-ND 4.0，非商业分享请署名。",
            "字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。",
            "",
            "编者说：情绪被同伴看见；第二次挫折时仍能继续，主动约定明天。读到犹豫的地方，可以停一停，听孩子怎么说。"
          ]
        }
      }
    },
    {
      "id": "p61",
      "template": "t-plain",
      "screen": false,
      "noSound": true,
      "aria": "怎么读这本册子\n旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。\n这册可以特别停在：p34–p35 顶块掉下与 p44–p45 主动开口。让孩子说说看，不急着给答案。\n睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。",
      "props": [
        {
          "id": "spiral-1",
          "kind": "spiral",
          "at": [
            430,
            130
          ],
          "scale": 0.14
        }
      ],
      "text": {
        "narration": {
          "at": [
            140,
            120
          ],
          "size": 3.4,
          "width": 600,
          "text": "怎么读这本册子"
        },
        "adult": {
          "at": [
            140,
            240
          ],
          "size": 2.2,
          "width": 720,
          "text": [
            "旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。",
            "这册可以特别停在：p34–p35 顶块掉下与 p44–p45 主动开口。让孩子说说看，不急着给答案。",
            "睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。"
          ]
        }
      }
    },
    {
      "id": "p62",
      "exit": "p04",
      "template": "t-again",
      "noSound": true,
      "aria": "还想再读吗？\n点圆圈，再读一次。",
      "bg": {
        "kind": "rays-tight",
        "colors": [
          "--green"
        ],
        "gap": "--paper",
        "focus": [
          500,
          700
        ],
        "cover": "all",
        "wash": "--wash-green"
      },
      "props": [
        {
          "id": "arrow-1",
          "kind": "arrow",
          "at": [
            120,
            420
          ],
          "scale": 0.72,
          "class": "prop-arrow"
        }
      ],
      "char": {
        "pose": "happy",
        "at": [
          540,
          450
        ],
        "scale": 0.52,
        "spiral": true
      },
      "text": {
        "narration": {
          "at": [
            60,
            70
          ],
          "size": 3.4,
          "width": 300,
          "text": "还想再读吗？"
        },
        "prompt": {
          "at": [
            60,
            870
          ],
          "size": 4,
          "width": 400,
          "text": "点圆圈，再读一次。",
          "print": "翻回封面吧。"
        }
      },
      "trap": true,
      "hotspot": {
        "targetId": "arrow-1",
        "action": "again",
        "target": "arrow",
        "at": [
          184,
          190
        ],
        "size": 508,
        "label": "点圆圈，再读一次"
      }
    },
    {
      "id": "p63",
      "template": "t-endpaper",
      "screen": false,
      "noSound": true,
      "aria": "后环衬：三块半塔、两块地面与静放的橘色领巾。",
      "props": [
        {
          "id": "block-1",
          "kind": "block",
          "at": [
            90,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            202,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            145,
            494
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            -50,
            710
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            350,
            800
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"
        },
        {
          "id": "scarf-1",
          "kind": "scarf",
          "at": [
            660,
            710
          ],
          "scale": 0.35
        }
      ]
    },
    {
      "id": "p64",
      "template": "t-color t-yellow",
      "screen": false,
      "sound": "chirp",
      "aria": "《生气啦！》耶！",
      "bg": {
        "kind": "rays",
        "colors": [
          "--yellow-deep",
          "--yellow"
        ],
        "gap": "--yellow",
        "focus": [
          500,
          680
        ],
        "cover": "all",
        "wash": "--yellow"
      },
      "props": [
        {
          "id": "block-1",
          "kind": "block",
          "at": [
            90,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            202,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            145,
            494
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            -50,
            710
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            350,
            800
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"
        },
        {
          "id": "scarf-1",
          "kind": "scarf",
          "at": [
            660,
            710
          ],
          "scale": 0.35
        }
      ],
      "char": {
        "pose": "covered-rest",
        "at": [
          540,
          300
        ],
        "scale": 0.52,
        "spiral": false
      },
      "text": {
        "narration": {
          "at": [
            60,
            90
          ],
          "size": 3.4,
          "align": "center",
          "width": 1000,
          "text": "《生气啦！》"
        },
        "sound": {
          "at": [
            72,
            205
          ],
          "size": 16,
          "align": "center",
          "width": 1000,
          "text": "耶！"
        }
      }
    }
  ]
};
