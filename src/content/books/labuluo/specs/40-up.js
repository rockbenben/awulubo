/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-yellow",
    "colors": [
      "--yellow"
    ],
    "gap": "--paper",
    "cover": "all"
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
      "aria": "它先伸出一只脚，踩住地。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它先伸出一只脚，踩住地。",
          "align": "left"
        }
      },
      "char": {
        "pose": "rise-one",
        "at": [
          370,
          260
        ],
        "scale": 0.62,
        "spiral": true,
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
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket-drape",
          "at": [
            350,
            380
          ],
          "scale": 0.62,
          "layer": "behind"
        },
        {
          "id": "apple-A",
          "kind": "apple-bitten",
          "at": [
            170,
            600
          ],
          "scale": 0.2,
          "class": "prop-apple"
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
          -83.36,
          -100.18
        ],
        "scale": 1.1
      }
    },
    {
      "id": "p41",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "另一只也落地，身子撑起来！",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "另一只也落地，身子撑起来！",
          "align": "right"
        }
      },
      "responseTo": "p40",
      "char": {
        "pose": "ready",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
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
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket-drape",
          "at": [
            350,
            380
          ],
          "scale": 0.62,
          "layer": "behind"
        },
        {
          "id": "apple-A",
          "kind": "apple-bitten",
          "at": [
            170,
            600
          ],
          "scale": 0.2,
          "class": "prop-apple"
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
          -83.36,
          -100.18
        ],
        "scale": 1.1
      }
    }
  ]
};
