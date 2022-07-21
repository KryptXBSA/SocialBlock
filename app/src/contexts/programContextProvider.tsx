/** @format */

import { createContext, useContext, useReducer, useState } from "react";
import { useUserProgram } from "../program/user-program";
import { useProgram } from "../program/useProgram";
import { useCommentProgram } from "../program/comment-program";
import { createUsername, getUsername, findUsernamePDA } from "../program/users";
import { AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
const endpoint = "https://explorer-api.devnet.solana.com";
const connection = new anchor.web3.Connection(endpoint);

let initialState = {
 user: { username: "", foundUser: false },
 didWelcome: false,
};
export interface InitialState {
 user: { username: string; foundUser: boolean };
 didWelcome: boolean;
}
type Actions =
 | { action: "welcome" }
 | {
    data: any;
    action: "username";
   };

function reducer(state: InitialState, user: Actions) {
 if (user?.action === "welcome") {
  return { user: state.user, didWelcome: true };
 }
 if (user?.action === "username") {
  if (!user) return { user: state.user, didWelcome: state.didWelcome };
  return { user: user.data, didWelcome: state.didWelcome };
 } else {
  return { user: state.user, didWelcome: state.didWelcome };
 }
}
export interface ProgramContextInterface {
 username: string;
 publickeyString: string;
 userProgram: anchor.Program<anchor.Idl> | undefined;
 postProgram: anchor.Program<anchor.Idl> | undefined;
 commentProgram: anchor.Program<anchor.Idl> | undefined;
 state: InitialState;
 changeState: any;
 getWallet: AnchorWallet | undefined;
}
const ProgramContext = createContext<ProgramContextInterface | undefined>(undefined);
export function ProgramWrapper({ children }: any) {
 let username = "aland";
 let publickeyString = "H8X9LMrxbah3U4PjbN21dHip8Nr4puSbntK75DA4xqW8";
 const [state, changeState] = useReducer(reducer, initialState);
 const wallet = useAnchorWallet();
 const { userProgram } = useUserProgram({ connection, wallet });
 const { postProgram } = useProgram({ connection, wallet });
 const { commentProgram } = useCommentProgram({ connection, wallet });
 return (
  <ProgramContext.Provider
   value={{
    username,
    publickeyString,
    userProgram,
    postProgram,
    commentProgram,
    state,
    changeState,
    getWallet: wallet,
   }}>
   {children}
  </ProgramContext.Provider>
 );
}

export function UseProgramContext() {
 return useContext(ProgramContext);
}
