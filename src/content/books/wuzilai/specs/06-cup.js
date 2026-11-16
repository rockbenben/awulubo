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
      "id": "p12",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "observe",
      "aria": "它贴着墙，把苹果顶回来。\n指指三样东西。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它贴着墙，把苹果顶回来。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "指指三样东西。",
          "print": "指指三样东西。",
          "align": "left"
        }
      },
      "char": {
        "pose": "head-nudge",
        "at": [
          550,
          440
        ],
        "scale": 0.5,
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
            660,
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
          -32.56,
          -230.8
        ],
        "scale": 1.02
      }
    },
    {
      "id": "p13",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "绕了半圈，三样聚在一起。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "绕了半圈，三样聚在一起。",
          "align": "right"
        }
      },
      "char": {
        "pose": "step",
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
      "responseTo": "p12",
      "framing": {
        "at": [
          -32.56,
          -230.8
        ],
        "scale": 1.02
      }
    }
  ]
};
