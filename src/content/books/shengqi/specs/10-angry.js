/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "wash": "--wash-red",
    "kind": "rays",
    "colors": [
      "--red",
      "--wash-red"
    ],
    "gap": "--wash-red",
    "cover": "all"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p20",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "四周红红的，两个都气鼓鼓。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "四周红红的，两个都气鼓鼓。",
          "align": "left"
        }
      },
      "char": {
        "pose": "puffed-side",
        "at": [
          470,
          280
        ],
        "scale": 0.6,
        "spiral": true,
        "wear": "scarf-creased"
      },
      "props": [
        {
          "id": "paper-narration",
          "kind": "blob",
          "at": [
            -173.73,
            -441.12
          ],
          "scale": 1.32,
          "layer": "behind"
        },
        {
          "id": "block-1",
          "kind": "block",
          "at": [
            90,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            280,
            630
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            400,
            655
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            -50,
            710
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            350,
            800
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"
        }
      ],
      "bg": {
        "focus": [
          1000,
          520
        ]
      },
      "framing": {
        "at": [
          13.58,
          -58.33
        ],
        "scale": 0.91
      }
    },
    {
      "id": "p21",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "一个朝这边，一个朝那边。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "一个朝这边，一个朝那边。",
          "align": "right"
        }
      },
      "char": {
        "pose": "tense-back",
        "at": [
          470,
          280
        ],
        "scale": 0.6,
        "spiral": true,
        "wear": "scarf-creased"
      },
      "props": [
        {
          "id": "paper-narration",
          "kind": "blob",
          "at": [
            -45.43,
            -391.67
          ],
          "scale": 1.32,
          "layer": "behind"
        },
        {
          "id": "block-1",
          "kind": "block",
          "at": [
            90,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            280,
            630
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            400,
            655
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            -50,
            710
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            350,
            800
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"
        }
      ],
      "responseTo": "p20",
      "bg": {
        "focus": [
          0,
          520
        ]
      },
      "framing": {
        "at": [
          13.58,
          -58.33
        ],
        "scale": 0.91
      }
    }
  ]
};
