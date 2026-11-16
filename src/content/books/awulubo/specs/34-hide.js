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
      "id": "p34",
      "template": "t-dialog",
      "reading": "observe",
      "aria": "咦，噜啵不见了。翻过来找找看。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "咦，噜啵不见了。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "翻过来找找看。",
          "print": "翻过来找找看。",
          "align": "left"
        }
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -93.88,
          27.58
        ],
        "scale": 1.09
      }
    },
    {
      "noSound": true,
      "id": "p35",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "另一个大苹果后，冒出小泡泡。",
      "text": {
        "narration": {
          "at": [
            370.79999999999995,
            95
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "另一个大苹果后，<br>冒出小泡泡。",
          "align": "right"
        }
      },
      "responseTo": "p34",
      "props": [
        {
          "id": "apple-E",
          "kind": "apple",
          "at": [
            260,
            200
          ],
          "scale": 0.62
        },
        {
          "id": "breath-1",
          "kind": "bubble",
          "at": [
            130,
            340
          ],
          "scale": 0.1
        },
        {
          "id": "breath-2",
          "kind": "bubble",
          "at": [
            190,
            270
          ],
          "scale": 0.07
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
          -93.88,
          27.58
        ],
        "scale": 1.09
      }
    }
  ]
};
