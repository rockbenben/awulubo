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
      "id": "p40",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它急急挪近，肚子快碰到星星。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "它急急挪近，<br>肚子快碰到星星。",
          "align": "left"
        }
      },
      "char": {
        "pose": "poised-left",
        "at": [
          570,
          350
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
            185,
            650
          ],
          "scale": 0.18,
          "class": "in-basket"
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            500,
            680
          ],
          "scale": 0.14
        },
        {
          "id": "child-foot",
          "kind": "child-foot",
          "at": [
            630,
            800
          ],
          "scale": 0.3
        }
      ],
      "framing": {
        "at": [
          -26.4,
          -95.1
        ],
        "scale": 1
      }
    },
    {
      "id": "p41",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它看看你，一只脚还抬着。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它看看你，一只脚还抬着。",
          "align": "right"
        }
      },
      "char": {
        "pose": "poised-left",
        "at": [
          570,
          350
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
            185,
            650
          ],
          "scale": 0.18,
          "class": "in-basket"
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            500,
            680
          ],
          "scale": 0.14
        },
        {
          "id": "child-foot",
          "kind": "child-foot",
          "at": [
            630,
            800
          ],
          "scale": 0.3
        }
      ],
      "responseTo": "p40",
      "framing": {
        "at": [
          -26.4,
          -95.1
        ],
        "scale": 1
      }
    }
  ]
};
