/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "wash": "--night-deep",
    "kind": "none"
  },
  "scene": {
    "kind": "room",
    "light": "late-night"
  },
  "pages": [
    {
      "id": "p56",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "晚安。\n轻轻翻过去。",
      "text": {
        "narration": {
          "at": [
            540,
            200
          ],
          "size": 5.2,
          "width": 380,
          "text": "晚安。",
          "color": "--paper",
          "align": "right"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "轻轻翻过去。",
          "print": "轻轻翻过去。",
          "color": "--paper",
          "align": "left"
        }
      },
      "char": {
        "pose": "covered-rest",
        "at": [
          540,
          300
        ],
        "scale": 0.52,
        "spiral": false
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
          "style": "--edge:var(--wash-red);opacity:.09"
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
          "style": "opacity:.3"
        },
        {
          "id": "block-1",
          "kind": "block",
          "at": [
            90,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.28"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            202,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.28"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            145,
            494
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.28"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            -50,
            710
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.28"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            350,
            800
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.28"
        },
        {
          "id": "scarf-1",
          "kind": "scarf",
          "at": [
            660,
            710
          ],
          "scale": 0.35,
          "style": ";opacity:.28"
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
      "id": "p57",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "呼噜……",
      "text": {
        "narration": {
          "at": [
            540,
            200
          ],
          "size": 5.2,
          "width": 380,
          "text": "呼噜……",
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
        "spiral": false
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
          "style": "--edge:var(--wash-red);opacity:.09"
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
          "style": "opacity:.3"
        },
        {
          "id": "block-1",
          "kind": "block",
          "at": [
            90,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue);opacity:.28"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            202,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow);opacity:.28"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            145,
            494
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red);opacity:.28"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            -50,
            710
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green);opacity:.28"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            350,
            800
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink);opacity:.28"
        },
        {
          "id": "scarf-1",
          "kind": "scarf",
          "at": [
            660,
            710
          ],
          "scale": 0.35,
          "style": ";opacity:.28"
        }
      ],
      "responseTo": "p56",
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
