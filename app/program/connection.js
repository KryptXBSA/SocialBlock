import * as anchor from "@project-serum/anchor";
const endpoint = "https://explorer-api.devnet.solana.com";

export const connection = new anchor.web3.Connection(endpoint);


