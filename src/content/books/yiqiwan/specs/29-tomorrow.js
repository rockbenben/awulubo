/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--night-deep"
  },
  "scene": {
    "kind": "room",
    "light": "late-night"
  },
  "pages": [
    {
      "id": "p58",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "球静静待着。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 5.2,
          "width": 398.16,
          "text": "球静静待着。",
          "color": "--paper",
          "align": "left"
        }
      },
      "char": {
        "pose": "covered-rest",
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
          "style": "--ball:var(--blue);opacity:.3"
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            30,
            700
          ],
          "scale": 0.4,
          "style": "--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.3"
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
          84.15,
          155.42
        ],
        "scale": 0.75
      }
    },
    {
      "id": "p59",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "明天，还一起玩。",
      "text": {
        "narration": {
          "at": [
            484.08,
            200
          ],
          "size": 4.3,
          "width": 435.92,
          "text": "明天，还一起玩。",
          "color": "--paper",
          "align": "right"
        }
      },
      "char": {
        "pose": "covered-rest",
        "at": [
          530,
          300
        ],
        "scale": 0.55,
        "spiral": false
      },
      "responseTo": "p58",
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
          "style": "--ball:var(--blue);opacity:.3"
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            30,
            700
          ],
          "scale": 0.4,
          "style": "--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.3"
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
          84.15,
          155.42
        ],
        "scale": 0.75
      }
    }
  ]
};
