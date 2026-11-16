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
      "id": "p06",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "observe",
      "aria": "杯子旁，露出一角毯子。\n指指那角毯子。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "杯子旁，露出一角毯子。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            865
          ],
          "size": 4.2,
          "width": 820,
          "text": "指指那角毯子。",
          "print": "指指那角毯子。",
          "align": "left"
        }
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
          "kind": "blanket-corner",
          "at": [
            170,
            430
          ],
          "scale": 0.5
        }
      ],
      "hotspot": [
        {
          "targetId": "blanket-1",
          "action": "find",
          "target": "blanket",
          "at": [
            210,
            470
          ],
          "size": 380,
          "label": "指指那角毯子"
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
          62.45,
          -407.33
        ],
        "scale": 1.2
      }
    },
    {
      "id": "p07",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "毯子一角，两只小脚露出来。",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "毯子一角，两只小脚露出来。",
          "align": "right"
        }
      },
      "responseTo": "p06",
      "char": {
        "pose": "hidden-feet",
        "at": [
          170,
          360
        ],
        "scale": 0.6,
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
            170,
            470
          ],
          "scale": 0.6
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
          62.45,
          -407.33
        ],
        "scale": 1.2
      }
    }
  ]
};
