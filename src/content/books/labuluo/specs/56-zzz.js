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
      "id": "p56",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "晚安。\n轻轻翻过去。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 5.2,
          "width": 380,
          "text": "晚安。",
          "color": "--paper",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻翻过去。",
          "print": "轻轻翻过去。",
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
      "id": "p57",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "呼噜……这一回睡得安稳。",
      "text": {
        "narration": {
          "at": [
            281.12,
            200
          ],
          "size": 4.3,
          "width": 638.88,
          "text": "呼噜……这一回睡得安稳。",
          "color": "--paper",
          "align": "right"
        }
      },
      "responseTo": "p56",
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
