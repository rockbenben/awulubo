/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-blue",
    "colors": [
      "--wash-blue"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p18",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "它自己转回脸，朝杯子张开嘴。\n把杯子递近些。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 484.3,
          "text": "它自己转回脸，<br>朝杯子张开嘴。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "把杯子递近些。",
          "print": "把杯子递近些。",
          "align": "left"
        }
      },
      "char": {
        "pose": "willing",
        "at": [
          280,
          300
        ],
        "scale": 0.58,
        "spiral": true,
        "state": "state-pale"
      },
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            730,
            670
          ],
          "scale": 0.26,
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
        "targetId": "cup-1",
        "action": "water",
        "target": "cup",
        "at": [
          740,
          700
        ],
        "size": 250,
        "label": "把杯子递近些"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -81.21,
          -149.95
        ],
        "scale": 1.08
      }
    },
    {
      "id": "p19",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "咕嘟。它只喝了一小口。",
      "text": {
        "narration": {
          "at": [
            176.10000000000002,
            150
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "咕嘟。它只喝了一小口。",
          "align": "right"
        }
      },
      "responseTo": "p18",
      "char": {
        "pose": "sip",
        "at": [
          280,
          300
        ],
        "scale": 0.58,
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
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          -81.21,
          -149.95
        ],
        "scale": 1.08
      }
    }
  ]
};
