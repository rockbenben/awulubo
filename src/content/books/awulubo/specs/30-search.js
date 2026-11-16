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
      "id": "p30",
      "template": "t-dialog",
      "reading": "observe",
      "aria": "苹果、小鱼、星星在哪儿？三样都指一指。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "苹果、小鱼、星星在哪儿？",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "三样都指一指。",
          "print": "三样都指一指。",
          "align": "left"
        }
      },
      "char": {
        "pose": "hesitant",
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
          "action": "find",
          "target": "apple",
          "at": [
            60,
            540
          ],
          "size": 270,
          "label": "指一指"
        },
        {
          "targetId": "fish-D",
          "action": "find",
          "target": "fish",
          "at": [
            360,
            540
          ],
          "size": 270,
          "label": "指一指"
        },
        {
          "targetId": "star-D",
          "action": "find",
          "target": "star",
          "at": [
            660,
            540
          ],
          "size": 270,
          "label": "指一指"
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
          92.33,
          -87.15
        ],
        "scale": 1
      }
    },
    {
      "noSound": true,
      "id": "p31",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "全找到了，就在门边！",
      "text": {
        "narration": {
          "at": [
            241,
            735
          ],
          "size": 5.5,
          "width": 679,
          "text": "全找到了，就在门边！",
          "align": "right"
        }
      },
      "responseTo": "p30",
      "char": {
        "pose": "curious-tilt",
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
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          92.33,
          -87.15
        ],
        "scale": 1
      }
    }
  ]
};
