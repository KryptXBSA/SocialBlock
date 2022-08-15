import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import idl from "./block_idl.json";
import {  Block } from "./block-type";
import { AnchorWallet } from "@solana/wallet-adapter-react";
// You'll get Fallback functions are not supported error if the Program id is not correct.
const PROGRAM_PUBLICKEY = "5ZGZX4uPcbRmXVhAYmiSs3Bf3h6uBvcph2LPxG2a5Sxv";
const programID = new PublicKey(PROGRAM_PUBLICKEY);

export interface Wallet {
  signTransaction(
    tx: anchor.web3.Transaction
  ): Promise<anchor.web3.Transaction>;
  signAllTransactions(
    txs: anchor.web3.Transaction[]
  ): Promise<anchor.web3.Transaction[]>;
  publicKey: anchor.web3.PublicKey;
}

type ProgramProps = {
  connection: Connection;
  wallet: AnchorWallet | undefined;
};

export const useBlockProgram = ({ connection, wallet }: ProgramProps) => {
  const [program, setProgram] = useState<anchor.Program<Block>>();

  useEffect(() => {
    updateProgram();
  }, [connection, wallet]);

  const updateProgram = () => {
    // @ts-ignore
    const provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: "recent",
      commitment: "processed",
    });

    const program = new anchor.Program(idl as any, programID, provider);
    setProgram(program);
  };

  return {
    blockProgram: program,
  };
};
