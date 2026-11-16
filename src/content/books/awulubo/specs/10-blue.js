/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-red"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "noSound": true,
      "id": "p10",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "它还想尝尝小鱼。喂它蓝小鱼。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "它还想尝尝小鱼。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "喂它蓝小鱼。",
          "print": "喂它蓝小鱼。",
          "align": "left"
        }
      },
      "char": {
        "pose": "side",
        "at": [
          130,
          255
        ],
        "scale": 0.65,
        "spiral": true,
        "state": "state-red"
      },
      "props": [
        {
          "id": "fish-A",
          "kind": "fish",
          "at": [
            380,
            480
          ],
          "scale": 0.27,
          "class": "prop-fish"
        }
      ],
      "hotspot": {
        "targetId": "fish-A",
        "action": "feed",
        "target": "fish",
        "at": [
          380,
          480
        ],
        "size": 280,
        "label": "喂一口"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -126.43,
          -320.15
        ],
        "scale": 1.23
      }
    },
    {
      "noSound": true,
      "id": "p11",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "噗噜！它和四周都变蓝啦！",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "噗噜！它和四周都变蓝啦！",
          "align": "right"
        }
      },
      "responseTo": "p10",
      "char": {
        "pose": "chew",
        "at": [
          240,
          255
        ],
        "scale": 0.65,
        "spiral": true,
        "state": "state-blue"
      },
      "props": [
        {
          "id": "breath-1",
          "kind": "bubble",
          "at": [
            700,
            510
          ],
          "scale": 0.1
        }
      ],
      "bg": {
        "wash": "--wash-blue",
        "focus": [
          0,
          500
        ]
      },
      "turn": "变蓝",
      "framing": {
        "at": [
          -126.43,
          -320.15
        ],
        "scale": 1.23
      }
    }
  ]
};
