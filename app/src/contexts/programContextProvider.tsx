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
const endpoint =
 "https://responsive-dawn-sponge.solana-devnet.discover.quiknode.pro/2c9e6acd14a57270687f2920c37e9c56f2bb1f36";
export const connection = new anchor.web3.Connection(endpoint);

let initialState: InitialState = {
 user: { username: "", image: "", foundUser: false },
 didWelcome: false,
};
export interface InitialState {
 user: {
  username: string;
  image: string;
  timestamp?: anchor.BN;
  bookmarks?: anchor.web3.PublicKey[];
  foundUser: boolean;
 };
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
 const [showSignupModal, setShowSignupModal] = useState(false);
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
  let user = await getUserByPubkey({ program: userProgram!, pubkey: wallet?.publicKey });
  if (!user) {
   setShowSignupModal(true);
  }
  let userr = {
   timestamp: user.timestamp,
   username: user.username,
   image: user.image,
   foundUser: true,
  };
  console.log("userrrr", user);

    changeState({ data: userr, action: "username" });
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
