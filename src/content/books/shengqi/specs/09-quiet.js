/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "wash": "--wash-yellow",
    "kind": "none"
  },
  "scene": {
    "kind": "room"
  },
  "pages": [
    {
      "id": "p18",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "你鼓起嘴，想说话。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "你鼓起嘴，想说话。",
          "align": "left"
        }
      },
      "char": {
        "pose": "huddle-away",
        "at": [
          470,
          280
        ],
        "scale": 0.6,
        "spiral": true,
        "wear": "scarf-creased"
      },
      "props": [
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
          108.39,
          -237.71
        ],
        "scale": 0.91
      }
    },
    {
      "id": "p19",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它鼓起腮，又把嘴闭住了。",
      "text": {
        "narration": {
          "at": [
            224.48000000000002,
            735
          ],
          "size": 4.7,
          "width": 695.52,
          "text": "它鼓起腮，又把嘴闭住了。",
          "align": "right"
        }
      },
      "char": {
        "pose": "puffed-side",
        "at": [
          470,
          280
        ],
        "scale": 0.6,
        "spiral": true,
        "wear": "scarf-creased"
      },
      "props": [
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
      "responseTo": "p18",
      "framing": {
        "at": [
          108.39,
          -237.71
        ],
        "scale": 0.91
      }
    }
  ]
};
