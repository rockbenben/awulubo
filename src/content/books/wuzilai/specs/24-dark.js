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
      "id": "p48",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你拍拍地垫空出来的地方。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "你拍拍地垫空出来的地方。",
          "align": "left"
        }
      },
      "char": {
        "pose": "ready",
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
          -25.17,
          -26.03
        ],
        "scale": 0.98
      }
    },
    {
      "id": "p49",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它挪来，和你挨在一块儿。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它挪来，和你挨在一块儿。",
          "align": "right"
        }
      },
      "char": {
        "pose": "curled",
        "at": [
          530,
          300
        ],
        "scale": 0.52,
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
      "responseTo": "p48",
      "framing": {
        "at": [
          -25.17,
          -26.03
        ],
        "scale": 0.98
      }
    }
  ]
};
