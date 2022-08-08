export type User = {
  "version": "0.1.0",
  "name": "user",
  "instructions": [
    {
      "name": "newUser",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
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
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeUsername",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "addBookmarks",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "bookmark",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "bookmarks",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    }
  ]
};

export const IDL: User = {
  "version": "0.1.0",
  "name": "user",
  "instructions": [
    {
      "name": "newUser",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
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
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeUsername",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "addBookmarks",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "bookmark",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "bookmarks",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    }
  ]
};
