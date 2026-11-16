/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-blue",
    "colors": [
      "--wash-blue"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p08",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "它蜷着，肚子贴着地。\n轻轻摸一下。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 679,
          "text": "它蜷着，肚子贴着地。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻摸一下。",
          "print": "轻轻摸一下。",
          "align": "left"
        }
      },
      "char": {
        "pose": "sick-curled",
        "at": [
          230,
          300
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-pale"
      },
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            35,
            590
          ],
          "scale": 0.22,
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket",
          "at": [
            220,
            510
          ],
          "scale": 0.58,
          "layer": "behind"
        }
      ],
      "hotspot": {
        "targetId": "character",
        "action": "poke",
        "at": [
          328.77,
          548.8
        ],
        "size": 403.14,
        "label": "轻轻摸一下"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -110.26,
          -367.73
        ],
        "scale": 1.35
      }
    },
    {
      "id": "p09",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "呀，肚子热热的。",
      "text": {
        "narration": {
          "at": [
            370.79999999999995,
            150
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "呀，肚子热热的。",
          "align": "right"
        }
      },
      "responseTo": "p08",
      "char": {
        "pose": "sick-curled",
        "at": [
          260,
          300
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-pale"
      },
      "props": [
        {
          "id": "cup-1",
          "kind": "cup",
          "at": [
            35,
            590
          ],
          "scale": 0.22,
          "class": "prop-cup"
        },
        {
          "id": "blanket-1",
          "kind": "blanket",
          "at": [
            220,
            510
          ],
          "scale": 0.58,
          "layer": "behind"
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
          -110.26,
          -367.73
        ],
        "scale": 1.35
      }
    }
  ]
};
