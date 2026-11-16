/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-cream"
  },
  "scene": {
    "kind": "grass",
    "occlude": false,
    "grassScale": 2
  },
  "pages": [
    {
      "noSound": true,
      "id": "p50",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "彩纸慢慢落下。慢慢转一转。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 5.2,
          "width": 459.52,
          "text": "彩纸慢慢落下。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "慢慢转一转。",
          "print": "慢慢转一转。",
          "align": "left"
        }
      },
      "char": {
        "pose": "side",
        "at": [
          150,
          285
        ],
        "scale": 0.6,
        "spiral": true
      },
      "props": [
        {
          "id": "apple-F",
          "kind": "apple",
          "at": [
            10,
            710
          ],
          "scale": 0.075
        },
        {
          "id": "apple-G",
          "kind": "apple",
          "at": [
            90,
            710
          ],
          "scale": 0.075
        },
        {
          "id": "apple-H",
          "kind": "apple",
          "at": [
            170,
            710
          ],
          "scale": 0.075
        },
        {
          "id": "K2-red",
          "kind": "paper-red",
          "at": [
            380,
            760
          ],
          "scale": 0.09
        },
        {
          "id": "K2-blue",
          "kind": "paper-blue",
          "at": [
            600,
            770
          ],
          "scale": 0.1
        },
        {
          "id": "K2-yellow",
          "kind": "paper-yellow",
          "at": [
            760,
            710
          ],
          "scale": 0.1
        }
      ],
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          145,
          159
        ],
        "scale": 0.83
      }
    },
    {
      "noSound": true,
      "id": "p51",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "它转半圈，靠在你身边。",
      "text": {
        "narration": {
          "at": [
            331.86,
            200
          ],
          "size": 4.3,
          "width": 588.14,
          "text": "它转半圈，靠在你身边。",
          "align": "right"
        }
      },
      "responseTo": "p50",
      "char": {
        "pose": "lean-rest",
        "at": [
          240,
          290
        ],
        "scale": 0.6,
        "spiral": false
      },
      "props": [
        {
          "id": "K2-red",
          "kind": "paper-red",
          "at": [
            380,
            760
          ],
          "scale": 0.09
        },
        {
          "id": "K2-blue",
          "kind": "paper-blue",
          "at": [
            600,
            770
          ],
          "scale": 0.1
        },
        {
          "id": "K2-yellow",
          "kind": "paper-yellow",
          "at": [
            760,
            730
          ],
          "scale": 0.1
        }
      ],
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          145,
          159
        ],
        "scale": 0.83
      }
    }
  ]
};
