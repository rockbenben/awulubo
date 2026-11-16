/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "rays",
    "wash": "--wash-cream",
    "colors": [
      "--wash-yellow"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "doorway"
  },
  "pages": [
    {
      "id": "p46",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "门外暖黄的光铺开：一起跑！\n原地踏两小步。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "门外暖黄的光铺开：一起跑！",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "原地踏两小步。",
          "print": "原地踏两小步。",
          "align": "left"
        }
      },
      "char": {
        "pose": "poised",
        "at": [
          370,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-paper"
      },
      "props": [],
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -396.51,
          -189.39
        ],
        "scale": 1.3
      }
    },
    {
      "id": "p47",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它跟出来，和你并排跑。",
      "text": {
        "narration": {
          "at": [
            176.10000000000002,
            150
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "它跟出来，和你并排跑。",
          "align": "right"
        }
      },
      "responseTo": "p46",
      "char": {
        "pose": "run",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-paper"
      },
      "props": [],
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          -396.51,
          -189.39
        ],
        "scale": 1.3
      }
    }
  ]
};
