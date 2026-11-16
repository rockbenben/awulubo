/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-cream",
    "colors": [
      "--wash-yellow"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "noSound": true,
      "id": "p28",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "天亮啦，肚子又咕噜叫。轻轻摸摸噜啵。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "天亮啦，肚子又咕噜叫。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻摸摸噜啵。",
          "print": "轻轻摸摸噜啵。",
          "align": "left"
        }
      },
      "char": {
        "pose": "prone",
        "at": [
          130,
          270
        ],
        "scale": 0.65,
        "spiral": false
      },
      "props": [
        {
          "id": "K1-tag",
          "kind": "paper-red",
          "at": [
            170,
            755
          ],
          "scale": 0.065
        },
        {
          "id": "K1-1",
          "kind": "paper-blue",
          "at": [
            600,
            765
          ],
          "scale": 0.07
        }
      ],
      "hotspot": {
        "targetId": "character",
        "action": "poke",
        "target": "char",
        "at": [
          216.83,
          570.48
        ],
        "size": 485,
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
          -171.63,
          -166.46
        ],
        "scale": 1.23
      }
    },
    {
      "noSound": true,
      "id": "p29",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "它一翻身，朝你探过来。",
      "text": {
        "narration": {
          "at": [
            176.10000000000002,
            150
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "它一翻身，朝你探过来。",
          "align": "right"
        }
      },
      "responseTo": "p28",
      "char": {
        "pose": "lean-near",
        "at": [
          240,
          255
        ],
        "scale": 0.65,
        "spiral": true
      },
      "props": [
        {
          "id": "K1-tag",
          "kind": "paper-red",
          "at": [
            170,
            755
          ],
          "scale": 0.065
        },
        {
          "id": "K1-1",
          "kind": "paper-blue",
          "at": [
            600,
            765
          ],
          "scale": 0.07
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
          -171.63,
          -166.46
        ],
        "scale": 1.23
      }
    }
  ]
};
