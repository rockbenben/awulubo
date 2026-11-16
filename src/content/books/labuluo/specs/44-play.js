/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "wash",
    "wash": "--wash-yellow",
    "colors": [
      "--yellow"
    ],
    "gap": "--paper",
    "cover": "all"
  },
  "scene": {
    "kind": "doorway"
  },
  "pages": [
    {
      "id": "p44",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "你慢慢走到门边。\n走两小步。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 549.2,
          "text": "你慢慢走到门边。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "走两小步。",
          "print": "走两小步。",
          "align": "left"
        }
      },
      "char": {
        "pose": "curious-tilt",
        "at": [
          370,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-paper"
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
            210,
            605
          ],
          "scale": 0.39,
          "layer": "behind"
        },
        {
          "id": "apple-A",
          "kind": "apple-bitten",
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
          -88.74,
          -118.19
        ],
        "scale": 1.15
      }
    },
    {
      "id": "p45",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "嗒、嗒，它迈大步追上来。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            150
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "嗒、嗒，它迈大步追上来。",
          "align": "right"
        }
      },
      "responseTo": "p44",
      "char": {
        "pose": "step",
        "at": [
          350,
          260
        ],
        "scale": 0.62,
        "spiral": true,
        "state": "state-paper"
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
            210,
            605
          ],
          "scale": 0.39,
          "layer": "behind"
        },
        {
          "id": "apple-A",
          "kind": "apple-bitten",
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
          -88.74,
          -118.19
        ],
        "scale": 1.15
      }
    }
  ]
};
