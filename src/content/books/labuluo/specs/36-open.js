/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-yellow"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p36",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它抬起头，望着你。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "它抬起头，望着你。",
          "align": "left"
        }
      },
      "char": {
        "pose": "curious-tilt",
        "at": [
          210,
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
          "kind": "blanket-drape",
          "at": [
            255,
            435
          ],
          "scale": 0.62,
          "layer": "behind"
        },
        {
          "id": "apple-A",
          "kind": "apple",
          "at": [
            170,
            600
          ],
          "scale": 0.2,
          "class": "prop-apple"
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
          53.03,
          -284.06
        ],
        "scale": 1.09
      }
    },
    {
      "id": "p37",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "嘴张得大大的：啊——",
      "text": {
        "narration": {
          "at": [
            241,
            735
          ],
          "size": 5.5,
          "width": 679,
          "text": "嘴张得大大的：啊——",
          "align": "right"
        }
      },
      "responseTo": "p36",
      "char": {
        "pose": "lean-near",
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
          "kind": "blanket-drape",
          "at": [
            255,
            435
          ],
          "scale": 0.62,
          "layer": "behind"
        },
        {
          "id": "apple-A",
          "kind": "apple",
          "at": [
            170,
            600
          ],
          "scale": 0.2,
          "class": "prop-apple"
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
          53.03,
          -284.06
        ],
        "scale": 1.09
      }
    }
  ]
};
