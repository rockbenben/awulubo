/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-cream",
    "colors": [
      "--wash-yellow",
      "--wash-cream"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "play-mat"
  },
  "pages": [
    {
      "id": "p46",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你说：小鱼、星星，我收的！",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "你说：小鱼、星星，我收的！",
          "align": "left"
        }
      },
      "char": {
        "pose": "proud-belly",
        "at": [
          570,
          260
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
            300,
            590
          ],
          "scale": 0.14,
          "class": "in-basket"
        }
      ],
      "framing": {
        "at": [
          -22.1,
          14.51
        ],
        "scale": 0.93
      }
    },
    {
      "id": "p47",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它笑了：苹果是我收的！",
      "text": {
        "narration": {
          "at": [
            176.10000000000002,
            150
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "它笑了：苹果是我收的！",
          "align": "right"
        }
      },
      "char": {
        "pose": "beaming-lean",
        "at": [
          570,
          260
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
            300,
            590
          ],
          "scale": 0.14,
          "class": "in-basket"
        }
      ],
      "responseTo": "p46",
      "framing": {
        "at": [
          -22.1,
          14.51
        ],
        "scale": 0.93
      }
    }
  ]
};
