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
      "id": "p26",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它用头顶了顶翻倒的篮子。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它用头顶了顶翻倒的篮子。",
          "align": "left"
        }
      },
      "char": {
        "pose": "head-nudge",
        "at": [
          450,
          350
        ],
        "scale": 0.55,
        "spiral": true,
        "wear": "vest-damp"
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
          "layer": "behind",
          "rotate": -25
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
          195.96,
          9.93
        ],
        "scale": 0.72
      }
    },
    {
      "id": "p27",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "篮子侧躺着，篮口朝着它。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "篮子侧躺着，篮口朝着它。",
          "align": "right"
        }
      },
      "char": {
        "pose": "neutral-front",
        "at": [
          450,
          250
        ],
        "scale": 0.6,
        "spiral": true,
        "wear": "vest-damp"
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
      "responseTo": "p26",
      "framing": {
        "at": [
          195.96,
          9.93
        ],
        "scale": 0.72
      }
    }
  ]
};
