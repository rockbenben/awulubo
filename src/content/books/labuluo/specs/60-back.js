/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "pages": [
    {
      "id": "p60",
      "template": "t-plain",
      "screen": false,
      "noSound": true,
      "aria": "《噜啵生病啦！》\n一个要你照顾的小怪物\n文字与插画：rockbenben\n出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月\n作品内容：CC BY-NC-ND 4.0，非商业分享请署名。\n字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。\n\n编者说：从发现难受到照顾、等待，最后被恢复的伙伴等候。读到犹豫的地方，可以停一停，听孩子怎么说。",
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
          "text": "《噜啵生病啦！》"
        },
        "adult": {
          "at": [
            140,
            240
          ],
          "size": 2.2,
          "width": 720,
          "text": [
            "一个要你照顾的小怪物",
            "文字与插画：rockbenben",
            "出版：＿＿＿＿＿＿＿　初版：＿＿＿＿年＿＿月",
            "作品内容：CC BY-NC-ND 4.0，非商业分享请署名。",
            "字体：站酷快乐体 · 霞鹜文楷（SIL OFL 1.1），可商用、可嵌入出版物。",
            "",
            "编者说：从发现难受到照顾、等待，最后被恢复的伙伴等候。读到犹豫的地方，可以停一停，听孩子怎么说。"
          ]
        }
      }
    },
    {
      "id": "p61",
      "template": "t-plain",
      "screen": false,
      "noSound": true,
      "aria": "怎么读这本册子\n旁白慢慢念，拟声让孩子接着说。指认、拍手、呼气都可以在共读时一起做，不要求每页都做动作。孩子没有回应时，可以等一等，也可以翻过去。\n虚构角色的颜色、动作变化不等同于现实疾病恢复规律；药物由成人负责，孩子共读时只作观察与模拟。\n这册可以特别停在：p22–p23 苦后安慰与 p28–p35 等待。让孩子说说看，不急着给答案。\n睡前最后几跨，声音逐渐放轻。孩子想停在某一页，就在那里停一会儿。",
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
            "虚构角色的颜色、动作变化不等同于现实疾病恢复规律；药物由成人负责，孩子共读时只作观察与模拟。",
            "这册可以特别停在：p22–p23 苦后安慰与 p28–p35 等待。让孩子说说看，不急着给答案。",
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
          "--yellow-deep",
          "--yellow"
        ],
        "gap": "--paper",
        "focus": [
          500,
          700
        ],
        "cover": "all",
        "wash": "--yellow"
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
      "aria": "后环衬：同毯、杯子与缺口苹果。",
      "props": [
        {
          "id": "blanket-1",
          "kind": "blanket",
          "at": [
            280,
            300
          ],
          "scale": 0.24,
          "rotate": -4
        },
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            700,
            180
          ],
          "scale": 0.18,
          "rotate": 10
        },
        {
          "id": "apple-A",
          "kind": "apple-bitten",
          "at": [
            620,
            700
          ],
          "scale": 0.16,
          "rotate": 14
        }
      ]
    },
    {
      "id": "p64",
      "template": "t-color",
      "screen": false,
      "sound": "chirp",
      "aria": "《噜啵生病啦！》一个要你照顾的小怪物。",
      "bg": {
        "kind": "rays",
        "colors": [
          "--deep-blue",
          "--blue"
        ],
        "gap": "--blue",
        "focus": [
          500,
          680
        ],
        "cover": "all",
        "wash": "--blue"
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
          "id": "blanket-1",
          "kind": "blanket-lap-shared",
          "at": [
            235,
            560
          ],
          "scale": 0.62
        }
      ],
      "char": {
        "pose": "covered-rest",
        "at": [
          240,
          300
        ],
        "scale": 0.62,
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
          "text": "《噜啵生病啦！》"
        },
        "sound": {
          "at": [
            60,
            205
          ],
          "size": 16,
          "align": "center",
          "width": 1000,
          "color": "--ink",
          "text": "啊呜！"
        }
      }
    }
  ]
};
