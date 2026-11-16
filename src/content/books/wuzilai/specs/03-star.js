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
      "id": "p06",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它低下头，把星星往篮口顶。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "它低下头，把星星往篮口顶。",
          "align": "left"
        }
      },
      "char": {
        "pose": "head-nudge",
        "at": [
          440,
          240
        ],
        "scale": 0.58,
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
            700,
            680
          ],
          "scale": 0.18
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            400,
            530
          ],
          "scale": 0.14
        }
      ],
      "framing": {
        "at": [
          70.16,
          -124.11
        ],
        "scale": 0.94
      }
    },
    {
      "id": "p07",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "咻！星星滑回，它急急收脚。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "咻！星星滑回，它急急收脚。",
          "align": "right"
        }
      },
      "char": {
        "pose": "recoil-step",
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
            700,
            680
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
      "responseTo": "p06",
      "framing": {
        "at": [
          70.16,
          -124.11
        ],
        "scale": 0.94
      }
    }
  ]
};
