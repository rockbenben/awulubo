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
      "id": "p36",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "轮到你玩一会儿。\n轻轻抛一下。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "轮到你玩一会儿。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻抛一下。",
          "print": "轻轻抛一下。",
          "align": "left"
        }
      },
      "char": {
        "pose": "waiting-up",
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
          "style": "--ball:var(--blue);--go-x:0;--go-y:0;--go-arc:90"
        }
      ],
      "hotspot": {
        "targetId": "ball-1",
        "action": "pass",
        "target": "ball",
        "at": [
          150,
          525
        ],
        "size": 250,
        "label": "轻轻抛一下"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -112.1,
          -262.7
        ],
        "scale": 1.1
      }
    },
    {
      "id": "p37",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "呼——球落下来，你抱住了。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "呼——球落下来，你抱住了。",
          "align": "right"
        }
      },
      "char": {
        "pose": "waiting-up",
        "at": [
          450,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-low"
      },
      "responseTo": "p36",
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
          -112.1,
          -262.7
        ],
        "scale": 1.1
      }
    }
  ]
};
