/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-yellow",
    "colors": [
      "--yellow"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "window-nook"
  },
  "pages": [
    {
      "id": "p30",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "又一个早晨，窗边透进浅黄的光。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.5,
          "width": 507.9,
          "text": "又一个早晨，<br>窗边透进浅黄的光。",
          "align": "left"
        }
      },
      "char": {
        "pose": "sleep-curled",
        "at": [
          230,
          300
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-pale"
      },
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            35,
            590
          ],
          "scale": 0.22,
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket-lap",
          "at": [
            235,
            560
          ],
          "scale": 0.62
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
          87.18,
          -326.65
        ],
        "scale": 1.05
      }
    },
    {
      "id": "p31",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它伸出一只脚，蹬开毯角。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它伸出一只脚，蹬开毯角。",
          "align": "right"
        }
      },
      "responseTo": "p30",
      "char": {
        "pose": "kick-corner",
        "at": [
          260,
          300
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-pale"
      },
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            35,
            590
          ],
          "scale": 0.22,
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket-lap-open",
          "at": [
            235,
            560
          ],
          "scale": 0.62
        },
        {
          "id": "foot-corner",
          "kind": "foot-pushing",
          "at": [
            675,
            730
          ],
          "scale": 0.65
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
          87.18,
          -326.65
        ],
        "scale": 1.05
      }
    }
  ]
};
