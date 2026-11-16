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
      "id": "p48",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "它站在彩纸上，笑眯眯地等你。一起拍拍手。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.5,
          "width": 401.7,
          "text": "它站在彩纸上，<br>笑眯眯地等你。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "一起拍拍手。",
          "print": "一起拍拍手。",
          "align": "left"
        }
      },
      "char": {
        "pose": "beaming-lean",
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
            670
          ],
          "scale": 0.1
        }
      ],
      "hotspot": {
        "targetId": "character",
        "action": "clap",
        "target": "char",
        "at": [
          252.3,
          361.83
        ],
        "size": 463.43,
        "label": "一起试试"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          153.67,
          -168.23
        ],
        "scale": 0.95
      }
    },
    {
      "noSound": true,
      "id": "p49",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "啪！它跟着你左右摇。",
      "text": {
        "narration": {
          "at": [
            241,
            735
          ],
          "size": 5.5,
          "width": 679,
          "text": "啪！它跟着你左右摇。",
          "align": "right"
        }
      },
      "responseTo": "p48",
      "char": {
        "pose": "yield",
        "at": [
          230,
          270
        ],
        "scale": 0.65,
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
            690
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
          153.67,
          -168.23
        ],
        "scale": 0.95
      }
    }
  ]
};
