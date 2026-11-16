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
      "id": "p04",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "咕噜——肚子鼓起一个小包。点点它的肚子。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "咕噜——肚子鼓起一个小包。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "点点它的肚子。",
          "print": "点点它的肚子。",
          "align": "left"
        }
      },
      "char": {
        "pose": "look-down",
        "at": [
          130,
          255
        ],
        "scale": 0.65,
        "spiral": true
      },
      "hotspot": {
        "targetId": "character",
        "action": "belly",
        "target": "char",
        "at": [
          245,
          405
        ],
        "size": 350,
        "label": "一起试试"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -131.72,
          -57.37
        ],
        "scale": 1.05
      }
    },
    {
      "noSound": true,
      "id": "p05",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "是我！我饿了。它凑过来。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "是我！我饿了。它凑过来。",
          "align": "right"
        }
      },
      "responseTo": "p04",
      "char": {
        "pose": "lean-near",
        "at": [
          240,
          255
        ],
        "scale": 0.65,
        "spiral": true
      },
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          -131.72,
          -57.37
        ],
        "scale": 1.05
      }
    }
  ]
};
