/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-cream"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "noSound": true,
      "id": "p24",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "它落地一弹，颜色慢慢淡了。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "它落地一弹，颜色慢慢淡了。",
          "align": "left"
        }
      },
      "char": {
        "pose": "squash",
        "at": [
          120,
          250
        ],
        "scale": 0.66,
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
            480,
            410
          ],
          "scale": 0.065,
          "rotate": 25
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
          135.27,
          -62.37
        ],
        "scale": 0.88
      }
    },
    {
      "noSound": true,
      "id": "p25",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "彩纸落下。明天，还想和你玩。",
      "text": {
        "narration": {
          "at": [
            412.1,
            735
          ],
          "size": 4.5,
          "width": 507.9,
          "text": "彩纸落下。<br>明天，还想和你玩。",
          "align": "right"
        }
      },
      "responseTo": "p24",
      "char": {
        "pose": "ready",
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
          135.27,
          -62.37
        ],
        "scale": 0.88
      }
    }
  ]
};
