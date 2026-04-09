/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/hvh.json`.
 */
export type Hvh = {
  "address": "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS",
  "metadata": {
    "name": "hvh",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Holder v. Holder — locked-position arena (scaffold)"
  },
  "instructions": [
    {
      "name": "activateArenaIfFull",
      "discriminator": [
        171,
        34,
        218,
        128,
        119,
        140,
        185,
        154
      ],
      "accounts": [
        {
          "name": "globalConfig"
        },
        {
          "name": "arena",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "claimWinnings",
      "discriminator": [
        161,
        215,
        24,
        59,
        14,
        236,
        242,
        221
      ],
      "accounts": [
        {
          "name": "globalConfig"
        },
        {
          "name": "arena",
          "writable": true
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              }
            ]
          }
        },
        {
          "name": "arenaStakeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "stakeMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "stakeMint"
        },
        {
          "name": "position",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true
        },
        {
          "name": "userStake",
          "writable": true
        },
        {
          "name": "positionTrackedVault",
          "writable": true
        },
        {
          "name": "userTracked",
          "writable": true
        },
        {
          "name": "trackedMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "createArena",
      "discriminator": [
        174,
        236,
        45,
        61,
        197,
        215,
        149,
        169
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "writable": true
        },
        {
          "name": "arena",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  114,
                  101,
                  110,
                  97
                ]
              },
              {
                "kind": "arg",
                "path": "arenaId"
              }
            ]
          }
        },
        {
          "name": "mintPolicyTracked",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  112,
                  111,
                  108,
                  105,
                  99,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "trackedMint"
              }
            ]
          }
        },
        {
          "name": "mintPolicyStake",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  112,
                  111,
                  108,
                  105,
                  99,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "stakeMint"
              }
            ]
          }
        },
        {
          "name": "trackedMint"
        },
        {
          "name": "stakeMint"
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              }
            ]
          }
        },
        {
          "name": "arenaStakeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "stakeMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "arenaId",
          "type": "u64"
        },
        {
          "name": "battleLot",
          "type": "u64"
        },
        {
          "name": "entryStake",
          "type": "u64"
        },
        {
          "name": "seatCount",
          "type": "u16"
        },
        {
          "name": "winnerCount",
          "type": "u16"
        }
      ]
    },
    {
      "name": "finalizeIfThreeLeft",
      "discriminator": [
        239,
        94,
        125,
        38,
        63,
        12,
        254,
        190
      ],
      "accounts": [
        {
          "name": "globalConfig"
        },
        {
          "name": "arena",
          "writable": true
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              }
            ]
          }
        },
        {
          "name": "arenaStakeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "stakeMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "stakeMint"
        },
        {
          "name": "treasuryTokenAccount",
          "writable": true
        },
        {
          "name": "pa",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              },
              {
                "kind": "account",
                "path": "pa.owner",
                "account": "position"
              }
            ]
          }
        },
        {
          "name": "pb",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              },
              {
                "kind": "account",
                "path": "pb.owner",
                "account": "position"
              }
            ]
          }
        },
        {
          "name": "pc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              },
              {
                "kind": "account",
                "path": "pc.owner",
                "account": "position"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "initializeConfig",
      "discriminator": [
        208,
        127,
        21,
        1,
        194,
        190,
        196,
        70
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "treasury",
          "type": "pubkey"
        },
        {
          "name": "defaultStakeMint",
          "type": "pubkey"
        },
        {
          "name": "arenaCreationMode",
          "type": "u8"
        }
      ]
    },
    {
      "name": "joinArena",
      "discriminator": [
        135,
        217,
        203,
        200,
        93,
        181,
        131,
        47
      ],
      "accounts": [
        {
          "name": "globalConfig"
        },
        {
          "name": "arena",
          "writable": true
        },
        {
          "name": "mintPolicy"
        },
        {
          "name": "position",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              }
            ]
          }
        },
        {
          "name": "arenaStakeVault",
          "writable": true
        },
        {
          "name": "userTracked",
          "writable": true
        },
        {
          "name": "userStake",
          "writable": true
        },
        {
          "name": "positionTrackedVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "position"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "trackedMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "trackedMint"
        },
        {
          "name": "stakeMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "leaveRecruiting",
      "discriminator": [
        4,
        243,
        251,
        123,
        154,
        182,
        132,
        218
      ],
      "accounts": [
        {
          "name": "globalConfig"
        },
        {
          "name": "arena",
          "writable": true
        },
        {
          "name": "position",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              }
            ]
          }
        },
        {
          "name": "arenaStakeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "stakeMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userStake",
          "writable": true
        },
        {
          "name": "userTracked",
          "writable": true
        },
        {
          "name": "positionTrackedVault",
          "writable": true
        },
        {
          "name": "stakeMint"
        },
        {
          "name": "trackedMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "setMintPolicy",
      "discriminator": [
        12,
        208,
        252,
        52,
        166,
        250,
        137,
        169
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint"
        },
        {
          "name": "mintPolicy",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  112,
                  111,
                  108,
                  105,
                  99,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "allowed",
          "type": "bool"
        },
        {
          "name": "requireRevokedMintAuthority",
          "type": "bool"
        },
        {
          "name": "requireNoFreezeAuthority",
          "type": "bool"
        },
        {
          "name": "allowToken2022",
          "type": "bool"
        },
        {
          "name": "policyHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "surrenderLive",
      "discriminator": [
        25,
        196,
        186,
        243,
        155,
        215,
        25,
        142
      ],
      "accounts": [
        {
          "name": "globalConfig"
        },
        {
          "name": "arena",
          "writable": true
        },
        {
          "name": "position",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "arena"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true
        },
        {
          "name": "positionTrackedVault",
          "writable": true
        },
        {
          "name": "userTracked",
          "writable": true
        },
        {
          "name": "trackedMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "arena",
      "discriminator": [
        243,
        215,
        44,
        44,
        231,
        211,
        232,
        168
      ]
    },
    {
      "name": "globalConfig",
      "discriminator": [
        149,
        8,
        156,
        202,
        160,
        252,
        176,
        217
      ]
    },
    {
      "name": "mintPolicy",
      "discriminator": [
        191,
        78,
        230,
        47,
        121,
        49,
        66,
        222
      ]
    },
    {
      "name": "position",
      "discriminator": [
        170,
        188,
        143,
        228,
        122,
        64,
        247,
        208
      ]
    }
  ],
  "events": [
    {
      "name": "activated",
      "discriminator": [
        140,
        38,
        35,
        97,
        110,
        193,
        239,
        71
      ]
    },
    {
      "name": "arenaCreated",
      "discriminator": [
        93,
        57,
        84,
        96,
        112,
        3,
        148,
        17
      ]
    },
    {
      "name": "claimed",
      "discriminator": [
        217,
        192,
        123,
        72,
        108,
        150,
        248,
        33
      ]
    },
    {
      "name": "configInitialized",
      "discriminator": [
        181,
        49,
        200,
        156,
        19,
        167,
        178,
        91
      ]
    },
    {
      "name": "finalized",
      "discriminator": [
        4,
        77,
        242,
        80,
        20,
        152,
        247,
        252
      ]
    },
    {
      "name": "joined",
      "discriminator": [
        16,
        20,
        44,
        48,
        132,
        189,
        68,
        98
      ]
    },
    {
      "name": "leftRecruiting",
      "discriminator": [
        196,
        76,
        54,
        162,
        125,
        251,
        135,
        246
      ]
    },
    {
      "name": "mintPolicySet",
      "discriminator": [
        194,
        195,
        143,
        171,
        251,
        203,
        243,
        211
      ]
    },
    {
      "name": "surrendered",
      "discriminator": [
        64,
        252,
        207,
        6,
        132,
        185,
        239,
        67
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "paused",
      "msg": "Protocol is paused"
    },
    {
      "code": 6001,
      "name": "invalidArenaCreator",
      "msg": "Invalid arena creation mode for caller"
    },
    {
      "code": 6002,
      "name": "arenaNotRecruiting",
      "msg": "Arena is not recruiting"
    },
    {
      "code": 6003,
      "name": "arenaNotLive",
      "msg": "Arena is not live"
    },
    {
      "code": 6004,
      "name": "arenaNotFinalized",
      "msg": "Arena not finalized"
    },
    {
      "code": 6005,
      "name": "seatCountTooLow",
      "msg": "Seat count must be greater than winner count"
    },
    {
      "code": 6006,
      "name": "arenaFull",
      "msg": "Arena full"
    },
    {
      "code": 6007,
      "name": "mintNotAllowed",
      "msg": "Mint policy not allowed"
    },
    {
      "code": 6008,
      "name": "mintPolicyMissing",
      "msg": "Tracked mint policy missing"
    },
    {
      "code": 6009,
      "name": "invalidTokenProgram",
      "msg": "Wrong token program for mint"
    },
    {
      "code": 6010,
      "name": "mintAuthorityNotRevoked",
      "msg": "Mint authority must be none (revoked)"
    },
    {
      "code": 6011,
      "name": "freezeAuthorityPresent",
      "msg": "Freeze authority must be none"
    },
    {
      "code": 6012,
      "name": "invalidWinnerCount",
      "msg": "Winner count must be 3 for MVP"
    },
    {
      "code": 6013,
      "name": "amountMismatch",
      "msg": "Amount mismatch for battle lot or stake"
    },
    {
      "code": 6014,
      "name": "positionAlreadyExists",
      "msg": "Position already exists"
    },
    {
      "code": 6015,
      "name": "invalidPositionState",
      "msg": "Invalid position state"
    },
    {
      "code": 6016,
      "name": "notOwner",
      "msg": "Not owner"
    },
    {
      "code": 6017,
      "name": "arenaNotFull",
      "msg": "Arena not full yet"
    },
    {
      "code": 6018,
      "name": "invalidActiveCount",
      "msg": "Active count must be 3 to finalize"
    },
    {
      "code": 6019,
      "name": "duplicateWinner",
      "msg": "Duplicate winner position"
    },
    {
      "code": 6020,
      "name": "notWinner",
      "msg": "Position not a winner"
    },
    {
      "code": 6021,
      "name": "alreadyClaimed",
      "msg": "Already claimed"
    },
    {
      "code": 6022,
      "name": "mathOverflow",
      "msg": "Math overflow"
    },
    {
      "code": 6023,
      "name": "invalidStakeMint",
      "msg": "Invalid stake mint"
    },
    {
      "code": 6024,
      "name": "token2022NotAllowed",
      "msg": "Tracked mint must use classic SPL Token for this policy"
    }
  ],
  "types": [
    {
      "name": "activated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "arena",
            "type": "pubkey"
          },
          {
            "name": "slot",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "arena",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "arenaId",
            "type": "u64"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "trackedMint",
            "type": "pubkey"
          },
          {
            "name": "trackedTokenProgram",
            "type": "pubkey"
          },
          {
            "name": "stakeMint",
            "type": "pubkey"
          },
          {
            "name": "stakeTokenProgram",
            "type": "pubkey"
          },
          {
            "name": "battleLot",
            "type": "u64"
          },
          {
            "name": "entryStake",
            "type": "u64"
          },
          {
            "name": "seatCount",
            "type": "u16"
          },
          {
            "name": "joinedCount",
            "type": "u16"
          },
          {
            "name": "activeCount",
            "type": "u16"
          },
          {
            "name": "winnerCount",
            "type": "u16"
          },
          {
            "name": "state",
            "type": {
              "defined": {
                "name": "arenaState"
              }
            }
          },
          {
            "name": "createdSlot",
            "type": "u64"
          },
          {
            "name": "activatedSlot",
            "type": "u64"
          },
          {
            "name": "finalizedSlot",
            "type": "u64"
          },
          {
            "name": "vaultAuthorityBump",
            "type": "u8"
          },
          {
            "name": "perWinnerShare",
            "docs": [
              "USDC smallest units per winner; set at finalize."
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "arenaCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "arena",
            "type": "pubkey"
          },
          {
            "name": "arenaId",
            "type": "u64"
          },
          {
            "name": "trackedMint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "arenaCreationMode",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "authorityOnly"
          },
          {
            "name": "allowlisted"
          },
          {
            "name": "permissionless"
          }
        ]
      }
    },
    {
      "name": "arenaState",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "recruiting"
          },
          {
            "name": "live"
          },
          {
            "name": "finalized"
          }
        ]
      }
    },
    {
      "name": "claimed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "arena",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "configInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "finalized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "arena",
            "type": "pubkey"
          },
          {
            "name": "perWinnerShare",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "globalConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "paused",
            "type": "bool"
          },
          {
            "name": "arenaCreationMode",
            "type": {
              "defined": {
                "name": "arenaCreationMode"
              }
            }
          },
          {
            "name": "defaultStakeMint",
            "type": "pubkey"
          },
          {
            "name": "version",
            "type": "u16"
          },
          {
            "name": "nextArenaId",
            "docs": [
              "Monotonic id for next arena (see ADR-003)."
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "joined",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "arena",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "position",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "leftRecruiting",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "arena",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "mintPolicy",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "tokenProgram",
            "type": "pubkey"
          },
          {
            "name": "allowed",
            "type": "bool"
          },
          {
            "name": "requireRevokedMintAuthority",
            "type": "bool"
          },
          {
            "name": "requireNoFreezeAuthority",
            "type": "bool"
          },
          {
            "name": "allowToken2022",
            "type": "bool"
          },
          {
            "name": "policyHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "mintPolicySet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "allowed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "arena",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "trackedVault",
            "type": "pubkey"
          },
          {
            "name": "state",
            "type": {
              "defined": {
                "name": "positionState"
              }
            }
          },
          {
            "name": "battleLot",
            "type": "u64"
          },
          {
            "name": "entryStake",
            "type": "u64"
          },
          {
            "name": "joinSlot",
            "type": "u64"
          },
          {
            "name": "exitSlot",
            "type": "u64"
          },
          {
            "name": "claimSlot",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "positionState",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "recruiting"
          },
          {
            "name": "active"
          },
          {
            "name": "surrendered"
          },
          {
            "name": "winner"
          },
          {
            "name": "claimed"
          }
        ]
      }
    },
    {
      "name": "surrendered",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "arena",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
