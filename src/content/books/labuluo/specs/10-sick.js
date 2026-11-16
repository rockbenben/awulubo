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
      "id": "p10",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你生病啦？",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 9,
          "width": 561,
          "text": "你生病啦？",
          "align": "left"
        }
      },
      "char": {
        "pose": "sick-raised",
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
          -54.79,
          -438.79
        ],
        "scale": 1.3
      }
    },
    {
      "id": "p11",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它抬抬头，又软软地趴下。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它抬抬头，又软软地趴下。",
          "align": "right"
        }
      },
      "responseTo": "p10",
      "char": {
        "pose": "prone",
        "at": [
          260,
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
          0,
          500
        ]
      },
      "framing": {
        "at": [
          -54.79,
          -438.79
        ],
        "scale": 1.3
      }
    }
  ]
};
