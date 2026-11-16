/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-pink"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p24",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "屋里静下来。\n轻轻哼一小段。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 5.2,
          "width": 398.16,
          "text": "屋里静下来。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻哼一小段。",
          "print": "轻轻哼一小段。",
          "align": "left"
        }
      },
      "char": {
        "pose": "sick-curled",
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
      "hotspot": {
        "targetId": "character",
        "action": "poke",
        "at": [
          328.77,
          548.8
        ],
        "size": 403.14,
        "label": "轻轻哼一小段"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          72.21,
          3.51
        ],
        "scale": 0.95
      }
    },
    {
      "id": "p25",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "夜蓝色里，只剩毯子轻轻起伏。",
      "text": {
        "narration": {
          "at": [
            433.34,
            200
          ],
          "size": 4.3,
          "width": 486.66,
          "text": "夜蓝色里，<br>只剩毯子轻轻起伏。",
          "color": "--paper",
          "align": "right"
        }
      },
      "responseTo": "p24",
      "char": {
        "pose": "covered-rest",
        "at": [
          260,
          300
        ],
        "scale": 0.62,
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
          "kind": "blanket-lap",
          "at": [
            235,
            560
          ],
          "scale": 0.62
        }
      ],
      "bg": {
        "wash": "--night",
        "focus": [
          0,
          500
        ]
      },
      "turn": "夜蓝色",
      "framing": {
        "at": [
          72.21,
          3.51
        ],
        "scale": 0.95
      }
    }
  ]
};
