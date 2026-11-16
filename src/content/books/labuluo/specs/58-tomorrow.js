/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--night-deep"
  },
  "scene": {
    "kind": "room",
    "light": "late-night"
  },
  "pages": [
    {
      "id": "p58",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "屋里只剩轻轻的呼吸。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 537.4,
          "text": "屋里只剩轻轻的呼吸。",
          "color": "--paper",
          "align": "left"
        }
      },
      "char": {
        "pose": "covered-rest",
        "at": [
          230,
          300
        ],
        "scale": 0.62,
        "spiral": false,
        "state": "state-paper"
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
          "class": "prop-cup",
          "style": "opacity:.35"
        },
        {
          "id": "blanket-1",
          "kind": "blanket-lap-shared",
          "at": [
            235,
            560
          ],
          "scale": 0.62
        },
        {
          "id": "apple-A",
          "kind": "apple-bitten",
          "at": [
            170,
            600
          ],
          "scale": 0.2,
          "class": "prop-apple",
          "style": "opacity:.35"
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
          148.77,
          120.42
        ],
        "scale": 0.78
      }
    },
    {
      "id": "p59",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "明天，还想听你咕噜叫。",
      "text": {
        "narration": {
          "at": [
            331.86,
            200
          ],
          "size": 4.3,
          "width": 588.14,
          "text": "明天，还想听你咕噜叫。",
          "color": "--paper",
          "align": "right"
        }
      },
      "responseTo": "p58",
      "char": {
        "pose": "covered-rest",
        "at": [
          260,
          300
        ],
        "scale": 0.62,
        "spiral": false,
        "state": "state-paper"
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
          "class": "prop-cup",
          "style": "opacity:.35"
        },
        {
          "id": "blanket-1",
          "kind": "blanket-lap-shared",
          "at": [
            235,
            560
          ],
          "scale": 0.62
        },
        {
          "id": "apple-A",
          "kind": "apple-bitten",
          "at": [
            170,
            600
          ],
          "scale": 0.2,
          "class": "prop-apple",
          "style": "opacity:.35"
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
          148.77,
          120.42
        ],
        "scale": 0.78
      }
    }
  ]
};
