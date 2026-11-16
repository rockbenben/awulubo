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
      "id": "p06",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它往前一扑。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 8.666666666666666,
          "width": 643.6,
          "text": "它往前一扑。",
          "align": "left"
        }
      },
      "char": {
        "pose": "pounce",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband"
      },
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            440,
            620
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
          -54.28,
          -179.9
        ],
        "scale": 0.96
      }
    },
    {
      "id": "p07",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "扑！它压住球，发带歪了。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "扑！它压住球，发带歪了。",
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
      "responseTo": "p06",
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            445,
            665
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
          -54.28,
          -179.9
        ],
        "scale": 0.96
      }
    }
  ]
};
