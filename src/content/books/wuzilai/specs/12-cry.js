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
      "id": "p24",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "呜呜。眼泪滴在小背心上。\n轻轻抱一抱。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 638.88,
          "text": "呜呜。眼泪滴在小背心上。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻抱一抱。",
          "print": "轻轻抱一抱。",
          "align": "left"
        }
      },
      "char": {
        "pose": "cry-seat",
        "at": [
          480,
          300
        ],
        "scale": 0.55,
        "spiral": true,
        "wear": "vest-damp"
      },
      "props": [
        {
          "id": "basket-1",
          "kind": "basket-fallen",
          "at": [
            40,
            360
          ],
          "scale": 0.55,
          "layer": "behind"
        },
        {
          "id": "apple-1",
          "kind": "apple",
          "at": [
            800,
            650
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
          82.44,
          148.61
        ],
        "scale": 0.79
      }
    },
    {
      "id": "p25",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它靠进你怀里，小脚慢慢垂下。",
      "text": {
        "narration": {
          "at": [
            460.48,
            200
          ],
          "size": 5.2,
          "width": 459.52,
          "text": "它靠进你怀里，<br>小脚慢慢垂下。",
          "align": "right"
        }
      },
      "char": {
        "pose": "held-rest",
        "at": [
          480,
          220
        ],
        "scale": 0.55,
        "spiral": true,
        "wear": "vest-damp"
      },
      "props": [
        {
          "id": "child-arm",
          "kind": "child-cradle",
          "at": [
            380,
            580
          ],
          "scale": 0.75,
          "layer": "behind"
        },
        {
          "id": "basket-1",
          "kind": "basket-fallen",
          "at": [
            40,
            360
          ],
          "scale": 0.55,
          "layer": "behind"
        },
        {
          "id": "apple-1",
          "kind": "apple",
          "at": [
            800,
            650
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
      "responseTo": "p24",
      "framing": {
        "at": [
          82.44,
          148.61
        ],
        "scale": 0.79
      }
    }
  ]
};
