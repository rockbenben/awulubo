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
      "id": "p32",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "毯边搭在头顶，它还眯着眼。\n叫一声噜啵。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "毯边搭在头顶，它还眯着眼。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "叫一声噜啵。",
          "print": "叫一声噜啵。",
          "align": "left"
        }
      },
      "char": {
        "pose": "tired",
        "at": [
          210,
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
          "kind": "blanket-hood",
          "at": [
            275,
            340
          ],
          "scale": 0.58
        }
      ],
      "hotspot": {
        "targetId": "character",
        "action": "poke",
        "at": [
          326.17,
          425.81
        ],
        "size": 405.93,
        "label": "叫一声噜啵"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -88.74,
          -141.49
        ],
        "scale": 1.15
      }
    },
    {
      "id": "p33",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它眨眨眼，又眯起来。",
      "text": {
        "narration": {
          "at": [
            241,
            150
          ],
          "size": 5.5,
          "width": 679,
          "text": "它眨眨眼，又眯起来。",
          "align": "right"
        }
      },
      "responseTo": "p32",
      "char": {
        "pose": "sick-curled",
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
          "kind": "blanket-hood",
          "at": [
            270,
            465
          ],
          "scale": 0.62
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
          -88.74,
          -141.49
        ],
        "scale": 1.15
      }
    }
  ]
};
