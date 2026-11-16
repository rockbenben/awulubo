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
      "id": "p30",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你转过来：一起玩，好不好？",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "你转过来：一起玩，好不好？",
          "align": "left"
        }
      },
      "char": {
        "pose": "listen-back",
        "at": [
          400,
          260
        ],
        "scale": 0.62,
        "spiral": false,
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
          -148.06,
          -89.5
        ],
        "scale": 1.1
      }
    },
    {
      "id": "p31",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它慢慢转回半个身子。",
      "text": {
        "narration": {
          "at": [
            241,
            150
          ],
          "size": 5.5,
          "width": 679,
          "text": "它慢慢转回半个身子。",
          "align": "right"
        }
      },
      "char": {
        "pose": "half-turn",
        "at": [
          400,
          260
        ],
        "scale": 0.62,
        "spiral": false,
        "wear": "headband-low"
      },
      "responseTo": "p30",
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
          -148.06,
          -89.5
        ],
        "scale": 1.1
      }
    }
  ]
};
