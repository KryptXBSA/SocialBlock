export type Block = {
  "version": "0.1.0",
  "name": "block",
  "instructions": [
    {
      "name": "newBlock",
      "accounts": [
        {
          "name": "block",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "blockName",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeImage",
      "accounts": [
        {
          "name": "block",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "image",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeName",
      "accounts": [
        {
          "name": "block",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "block",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "blockName",
            "type": "string"
          },
          {
            "name": "image",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ]
};

export const IDL: Block = {
  "version": "0.1.0",
  "name": "block",
  "instructions": [
    {
      "name": "newBlock",
      "accounts": [
        {
          "name": "block",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "blockName",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeImage",
      "accounts": [
        {
          "name": "block",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "image",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeName",
      "accounts": [
        {
          "name": "block",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "block",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "blockName",
            "type": "string"
          },
          {
            "name": "image",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
