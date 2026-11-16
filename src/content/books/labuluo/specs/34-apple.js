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
      "id": "p34",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "observe",
      "aria": "你把苹果放在旁边。\n指指苹果。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "你把苹果放在旁边。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "指指苹果。",
          "print": "指指苹果。",
          "align": "left"
        }
      },
      "char": {
        "pose": "tired",
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
      "hotspot": {
        "targetId": "apple-A",
        "action": "find",
        "target": "apple",
        "at": [
          170,
          600
        ],
        "size": 250,
        "label": "指指苹果"
      },
      "bg": {
        "focus": [
          1000,
          500
        ]
      },
      "framing": {
        "at": [
          -99.5,
          -250.26
        ],
        "scale": 1.25
      }
    },
    {
      "id": "p35",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它的嘴巴动动，身子挪近一点。",
      "text": {
        "narration": {
          "at": [
            435.7,
            95
          ],
          "size": 5.5,
          "width": 484.3,
          "text": "它的嘴巴动动，<br>身子挪近一点。",
          "align": "right"
        }
      },
      "responseTo": "p34",
      "char": {
        "pose": "sick-raised",
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
          -99.5,
          -250.26
        ],
        "scale": 1.25
      }
    }
  ]
};
