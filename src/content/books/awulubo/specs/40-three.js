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
    "kind": "grass",
    "occlude": false,
    "grassScale": 2
  },
  "pages": [
    {
      "noSound": true,
      "id": "p40",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "它跨到门外，也歪着头数。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它跨到门外，也歪着头数。",
          "align": "left"
        }
      },
      "char": {
        "pose": "look-back",
        "at": [
          410,
          255
        ],
        "scale": 0.65,
        "spiral": true,
        "state": "state-rainbow"
      },
      "props": [
        {
          "id": "apple-F",
          "kind": "apple",
          "at": [
            10,
            710
          ],
          "scale": 0.075
        },
        {
          "id": "apple-G",
          "kind": "apple",
          "at": [
            90,
            710
          ],
          "scale": 0.075
        },
        {
          "id": "apple-H",
          "kind": "apple",
          "at": [
            170,
            710
          ],
          "scale": 0.075
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
          21,
          -8.87
        ],
        "scale": 0.97
      }
    },
    {
      "noSound": true,
      "id": "p41",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "它点点头，咧嘴朝你笑。",
      "text": {
        "narration": {
          "at": [
            176.10000000000002,
            150
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "它点点头，咧嘴朝你笑。",
          "align": "right"
        }
      },
      "responseTo": "p40",
      "char": {
        "pose": "beaming-lean",
        "at": [
          240,
          255
        ],
        "scale": 0.65,
        "spiral": true,
        "state": "state-rainbow"
      },
      "numbers": [
        {
          "text": "3",
          "at": [
            700,
            300
          ],
          "size": 21,
          "on": true,
          "width": 230
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
          21,
          -8.87
        ],
        "scale": 0.97
      }
    }
  ]
};
