/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "pages": [
    {
      "id": "p01",
      "template": "t-cover",
      "sound": "chirp",
      "aria": "《噜啵生病啦！》一个要你照顾的小怪物。点我，开始。",
      "bg": {
        "kind": "rays",
        "colors": [
          "--blue",
          "--deep-blue"
        ],
        "gap": "--blue",
        "focus": [
          500,
          560
        ],
        "wash": "--blue"
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
          "id": "blanket-1",
          "kind": "blanket",
          "at": [
            170,
            470
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
          "text": "噜啵生病啦！"
        },
        "narration": {
          "at": [
            300,
            290
          ],
          "size": 3.4,
          "align": "center",
          "width": 400,
          "text": "一个要你照顾的小怪物"
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
      "aria": "前环衬：毯子与杯子。",
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            120,
            120
          ],
          "scale": 0.2,
          "rotate": -8
        },
        {
          "id": "blanket-1",
          "kind": "blanket",
          "at": [
            300,
            330
          ],
          "scale": 0.22,
          "rotate": -4
        },
        {
          "id": "apple-1",
          "kind": "apple",
          "at": [
            700,
            460
          ],
          "scale": 0.15,
          "rotate": 18
        },
        {
          "id": "cup-2",
          "kind": "cup",
          "at": [
            80,
            600
          ],
          "scale": 0.17,
          "rotate": 14
        }
      ]
    },
    {
      "id": "p03",
      "template": "t-title",
      "sound": "chirp",
      "aria": "扉页：《噜啵生病啦！》一个要你照顾的小怪物。",
      "bg": {
        "kind": "rays-tight",
        "colors": [
          "--purple",
          "--blue"
        ],
        "focus": [
          500,
          760
        ],
        "wash": "--wash-purple"
      },
      "props": [
        {
          "id": "paper-narration",
          "kind": "blob",
          "at": [
            226.5,
            62.1
          ],
          "scale": 0.53
        },
        {
          "id": "paper-sound",
          "kind": "blob",
          "at": [
            148.2,
            -227.8
          ],
          "scale": 0.68
        },
        {
          "id": "blanket-1",
          "kind": "blanket",
          "at": [
            230,
            540
          ],
          "scale": 0.7
        }
      ],
      "text": {
        "sound": {
          "at": [
            250,
            70
          ],
          "size": 13,
          "align": "center",
          "width": 500,
          "rotate": -1,
          "text": "噜啵生病啦！"
        },
        "narration": {
          "at": [
            300,
            300
          ],
          "size": 3.4,
          "align": "center",
          "width": 400,
          "text": "一个要你照顾的小怪物"
        }
      }
    }
  ]
};
