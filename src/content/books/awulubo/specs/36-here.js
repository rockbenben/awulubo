/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-cream"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "noSound": true,
      "id": "p36",
      "template": "t-dialog",
      "reading": "observe",
      "aria": "小泡泡旁，露出一只脚。指指那只脚。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "小泡泡旁，露出一只脚。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "指指那只脚。",
          "print": "指指那只脚。",
          "align": "left"
        }
      },
      "props": [
        {
          "id": "apple-E",
          "kind": "apple",
          "at": [
            260,
            200
          ],
          "scale": 0.62
        },
        {
          "id": "breath-1",
          "kind": "bubble",
          "at": [
            130,
            340
          ],
          "scale": 0.08
        },
        {
          "id": "foot-1",
          "kind": "foot",
          "at": [
            50,
            300
          ],
          "scale": 0.55,
          "class": "prop-foot"
        }
      ],
      "hotspot": {
        "targetId": "foot-1",
        "action": "find",
        "target": "foot",
        "at": [
          180,
          660
        ],
        "size": 260,
        "label": "指一指"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -109.06,
          39.4
        ],
        "scale": 1.05
      }
    },
    {
      "noSound": true,
      "id": "p37",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "嘿！它从大苹果后蹦出来！",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "嘿！它从大苹果后蹦出来！",
          "align": "right"
        }
      },
      "responseTo": "p36",
      "char": {
        "pose": "cheer",
        "at": [
          420,
          150
        ],
        "scale": 0.65,
        "spiral": true,
        "state": "state-rainbow"
      },
      "props": [
        {
          "id": "apple-E",
          "kind": "apple",
          "at": [
            260,
            200
          ],
          "scale": 0.62,
          "layer": "behind"
        }
      ],
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          -109.06,
          39.4
        ],
        "scale": 1.05
      }
    }
  ]
};
