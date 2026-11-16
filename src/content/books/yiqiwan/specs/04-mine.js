/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-blue"
  },
  "scene": {
    "kind": "play-mat"
  },
  "pages": [
    {
      "id": "p08",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "我的球！",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 9,
          "width": 454.8,
          "text": "我的球！",
          "align": "left"
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
          -346.81,
          -133.09
        ],
        "scale": 1.19
      }
    },
    {
      "id": "p09",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它转过身，球藏得严严的。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它转过身，球藏得严严的。",
          "align": "right"
        }
      },
      "char": {
        "pose": "back",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": false,
        "wear": "headband-tilted"
      },
      "responseTo": "p08",
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            535,
            470
          ],
          "scale": 0.25,
          "class": "prop-ball",
          "style": "--ball:var(--blue)",
          "layer": "behind"
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
          -346.81,
          -133.09
        ],
        "scale": 1.19
      }
    }
  ]
};
