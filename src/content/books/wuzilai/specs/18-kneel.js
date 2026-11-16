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
      "id": "p36",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "你拿起小鱼。\n把小鱼送进篮子。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 8.666666666666666,
          "width": 643.6,
          "text": "你拿起小鱼。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "把小鱼送进篮子。",
          "print": "把小鱼送进篮子。",
          "align": "left"
        }
      },
      "char": {
        "pose": "watch-seat",
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
            440,
            560
          ],
          "scale": 0.18,
          "style": "--go-x:-255;--go-y:90",
          "class": "prop-fish"
        },
        {
          "id": "star-1",
          "kind": "star",
          "at": [
            540,
            750
          ],
          "scale": 0.14
        },
        {
          "id": "child-hand",
          "kind": "palm",
          "at": [
            440,
            590
          ],
          "scale": 0.25,
          "layer": "behind"
        }
      ],
      "hotspot": {
        "targetId": "fish-1",
        "target": "fish",
        "action": "tidy",
        "at": [
          440,
          560
        ],
        "size": 250,
        "label": "把小鱼送进篮子。"
      },
      "framing": {
        "at": [
          -25.17,
          -148.38
        ],
        "scale": 0.98
      }
    },
    {
      "id": "p37",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "放好了，篮里有两样。",
      "text": {
        "narration": {
          "at": [
            241,
            150
          ],
          "size": 5.5,
          "width": 679,
          "text": "放好了，篮里有两样。",
          "align": "right"
        }
      },
      "char": {
        "pose": "watch-seat",
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
            540,
            750
          ],
          "scale": 0.14
        }
      ],
      "responseTo": "p36",
      "framing": {
        "at": [
          -25.17,
          -148.38
        ],
        "scale": 0.98
      }
    }
  ]
};
