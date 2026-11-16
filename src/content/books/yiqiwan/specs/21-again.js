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
      "id": "p42",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "它挺起身，把球推过来。\n张开手接一接。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "它挺起身，把球推过来。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "张开手接一接。",
          "print": "张开手接一接。",
          "align": "left"
        }
      },
      "char": {
        "pose": "step",
        "at": [
          350,
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
          "id": "ball-1",
          "kind": "ball",
          "at": [
            445,
            610
          ],
          "scale": 0.25,
          "class": "prop-ball",
          "style": "--ball:var(--blue);--go-x:-320;--go-y:-110"
        }
      ],
      "hotspot": {
        "targetId": "ball-1",
        "action": "pass",
        "target": "ball",
        "at": [
          470,
          635
        ],
        "size": 250,
        "label": "张开手接一接"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          143.51,
          -125.04
        ],
        "scale": 0.78
      }
    },
    {
      "id": "p43",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "球滚过来，你抱住了。",
      "text": {
        "narration": {
          "at": [
            241,
            735
          ],
          "size": 5.5,
          "width": 679,
          "text": "球滚过来，你抱住了。",
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
      "responseTo": "p42",
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
          143.51,
          -125.04
        ],
        "scale": 0.78
      }
    }
  ]
};
