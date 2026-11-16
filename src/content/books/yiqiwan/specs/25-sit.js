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
      "id": "p50",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它低低头，让你摘下小发带。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 689.62,
          "text": "它低低头，让你摘下小发带。",
          "align": "left"
        }
      },
      "char": {
        "pose": "bow",
        "at": [
          350,
          310
        ],
        "scale": 0.62,
        "spiral": false
      },
      "props": [
        {
          "id": "child-hand",
          "kind": "child-reach",
          "at": [
            400,
            330
          ],
          "scale": 0.7
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
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            480,
            340
          ],
          "scale": 0.35,
          "style": "--wear-headband:inline;--wear-head-tilt:rotate(-16deg)"
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
          95.24,
          242.55
        ],
        "scale": 0.73
      }
    },
    {
      "id": "p51",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你们挨着坐，球留在中间。",
      "text": {
        "narration": {
          "at": [
            281.12,
            200
          ],
          "size": 4.3,
          "width": 638.88,
          "text": "你们挨着坐，球留在中间。",
          "align": "right"
        }
      },
      "char": {
        "pose": "curled",
        "at": [
          530,
          300
        ],
        "scale": 0.55,
        "spiral": false
      },
      "responseTo": "p50",
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
          "style": "--ball:var(--blue)"
        },
        {
          "id": "headband-1",
          "kind": "headband",
          "at": [
            30,
            700
          ],
          "scale": 0.4,
          "style": "--wear-headband:inline;--wear-head-tilt:rotate(-16deg)"
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
          95.24,
          242.55
        ],
        "scale": 0.73
      }
    }
  ]
};
