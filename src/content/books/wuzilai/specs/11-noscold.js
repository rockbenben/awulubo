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
      "id": "p22",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "你没有怪它。\n一起蹲低些。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 8.666666666666666,
          "width": 643.6,
          "text": "你没有怪它。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "一起蹲低些。",
          "print": "一起蹲低些。",
          "align": "left"
        }
      },
      "char": {
        "pose": "sad-seat",
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
      "framing": {
        "at": [
          -76.57,
          -121.39
        ],
        "scale": 1.04
      }
    },
    {
      "id": "p23",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你蹲下来，和它一样低。",
      "text": {
        "narration": {
          "at": [
            176.10000000000002,
            150
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "你蹲下来，和它一样低。",
          "align": "right"
        }
      },
      "char": {
        "pose": "listen-low",
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
      "responseTo": "p22",
      "framing": {
        "at": [
          -76.57,
          -121.39
        ],
        "scale": 1.04
      }
    }
  ]
};
