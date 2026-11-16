/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-cream",
    "colors": [
      "--wash-yellow"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "noSound": true,
      "id": "p06",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "你叫什么名字呀？把名字告诉它。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "你叫什么名字呀？",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "把名字告诉它。",
          "print": "把名字告诉它。",
          "align": "left"
        }
      },
      "char": {
        "pose": "curious-tilt",
        "at": [
          130,
          255
        ],
        "scale": 0.65,
        "spiral": true
      },
      "hotspot": {
        "targetId": "character",
        "action": "name",
        "target": "char",
        "at": [
          181.21,
          355.57
        ],
        "size": 478.01,
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
          -3.88,
          -253.93
        ],
        "scale": 1.12
      }
    },
    {
      "noSound": true,
      "id": "p07",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "我叫噜啵。嘿嘿！",
      "text": {
        "narration": {
          "at": [
            370.79999999999995,
            735
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "我叫噜啵。嘿嘿！",
          "align": "right"
        }
      },
      "responseTo": "p06",
      "char": {
        "pose": "beaming-lean",
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
          -3.88,
          -253.93
        ],
        "scale": 1.12
      }
    }
  ]
};
