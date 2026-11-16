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
      "id": "p30",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它又往前推了一点。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "它又往前推了一点。",
          "align": "left"
        }
      },
      "char": {
        "pose": "push",
        "at": [
          455,
          330
        ],
        "scale": 0.55,
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
            390,
            590
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
          -30.08,
          -150.03
        ],
        "scale": 1.06
      }
    },
    {
      "id": "p31",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "咚！苹果滚进去，它愣住了。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "咚！苹果滚进去，它愣住了。",
          "align": "right"
        }
      },
      "char": {
        "pose": "startled-seat",
        "at": [
          420,
          260
        ],
        "scale": 0.55,
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
      "responseTo": "p30",
      "framing": {
        "at": [
          -30.08,
          -150.03
        ],
        "scale": 1.06
      }
    }
  ]
};
