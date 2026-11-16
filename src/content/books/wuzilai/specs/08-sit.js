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
      "id": "p16",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "它坐下喘气，小背心皱了。\n陪它坐一会儿。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它坐下喘气，小背心皱了。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "陪它坐一会儿。",
          "print": "陪它坐一会儿。",
          "align": "left"
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
      "framing": {
        "at": [
          -188.95,
          -131.29
        ],
        "scale": 1.05
      }
    },
    {
      "id": "p17",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你等着，没有替它收。",
      "text": {
        "narration": {
          "at": [
            241,
            150
          ],
          "size": 5.5,
          "width": 679,
          "text": "你等着，没有替它收。",
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
      "responseTo": "p16",
      "framing": {
        "at": [
          -188.95,
          -131.29
        ],
        "scale": 1.05
      }
    }
  ]
};
