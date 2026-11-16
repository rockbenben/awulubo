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
      "id": "p12",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "我陪着你。\n坐近一点。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 9,
          "width": 561,
          "text": "我陪着你。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "坐近一点。",
          "print": "坐近一点。",
          "align": "left"
        }
      },
      "char": {
        "pose": "listen-low",
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
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -70.37,
          -201.42
        ],
        "scale": 1.15
      }
    },
    {
      "id": "p13",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它往你身边靠了靠。",
      "text": {
        "narration": {
          "at": [
            305.9,
            150
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "它往你身边靠了靠。",
          "align": "right"
        }
      },
      "responseTo": "p12",
      "char": {
        "pose": "lean-close",
        "at": [
          245,
          315
        ],
        "scale": 0.66,
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
          -70.37,
          -201.42
        ],
        "scale": 1.15
      }
    }
  ]
};
