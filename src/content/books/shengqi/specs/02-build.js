/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "wash": "--wash-yellow",
    "kind": "wash",
    "colors": [
      "--wash-yellow"
    ],
    "gap": "--wash-yellow",
    "cover": "all"
  },
  "scene": {
    "kind": "window-nook"
  },
  "pages": [
    {
      "id": "p04",
      "template": "t-dialog",
      "noSound": true,
      "pat": false,
      "reading": "simulate",
      "aria": "窗边，一块再一块，越搭越高。\n用手比比高度。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "窗边，一块再一块，<br>越搭越高。",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "用手比比高度。",
          "print": "用手比比高度。",
          "align": "left"
        }
      },
      "char": {
        "pose": "stretch-up",
        "at": [
          490,
          325
        ],
        "scale": 0.56,
        "spiral": true,
        "wear": "scarf"
      },
      "props": [
        {
          "id": "fantasy-distance",
          "kind": "castle",
          "at": [
            650,
            50
          ],
          "scale": 0.35,
          "layer": "behind",
          "style": "--scene-castle-opacity:.08;--scene-ink:var(--ink)"
        },
        {
          "id": "block-1",
          "kind": "block",
          "at": [
            120,
            620
          ],
          "scale": 0.24,
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            120,
            514
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            120,
            408
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            120,
            302
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            120,
            196
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"
        }
      ],
      "framing": {
        "at": [
          -111.84,
          33.4
        ],
        "scale": 1
      }
    },
    {
      "id": "p05",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "塔尖都高过它的脑袋啦！",
      "text": {
        "narration": {
          "at": [
            176.10000000000002,
            150
          ],
          "size": 5.5,
          "width": 743.9,
          "text": "塔尖都高过它的脑袋啦！",
          "align": "right"
        }
      },
      "char": {
        "pose": "stretch-up",
        "at": [
          490,
          325
        ],
        "scale": 0.56,
        "spiral": true,
        "wear": "scarf"
      },
      "props": [
        {
          "id": "block-1",
          "kind": "block",
          "at": [
            120,
            620
          ],
          "scale": 0.24,
          "style": "--block-face:var(--blue);--block-top:var(--blue);--block-side:var(--blue)"
        },
        {
          "id": "block-2",
          "kind": "block",
          "at": [
            120,
            514
          ],
          "scale": 0.24,
          "style": "--block-face:var(--yellow);--block-top:var(--yellow);--block-side:var(--yellow)"
        },
        {
          "id": "block-3",
          "kind": "block",
          "at": [
            120,
            408
          ],
          "scale": 0.24,
          "style": "--block-face:var(--red);--block-top:var(--red);--block-side:var(--red)"
        },
        {
          "id": "block-4",
          "kind": "block",
          "at": [
            120,
            302
          ],
          "scale": 0.24,
          "style": "--block-face:var(--green);--block-top:var(--green);--block-side:var(--green)"
        },
        {
          "id": "block-5",
          "kind": "block",
          "at": [
            120,
            196
          ],
          "scale": 0.24,
          "style": "--block-face:var(--pink);--block-top:var(--pink);--block-side:var(--pink)"
        }
      ],
      "responseTo": "p04",
      "framing": {
        "at": [
          -111.84,
          33.4
        ],
        "scale": 1
      }
    }
  ]
};
