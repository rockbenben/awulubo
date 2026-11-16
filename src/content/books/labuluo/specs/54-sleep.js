/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--night"
  },
  "scene": {
    "kind": "room",
    "light": "night"
  },
  "pages": [
    {
      "id": "p54",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "这次，你先打哈欠。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 486.66,
          "text": "这次，你先打哈欠。",
          "color": "--paper",
          "align": "left"
        }
      },
      "char": {
        "pose": "sick-curled",
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
          "style": "opacity:.6"
        },
        {
          "id": "blanket-1",
          "kind": "blanket-lap",
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
          "style": "opacity:.6"
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
          117.24,
          71.1
        ],
        "scale": 0.85
      }
    },
    {
      "id": "p55",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它挪近，用小脚推来毯角。",
      "text": {
        "narration": {
          "at": [
            281.12,
            200
          ],
          "size": 4.3,
          "width": 638.88,
          "text": "它挪近，用小脚推来毯角。",
          "color": "--paper",
          "align": "right"
        }
      },
      "responseTo": "p54",
      "char": {
        "pose": "push-corner",
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
          "style": "opacity:.6"
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
          "style": "opacity:.6"
        },
        {
          "id": "foot-corner",
          "kind": "foot-pushing",
          "at": [
            245,
            780
          ],
          "scale": 0.6,
          "rotate": 170
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
          117.24,
          71.1
        ],
        "scale": 0.85
      }
    }
  ]
};
