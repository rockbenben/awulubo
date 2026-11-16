/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "wash": "--night",
    "kind": "none"
  },
  "scene": {
    "kind": "window-nook",
    "light": "night"
  },
  "pages": [
    {
      "id": "p48",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "月亮出来了。",
      "text": {
        "narration": {
          "at": [
            521.8399999999999,
            200
          ],
          "size": 5.2,
          "width": 398.16,
          "text": "月亮出来了。",
          "color": "--paper",
          "align": "right"
        }
      },
      "char": {
        "pose": "waiting-up",
        "at": [
          540,
          300
        ],
        "scale": 0.52,
        "spiral": true,
        "wear": "scarf"
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
        }
      ],
      "framing": {
        "at": [
          86.73,
          -43.48
        ],
        "scale": 0.85
      }
    },
    {
      "id": "p49",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "塔还没搭完，就留在那里。",
      "text": {
        "narration": {
          "at": [
            281.12,
            200
          ],
          "size": 4.3,
          "width": 638.88,
          "text": "塔还没搭完，就留在那里。",
          "color": "--paper",
          "align": "right"
        }
      },
      "char": {
        "pose": "curled",
        "at": [
          540,
          300
        ],
        "scale": 0.52,
        "spiral": true,
        "wear": "scarf"
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
        }
      ],
      "responseTo": "p48",
      "framing": {
        "at": [
          86.73,
          -43.48
        ],
        "scale": 0.85
      }
    }
  ]
};
