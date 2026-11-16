/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-cream"
  },
  "scene": {
    "kind": "doorway"
  },
  "pages": [
    {
      "noSound": true,
      "id": "p38",
      "template": "t-dialog",
      "reading": "observe",
      "aria": "门口另有一排红苹果。挨个点着数。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 679,
          "text": "门口另有一排红苹果。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "挨个点着数。",
          "print": "挨个点着数。",
          "align": "left"
        }
      },
      "char": {
        "pose": "look-down",
        "at": [
          230,
          425
        ],
        "scale": 0.43,
        "spiral": true,
        "state": "state-rainbow"
      },
      "props": [
        {
          "id": "apple-F",
          "kind": "apple",
          "at": [
            60,
            565
          ],
          "scale": 0.22,
          "class": "prop-apple count-item"
        },
        {
          "id": "apple-G",
          "kind": "apple",
          "at": [
            360,
            565
          ],
          "scale": 0.22,
          "class": "prop-apple count-item"
        },
        {
          "id": "apple-H",
          "kind": "apple",
          "at": [
            660,
            565
          ],
          "scale": 0.22,
          "class": "prop-apple count-item"
        }
      ],
      "numbers": [
        {
          "text": "1",
          "at": [
            150,
            430
          ],
          "size": 8,
          "on": false
        },
        {
          "text": "2",
          "at": [
            450,
            430
          ],
          "size": 8,
          "on": false
        },
        {
          "text": "3",
          "at": [
            750,
            430
          ],
          "size": 8,
          "on": false
        }
      ],
      "hotspot": [
        {
          "targetId": "apple-F",
          "action": "count",
          "target": "apple",
          "at": [
            60,
            565
          ],
          "size": 270,
          "label": "数一数",
          "index": 1
        },
        {
          "targetId": "apple-G",
          "action": "count",
          "target": "apple",
          "at": [
            360,
            565
          ],
          "size": 270,
          "label": "数一数",
          "index": 2
        },
        {
          "targetId": "apple-H",
          "action": "count",
          "target": "apple",
          "at": [
            660,
            565
          ],
          "size": 270,
          "label": "数一数",
          "index": 3
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
          113.97,
          -210.37
        ],
        "scale": 0.95
      }
    },
    {
      "noSound": true,
      "id": "p39",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "一、二、三！",
      "text": {
        "narration": {
          "at": [
            276.4,
            735
          ],
          "size": 8.666666666666666,
          "width": 643.6,
          "text": "一、二、三！",
          "align": "right"
        }
      },
      "responseTo": "p38",
      "char": {
        "pose": "look-down",
        "at": [
          230,
          425
        ],
        "scale": 0.43,
        "spiral": true,
        "state": "state-rainbow"
      },
      "props": [
        {
          "id": "apple-F",
          "kind": "apple",
          "at": [
            60,
            565
          ],
          "scale": 0.22,
          "class": "prop-apple count-item"
        },
        {
          "id": "apple-G",
          "kind": "apple",
          "at": [
            360,
            565
          ],
          "scale": 0.22,
          "class": "prop-apple count-item"
        },
        {
          "id": "apple-H",
          "kind": "apple",
          "at": [
            660,
            565
          ],
          "scale": 0.22,
          "class": "prop-apple count-item"
        }
      ],
      "numbers": [
        {
          "text": "1",
          "at": [
            150,
            430
          ],
          "size": 8,
          "on": true
        },
        {
          "text": "2",
          "at": [
            450,
            430
          ],
          "size": 8,
          "on": true
        },
        {
          "text": "3",
          "at": [
            750,
            430
          ],
          "size": 8,
          "on": true
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
          113.97,
          -210.37
        ],
        "scale": 0.95
      }
    }
  ]
};
