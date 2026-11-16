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
      "id": "p14",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "篮子离得远了一点。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 486.66,
          "text": "篮子离得远了一点。",
          "align": "left"
        }
      },
      "char": {
        "pose": "look-down",
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
          "kind": "basket",
          "at": [
            0,
            390
          ],
          "scale": 0.55,
          "layer": "behind"
        },
        {
          "id": "apple-1",
          "kind": "apple",
          "at": [
            650,
            650
          ],
          "scale": 0.16
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            780,
            650
          ],
          "scale": 0.18
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            605,
            670
          ],
          "scale": 0.14
        }
      ],
      "framing": {
        "at": [
          48.12,
          159.56
        ],
        "scale": 0.84
      }
    },
    {
      "id": "p15",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它低下圆脑袋，一点点顶过来。",
      "text": {
        "narration": {
          "at": [
            460.48,
            200
          ],
          "size": 5.2,
          "width": 459.52,
          "text": "它低下圆脑袋，<br>一点点顶过来。",
          "align": "right"
        }
      },
      "char": {
        "pose": "head-nudge",
        "at": [
          300,
          350
        ],
        "scale": 0.55,
        "spiral": true,
        "wear": "vest"
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
            650,
            650
          ],
          "scale": 0.16
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            780,
            650
          ],
          "scale": 0.18
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            605,
            670
          ],
          "scale": 0.14
        }
      ],
      "responseTo": "p14",
      "framing": {
        "at": [
          48.12,
          159.56
        ],
        "scale": 0.84
      }
    }
  ]
};
