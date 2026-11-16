/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-orange",
    "colors": [
      "--wash-orange"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p34",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "它追到墙脚，用肚子把球推回。\n接住滚来的球。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "它追到墙脚，<br>用肚子把球推回。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "接住滚来的球。",
          "print": "接住滚来的球。",
          "align": "left"
        }
      },
      "char": {
        "pose": "push",
        "at": [
          280,
          390
        ],
        "scale": 0.5,
        "spiral": true,
        "wear": "headband-low"
      },
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
          "style": "--ball:var(--blue);--go-x:-100;--go-y:-110"
        }
      ],
      "hotspot": {
        "targetId": "ball-1",
        "action": "pass",
        "target": "ball",
        "at": [
          250,
          635
        ],
        "size": 250,
        "label": "接住滚来的球"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -19.21,
          -24.92
        ],
        "scale": 0.86
      }
    },
    {
      "id": "p35",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "球滚了好远，你伸手接住了。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "球滚了好远，你伸手接住了。",
          "align": "right"
        }
      },
      "char": {
        "pose": "ready",
        "at": [
          450,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-low"
      },
      "responseTo": "p34",
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
          "id": "child-hand",
          "kind": "palm",
          "at": [
            75,
            450
          ],
          "scale": 0.35
        },
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            125,
            500
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
          -19.21,
          -24.92
        ],
        "scale": 0.86
      }
    }
  ]
};
