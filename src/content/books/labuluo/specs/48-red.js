/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-cream"
  },
  "scene": {
    "kind": "grass",
    "occlude": false
  },
  "pages": [
    {
      "id": "p48",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它挺起圆肚子，回头看你。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它挺起圆肚子，回头看你。",
          "align": "left"
        }
      },
      "char": {
        "pose": "belly-offer",
        "at": [
          370,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-paper"
      },
      "props": [],
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -237.87,
          -277.44
        ],
        "scale": 1.19
      }
    },
    {
      "id": "p49",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "这回，是它等着你。",
      "text": {
        "narration": {
          "at": [
            305.9,
            735
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "这回，是它等着你。",
          "align": "right"
        }
      },
      "responseTo": "p48",
      "char": {
        "pose": "beaming-lean",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-paper"
      },
      "props": [],
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          -237.87,
          -277.44
        ],
        "scale": 1.19
      }
    }
  ]
};
