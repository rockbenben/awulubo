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
      "noSound": true,
      "id": "p14",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "又来了苹果、小鱼、星星。三样各喂一口。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "又来了苹果、小鱼、星星。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "三样各喂一口。",
          "print": "三样各喂一口。",
          "align": "left"
        }
      },
      "char": {
        "pose": "willing",
        "at": [
          210,
          160
        ],
        "scale": 0.55,
        "spiral": true
      },
      "props": [
        {
          "id": "apple-B",
          "kind": "apple",
          "at": [
            60,
            540
          ],
          "scale": 0.22,
          "class": "prop-apple"
        },
        {
          "id": "fish-B",
          "kind": "fish",
          "at": [
            360,
            540
          ],
          "scale": 0.22,
          "class": "prop-fish"
        },
        {
          "id": "star-B",
          "kind": "star",
          "at": [
            660,
            540
          ],
          "scale": 0.22,
          "class": "prop-star"
        }
      ],
      "hotspot": [
        {
          "targetId": "apple-B",
          "action": "feed3",
          "target": "apple",
          "at": [
            60,
            540
          ],
          "size": 270,
          "label": "各喂一口"
        },
        {
          "targetId": "fish-B",
          "action": "feed3",
          "target": "fish",
          "at": [
            360,
            540
          ],
          "size": 270,
          "label": "各喂一口"
        },
        {
          "targetId": "star-B",
          "action": "feed3",
          "target": "star",
          "at": [
            660,
            540
          ],
          "size": 270,
          "label": "各喂一口"
        }
      ],
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -27.67,
          24.74
        ],
        "scale": 1
      }
    },
    {
      "noSound": true,
      "id": "p15",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "哇！颜色连成彩虹啦！",
      "text": {
        "narration": {
          "at": [
            241,
            150
          ],
          "size": 5.5,
          "width": 679,
          "text": "哇！颜色连成彩虹啦！",
          "align": "right"
        }
      },
      "responseTo": "p14",
      "char": {
        "pose": "look-down",
        "at": [
          240,
          255
        ],
        "scale": 0.65,
        "spiral": true,
        "state": "state-rainbow"
      },
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          -27.67,
          24.74
        ],
        "scale": 1
      }
    }
  ]
};
