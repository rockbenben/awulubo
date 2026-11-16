/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "pages": [
    {
      "id": "p60",
      "template": "t-plain",
      "screen": false,
      "noSound": true,
      "aria": "《一起玩！》\n一个要你一起玩的小怪物\n文字与插画：rockbenben\n出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月\n作品内容：CC BY-NC-ND 4.0，非商业分享请署名。\n字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。\n\n编者说：从占住球、争抢，到自愿让出并主动传回来。读到犹豫的地方，可以停一停，听孩子怎么说。",
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
          "text": "《一起玩！》"
        },
        "adult": {
          "at": [
            140,
            240
          ],
          "size": 2.2,
          "width": 720,
          "text": [
            "一个要你一起玩的小怪物",
            "文字与插画：rockbenben",
            "出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月",
            "作品内容：CC BY-NC-ND 4.0，非商业分享请署名。",
            "字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。",
            "",
            "编者说：从占住球、争抢，到自愿让出并主动传回来。读到犹豫的地方，可以停一停，听孩子怎么说。"
          ]
        }
      }
    },
    {
      "id": "p61",
      "template": "t-plain",
      "screen": false,
      "noSound": true,
      "aria": "怎么读这本册子\n旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。\n争抢是故事中的冲突，不是共读时让孩子真的拉扯玩具。可以听听孩子觉得谁在着急，不强迫给出分享答案。\n这册可以特别停在：p20–p21 争抢与 p42–p45 自愿回传。让孩子说说看，不急着给答案。\n睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。",
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
            "争抢是故事中的冲突，不是共读时让孩子真的拉扯玩具。可以听听孩子觉得谁在着急，不强迫给出分享答案。",
            "这册可以特别停在：p20–p21 争抢与 p42–p45 自愿回传。让孩子说说看，不急着给答案。",
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
      "aria": "后环衬：同一个球与静放的发带。",
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            180,
            300
          ],
          "scale": 0.3,
          "style": "--ball:var(--blue)"
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            200,
            600
          ],
          "scale": 0.45,
          "style": "--wear-headband:inline"
        }
      ]
    },
    {
      "id": "p64",
      "template": "t-color t-yellow",
      "screen": false,
      "sound": "chirp",
      "aria": "《一起玩！》耶！",
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
          "id": "blob-1",
          "kind": "blob",
          "at": [
            240,
            -132
          ],
          "scale": 0.5
        },
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            100,
            660
          ],
          "scale": 0.2,
          "style": "--ball:var(--blue)"
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            100,
            780
          ],
          "scale": 0.3,
          "style": "--wear-headband:inline"
        }
      ],
      "char": {
        "pose": "covered-rest",
        "at": [
          250,
          350
        ],
        "scale": 0.6,
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
          "text": "《一起玩！》"
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
