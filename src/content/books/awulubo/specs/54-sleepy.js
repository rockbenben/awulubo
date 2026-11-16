/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-night"
  },
  "scene": {
    "kind": "grass",
    "light": "night",
    "occlude": false,
    "grassScale": 2
  },
  "pages": [
    {
      "noSound": true,
      "id": "p54",
      "template": "t-night",
      "reading": "autonomous",
      "aria": "天黑了，噜啵的眼皮垂下来。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 689.62,
          "text": "天黑了，噜啵的眼皮垂下来。",
          "align": "left"
        }
      },
      "char": {
        "pose": "sleepy",
        "at": [
          130,
          255
        ],
        "scale": 0.65,
        "spiral": true
      },
      "props": [
        {
          "id": "apple-F",
          "kind": "apple",
          "at": [
            10,
            710
          ],
          "scale": 0.075,
          "style": "opacity:.4"
        },
        {
          "id": "apple-G",
          "kind": "apple",
          "at": [
            90,
            710
          ],
          "scale": 0.075,
          "style": "opacity:.4"
        },
        {
          "id": "apple-H",
          "kind": "apple",
          "at": [
            170,
            710
          ],
          "scale": 0.075,
          "style": "opacity:.4"
        },
        {
          "id": "K2-red",
          "kind": "paper-red",
          "at": [
            380,
            760
          ],
          "scale": 0.09,
          "style": "opacity:.4"
        },
        {
          "id": "K2-blue",
          "kind": "paper-blue",
          "at": [
            600,
            770
          ],
          "scale": 0.1,
          "style": "opacity:.4"
        },
        {
          "id": "K2-yellow",
          "kind": "paper-yellow",
          "at": [
            760,
            755
          ],
          "scale": 0.1,
          "style": "opacity:.4"
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
          136.44,
          141.53
        ],
        "scale": 0.85
      }
    },
    {
      "noSound": true,
      "id": "p55",
      "template": "t-night",
      "reading": "autonomous",
      "aria": "啊——好长一个哈欠。",
      "text": {
        "narration": {
          "at": [
            382.6,
            200
          ],
          "size": 4.3,
          "width": 537.4,
          "text": "啊——好长一个哈欠。",
          "align": "right"
        }
      },
      "responseTo": "p54",
      "char": {
        "pose": "yawn",
        "at": [
          240,
          255
        ],
        "scale": 0.65,
        "spiral": true
      },
      "props": [
        {
          "id": "K2-red",
          "kind": "paper-red",
          "at": [
            380,
            760
          ],
          "scale": 0.09,
          "style": "opacity:.4"
        },
        {
          "id": "K2-blue",
          "kind": "paper-blue",
          "at": [
            600,
            770
          ],
          "scale": 0.1,
          "style": "opacity:.4"
        },
        {
          "id": "K2-yellow",
          "kind": "paper-yellow",
          "at": [
            760,
            755
          ],
          "scale": 0.1,
          "style": "opacity:.4"
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
          136.44,
          141.53
        ],
        "scale": 0.85
      }
    }
  ]
};
