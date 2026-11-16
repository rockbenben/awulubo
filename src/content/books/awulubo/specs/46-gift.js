/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "rays",
    "wash": "--wash-cream",
    "colors": [
      "--wash-yellow"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "grass",
    "occlude": false,
    "grassScale": 2
  },
  "pages": [
    {
      "noSound": true,
      "id": "p46",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "肚子里的颜色，都送给你！伸开手接一接。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "肚子里的颜色，都送给你！",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "伸开手接一接。",
          "print": "伸开手接一接。",
          "align": "left"
        }
      },
      "char": {
        "pose": "push",
        "at": [
          110,
          205
        ],
        "scale": 0.7,
        "spiral": true,
        "state": "state-rainbow"
      },
      "props": [
        {
          "id": "apple-F",
          "kind": "apple",
          "at": [
            10,
            710
          ],
          "scale": 0.075
        },
        {
          "id": "apple-G",
          "kind": "apple",
          "at": [
            90,
            710
          ],
          "scale": 0.075
        },
        {
          "id": "apple-H",
          "kind": "apple",
          "at": [
            170,
            710
          ],
          "scale": 0.075
        }
      ],
      "hotspot": {
        "targetId": "character",
        "action": "gift",
        "target": "char",
        "at": [
          247.09,
          438.73
        ],
        "size": 419.23,
        "label": "一起试试"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          30.2,
          -55.95
        ],
        "scale": 0.87
      }
    },
    {
      "noSound": true,
      "id": "p47",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "红、蓝、黄变成彩纸，落在手上、脚边！",
      "text": {
        "narration": {
          "at": [
            241,
            95
          ],
          "size": 5.5,
          "width": 679,
          "text": "红、蓝、黄变成彩纸，<br>落在手上、脚边！",
          "align": "right"
        }
      },
      "responseTo": "p46",
      "char": {
        "pose": "ready",
        "at": [
          420,
          255
        ],
        "scale": 0.65,
        "spiral": true
      },
      "props": [
        {
          "id": "child-hand",
          "kind": "palm",
          "at": [
            60,
            475
          ],
          "scale": 0.35
        },
        {
          "id": "K2-red",
          "kind": "paper-red",
          "at": [
            185,
            615
          ],
          "scale": 0.09
        },
        {
          "id": "K2-blue",
          "kind": "paper-blue",
          "at": [
            520,
            755
          ],
          "scale": 0.1
        },
        {
          "id": "K2-yellow",
          "kind": "paper-yellow",
          "at": [
            30,
            650
          ],
          "scale": 0.1
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
          30.2,
          -55.95
        ],
        "scale": 0.87
      }
    }
  ]
};
