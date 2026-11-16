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
      "id": "p28",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "observe",
      "aria": "它只把苹果推到篮边。\n指一指篮口。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 679,
          "text": "它只把苹果推到篮边。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "指一指篮口。",
          "print": "指一指篮口。",
          "align": "left"
        }
      },
      "char": {
        "pose": "head-nudge",
        "at": [
          465,
          350
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
            425,
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
          -128.29
        ],
        "scale": 1.06
      }
    },
    {
      "id": "p29",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它歪着头，让苹果对准篮口。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "它歪着头，让苹果对准篮口。",
          "align": "right"
        }
      },
      "char": {
        "pose": "head-nudge",
        "at": [
          465,
          350
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
            425,
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
      "responseTo": "p28",
      "framing": {
        "at": [
          -30.08,
          -128.29
        ],
        "scale": 1.06
      }
    }
  ]
};
