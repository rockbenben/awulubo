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
    "kind": "window-nook"
  },
  "pages": [
    {
      "id": "p04",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "我自己来！\n先停下手。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 9,
          "width": 561,
          "text": "我自己来！",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "先停下手。",
          "print": "先停下手。",
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
        "wear": "vest"
      },
      "props": [
        {
          "id": "fantasy-distance",
          "kind": "castle",
          "at": [
            200,
            10
          ],
          "scale": 0.3,
          "layer": "behind",
          "style": "--scene-castle-opacity:.07;--scene-ink:var(--ink)"
        },
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
            430,
            650
          ],
          "scale": 0.14
        }
      ],
      "framing": {
        "at": [
          -73.9,
          -24.95
        ],
        "scale": 1
      }
    },
    {
      "id": "p05",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它穿着小背心，横身挡住篮口。",
      "text": {
        "narration": {
          "at": [
            435.7,
            95
          ],
          "size": 5.5,
          "width": 484.3,
          "text": "它穿着小背心，<br>横身挡住篮口。",
          "align": "right"
        }
      },
      "char": {
        "pose": "side",
        "at": [
          165,
          190
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
            430,
            650
          ],
          "scale": 0.14
        }
      ],
      "responseTo": "p04",
      "framing": {
        "at": [
          -73.9,
          -24.95
        ],
        "scale": 1
      }
    }
  ]
};
