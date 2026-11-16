/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--night"
  },
  "scene": {
    "kind": "window-nook",
    "light": "night"
  },
  "pages": [
    {
      "id": "p52",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "天黑了，你们回到毯子旁。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "天黑了，你们回到毯子旁。",
          "color": "--paper",
          "align": "left"
        }
      },
      "char": {
        "pose": "curled",
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
          "kind": "blanket",
          "at": [
            210,
            605
          ],
          "scale": 0.39,
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
          -55.33,
          -206.73
        ],
        "scale": 1.1
      }
    },
    {
      "id": "p53",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它把小脚缩回毯子里。",
      "text": {
        "narration": {
          "at": [
            241,
            150
          ],
          "size": 5.5,
          "width": 679,
          "text": "它把小脚缩回毯子里。",
          "color": "--paper",
          "align": "right"
        }
      },
      "responseTo": "p52",
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
          0,
          500
        ]
      },
      "framing": {
        "at": [
          -55.33,
          -206.73
        ],
        "scale": 1.1
      }
    }
  ]
};
