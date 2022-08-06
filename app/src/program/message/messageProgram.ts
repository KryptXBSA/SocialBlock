import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import idl from "./message.json";
import { Message } from "./message-type";
import { AnchorWallet } from "@solana/wallet-adapter-react";
// Getting a wierd error if the program is pubkey is different ill report it.

const PROGRAM_PUBLICKEY = "FwFmSYvW8Rq6F5qFWzvKsmyPMkXTZheZh4iid6grkFSG";
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

export const useProgram = ({ connection, wallet }: ProgramProps) => {
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

    //   const idl = await anchor.Program.fetchIdl(programID, provider);
    //   

    const program = new anchor.Program(idl as any, programID, provider);

    setProgram(program);
  };

  return {
    postProgram: program,
  };
};
