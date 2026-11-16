/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--night-deep"
  },
  "scene": {
    "kind": "grass",
    "light": "late-night",
    "occlude": false,
    "grassScale": 2
  },
  "pages": [
    {
      "noSound": true,
      "id": "p58",
      "template": "t-night t-night-deep",
      "reading": "autonomous",
      "aria": "它睡着了。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 5.2,
          "width": 380,
          "text": "它睡着了。",
          "align": "left"
        }
      },
      "char": {
        "pose": "sleep-curled",
        "at": [
          160,
          310
        ],
        "scale": 0.6,
        "spiral": false
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
          "style": "opacity:.22"
        },
        {
          "id": "apple-G",
          "kind": "apple",
          "at": [
            90,
            710
          ],
          "scale": 0.075,
          "style": "opacity:.22"
        },
        {
          "id": "apple-H",
          "kind": "apple",
          "at": [
            170,
            710
          ],
          "scale": 0.075,
          "style": "opacity:.22"
        },
        {
          "id": "K2-red",
          "kind": "paper-red",
          "at": [
            380,
            760
          ],
          "scale": 0.09,
          "style": "opacity:.22"
        },
        {
          "id": "K2-blue",
          "kind": "paper-blue",
          "at": [
            600,
            770
          ],
          "scale": 0.1,
          "style": "opacity:.22"
        },
        {
          "id": "K2-yellow",
          "kind": "paper-yellow",
          "at": [
            760,
            755
          ],
          "scale": 0.1,
          "style": "opacity:.22"
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
          174.94,
          135.89
        ],
        "scale": 0.76
      }
    },
    {
      "noSound": true,
      "id": "p59",
      "template": "t-night t-night-deep",
      "reading": "autonomous",
      "aria": "明天见。",
      "text": {
        "narration": {
          "at": [
            540,
            200
          ],
          "size": 5.2,
          "width": 380,
          "text": "明天见。",
          "align": "right"
        }
      },
      "responseTo": "p58",
      "char": {
        "pose": "sleep-curled",
        "at": [
          270,
          310
        ],
        "scale": 0.6,
        "spiral": false
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
          "style": "opacity:.22"
        },
        {
          "id": "K2-blue",
          "kind": "paper-blue",
          "at": [
            600,
            770
          ],
          "scale": 0.1,
          "style": "opacity:.22"
        },
        {
          "id": "K2-yellow",
          "kind": "paper-yellow",
          "at": [
            760,
            755
          ],
          "scale": 0.1,
          "style": "opacity:.22"
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
          174.94,
          135.89
        ],
        "scale": 0.76
      }
    }
  ]
};
