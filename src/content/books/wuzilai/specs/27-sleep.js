/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--night"
  },
  "scene": {
    "kind": "room",
    "light": "night"
  },
  "pages": [
    {
      "id": "p54",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你看看篮子。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 5.2,
          "width": 398.16,
          "text": "你看看篮子。",
          "color": "--paper",
          "align": "left"
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
          "layer": "behind",
          "style": "opacity:.65"
        },
        {
          "id": "apple-1",
          "kind": "apple",
          "at": [
            75,
            600
          ],
          "scale": 0.16,
          "class": "in-basket",
          "style": ";opacity:.65"
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            185,
            650
          ],
          "scale": 0.18,
          "class": "in-basket",
          "style": ";opacity:.65"
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            300,
            590
          ],
          "scale": 0.14,
          "class": "in-basket",
          "style": ";opacity:.65"
        }
      ],
      "framing": {
        "at": [
          77.59,
          94.5
        ],
        "scale": 0.85
      }
    },
    {
      "id": "p55",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "苹果、小鱼、星星，都在呢。",
      "text": {
        "narration": {
          "at": [
            230.38,
            200
          ],
          "size": 4.3,
          "width": 689.62,
          "text": "苹果、小鱼、星星，都在呢。",
          "color": "--paper",
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
          "layer": "behind",
          "style": "opacity:.65"
        },
        {
          "id": "apple-1",
          "kind": "apple",
          "at": [
            75,
            600
          ],
          "scale": 0.16,
          "class": "in-basket",
          "style": ";opacity:.65"
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            185,
            650
          ],
          "scale": 0.18,
          "class": "in-basket",
          "style": ";opacity:.65"
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            300,
            590
          ],
          "scale": 0.14,
          "class": "in-basket",
          "style": ";opacity:.65"
        }
      ],
      "responseTo": "p54",
      "framing": {
        "at": [
          77.59,
          94.5
        ],
        "scale": 0.85
      }
    }
  ]
};
