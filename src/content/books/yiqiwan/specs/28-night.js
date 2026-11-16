/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--night-deep"
  },
  "scene": {
    "kind": "room",
    "light": "late-night"
  },
  "pages": [
    {
      "id": "p56",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "晚安。\n轻轻翻过去。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 5.2,
          "width": 380,
          "text": "晚安。",
          "color": "--paper",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻翻过去。",
          "print": "轻轻翻过去。",
          "color": "--paper",
          "align": "left"
        }
      },
      "char": {
        "pose": "covered-rest",
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
          "style": "--ball:var(--blue);opacity:.3"
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            30,
            700
          ],
          "scale": 0.4,
          "style": "--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.3"
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
          84.15,
          155.42
        ],
        "scale": 0.75
      }
    },
    {
      "id": "p57",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "呼噜……",
      "text": {
        "narration": {
          "at": [
            540,
            200
          ],
          "size": 5.2,
          "width": 380,
          "text": "呼噜……",
          "color": "--paper",
          "align": "right"
        }
      },
      "char": {
        "pose": "covered-rest",
        "at": [
          530,
          300
        ],
        "scale": 0.55,
        "spiral": false
      },
      "responseTo": "p56",
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
          "style": "--ball:var(--blue);opacity:.3"
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            30,
            700
          ],
          "scale": 0.4,
          "style": "--wear-headband:inline;--wear-head-tilt:rotate(-16deg);opacity:.3"
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
          84.15,
          155.42
        ],
        "scale": 0.75
      }
    }
  ]
};
