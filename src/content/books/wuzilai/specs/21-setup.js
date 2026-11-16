/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-cream"
  },
  "scene": {
    "kind": "play-mat"
  },
  "pages": [
    {
      "id": "p42",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你说：等一等，我自己来。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "你说：等一等，我自己来。",
          "align": "left"
        }
      },
      "char": {
        "pose": "poised-left",
        "at": [
          570,
          350
        ],
        "scale": 0.5,
        "spiral": true,
        "wear": "vest"
      },
      "props": [
        {
          "id": "basket-1",
          "kind": "basket-side",
          "at": [
            20,
            380
          ],
          "scale": 0.6,
          "layer": "behind"
        },
        {
          "id": "apple-1",
          "kind": "apple",
          "at": [
            75,
            600
          ],
          "scale": 0.16,
          "class": "in-basket"
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            185,
            650
          ],
          "scale": 0.18,
          "class": "in-basket"
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            500,
            680
          ],
          "scale": 0.14
        },
        {
          "id": "child-foot",
          "kind": "child-foot",
          "at": [
            630,
            800
          ],
          "scale": 0.3
        }
      ],
      "framing": {
        "at": [
          -23.94,
          -64.45
        ],
        "scale": 0.96
      }
    },
    {
      "id": "p43",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它收住小脚，退开一大步。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它收住小脚，退开一大步。",
          "align": "right"
        }
      },
      "char": {
        "pose": "withdraw-step",
        "at": [
          600,
          330
        ],
        "scale": 0.5,
        "spiral": true,
        "wear": "vest"
      },
      "props": [
        {
          "id": "basket-1",
          "kind": "basket-side",
          "at": [
            20,
            380
          ],
          "scale": 0.6,
          "layer": "behind"
        },
        {
          "id": "apple-1",
          "kind": "apple",
          "at": [
            75,
            600
          ],
          "scale": 0.16,
          "class": "in-basket"
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            185,
            650
          ],
          "scale": 0.18,
          "class": "in-basket"
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            500,
            680
          ],
          "scale": 0.14
        },
        {
          "id": "child-foot",
          "kind": "child-foot",
          "at": [
            630,
            800
          ],
          "scale": 0.3
        }
      ],
      "responseTo": "p42",
      "framing": {
        "at": [
          -23.94,
          -64.45
        ],
        "scale": 0.96
      }
    }
  ]
};
