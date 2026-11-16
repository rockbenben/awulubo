/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-blue"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p20",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "大人拿来药，噜啵吃了一口。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "大人拿来药，噜啵吃了一口。",
          "align": "left"
        }
      },
      "char": {
        "pose": "willing",
        "at": [
          80,
          290
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
          "kind": "blanket-fold",
          "at": [
            275,
            550
          ],
          "scale": 0.58
        },
        {
          "id": "medicine-adult",
          "kind": "medicine-adult",
          "at": [
            322,
            452
          ],
          "scale": 0.8
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
          -91.97,
          -215.87
        ],
        "scale": 1.18
      }
    },
    {
      "id": "p21",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "苦！嘴皱扁了，红色一下铺开！",
      "text": {
        "narration": {
          "at": [
            435.7,
            95
          ],
          "size": 5.5,
          "width": 484.3,
          "text": "苦！嘴皱扁了，<br>红色一下铺开！",
          "align": "right"
        }
      },
      "responseTo": "p20",
      "char": {
        "pose": "bitter-curled",
        "at": [
          275,
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
        "wash": "--wash-red",
        "focus": [
          0,
          500
        ]
      },
      "turn": "红色一下铺开",
      "framing": {
        "at": [
          -91.97,
          -215.87
        ],
        "scale": 1.18
      }
    }
  ]
};
