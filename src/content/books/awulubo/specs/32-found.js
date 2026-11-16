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
      "id": "p32",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "噜啵的嘴又张开了。一样一样喂给它。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "噜啵的嘴又张开了。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "一样一样喂给它。",
          "print": "一样一样喂给它。",
          "align": "left"
        }
      },
      "char": {
        "pose": "willing",
        "at": [
          210,
          160
        ],
        "scale": 0.55,
        "spiral": true
      },
      "props": [
        {
          "id": "apple-D",
          "kind": "apple",
          "at": [
            60,
            540
          ],
          "scale": 0.22,
          "class": "prop-apple"
        },
        {
          "id": "fish-D",
          "kind": "fish",
          "at": [
            360,
            540
          ],
          "scale": 0.22,
          "class": "prop-fish"
        },
        {
          "id": "star-D",
          "kind": "star",
          "at": [
            660,
            540
          ],
          "scale": 0.22,
          "class": "prop-star"
        }
      ],
      "hotspot": [
        {
          "targetId": "apple-D",
          "action": "feed3",
          "target": "apple",
          "at": [
            60,
            540
          ],
          "size": 270,
          "label": "各喂一口"
        },
        {
          "targetId": "fish-D",
          "action": "feed3",
          "target": "fish",
          "at": [
            360,
            540
          ],
          "size": 270,
          "label": "各喂一口"
        },
        {
          "targetId": "star-D",
          "action": "feed3",
          "target": "star",
          "at": [
            660,
            540
          ],
          "size": 270,
          "label": "各喂一口"
        }
      ],
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -43.84,
          -13.45
        ],
        "scale": 1.08
      }
    },
    {
      "noSound": true,
      "id": "p33",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "啊呜！三样滚进圆肚子。",
      "text": {
        "narration": {
          "at": [
            176.10000000000002,
            150
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "啊呜！三样滚进圆肚子。",
          "align": "right"
        }
      },
      "responseTo": "p32",
      "char": {
        "pose": "round-ground",
        "at": [
          150,
          200
        ],
        "scale": 0.7,
        "spiral": true,
        "state": "state-rainbow"
      },
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          -43.84,
          -13.45
        ],
        "scale": 1.08
      }
    }
  ]
};
