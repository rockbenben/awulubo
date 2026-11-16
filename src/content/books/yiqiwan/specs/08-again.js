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
      "id": "p16",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你又伸出手。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 8.666666666666666,
          "width": 643.6,
          "text": "你又伸出手。",
          "align": "left"
        }
      },
      "char": {
        "pose": "hesitant",
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
            20,
            620
          ],
          "scale": 1
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
          16.4,
          5.45
        ],
        "scale": 0.93
      }
    },
    {
      "id": "p17",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它连球带身子挪开一大截。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它连球带身子挪开一大截。",
          "align": "right"
        }
      },
      "char": {
        "pose": "guard-step",
        "at": [
          500,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-tilted"
      },
      "responseTo": "p16",
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            595,
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
          16.4,
          5.45
        ],
        "scale": 0.93
      }
    }
  ]
};
