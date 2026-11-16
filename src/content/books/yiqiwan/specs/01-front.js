/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "pages": [
    {
      "id": "p01",
      "template": "t-cover",
      "sound": "chirp",
      "aria": "《一起玩！》一个要你一起玩的小怪物。点我，开始。",
      "bg": {
        "kind": "rays",
        "colors": [
          "--green",
          "--wash-green"
        ],
        "gap": "--green",
        "focus": [
          500,
          560
        ],
        "wash": "--wash-green"
      },
      "char": {
        "pose": "ready",
        "at": [
          170,
          220
        ],
        "scale": 0.64,
        "spiral": true,
        "wear": "headband"
      },
      "text": {
        "sound": {
          "at": [
            75,
            85
          ],
          "size": 15,
          "align": "center",
          "width": 850,
          "rotate": -2,
          "text": "一起玩！"
        },
        "narration": {
          "at": [
            300,
            290
          ],
          "size": 3.4,
          "align": "center",
          "width": 400,
          "text": "一个要你一起玩的小怪物"
        },
        "prompt": {
          "at": [
            60,
            870
          ],
          "size": 4,
          "align": "center",
          "width": 1000,
          "text": "点我，开始。",
          "print": ""
        }
      },
      "hotspot": {
        "targetId": "page",
        "action": "start",
        "at": [
          0,
          0
        ],
        "size": 1000,
        "label": "点封面开始阅读"
      },
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            280,
            550
          ],
          "scale": 0.24,
          "style": "--ball:var(--blue)"
        }
      ]
    },
    {
      "id": "p02",
      "template": "t-endpaper",
      "noSound": true,
      "aria": "前环衬：一个蓝球与条纹发带。",
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
      "id": "p03",
      "template": "t-title",
      "sound": "chirp",
      "aria": "扉页：《一起玩！》一个要你一起玩的小怪物。",
      "bg": {
        "kind": "rays-tight",
        "colors": [
          "--blue",
          "--wash-blue"
        ],
        "focus": [
          500,
          760
        ],
        "wash": "--wash-blue"
      },
      "char": {
        "pose": "ready",
        "at": [
          250,
          470
        ],
        "scale": 0.6,
        "spiral": true,
        "wear": "headband"
      },
      "text": {
        "sound": {
          "at": [
            250,
            70
          ],
          "size": 15,
          "align": "center",
          "width": 500,
          "rotate": -1,
          "text": "一起玩！"
        },
        "narration": {
          "at": [
            300,
            300
          ],
          "size": 3.4,
          "align": "center",
          "width": 400,
          "text": "一个要你一起玩的小怪物"
        }
      },
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            100,
            670
          ],
          "scale": 0.24,
          "style": "--ball:var(--blue)"
        }
      ]
    }
  ]
};
