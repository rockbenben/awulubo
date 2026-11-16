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
      "id": "p38",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你推了推星星。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 7.428571428571429,
          "width": 643.6,
          "text": "你推了推星星。",
          "align": "left"
        }
      },
      "char": {
        "pose": "curious-tilt",
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
            450,
            620
          ],
          "scale": 0.14
        },
        {
          "id": "child-hand",
          "kind": "child-reach-left",
          "at": [
            520,
            680
          ],
          "scale": 0.55
        }
      ],
      "framing": {
        "at": [
          33.33,
          -174.56
        ],
        "scale": 0.97
      }
    },
    {
      "id": "p39",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "星星滑过你的手，停在你脚边。",
      "text": {
        "narration": {
          "at": [
            465.2,
            735
          ],
          "size": 4.5,
          "width": 454.8,
          "text": "星星滑过你的手，<br>停在你脚边。",
          "align": "right"
        }
      },
      "char": {
        "pose": "hesitant",
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
            500,
            680
          ],
          "scale": 0.14
        },
        {
          "id": "child-hand",
          "kind": "child-reach-left",
          "at": [
            650,
            730
          ],
          "scale": 0.4
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
      "responseTo": "p38",
      "framing": {
        "at": [
          33.33,
          -174.56
        ],
        "scale": 0.97
      }
    }
  ]
};
