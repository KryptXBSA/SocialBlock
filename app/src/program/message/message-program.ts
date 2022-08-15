import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import idl from "./message_idl.json";
import { Message } from "./message-type";
import { AnchorWallet } from "@solana/wallet-adapter-react";
// You'll get Fallback functions are not supported error if the Program id is not correct.
const PROGRAM_PUBLICKEY = "7Qy3XGGyGXVZAeC1Thxz38jwQ49jgyMtA2pQgNtB8Z4y";
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

export const useMessageProgram = ({ connection, wallet }: ProgramProps) => {
  const [program, setProgram] = useState<anchor.Program<Message>>();

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
    messageProgram: program,
  };
};
