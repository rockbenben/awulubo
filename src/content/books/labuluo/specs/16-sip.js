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
      "id": "p16",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "毯边落低，它抿嘴不想喝。\n把杯子放一放。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "毯边落低，它抿嘴不想喝。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "把杯子放一放。",
          "print": "把杯子放一放。",
          "align": "left"
        }
      },
      "char": {
        "pose": "tired",
        "at": [
          280,
          300
        ],
        "scale": 0.58,
        "spiral": true,
        "state": "state-pale"
      },
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            640,
            400
          ],
          "scale": 0.34,
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket-fold",
          "at": [
            275,
            550
          ],
          "scale": 0.58
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
          -105.09,
          -298.33
        ],
        "scale": 1.07
      }
    },
    {
      "id": "p17",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它转开脸，你把杯子放下。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它转开脸，你把杯子放下。",
          "align": "right"
        }
      },
      "responseTo": "p16",
      "char": {
        "pose": "turn-away",
        "at": [
          280,
          300
        ],
        "scale": 0.58,
        "spiral": true,
        "state": "state-pale"
      },
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            730,
            670
          ],
          "scale": 0.26,
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket-fold",
          "at": [
            275,
            550
          ],
          "scale": 0.58
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
          -105.09,
          -298.33
        ],
        "scale": 1.07
      }
    }
  ]
};
