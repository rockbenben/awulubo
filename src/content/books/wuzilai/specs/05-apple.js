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
      "id": "p10",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "圆苹果一碰，就滚走了。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "圆苹果一碰，就滚走了。",
          "align": "left"
        }
      },
      "char": {
        "pose": "hesitant",
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
          "id": "wall-anchor",
          "kind": "wall-foot",
          "at": [
            890,
            530
          ],
          "scale": 0.2,
          "layer": "behind",
          "style": "--scene-line-opacity:.22;--scene-ink:var(--ink)"
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
            655,
            660
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
          -89.86,
          -5.91
        ],
        "scale": 0.95
      }
    },
    {
      "id": "p11",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它迈开小脚，追到墙脚边。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它迈开小脚，追到墙脚边。",
          "align": "right"
        }
      },
      "char": {
        "pose": "run",
        "at": [
          490,
          270
        ],
        "scale": 0.58,
        "spiral": true,
        "wear": "vest"
      },
      "props": [
        {
          "id": "wall-anchor",
          "kind": "wall-foot",
          "at": [
            890,
            530
          ],
          "scale": 0.2,
          "layer": "behind",
          "style": "--scene-line-opacity:.22;--scene-ink:var(--ink)"
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
            770,
            660
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
      "responseTo": "p10",
      "framing": {
        "at": [
          -89.86,
          -5.91
        ],
        "scale": 0.95
      }
    }
  ]
};
