/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--night"
  },
  "scene": {
    "kind": "room",
    "light": "night"
  },
  "pages": [
    {
      "id": "p54",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你也躺下来。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 5.2,
          "width": 398.16,
          "text": "你也躺下来。",
          "color": "--paper",
          "align": "left"
        }
      },
      "char": {
        "pose": "curled",
        "at": [
          530,
          300
        ],
        "scale": 0.55,
        "spiral": false
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
          "style": "--ball:var(--blue);opacity:.65"
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            30,
            700
          ],
          "scale": 0.4,
          "style": "--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.65"
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
          45.34,
          107.39
        ],
        "scale": 0.82
      }
    },
    {
      "id": "p55",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "球就在伸手能碰到的地方。",
      "text": {
        "narration": {
          "at": [
            281.12,
            200
          ],
          "size": 4.3,
          "width": 638.88,
          "text": "球就在伸手能碰到的地方。",
          "color": "--paper",
          "align": "right"
        }
      },
      "char": {
        "pose": "curled",
        "at": [
          530,
          300
        ],
        "scale": 0.55,
        "spiral": false
      },
      "responseTo": "p54",
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
          "style": "--ball:var(--blue);opacity:.65"
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            30,
            700
          ],
          "scale": 0.4,
          "style": "--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.65"
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
          45.34,
          107.39
        ],
        "scale": 0.82
      }
    }
  ]
};
