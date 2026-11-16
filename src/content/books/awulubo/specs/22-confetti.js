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
    "kind": "room"
  },
  "pages": [
    {
      "noSound": true,
      "id": "p22",
      "template": "t-dialog",
      "reading": "observe",
      "aria": "一片彩纸贴上它的脑门。指指那片彩纸。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "一片彩纸贴上它的脑门。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "指指那片彩纸。",
          "print": "指指那片彩纸。",
          "align": "left"
        }
      },
      "char": {
        "pose": "cross-eyed",
        "at": [
          100,
          225
        ],
        "scale": 0.7,
        "spiral": true,
        "wear": "paper"
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
          58.71,
          196.31
        ],
        "scale": 0.79
      }
    },
    {
      "noSound": true,
      "id": "p23",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "彩纸一卷，带着它飞过去！",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "彩纸一卷，带着它飞过去！",
          "align": "right"
        }
      },
      "responseTo": "p22",
      "char": {
        "pose": "flying",
        "at": [
          100,
          -10
        ],
        "scale": 0.82,
        "spiral": true,
        "wear": "paper"
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
          58.71,
          196.31
        ],
        "scale": 0.79
      }
    }
  ]
};
