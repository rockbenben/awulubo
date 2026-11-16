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
      "id": "p50",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它低下头，让你摘下领巾。",
      "text": {
        "narration": {
          "at": [
            281.12,
            200
          ],
          "size": 4.3,
          "width": 638.88,
          "text": "它低下头，让你摘下领巾。",
          "color": "--paper",
          "align": "right"
        }
      },
      "char": {
        "pose": "bow",
        "at": [
          470,
          300
        ],
        "scale": 0.55,
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
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            202,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            145,
            494
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            -50,
            710
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            350,
            800
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"
        },
        {
          "id": "child-hand",
          "kind": "child-reach",
          "at": [
            470,
            560
          ],
          "scale": 0.65
        },
        {
          "id": "scarf-1",
          "kind": "scarf",
          "at": [
            600,
            580
          ],
          "scale": 0.28
        }
      ],
      "framing": {
        "at": [
          88.05,
          -14.59
        ],
        "scale": 0.85
      }
    },
    {
      "id": "p51",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "今天，就搭到这里吧。",
      "text": {
        "narration": {
          "at": [
            382.6,
            200
          ],
          "size": 4.3,
          "width": 537.4,
          "text": "今天，就搭到这里吧。",
          "color": "--paper",
          "align": "right"
        }
      },
      "char": {
        "pose": "sleep-curled",
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
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            202,
            600
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            145,
            494
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            -50,
            710
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            350,
            800
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"
        },
        {
          "id": "scarf-1",
          "kind": "scarf",
          "at": [
            660,
            710
          ],
          "scale": 0.35
        }
      ],
      "responseTo": "p50",
      "framing": {
        "at": [
          88.05,
          -14.59
        ],
        "scale": 0.85
      }
    }
  ]
};
