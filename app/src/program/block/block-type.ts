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
    }
  ],
  "accounts": [
    {
      "name": "block",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "block",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "blockName",
            "type": "string"
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
    }
  ],
  "accounts": [
    {
      "name": "block",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "block",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "blockName",
            "type": "string"
          }
        ]
      }
    }
  ]
};
