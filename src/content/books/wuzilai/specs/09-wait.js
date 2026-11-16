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
      "id": "p18",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它用身子挡住三样。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "它用身子挡住三样。",
          "align": "left"
        }
      },
      "char": {
        "pose": "braced",
        "at": [
          450,
          250
        ],
        "scale": 0.6,
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
          -169.91,
          -74.31
        ],
        "scale": 1.02
      }
    },
    {
      "id": "p19",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "肚子挤扁一点，三样一起往前滑。",
      "text": {
        "narration": {
          "at": [
            370.79999999999995,
            95
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "肚子挤扁一点，<br>三样一起往前滑。",
          "align": "right"
        }
      },
      "char": {
        "pose": "press-ball",
        "at": [
          400,
          350
        ],
        "scale": 0.65,
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
            570,
            650
          ],
          "scale": 0.16
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            700,
            650
          ],
          "scale": 0.18
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            525,
            670
          ],
          "scale": 0.14
        }
      ],
      "responseTo": "p18",
      "framing": {
        "at": [
          -169.91,
          -74.31
        ],
        "scale": 1.02
      }
    }
  ]
};
