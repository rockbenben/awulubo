/** @satisfies {import('../../../../js/model.ts').Spread} */
export default {
  "background": {
    "kind": "none",
    "wash": "--wash-cream"
  },
  "scene": {
    "kind": "grass",
    "occlude": true,
    "grassScale": 2
  },
  "pages": [
    {
      "noSound": true,
      "id": "p42",
      "template": "t-dialog",
      "reading": "simulate",
      "aria": "噜啵又躲进草里了。叫三声噜啵。",
      "text": {
        "narration": {
          "at": [
            80,
            105
          ],
          "size": 5.5,
          "width": 614.1,
          "text": "噜啵又躲进草里了。",
          "class": "",
          "align": "left"
        },
        "prompt": {
          "at": [
            90,
            880
          ],
          "size": 4.2,
          "width": 820,
          "text": "叫三声噜啵。",
          "print": "叫三声噜啵。",
          "align": "left"
        }
      },
      "props": [
        {
          "id": "apple-F",
          "kind": "apple",
          "at": [
            10,
            710
          ],
          "scale": 0.075
        },
        {
          "id": "apple-G",
          "kind": "apple",
          "at": [
            90,
            710
          ],
          "scale": 0.075
        },
        {
          "id": "apple-H",
          "kind": "apple",
          "at": [
            170,
            710
          ],
          "scale": 0.075
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
          18.55,
          -53.26
        ],
        "scale": 1.14
      }
    },
    {
      "noSound": true,
      "id": "p43",
      "template": "t-dialog",
      "reading": "autonomous",
      "aria": "草里两只脚一翘：我在这儿！",
      "text": {
        "narration": {
          "at": [
            169.01999999999998,
            150
          ],
          "size": 4.7,
          "width": 750.98,
          "text": "草里两只脚一翘：我在这儿！",
          "align": "right"
        }
      },
      "responseTo": "p42",
      "char": {
        "pose": "hidden-feet",
        "at": [
          400,
          60
        ],
        "scale": 0.55,
        "spiral": false
      },
      "bg": {
        "focus": [
          0,
          500
        ]
      },
      "framing": {
        "at": [
          18.55,
          -53.26
        ],
        "scale": 1.14
      }
    }
  ]
};
