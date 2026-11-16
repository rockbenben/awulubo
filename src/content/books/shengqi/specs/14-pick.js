/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-cream"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p28",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "红色缩到一边，积木还散在地上。",
      "text": {
        "narration": {
          "at": [
            80,
            200
          ],
          "size": 4.3,
          "width": 435.92,
          "text": "红色缩到一边，<br>积木还散在地上。",
          "align": "left"
        }
      },
      "char": {
        "pose": "look-down",
        "at": [
          470,
          280
        ],
        "scale": 0.6,
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
          "style": "--edge:var(--wash-red);opacity:.6"
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
            280,
            630
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            400,
            655
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
          200.73,
          245.81
        ],
        "scale": 0.62
      }
    },
    {
      "id": "p29",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你瞧着散开的积木，没有走开。",
      "text": {
        "narration": {
          "at": [
            433.34,
            200
          ],
          "size": 4.3,
          "width": 486.66,
          "text": "你瞧着散开的积木，<br>没有走开。",
          "align": "right"
        }
      },
      "char": {
        "pose": "curious-tilt",
        "at": [
          470,
          280
        ],
        "scale": 0.6,
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
          "style": "--edge:var(--wash-red);opacity:.6"
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
            280,
            630
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            400,
            655
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
      "responseTo": "p28",
      "framing": {
        "at": [
          200.73,
          245.81
        ],
        "scale": 0.62
      }
    }
  ]
};
