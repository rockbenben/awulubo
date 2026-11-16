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
      "id": "p10",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "你也想摸摸球。\n问问它：能摸摸吗？",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 7.428571428571429,
          "width": 643.6,
          "text": "你也想摸摸球。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "问问它：能摸摸吗？",
          "print": "问问它：能摸摸吗？",
          "align": "left"
        }
      },
      "char": {
        "pose": "hesitant",
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
        },
        {
          "id": "child-hand",
          "kind": "child-reach",
          "at": [
            20,
            620
          ],
          "scale": 1
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
          14,
          -66.75
        ],
        "scale": 1.05
      }
    },
    {
      "id": "p11",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它侧着身，把球挪到另一边。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "它侧着身，把球挪到另一边。",
          "align": "right"
        }
      },
      "char": {
        "pose": "side",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-tilted"
      },
      "responseTo": "p10",
      "props": [
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            660,
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
          14,
          -66.75
        ],
        "scale": 1.05
      }
    }
  ]
};
