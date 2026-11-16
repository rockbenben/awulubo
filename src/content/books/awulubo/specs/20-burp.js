/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "rays",
    "wash": "--wash-yellow",
    "colors": [
      "--yellow"
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
      "id": "p20",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "肚子里咕噜咕噜。用手指画个圈。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "肚子里咕噜咕噜。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "用手指画个圈。",
          "print": "用手指画个圈。",
          "align": "left"
        }
      },
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
      "hotspot": {
        "targetId": "character",
        "action": "rub",
        "target": "belly",
        "at": [
          245,
          405
        ],
        "size": 350,
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
          7.58,
          102.48
        ],
        "scale": 0.91
      }
    },
    {
      "noSound": true,
      "id": "p21",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "嗝——啵！肚子小了，彩纸冲上天！",
      "text": {
        "narration": {
          "at": [
            241,
            95
          ],
          "size": 5.5,
          "width": 679,
          "text": "嗝——啵！肚子小了，<br>彩纸冲上天！",
          "align": "right"
        }
      },
      "responseTo": "p20",
      "char": {
        "pose": "burp",
        "at": [
          270,
          290
        ],
        "scale": 0.6,
        "spiral": true
      },
      "props": [
        {
          "id": "K1-0",
          "kind": "paper-red",
          "at": [
            30,
            280
          ],
          "scale": 0.08,
          "rotate": -14
        },
        {
          "id": "K1-1",
          "kind": "paper-blue",
          "at": [
            230,
            260
          ],
          "scale": 0.08,
          "rotate": 0
        },
        {
          "id": "K1-2",
          "kind": "paper-yellow",
          "at": [
            400,
            250
          ],
          "scale": 0.08,
          "rotate": 14
        },
        {
          "id": "K1-3",
          "kind": "paper-red",
          "at": [
            850,
            260
          ],
          "scale": 0.08,
          "rotate": -14
        },
        {
          "id": "K1-4",
          "kind": "paper-blue",
          "at": [
            870,
            350
          ],
          "scale": 0.08,
          "rotate": 0
        },
        {
          "id": "K1-5",
          "kind": "paper-yellow",
          "at": [
            30,
            620
          ],
          "scale": 0.08,
          "rotate": 14
        },
        {
          "id": "K1-6",
          "kind": "paper-red",
          "at": [
            860,
            680
          ],
          "scale": 0.08,
          "rotate": -14
        },
        {
          "id": "K1-7",
          "kind": "paper-blue",
          "at": [
            850,
            500
          ],
          "scale": 0.08,
          "rotate": 0
        },
        {
          "id": "K1-8",
          "kind": "paper-yellow",
          "at": [
            30,
            480
          ],
          "scale": 0.08,
          "rotate": 14
        },
        {
          "id": "K1-tag",
          "kind": "paper-red",
          "at": [
            540,
            200
          ],
          "scale": 0.065
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
          7.58,
          102.48
        ],
        "scale": 0.91
      }
    }
  ]
};
