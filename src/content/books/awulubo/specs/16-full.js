/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "disc",
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
      "id": "p16",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "它还张着大嘴。再喂一口苹果。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 7.428571428571429,
          "width": 643.6,
          "text": "它还张着大嘴。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "再喂一口苹果。",
          "print": "再喂一口苹果。",
          "align": "left"
        }
      },
      "char": {
        "pose": "willing",
        "at": [
          100,
          215
        ],
        "scale": 0.7,
        "spiral": true,
        "state": "state-rainbow"
      },
      "props": [
        {
          "id": "apple-C",
          "kind": "apple",
          "at": [
            560,
            480
          ],
          "scale": 0.27,
          "class": "prop-apple"
        }
      ],
      "hotspot": {
        "targetId": "apple-C",
        "action": "feed",
        "target": "apple",
        "at": [
          560,
          480
        ],
        "size": 280,
        "label": "喂一口"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -73.04,
          70.5
        ],
        "scale": 0.96
      }
    },
    {
      "noSound": true,
      "id": "p17",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "肚子鼓成球，小脚碰不到地！",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "肚子鼓成球，小脚碰不到地！",
          "align": "right"
        }
      },
      "responseTo": "p16",
      "char": {
        "pose": "inflated",
        "at": [
          150,
          120
        ],
        "scale": 0.76,
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
          -73.04,
          70.5
        ],
        "scale": 0.96
      }
    }
  ]
};
