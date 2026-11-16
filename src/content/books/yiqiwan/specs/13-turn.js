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
      "id": "p26",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它转身，背对着球。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "它转身，背对着球。",
          "align": "left"
        }
      },
      "char": {
        "pose": "back",
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
          -40.34,
          -256.39
        ],
        "scale": 1.12
      }
    },
    {
      "id": "p27",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你也背过去，谁也看不见谁。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "你也背过去，谁也看不见谁。",
          "align": "right"
        }
      },
      "char": {
        "pose": "huddle-away",
        "at": [
          400,
          260
        ],
        "scale": 0.62,
        "spiral": false,
        "wear": "headband-low"
      },
      "responseTo": "p26",
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
          -40.34,
          -256.39
        ],
        "scale": 1.12
      }
    }
  ]
};
