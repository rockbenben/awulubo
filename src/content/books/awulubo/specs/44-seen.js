/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-cream",
    "colors": [
      "--wash-yellow"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "grass",
    "occlude": false,
    "grassScale": 2
  },
  "pages": [
    {
      "noSound": true,
      "id": "p44",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "你认出它的声音了。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "你认出它的声音了。",
          "align": "left"
        }
      },
      "props": [
        {
          "id": "apple-F",
          "kind": "apple",
          "at": [
            10,
            710
          ],
          "scale": 0.075
        },
        {
          "id": "apple-G",
          "kind": "apple",
          "at": [
            90,
            710
          ],
          "scale": 0.075
        },
        {
          "id": "apple-H",
          "kind": "apple",
          "at": [
            170,
            710
          ],
          "scale": 0.075
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
          207.38,
          -111.55
        ],
        "scale": 0.95
      }
    },
    {
      "noSound": true,
      "id": "p45",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "它蹦到面前，把肚子挺起来。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "它蹦到面前，把肚子挺起来。",
          "align": "right"
        }
      },
      "responseTo": "p44",
      "char": {
        "pose": "belly-offer",
        "at": [
          100,
          150
        ],
        "scale": 0.78,
        "spiral": true,
        "state": "state-rainbow"
      },
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          207.38,
          -111.55
        ],
        "scale": 0.95
      }
    }
  ]
};
