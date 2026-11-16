/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-red"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p22",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "你就在旁边。\n轻轻拍拍它。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 8.666666666666666,
          "width": 643.6,
          "text": "你就在旁边。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻拍拍它。",
          "print": "轻轻拍拍它。",
          "align": "left"
        }
      },
      "char": {
        "pose": "listen-low",
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
          "kind": "blanket-fold",
          "at": [
            275,
            550
          ],
          "scale": 0.58
        }
      ],
      "hotspot": {
        "targetId": "character",
        "action": "poke",
        "at": [
          297.43,
          507.92
        ],
        "size": 453.69,
        "label": "轻轻拍拍它"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          89.57,
          -296.43
        ],
        "scale": 1.06
      }
    },
    {
      "id": "p23",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它向你一歪，红色慢慢淡下去。",
      "text": {
        "narration": {
          "at": [
            465.2,
            735
          ],
          "size": 4.5,
          "width": 454.8,
          "text": "它向你一歪，<br>红色慢慢淡下去。",
          "align": "right"
        }
      },
      "responseTo": "p22",
      "char": {
        "pose": "lean-close",
        "at": [
          245,
          315
        ],
        "scale": 0.66,
        "spiral": false,
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
          "kind": "blanket-fold",
          "at": [
            275,
            550
          ],
          "scale": 0.58
        }
      ],
      "bg": {
        "wash": "--wash-pink",
        "focus": [
          0,
          500
        ]
      },
      "turn": "红色慢慢淡下去",
      "framing": {
        "at": [
          89.57,
          -296.43
        ],
        "scale": 1.06
      }
    }
  ]
};
