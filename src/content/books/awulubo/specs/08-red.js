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
      "id": "p08",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "噜啵张着嘴，等苹果。喂它红苹果。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 679,
          "text": "噜啵张着嘴，等苹果。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "喂它红苹果。",
          "print": "喂它红苹果。",
          "align": "left"
        }
      },
      "char": {
        "pose": "willing",
        "at": [
          130,
          255
        ],
        "scale": 0.65,
        "spiral": true
      },
      "props": [
        {
          "id": "apple-A",
          "kind": "apple",
          "at": [
            560,
            480
          ],
          "scale": 0.27,
          "class": "prop-apple"
        }
      ],
      "hotspot": {
        "targetId": "apple-A",
        "action": "feed",
        "target": "apple",
        "at": [
          560,
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
          -239.81,
          -177.02
        ],
        "scale": 1.25
      }
    },
    {
      "noSound": true,
      "id": "p09",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "啊呜！它变红，四周也红啦！",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "啊呜！它变红，四周也红啦！",
          "align": "right"
        }
      },
      "responseTo": "p08",
      "char": {
        "pose": "chew",
        "at": [
          240,
          255
        ],
        "scale": 0.65,
        "spiral": true,
        "state": "state-red"
      },
      "bg": {
        "wash": "--wash-red",
        "focus": [
          0,
          500
        ]
      },
      "turn": "变红",
      "framing": {
        "at": [
          -239.81,
          -177.02
        ],
        "scale": 1.25
      }
    }
  ]
};
