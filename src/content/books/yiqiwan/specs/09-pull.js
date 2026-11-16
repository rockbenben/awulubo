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
      "id": "p18",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你拉住球，不肯放。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "你拉住球，不肯放。",
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
          101.86,
          -179.57
        ],
        "scale": 0.96
      }
    },
    {
      "id": "p19",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它肚子压下来，紧紧护住球。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "它肚子压下来，紧紧护住球。",
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
      "responseTo": "p18",
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
          101.86,
          -179.57
        ],
        "scale": 0.96
      }
    }
  ]
};
