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
      "id": "p42",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "毯子落在身后，它弯弯小脚。\n轻轻跳一下。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "毯子落在身后，它弯弯小脚。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻跳一下。",
          "print": "轻轻跳一下。",
          "align": "left"
        }
      },
      "char": {
        "pose": "poised",
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
          25.38,
          -260.48
        ],
        "scale": 1.1
      }
    },
    {
      "id": "p43",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它跟着跳了一下，稳稳落地。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "它跟着跳了一下，稳稳落地。",
          "align": "right"
        }
      },
      "responseTo": "p42",
      "char": {
        "pose": "yield",
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
          25.38,
          -260.48
        ],
        "scale": 1.1
      }
    }
  ]
};
