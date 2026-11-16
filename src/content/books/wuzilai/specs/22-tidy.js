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
      "id": "p44",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "你把星星托到篮口。\n轻轻送进去。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "你把星星托到篮口。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻送进去。",
          "print": "轻轻送进去。",
          "align": "left"
        }
      },
      "char": {
        "pose": "watch-seat",
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
            590
          ],
          "scale": 0.14,
          "style": "--go-x:-150;--go-y:0",
          "class": "prop-star"
        },
        {
          "id": "child-hand",
          "kind": "palm",
          "at": [
            440,
            600
          ],
          "scale": 0.25,
          "layer": "behind"
        }
      ],
      "hotspot": {
        "targetId": "star-1",
        "target": "star",
        "action": "tidy",
        "at": [
          450,
          590
        ],
        "size": 250,
        "label": "轻轻送进去。"
      },
      "framing": {
        "at": [
          156.36,
          -129.85
        ],
        "scale": 0.79
      }
    },
    {
      "id": "p45",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "星星进去了！第三样也收好啦。",
      "text": {
        "narration": {
          "at": [
            465.2,
            735
          ],
          "size": 4.5,
          "width": 454.8,
          "text": "星星进去了！<br>第三样也收好啦。",
          "align": "right"
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
      "responseTo": "p44",
      "framing": {
        "at": [
          156.36,
          -129.85
        ],
        "scale": 0.79
      }
    }
  ]
};
