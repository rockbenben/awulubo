/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--night"
  },
  "scene": {
    "kind": "room",
    "light": "night"
  },
  "pages": [
    {
      "id": "p28",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "它的呼吸慢下来。\n陪它坐一会儿。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 435.92,
          "text": "它的呼吸慢下来。",
          "color": "--paper",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "陪它坐一会儿。",
          "print": "陪它坐一会儿。",
          "color": "--paper",
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
          "kind": "blanket-lap",
          "at": [
            235,
            560
          ],
          "scale": 0.62
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
          117.24,
          73.66
        ],
        "scale": 0.85
      }
    },
    {
      "id": "p29",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你坐着，听它慢慢呼气。",
      "text": {
        "narration": {
          "at": [
            331.86,
            200
          ],
          "size": 4.3,
          "width": 588.14,
          "text": "你坐着，听它慢慢呼气。",
          "color": "--paper",
          "align": "right"
        }
      },
      "responseTo": "p28",
      "char": {
        "pose": "covered-rest",
        "at": [
          260,
          300
        ],
        "scale": 0.62,
        "spiral": false,
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
          "kind": "blanket-lap",
          "at": [
            235,
            560
          ],
          "scale": 0.62
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
          117.24,
          73.66
        ],
        "scale": 0.85
      }
    }
  ]
};
