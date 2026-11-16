/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-yellow",
    "colors": [
      "--yellow"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p38",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "苹果来到嘴边。\n喂它一口苹果。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 7.428571428571429,
          "width": 643.6,
          "text": "苹果来到嘴边。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "喂它一口苹果。",
          "print": "喂它一口苹果。",
          "align": "left"
        }
      },
      "char": {
        "pose": "willing",
        "at": [
          210,
          300
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-pale"
      },
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            35,
            590
          ],
          "scale": 0.22,
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket-drape",
          "at": [
            255,
            435
          ],
          "scale": 0.62,
          "layer": "behind"
        },
        {
          "id": "apple-A",
          "kind": "apple",
          "at": [
            450,
            512
          ],
          "scale": 0.14,
          "class": "prop-apple"
        }
      ],
      "hotspot": {
        "targetId": "apple-A",
        "action": "feed",
        "target": "apple",
        "at": [
          430,
          490
        ],
        "size": 250,
        "label": "喂它一口苹果"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -99.5,
          -243.03
        ],
        "scale": 1.25
      }
    },
    {
      "id": "p39",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "啊呜！它吃下一口。",
      "text": {
        "narration": {
          "at": [
            305.9,
            150
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "啊呜！它吃下一口。",
          "align": "right"
        }
      },
      "responseTo": "p38",
      "char": {
        "pose": "chew",
        "at": [
          275,
          300
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-pale"
      },
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            35,
            590
          ],
          "scale": 0.22,
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket-drape",
          "at": [
            255,
            435
          ],
          "scale": 0.62,
          "layer": "behind"
        },
        {
          "id": "apple-A",
          "kind": "apple-bitten",
          "at": [
            170,
            600
          ],
          "scale": 0.2,
          "class": "prop-apple"
        }
      ],
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          -99.5,
          -243.03
        ],
        "scale": 1.25
      }
    }
  ]
};
