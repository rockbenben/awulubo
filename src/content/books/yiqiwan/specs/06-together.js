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
      "id": "p12",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "一起玩，好不好？",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "一起玩，好不好？",
          "align": "left"
        }
      },
      "char": {
        "pose": "curious-tilt",
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
          -108.95,
          -217.45
        ],
        "scale": 1.07
      }
    },
    {
      "id": "p13",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它摇头：不要。",
      "text": {
        "narration": {
          "at": [
            276.4,
            735
          ],
          "size": 7.428571428571429,
          "width": 643.6,
          "text": "它摇头：不要。",
          "align": "right"
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
      "responseTo": "p12",
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
          -108.95,
          -217.45
        ],
        "scale": 1.07
      }
    }
  ]
};
