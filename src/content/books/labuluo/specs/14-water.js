/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-blue"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p14",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "毯子就在旁边。\n把毯子盖上。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 7.428571428571429,
          "width": 643.6,
          "text": "毯子就在旁边。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "把毯子盖上。",
          "print": "把毯子盖上。",
          "align": "left"
        }
      },
      "char": {
        "pose": "look-down",
        "at": [
          120,
          270
        ],
        "scale": 0.54,
        "spiral": true,
        "state": "state-pale"
      },
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            35,
            590
          ],
          "scale": 0.22,
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket",
          "at": [
            620,
            540
          ],
          "scale": 0.3,
          "class": "prop-blanket"
        }
      ],
      "hotspot": {
        "targetId": "blanket-1",
        "action": "cover",
        "target": "blanket",
        "at": [
          625,
          550
        ],
        "size": 300,
        "label": "把毯子盖上"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -85.51,
          -97.18
        ],
        "scale": 1.12
      }
    },
    {
      "id": "p15",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "盖好了，只露出两只眼睛。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "盖好了，只露出两只眼睛。",
          "align": "right"
        }
      },
      "responseTo": "p14",
      "char": {
        "pose": "hidden-eyes",
        "at": [
          160,
          261
        ],
        "scale": 0.65,
        "spiral": false,
        "state": "state-pale"
      },
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            35,
            590
          ],
          "scale": 0.22,
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket",
          "at": [
            190,
            440
          ],
          "scale": 0.65
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
          -85.51,
          -97.18
        ],
        "scale": 1.12
      }
    }
  ]
};
