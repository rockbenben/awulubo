/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-orange"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p24",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它低头坐下，发带歪在眉边。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 689.62,
          "text": "它低头坐下，发带歪在眉边。",
          "align": "left"
        }
      },
      "char": {
        "pose": "listen-low",
        "at": [
          400,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-low"
      },
      "props": [
        {
          "id": "wall-anchor",
          "kind": "wall-foot",
          "at": [
            185,
            515
          ],
          "scale": 0.4,
          "layer": "behind",
          "style": "--scene-ink:var(--ink);--scene-line-opacity:.22"
        },
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            225,
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
          1.28,
          94.41
        ],
        "scale": 0.9
      }
    },
    {
      "id": "p25",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你也坐下，球还停在墙脚。",
      "text": {
        "narration": {
          "at": [
            281.12,
            200
          ],
          "size": 4.3,
          "width": 638.88,
          "text": "你也坐下，球还停在墙脚。",
          "align": "right"
        }
      },
      "char": {
        "pose": "sad-seat",
        "at": [
          400,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-low"
      },
      "responseTo": "p24",
      "props": [
        {
          "id": "wall-anchor",
          "kind": "wall-foot",
          "at": [
            185,
            515
          ],
          "scale": 0.4,
          "layer": "behind",
          "style": "--scene-ink:var(--ink);--scene-line-opacity:.22"
        },
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            225,
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
          1.28,
          94.41
        ],
        "scale": 0.9
      }
    }
  ]
};
