/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-blue"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "noSound": true,
      "id": "p12",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "还有一颗黄星星。喂它黄星星。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "还有一颗黄星星。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "喂它黄星星。",
          "print": "喂它黄星星。",
          "align": "left"
        }
      },
      "char": {
        "pose": "willing",
        "at": [
          130,
          255
        ],
        "scale": 0.65,
        "spiral": true,
        "state": "state-blue"
      },
      "props": [
        {
          "id": "star-A",
          "kind": "star",
          "at": [
            600,
            410
          ],
          "scale": 0.25,
          "class": "prop-star"
        }
      ],
      "hotspot": {
        "targetId": "star-A",
        "action": "feed",
        "target": "star",
        "at": [
          600,
          410
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
          -222.88,
          -119.81
        ],
        "scale": 1.2
      }
    },
    {
      "noSound": true,
      "id": "p13",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "闪闪闪！黄颜色一下铺开！",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "闪闪闪！黄颜色一下铺开！",
          "align": "right"
        }
      },
      "responseTo": "p12",
      "char": {
        "pose": "tiptoe",
        "at": [
          240,
          255
        ],
        "scale": 0.65,
        "spiral": true,
        "state": "state-yellow"
      },
      "bg": {
        "wash": "--wash-yellow",
        "focus": [
          0,
          500
        ]
      },
      "turn": "黄颜色",
      "framing": {
        "at": [
          -222.88,
          -119.81
        ],
        "scale": 1.2
      }
    }
  ]
};
