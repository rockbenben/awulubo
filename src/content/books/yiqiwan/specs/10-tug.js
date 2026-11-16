/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "rays",
    "wash": "--wash-orange",
    "colors": [
      "--wash-orange"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "play-mat"
  },
  "pages": [
    {
      "id": "p20",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你拉，它挤，四周挤满橙黄。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "你拉，它挤，四周挤满橙黄。",
          "align": "left"
        }
      },
      "char": {
        "pose": "press-ball",
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
        },
        {
          "id": "child-hand",
          "kind": "child-reach",
          "at": [
            80,
            630
          ],
          "scale": 1.2
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
          -53.8,
          -158.22
        ],
        "scale": 1.11
      }
    },
    {
      "id": "p21",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "球都扁了！两边还不肯放。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "球都扁了！两边还不肯放。",
          "align": "right"
        }
      },
      "char": {
        "pose": "guard-ball",
        "at": [
          350,
          300
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-tilted"
      },
      "responseTo": "p20",
      "props": [
        {
          "id": "ball-1",
          "kind": "ball-squeezed",
          "at": [
            445,
            665
          ],
          "scale": 0.25,
          "class": "prop-ball",
          "style": "--ball:var(--blue)"
        },
        {
          "id": "child-hand",
          "kind": "child-reach",
          "at": [
            80,
            630
          ],
          "scale": 1.2
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
          -53.8,
          -158.22
        ],
        "scale": 1.11
      }
    }
  ]
};
