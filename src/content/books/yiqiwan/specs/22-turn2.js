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
      "id": "p44",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "球在你面前。\n轻轻送回球。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 8.666666666666666,
          "width": 643.6,
          "text": "球在你面前。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻送回球。",
          "print": "轻轻送回球。",
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
        "label": "轻轻送回球"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          20.6,
          5.85
        ],
        "scale": 0.96
      }
    },
    {
      "id": "p45",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你一推，它迈开小脚迎上来！",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "你一推，它迈开小脚迎上来！",
          "align": "right"
        }
      },
      "char": {
        "pose": "beaming-lean",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-low"
      },
      "responseTo": "p44",
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
          20.6,
          5.85
        ],
        "scale": 0.96
      }
    }
  ]
};
