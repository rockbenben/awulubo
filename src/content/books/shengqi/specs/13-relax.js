/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "wash": "--wash-red",
    "kind": "none"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p26",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你慢慢放下肩膀。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "你慢慢放下肩膀。",
          "align": "left"
        }
      },
      "char": {
        "pose": "soften-side",
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
      "framing": {
        "at": [
          9.27,
          -106.15
        ],
        "scale": 0.96
      }
    },
    {
      "id": "p27",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它松开眉毛，领巾也摊平了。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "它松开眉毛，领巾也摊平了。",
          "align": "right"
        }
      },
      "char": {
        "pose": "neutral-front",
        "at": [
          470,
          280
        ],
        "scale": 0.6,
        "spiral": true,
        "wear": "scarf"
      },
      "props": [
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
      "responseTo": "p26",
      "framing": {
        "at": [
          9.27,
          -106.15
        ],
        "scale": 0.96
      }
    }
  ]
};
