/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "bands",
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
      "id": "p20",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它急着往前推，撞上篮边。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它急着往前推，撞上篮边。",
          "align": "left"
        }
      },
      "char": {
        "pose": "head-nudge",
        "at": [
          360,
          300
        ],
        "scale": 0.65,
        "spiral": true,
        "wear": "vest-creased"
      },
      "props": [
        {
          "id": "basket-1",
          "kind": "basket",
          "at": [
            120,
            390
          ],
          "scale": 0.55,
          "layer": "behind"
        },
        {
          "id": "apple-1",
          "kind": "apple",
          "at": [
            570,
            650
          ],
          "scale": 0.16
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            700,
            650
          ],
          "scale": 0.18
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            525,
            670
          ],
          "scale": 0.14
        }
      ],
      "framing": {
        "at": [
          57.87,
          -193.67
        ],
        "scale": 0.95
      }
    },
    {
      "id": "p21",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "哗啦！篮子翻了，三样散开！",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "哗啦！篮子翻了，三样散开！",
          "align": "right"
        }
      },
      "char": {
        "pose": "startled-seat",
        "at": [
          480,
          300
        ],
        "scale": 0.55,
        "spiral": true,
        "wear": "vest-creased"
      },
      "props": [
        {
          "id": "basket-1",
          "kind": "basket-fallen",
          "at": [
            40,
            360
          ],
          "scale": 0.55,
          "layer": "behind"
        },
        {
          "id": "apple-1",
          "kind": "apple",
          "at": [
            800,
            650
          ],
          "scale": 0.16
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            730,
            770
          ],
          "scale": 0.18
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            540,
            750
          ],
          "scale": 0.14
        }
      ],
      "responseTo": "p20",
      "framing": {
        "at": [
          57.87,
          -193.67
        ],
        "scale": 0.95
      }
    }
  ]
};
