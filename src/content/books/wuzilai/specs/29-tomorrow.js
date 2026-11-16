/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--night-deep"
  },
  "scene": {
    "kind": "room",
    "light": "late-night"
  },
  "pages": [
    {
      "id": "p58",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "篮子静静放着。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 5.2,
          "width": 459.52,
          "text": "篮子静静放着。",
          "color": "--paper",
          "align": "left"
        }
      },
      "char": {
        "pose": "covered-rest",
        "at": [
          530,
          300
        ],
        "scale": 0.52,
        "spiral": false,
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
          "style": "opacity:.4"
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
          "style": ";opacity:.4"
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
          "style": ";opacity:.4"
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
          "style": ";opacity:.4"
        }
      ],
      "framing": {
        "at": [
          127.29,
          162.2
        ],
        "scale": 0.75
      }
    },
    {
      "id": "p59",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "明天，再一起玩。",
      "text": {
        "narration": {
          "at": [
            484.08,
            200
          ],
          "size": 4.3,
          "width": 435.92,
          "text": "明天，再一起玩。",
          "color": "--paper",
          "align": "right"
        }
      },
      "char": {
        "pose": "covered-rest",
        "at": [
          530,
          300
        ],
        "scale": 0.52,
        "spiral": false,
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
          "style": "opacity:.4"
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
          "style": ";opacity:.4"
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
          "style": ";opacity:.4"
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
          "style": ";opacity:.4"
        }
      ],
      "responseTo": "p58",
      "framing": {
        "at": [
          127.29,
          162.2
        ],
        "scale": 0.75
      }
    }
  ]
};
