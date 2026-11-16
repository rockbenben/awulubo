/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-orange"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p22",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "忽然，都松了。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 7.428571428571429,
          "width": 643.6,
          "text": "忽然，都松了。",
          "align": "left"
        }
      },
      "char": {
        "pose": "startled-seat",
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
          "kind": "ball-squeezed",
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
            12,
            620
          ],
          "scale": 0.9
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
          22.4,
          -104.23
        ],
        "scale": 1.05
      }
    },
    {
      "id": "p23",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "骨碌碌！球弹圆，滚到墙脚。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "骨碌碌！球弹圆，滚到墙脚。",
          "align": "right"
        }
      },
      "char": {
        "pose": "startled-seat",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-low"
      },
      "responseTo": "p22",
      "props": [
        {
          "id": "wall-anchor",
          "kind": "wall-foot",
          "at": [
            185,
            515
          ],
          "scale": 0.4,
          "layer": "behind",
          "style": "--scene-ink:var(--ink);--scene-line-opacity:.22"
        },
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            225,
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
          22.4,
          -104.23
        ],
        "scale": 1.05
      }
    }
  ]
};
