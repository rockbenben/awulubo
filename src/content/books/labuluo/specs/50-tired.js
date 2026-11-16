/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-cream"
  },
  "scene": {
    "kind": "grass",
    "occlude": false
  },
  "pages": [
    {
      "id": "p50",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "它趴下来，呼了一口气。\n一起坐一会儿。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 588.14,
          "text": "它趴下来，呼了一口气。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "一起坐一会儿。",
          "print": "一起坐一会儿。",
          "align": "left"
        }
      },
      "char": {
        "pose": "prone",
        "at": [
          230,
          300
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
          -0.6,
          35.68
        ],
        "scale": 0.92
      }
    },
    {
      "id": "p51",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你也靠着它歇下了。",
      "text": {
        "narration": {
          "at": [
            433.34,
            200
          ],
          "size": 4.3,
          "width": 486.66,
          "text": "你也靠着它歇下了。",
          "align": "right"
        }
      },
      "responseTo": "p50",
      "char": {
        "pose": "curled",
        "at": [
          260,
          300
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
          -0.6,
          35.68
        ],
        "scale": 0.92
      }
    }
  ]
};
