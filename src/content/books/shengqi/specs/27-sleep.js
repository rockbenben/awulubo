/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "wash": "--night",
    "kind": "none"
  },
  "scene": {
    "kind": "room",
    "light": "night"
  },
  "pages": [
    {
      "id": "p54",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它的肚子一起一伏。",
      "text": {
        "narration": {
          "at": [
            433.34,
            200
          ],
          "size": 4.3,
          "width": 486.66,
          "text": "它的肚子一起一伏。",
          "color": "--paper",
          "align": "right"
        }
      },
      "char": {
        "pose": "covered-rest",
        "at": [
          540,
          300
        ],
        "scale": 0.52,
        "spiral": true
      },
      "props": [
        {
          "id": "red-residue",
          "kind": "color-edge",
          "at": [
            0,
            160
          ],
          "scale": 0.7,
          "layer": "behind",
          "style": "--edge:var(--wash-red);opacity:.14"
        },
        {
          "id": "moon-1",
          "kind": "moon",
          "at": [
            20,
            185
          ],
          "scale": 0.2,
          "layer": "behind",
          "style": "opacity:.5"
        },
        {
          "id": "block-1",
          "kind": "block",
          "at": [
            90,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.55"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            202,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.55"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            145,
            494
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.55"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            -50,
            710
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.55"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            350,
            800
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.55"
        },
        {
          "id": "scarf-1",
          "kind": "scarf",
          "at": [
            660,
            710
          ],
          "scale": 0.35,
          "style": ";opacity:.55"
        }
      ],
      "framing": {
        "at": [
          88.05,
          -43.48
        ],
        "scale": 0.85
      }
    },
    {
      "id": "p55",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你也躺得松松的。",
      "text": {
        "narration": {
          "at": [
            484.08,
            200
          ],
          "size": 4.3,
          "width": 435.92,
          "text": "你也躺得松松的。",
          "color": "--paper",
          "align": "right"
        }
      },
      "char": {
        "pose": "covered-rest",
        "at": [
          540,
          300
        ],
        "scale": 0.52,
        "spiral": true
      },
      "props": [
        {
          "id": "red-residue",
          "kind": "color-edge",
          "at": [
            0,
            160
          ],
          "scale": 0.7,
          "layer": "behind",
          "style": "--edge:var(--wash-red);opacity:.14"
        },
        {
          "id": "moon-1",
          "kind": "moon",
          "at": [
            20,
            185
          ],
          "scale": 0.2,
          "layer": "behind",
          "style": "opacity:.5"
        },
        {
          "id": "block-1",
          "kind": "block",
          "at": [
            90,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.55"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            202,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.55"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            145,
            494
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.55"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            -50,
            710
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.55"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            350,
            800
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.55"
        },
        {
          "id": "scarf-1",
          "kind": "scarf",
          "at": [
            660,
            710
          ],
          "scale": 0.35,
          "style": ";opacity:.55"
        }
      ],
      "responseTo": "p54",
      "framing": {
        "at": [
          88.05,
          -43.48
        ],
        "scale": 0.85
      }
    }
  ]
};
