/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-blue",
    "colors": [
      "--wash-blue"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "play-mat"
  },
  "pages": [
    {
      "id": "p14",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "observe",
      "aria": "你等了一会儿。\n慢慢数到三。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 7.428571428571429,
          "width": 643.6,
          "text": "你等了一会儿。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "慢慢数到三。",
          "print": "慢慢数到三。",
          "align": "left"
        }
      },
      "char": {
        "pose": "hesitant",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-tilted"
      },
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            445,
            610
          ],
          "scale": 0.25,
          "class": "prop-ball",
          "style": "--ball:var(--blue)"
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
          -320.36,
          -109.63
        ],
        "scale": 1.15
      }
    },
    {
      "id": "p15",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "数到三，它还紧紧拢着球。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "数到三，它还紧紧拢着球。",
          "align": "right"
        }
      },
      "char": {
        "pose": "braced",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-tilted"
      },
      "responseTo": "p14",
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            445,
            610
          ],
          "scale": 0.25,
          "class": "prop-ball",
          "style": "--ball:var(--blue)"
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
          -320.36,
          -109.63
        ],
        "scale": 1.15
      }
    }
  ]
};
