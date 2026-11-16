/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "pages": [
    {
      "id": "p01",
      "template": "t-cover",
      "sound": "chirp",
      "aria": "《生气啦！》一个也会生气的小怪物。点我，开始。",
      "bg": {
        "kind": "rays",
        "colors": [
          "--purple",
          "--wash-purple"
        ],
        "gap": "--purple",
        "focus": [
          500,
          560
        ],
        "wash": "--wash-purple"
      },
      "char": {
        "pose": "braced",
        "at": [
          170,
          220
        ],
        "scale": 0.64,
        "spiral": true,
        "wear": "scarf"
      },
      "props": [
        {
          "id": "paper-narration",
          "kind": "blob",
          "at": [
            226.5,
            52.1
          ],
          "scale": 0.53
        },
        {
          "id": "paper-sound",
          "kind": "blob",
          "at": [
            -86,
            -392.2
          ],
          "scale": 1.13
        },
        {
          "id": "blob-1",
          "kind": "blob",
          "at": [
            200,
            546
          ],
          "scale": 0.7
        }
      ],
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
          "text": "生气啦！"
        },
        "narration": {
          "at": [
            300,
            290
          ],
          "size": 3.4,
          "align": "center",
          "width": 400,
          "text": "一个也会生气的小怪物"
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
      }
    },
    {
      "id": "p02",
      "template": "t-endpaper",
      "noSound": true,
      "aria": "前环衬：同五块积木。",
      "props": [
        {
          "id": "block-1",
          "kind": "block",
          "at": [
            90,
            570
          ],
          "scale": 0.24,
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            240,
            670
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            390,
            570
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            540,
            670
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            690,
            570
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"
        }
      ]
    },
    {
      "id": "p03",
      "template": "t-title",
      "sound": "chirp",
      "aria": "扉页：《生气啦！》一个也会生气的小怪物。",
      "bg": {
        "kind": "rays-tight",
        "colors": [
          "--orange",
          "--wash-orange"
        ],
        "focus": [
          500,
          760
        ],
        "wash": "--wash-orange"
      },
      "char": {
        "pose": "braced",
        "at": [
          250,
          470
        ],
        "scale": 0.6,
        "spiral": true,
        "wear": "scarf"
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
          "text": "生气啦！"
        },
        "narration": {
          "at": [
            300,
            300
          ],
          "size": 3.4,
          "align": "center",
          "width": 400,
          "text": "一个也会生气的小怪物"
        }
      }
    }
  ]
};
