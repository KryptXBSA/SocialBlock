/** @format */

import {
 createContext,
 Dispatch,
 SetStateAction,
 useContext,
 useEffect,
 useReducer,
 useState,
} from "react";
import { useProgram } from "../program/useProgram";
import { useCommentProgram } from "../program/comment-program";
import { AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { useMessageProgram } from "../program/message/messageProgram";
import { Message } from "../program/message/message-type";
import { useUserProgram } from "../program/user/user-program";
import { User } from "../program/user/user-type";
import { getUserByPubkey } from "../program/user/user-methods";
const endpoint = "https://explorer-api.devnet.solana.com";
export const connection = new anchor.web3.Connection(endpoint);

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
 showSignupModal: boolean;
 setShowSignupModal: Dispatch<SetStateAction<boolean>>;
 userProgram: anchor.Program<User> | undefined;
 postProgram: anchor.Program<anchor.Idl> | undefined;
 commentProgram: anchor.Program<anchor.Idl> | undefined;
 messageProgram: anchor.Program<Message> | undefined;
 state: InitialState;
 disconnect: () => void;
 changeState: any;
 getWallet: AnchorWallet | undefined;
}
export const ProgramContext = createContext<ProgramContextInterface | undefined>(undefined);
export function ProgramWrapper({ children }: any) {
 const [state, changeState] = useReducer(reducer, initialState);
 const [showSignupModal, setShowSignupModal] = useState(true);
 const wallet = useAnchorWallet();
 const { userProgram } = useUserProgram({ connection, wallet });
 const { postProgram } = useProgram({ connection, wallet });
 const { commentProgram } = useCommentProgram({ connection, wallet });
 const { messageProgram } = useMessageProgram({ connection, wallet });
 useEffect(() => {
  if (userProgram && wallet?.publicKey && !state.user.foundUser) {
   setUsername();
  }
 }, [userProgram, wallet]);
 async function setUsername() {
//   let  user  = await getUserByPubkey({ program: userProgram!, pubkey: wallet?.publicKey.toBase58() });
//   let userr={ userData: username, username: username.name, foundUser: true }
//   console.log(user);
  
//   changeState({ data: user, action: "username" });
 }
 function disconnect() {
  changeState({ data: { username: "", foundUser: false }, action: "username" });
 }

 return (
  <ProgramContext.Provider
   value={{
    userProgram,
    showSignupModal,
    setShowSignupModal,
    disconnect,
    postProgram,
    commentProgram,
    messageProgram,
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
