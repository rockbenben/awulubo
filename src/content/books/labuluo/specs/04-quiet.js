/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-blue"
  },
  "scene": {
    "kind": "window-nook"
  },
  "pages": [
    {
      "id": "p04",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "蓝蓝的屋里，没听见咕噜声。\n轻轻叫叫噜啵。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 689.62,
          "text": "蓝蓝的屋里，没听见咕噜声。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻叫叫噜啵。",
          "print": "轻轻叫叫噜啵。",
          "align": "left"
        }
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
          "kind": "blanket",
          "at": [
            165,
            430
          ],
          "scale": 0.74
        }
      ],
      "hotspot": {
        "targetId": "blanket-1",
        "action": "poke",
        "at": [
          200,
          470
        ],
        "size": 650,
        "label": "轻轻叫叫噜啵"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          71.17,
          82.47
        ],
        "scale": 0.9
      }
    },
    {
      "id": "p05",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "噜……毯子里鼓起小小一团。",
      "text": {
        "narration": {
          "at": [
            230.38,
            200
          ],
          "size": 4.3,
          "width": 689.62,
          "text": "噜……毯子里鼓起小小一团。",
          "align": "right"
        }
      },
      "responseTo": "p04",
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
          "kind": "blanket",
          "at": [
            155,
            414
          ],
          "scale": 0.74
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
          71.17,
          82.47
        ],
        "scale": 0.9
      }
    }
  ]
};
