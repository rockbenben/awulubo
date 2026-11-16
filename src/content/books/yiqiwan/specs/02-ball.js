/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-blue",
    "colors": [
      "--wash-blue"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "window-nook"
  },
  "pages": [
    {
      "id": "p04",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "窗边，一个球滚过来。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 679,
          "text": "窗边，一个球滚过来。",
          "align": "left"
        }
      },
      "char": {
        "pose": "look-down",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband"
      },
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            150,
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
          -135.21,
          -87.94
        ],
        "scale": 1.1
      }
    },
    {
      "id": "p05",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "发带一晃，它迈开小脚追上去！",
      "text": {
        "narration": {
          "at": [
            305.9,
            95
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "发带一晃，<br>它迈开小脚追上去！",
          "align": "right"
        }
      },
      "char": {
        "pose": "run",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband"
      },
      "responseTo": "p04",
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            300,
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
          -135.21,
          -87.94
        ],
        "scale": 1.1
      }
    }
  ]
};
