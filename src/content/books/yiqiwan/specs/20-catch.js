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
      "id": "p40",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它用肚子挡住球。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "它用肚子挡住球。",
          "align": "left"
        }
      },
      "char": {
        "pose": "push",
        "at": [
          350,
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
          -177.75,
          -101.56
        ],
        "scale": 1.15
      }
    },
    {
      "id": "p41",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "这次，它让开一点，正对着你。",
      "text": {
        "narration": {
          "at": [
            305.9,
            95
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "这次，它让开一点，<br>正对着你。",
          "align": "right"
        }
      },
      "char": {
        "pose": "curious-tilt",
        "at": [
          450,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-low"
      },
      "responseTo": "p40",
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
          -177.75,
          -101.56
        ],
        "scale": 1.15
      }
    }
  ]
};
