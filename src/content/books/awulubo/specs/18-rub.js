/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-yellow"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "noSound": true,
      "id": "p18",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "圆肚子一晃一晃。轻轻揉揉肚子。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "圆肚子一晃一晃。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻揉揉肚子。",
          "print": "轻轻揉揉肚子。",
          "align": "left"
        }
      },
      "char": {
        "pose": "inflated",
        "at": [
          150,
          120
        ],
        "scale": 0.76,
        "spiral": true,
        "state": "state-rainbow"
      },
      "hotspot": {
        "targetId": "character",
        "action": "massage",
        "target": "char",
        "at": [
          247.99,
          217.69
        ],
        "size": 559.07,
        "label": "一起试试"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          108.36,
          -37.04
        ],
        "scale": 0.86
      }
    },
    {
      "noSound": true,
      "id": "p19",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "唔……脚尖碰到地了。",
      "text": {
        "narration": {
          "at": [
            241,
            735
          ],
          "size": 5.5,
          "width": 679,
          "text": "唔……脚尖碰到地了。",
          "align": "right"
        }
      },
      "responseTo": "p18",
      "char": {
        "pose": "round-ground",
        "at": [
          150,
          195
        ],
        "scale": 0.73,
        "spiral": true,
        "state": "state-rainbow"
      },
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          108.36,
          -37.04
        ],
        "scale": 0.86
      }
    }
  ]
};
