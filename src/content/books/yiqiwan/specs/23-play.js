/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "rays",
    "wash": "--wash-yellow",
    "colors": [
      "--yellow"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p46",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "它把球推回来，黄颜色铺开。\n一起说声嘿！",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "它把球推回来，黄颜色铺开。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "一起说声嘿！",
          "print": "一起说声嘿！",
          "align": "left"
        }
      },
      "char": {
        "pose": "push",
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
          "id": "fantasy-distance",
          "kind": "castle",
          "at": [
            -350,
            50
          ],
          "scale": 0.65,
          "layer": "behind",
          "style": "--scene-sky:var(--wash-orange);--scene-castle-opacity:.18;--scene-ink:var(--ink);--scene-line-opacity:.08"
        },
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
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -170.5,
          -134.3
        ],
        "scale": 1.19
      }
    },
    {
      "id": "p47",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "球来回滚，你们笑个不停！",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "球来回滚，你们笑个不停！",
          "align": "right"
        }
      },
      "char": {
        "pose": "joy",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "wear": "headband-low"
      },
      "responseTo": "p46",
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
            270,
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
          -170.5,
          -134.3
        ],
        "scale": 1.19
      }
    }
  ]
};
