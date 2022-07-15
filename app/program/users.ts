/** @format */

import * as anchor from "@project-serum/anchor";
import bs58 from "bs58";
import { PublicKey } from "@solana/web3.js";

import { User, AccountData } from "./user.ts";

export const findUsernamePDA = async ({ userProgram, pubKey }: any) => {
 const [userStatsPDA, _] = await PublicKey.findProgramAddress(
  [anchor.utils.bytes.utf8.encode("user-stats"), pubKey.toBuffer()],
  userProgram.programId
 );

 return userStatsPDA;
};
export const createUsername = async ({
 userProgram,
 pubKey,
 username,
}: any) => {
    
 const [userStatsPDA, _] = await PublicKey.findProgramAddress(
  [anchor.utils.bytes.utf8.encode("user-stats"), pubKey.toBuffer()],
  userProgram.programId
 );

 const UserTx = await userProgram.methods
  .createUserStats(username)
  .accounts({
   user: pubKey,
   userStats: userStatsPDA,
  })
  .rpc();
  
 return userStatsPDA;
};
export const getUsername = async ({ userProgram, userStatsPDA }: any) => {
 let username = null;
 try {
  username = await userProgram.account.userStats.fetch(userStatsPDA);
 } catch (e) {}
 if (!username) {
  return { user: { username, foundUser: false } };
 }
 return { user: { username, foundUser: true } };
};
