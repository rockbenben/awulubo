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
      "id": "p08",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它侧过圆身，又去挤小鱼。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它侧过圆身，又去挤小鱼。",
          "align": "left"
        }
      },
      "char": {
        "pose": "side",
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
            530,
            650
          ],
          "scale": 0.16
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            450,
            625
          ],
          "scale": 0.18
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            550,
            690
          ],
          "scale": 0.14
        }
      ],
      "framing": {
        "at": [
          -108,
          -46.54
        ],
        "scale": 1.04
      }
    },
    {
      "id": "p09",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "小鱼一歪，它也歪得脚离地。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "小鱼一歪，它也歪得脚离地。",
          "align": "right"
        }
      },
      "char": {
        "pose": "tilt-foot",
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
            530,
            650
          ],
          "scale": 0.16
        },
        {
          "id": "fish-1",
          "kind": "fish",
          "at": [
            450,
            625
          ],
          "scale": 0.18,
          "rotate": 20
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            550,
            690
          ],
          "scale": 0.14
        }
      ],
      "responseTo": "p08",
      "framing": {
        "at": [
          -108,
          -46.54
        ],
        "scale": 1.04
      }
    }
  ]
};
