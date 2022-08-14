import { AnchorWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import idl from "./post_idl.json";

const SOLANA_TWITTER_PROGRAM = "ABrF92BKVCYA4bw123Hhbhdg1nCeFfPwscT9o4q8DMWy";
// const SOLANA_TWITTER_PROGRAM = "926GETHcFsLU3vDWQUEnTpWYRYXktK6gCCfzivjFq4pa";
const programID = new PublicKey(SOLANA_TWITTER_PROGRAM);
// const programID ="Ci9kfZvXGk6raNPCb77U5p7xSBfUzucsiAKYFsQ45epF";

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
  wallet: AnchorWallet|undefined;
};

export const useProgram = ({ connection, wallet }: ProgramProps) => {
  const [program, setProgram] = useState<anchor.Program<anchor.Idl>>();

  useEffect(() => {
    updateProgram();
  }, [connection, wallet]);

  const updateProgram = () => {
    // @ts-ignore
    const provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: "recent",
      commitment: "processed",
    });

    //   const idl = await anchor.Program.fetchIdl(programID, provider);
    //   

    const program = new anchor.Program(idl as any, programID, provider);

    setProgram(program);
  };

  return {
    postProgram:program,
  };
};
