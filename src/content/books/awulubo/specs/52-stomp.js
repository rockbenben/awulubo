/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-cream"
  },
  "scene": {
    "kind": "grass",
    "occlude": false,
    "grassScale": 2
  },
  "pages": [
    {
      "noSound": true,
      "id": "p52",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "最后一片彩纸落在脚边。轻轻跺一下脚。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "最后一片彩纸落在脚边。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻跺一下脚。",
          "print": "轻轻跺一下脚。",
          "align": "left"
        }
      },
      "char": {
        "pose": "poised",
        "at": [
          130,
          255
        ],
        "scale": 0.65,
        "spiral": true
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
        },
        {
          "id": "K2-red",
          "kind": "paper-red",
          "at": [
            380,
            760
          ],
          "scale": 0.09
        },
        {
          "id": "K2-blue",
          "kind": "paper-blue",
          "at": [
            600,
            770
          ],
          "scale": 0.1
        },
        {
          "id": "K2-yellow",
          "kind": "paper-yellow",
          "at": [
            760,
            755
          ],
          "scale": 0.1
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
          81.95,
          -239.64
        ],
        "scale": 1.05
      }
    },
    {
      "noSound": true,
      "id": "p53",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "咚。它跟着跺一下，停住了。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "咚。它跟着跺一下，停住了。",
          "align": "right"
        }
      },
      "responseTo": "p52",
      "char": {
        "pose": "beaming-lean",
        "at": [
          240,
          285
        ],
        "scale": 0.6,
        "spiral": true
      },
      "props": [
        {
          "id": "K2-red",
          "kind": "paper-red",
          "at": [
            380,
            760
          ],
          "scale": 0.09
        },
        {
          "id": "K2-blue",
          "kind": "paper-blue",
          "at": [
            600,
            770
          ],
          "scale": 0.1
        },
        {
          "id": "K2-yellow",
          "kind": "paper-yellow",
          "at": [
            760,
            755
          ],
          "scale": 0.1
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
          81.95,
          -239.64
        ],
        "scale": 1.05
      }
    }
  ]
};
