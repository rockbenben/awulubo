/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-night"
  },
  "scene": {
    "kind": "room",
    "light": "night"
  },
  "pages": [
    {
      "noSound": true,
      "id": "p26",
      "template": "t-night",
      "reading": "observe",
      "aria": "夜蓝色里，月亮升起来。指一下月亮。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 588.14,
          "text": "夜蓝色里，月亮升起来。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "指一下月亮。",
          "print": "指一下月亮。",
          "align": "left"
        }
      },
      "char": {
        "pose": "curled",
        "at": [
          160,
          310
        ],
        "scale": 0.6,
        "spiral": false
      },
      "props": [
        {
          "id": "K1-tag",
          "kind": "paper-red",
          "at": [
            170,
            755
          ],
          "scale": 0.065
        },
        {
          "id": "K1-1",
          "kind": "paper-blue",
          "at": [
            600,
            765
          ],
          "scale": 0.07
        },
        {
          "id": "moon-1",
          "kind": "moon",
          "at": [
            700,
            260
          ],
          "scale": 0.22,
          "class": "prop-moon"
        }
      ],
      "hotspot": {
        "targetId": "moon-1",
        "action": "find",
        "target": "moon",
        "at": [
          690,
          250
        ],
        "size": 260,
        "label": "指一指"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          124.98,
          274.73
        ],
        "scale": 0.71
      }
    },
    {
      "noSound": true,
      "id": "p27",
      "template": "t-night",
      "reading": "autonomous",
      "aria": "它闭上眼，呼噜……",
      "text": {
        "narration": {
          "at": [
            433.34,
            200
          ],
          "size": 4.3,
          "width": 486.66,
          "text": "它闭上眼，呼噜……",
          "align": "right"
        }
      },
      "responseTo": "p26",
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
          "id": "K1-tag",
          "kind": "paper-red",
          "at": [
            170,
            755
          ],
          "scale": 0.065
        },
        {
          "id": "K1-1",
          "kind": "paper-blue",
          "at": [
            600,
            765
          ],
          "scale": 0.07
        },
        {
          "id": "moon-1",
          "kind": "moon",
          "at": [
            700,
            260
          ],
          "scale": 0.22
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
          124.98,
          274.73
        ],
        "scale": 0.71
      }
    }
  ]
};
