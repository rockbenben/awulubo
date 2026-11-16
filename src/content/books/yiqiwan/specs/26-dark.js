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
      "aria": "天黑，球上也落着月光。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "天黑，球上也落着月光。",
          "color": "--paper",
          "align": "left"
        }
      },
      "char": {
        "pose": "sleep-curled",
        "at": [
          530,
          300
        ],
        "scale": 0.55,
        "spiral": false
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
          "style": "--ball:var(--blue);opacity:.65"
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            30,
            700
          ],
          "scale": 0.4,
          "style": "--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.65"
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
          -116.1,
          -121.11
        ],
        "scale": 1
      }
    },
    {
      "id": "p53",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它打了个哈欠。",
      "text": {
        "narration": {
          "at": [
            276.4,
            150
          ],
          "size": 7.428571428571429,
          "width": 643.6,
          "text": "它打了个哈欠。",
          "color": "--paper",
          "align": "right"
        }
      },
      "char": {
        "pose": "curled-yawn",
        "at": [
          530,
          300
        ],
        "scale": 0.55,
        "spiral": false
      },
      "responseTo": "p52",
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
          "style": "--ball:var(--blue);opacity:.65"
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            30,
            700
          ],
          "scale": 0.4,
          "style": "--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.65"
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
          -116.1,
          -121.11
        ],
        "scale": 1
      }
    }
  ]
};
