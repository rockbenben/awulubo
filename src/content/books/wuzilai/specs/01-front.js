/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "pages": [
    {
      "id": "p01",
      "template": "t-cover",
      "sound": "chirp",
      "aria": "《我自己来！》一个非要自己来的小怪物。点我，开始。",
      "bg": {
        "kind": "rays",
        "colors": [
          "--pink",
          "--wash-pink"
        ],
        "gap": "--pink",
        "focus": [
          500,
          560
        ],
        "wash": "--wash-pink"
      },
      "char": {
        "pose": "braced",
        "at": [
          170,
          220
        ],
        "scale": 0.64,
        "spiral": true,
        "wear": "vest"
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
          "text": "我自己来！"
        },
        "narration": {
          "at": [
            300,
            290
          ],
          "size": 3.4,
          "align": "center",
          "width": 400,
          "text": "一个非要自己来的小怪物"
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
      "aria": "前环衬：同一篮与同三物，尚未收纳。",
      "props": [
        {
          "id": "basket-1",
          "kind": "basket",
          "at": [
            0,
            390
          ],
          "scale": 0.55,
          "layer": "behind"
        },
        {
          "id": "apple-1",
          "kind": "apple",
          "at": [
            530,
            650
          ],
          "scale": 0.16
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            700,
            680
          ],
          "scale": 0.18
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            430,
            650
          ],
          "scale": 0.14
        }
      ]
    },
    {
      "id": "p03",
      "template": "t-title",
      "sound": "chirp",
      "aria": "扉页：《我自己来！》一个非要自己来的小怪物。",
      "bg": {
        "kind": "rays-tight",
        "colors": [
          "--yellow",
          "--wash-yellow"
        ],
        "focus": [
          500,
          760
        ],
        "wash": "--wash-yellow"
      },
      "char": {
        "pose": "braced",
        "at": [
          250,
          470
        ],
        "scale": 0.6,
        "spiral": true,
        "wear": "vest"
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
          "text": "我自己来！"
        },
        "narration": {
          "at": [
            300,
            300
          ],
          "size": 3.4,
          "align": "center",
          "width": 400,
          "text": "一个非要自己来的小怪物"
        }
      }
    }
  ]
};
