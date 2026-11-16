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
      "id": "p34",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "observe",
      "aria": "你说：剩下的，我来。\n指指地上的两样。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 679,
          "text": "你说：剩下的，我来。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "指指地上的两样。",
          "print": "指指地上的两样。",
          "align": "left"
        }
      },
      "char": {
        "pose": "curious-tilt",
        "at": [
          450,
          250
        ],
        "scale": 0.6,
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
          -25.79,
          -54.24
        ],
        "scale": 0.99
      }
    },
    {
      "id": "p35",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它倒退一大步，把篮口让给你。",
      "text": {
        "narration": {
          "at": [
            435.7,
            95
          ],
          "size": 5.5,
          "width": 484.3,
          "text": "它倒退一大步，<br>把篮口让给你。",
          "align": "right"
        }
      },
      "char": {
        "pose": "withdraw-step",
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
      "responseTo": "p34",
      "framing": {
        "at": [
          -25.79,
          -54.24
        ],
        "scale": 0.99
      }
    }
  ]
};
