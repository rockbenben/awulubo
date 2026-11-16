/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-orange"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p28",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "observe",
      "aria": "背后传来呼气声。\n安静听一听。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 435.92,
          "text": "背后传来呼气声。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "安静听一听。",
          "print": "安静听一听。",
          "align": "left"
        }
      },
      "char": {
        "pose": "listen-back",
        "at": [
          400,
          260
        ],
        "scale": 0.62,
        "spiral": false,
        "wear": "headband-low"
      },
      "props": [
        {
          "id": "wall-anchor",
          "kind": "wall-foot",
          "at": [
            185,
            515
          ],
          "scale": 0.4,
          "layer": "behind",
          "style": "--scene-ink:var(--ink);--scene-line-opacity:.22"
        },
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            225,
            610
          ],
          "scale": 0.25,
          "class": "prop-ball",
          "style": "--ball:var(--blue)"
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
          49.74,
          170.2
        ],
        "scale": 0.84
      }
    },
    {
      "id": "p29",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你停下来，听见它喘气。",
      "text": {
        "narration": {
          "at": [
            331.86,
            200
          ],
          "size": 4.3,
          "width": 588.14,
          "text": "你停下来，听见它喘气。",
          "align": "right"
        }
      },
      "char": {
        "pose": "huddle-away",
        "at": [
          400,
          260
        ],
        "scale": 0.62,
        "spiral": false,
        "wear": "headband-low"
      },
      "responseTo": "p28",
      "props": [
        {
          "id": "wall-anchor",
          "kind": "wall-foot",
          "at": [
            185,
            515
          ],
          "scale": 0.4,
          "layer": "behind",
          "style": "--scene-ink:var(--ink);--scene-line-opacity:.22"
        },
        {
          "id": "ball-1",
          "kind": "ball",
          "at": [
            225,
            610
          ],
          "scale": 0.25,
          "class": "prop-ball",
          "style": "--ball:var(--blue)"
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
          49.74,
          170.2
        ],
        "scale": 0.84
      }
    }
  ]
};
