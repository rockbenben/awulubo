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
      "id": "p38",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "球在你面前。\n把球推给它。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 8.666666666666666,
          "width": 643.6,
          "text": "球在你面前。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "把球推给它。",
          "print": "把球推给它。",
          "align": "left"
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
          "kind": "child-reach",
          "at": [
            15,
            700
          ],
          "scale": 0.5
        },
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            125,
            610
          ],
          "scale": 0.25,
          "class": "prop-ball",
          "style": "--ball:var(--blue);--go-x:320;--go-y:0"
        }
      ],
      "hotspot": {
        "targetId": "ball-1",
        "action": "pass",
        "target": "ball",
        "at": [
          150,
          635
        ],
        "size": 250,
        "label": "把球推给它"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          68.17,
          -160.91
        ],
        "scale": 0.96
      }
    },
    {
      "id": "p39",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "球一路滚到它脚边。",
      "text": {
        "narration": {
          "at": [
            305.9,
            735
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "球一路滚到它脚边。",
          "align": "right"
        }
      },
      "char": {
        "pose": "yield",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-low"
      },
      "responseTo": "p38",
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
            445,
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
          68.17,
          -160.91
        ],
        "scale": 0.96
      }
    }
  ]
};
