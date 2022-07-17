import { createContext, useContext, useReducer, useState } from 'react'
import { useUserProgram } from "../program/user-program.ts";
import { useProgram } from '../program/useProgram.ts'
import { useCommentProgram } from "../program/comment-program.ts";
import { createUsername, getUsername, findUsernamePDA } from "../program/users.ts";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
const endpoint = "https://explorer-api.devnet.solana.com";
const connection = new anchor.web3.Connection(endpoint);

let initialState = {
  user: { username: null, foundUser: false },
  didWelcome: false
}


function reducer(state, user) {
  if (user?.action === 'welcome') {
    return { user: state.user, didWelcome: true }
  }
  if (user?.action === 'username') {
    if (!user) return { user: state.user, didWelcome: state.didWelcome }
    return { user: user.data, didWelcome: state.didWelcome };
  } else {
    return { user: state.user, didWelcome: state.didWelcome }
  }
}

const ProgramContext = createContext()
export function ProgramWrapper({ children }) {
  const [state, changeState] = useReducer(reducer, initialState);
  const wallet = useAnchorWallet();
  const { userProgram } = useUserProgram({ connection, wallet });
  const { program } = useProgram({ connection, wallet });
  const { commentProgram } = useCommentProgram({ connection, wallet });
  return (
    <ProgramContext.Provider value={{ userProgram, program, commentProgram, state, changeState, getWallet: wallet }}>
      {children}
    </ProgramContext.Provider>
  )
}

export function UseProgramContext() {
  return useContext(ProgramContext)
}
