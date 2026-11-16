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
      "id": "p12",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "噜啵伸长身子，看倒下的塔。",
      "text": {
        "narration": {
          "at": [
            80,
            735
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "噜啵伸长身子，看倒下的塔。",
          "align": "left"
        }
      },
      "char": {
        "pose": "stretch-look",
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
          178.82,
          -121.15
        ],
        "scale": 0.79
      }
    },
    {
      "id": "p13",
      "template": "t-plain",
      "noSound": true,
      "pat": false,
      "reading": "autonomous",
      "aria": "它转过脸，看见你。",
      "text": {
        "narration": {
          "at": [
            305.9,
            735
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "它转过脸，看见你。",
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
      "responseTo": "p12",
      "framing": {
        "at": [
          178.82,
          -121.15
        ],
        "scale": 0.79
      }
    }
  ]
};
