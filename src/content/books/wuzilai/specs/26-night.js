/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--night"
  },
  "scene": {
    "kind": "window-nook",
    "light": "night"
  },
  "pages": [
    {
      "id": "p52",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "天黑了，它打个大哈欠。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "天黑了，它打个大哈欠。",
          "color": "--paper",
          "align": "left"
        }
      },
      "char": {
        "pose": "curled-yawn",
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
          111.35,
          -199.36
        ],
        "scale": 0.9
      }
    },
    {
      "id": "p53",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你也靠下来，伸直两条腿。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "你也靠下来，伸直两条腿。",
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
      "responseTo": "p52",
      "framing": {
        "at": [
          111.35,
          -199.36
        ],
        "scale": 0.9
      }
    }
  ]
};
