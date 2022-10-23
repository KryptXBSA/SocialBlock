/** @format */

import * as anchor from "@project-serum/anchor";
import { TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import {
 createContext,
 Dispatch,
 SetStateAction,
 useContext,
 useEffect,
 useReducer,
 useState,
} from "react";
import { useBlockProgram } from "../program/block/block-program";
import { Block } from "../program/block/block-type";
import { useCommentProgram } from "../program/comment-program";
import { getAllMessages } from "../program/message/message-methods";
import { Message } from "../program/message/message-type";
import { useMessageProgram } from "../program/message/message-program";
import { useProgram } from "../program/useProgram";
import { getUserByPubkey } from "../program/user/user-methods";
import { useUserProgram } from "../program/user/user-program";
import { User } from "../program/user/user-type";
import { getDate } from "../utils/get-date-moment";
import { useNotifier } from "react-headless-notifier";
import { InfoAlert } from "../components/alert";
const endpoint ="https://api.devnet.solana.com";
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
  publickey ?: anchor.web3.PublicKey;
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
  console.log('change user');
  
  if (!user) return { user: state.user, didWelcome: state.didWelcome };
  return { user: user.data, didWelcome: state.didWelcome };
 } else {
  return { user: state.user, didWelcome: state.didWelcome };
 }
}
export interface ProgramContextInterface {
 showSignupModal: boolean;
 setShowSignupModal: Dispatch<SetStateAction<boolean>>;
 setNotSeenMessages: Dispatch<SetStateAction<number>>;
 notSeenMessages: number | undefined;
 userProgram: anchor.Program<User> | undefined;
 blockProgram: anchor.Program<Block> | undefined;
 postProgram: anchor.Program<anchor.Idl> | undefined;
 commentProgram: anchor.Program<anchor.Idl> | undefined;
 messageProgram: anchor.Program<Message> | undefined;
 users: UsersType[] | undefined;
 messages: MessagesType[] | undefined;
 state: InitialState;
 disconnect: () => void;
 changeState: any;
 getWallet: AnchorWallet | undefined;
}
type MessagesType = {
 self: boolean;
 message: string;
 date: string;
 publickeyString: string;
};
type UsersType = {
 username: string;
 img: string;
 publickeyString: string;
};
export const ProgramContext = createContext<ProgramContextInterface | undefined>(undefined);
export function ProgramWrapper({ children }: any) {
 const { notify } = useNotifier();
 const [state, changeState] = useReducer(reducer, initialState);
 const [showSignupModal, setShowSignupModal] = useState(false);
 const wallet = useAnchorWallet();
 const { userProgram } = useUserProgram({ connection, wallet });
 const { postProgram } = useProgram({ connection, wallet });
 const { commentProgram } = useCommentProgram({ connection, wallet });
 const { blockProgram } = useBlockProgram({ connection, wallet });
 const { messageProgram } = useMessageProgram({ connection, wallet });
 const [messages, setMessages] = useState<MessagesType[]>();
 const [users, setUsers] = useState<UsersType[]>();
 const [notSeenMessages, setNotSeenMessages] = useState(0)
 const [fetchEvery, setFetchEvery] = useState<any>();

 async function fetchMessages() {
  
  let messages: any[];
  try {
   messages = await getAllMessages({
    program: messageProgram!,
    pubkey: wallet?.publicKey.toBase58()!,
   });
  } catch (error) {}
  if (!messages!) {
   setMessages([]);
   return;
  }
  
  messages.sort(function (a, b) {
   return a.timestamp.toNumber() - b.timestamp.toNumber();
  });
  let filteredMessages = messages!.map((m) => {
   return {
    self: m.from.toBase58() === wallet?.publicKey.toBase58(),
    message: m.content,
    date: getDate(m.timestamp),
    publickeyString:
     m.from.toBase58() === wallet?.publicKey.toBase58() ? m.to.toBase58() : m.from.toBase58(),
   };
  });
  let seen = localStorage.getItem("seenMessages");
  let currentSeenMessages = seen ? parseInt(seen) : 0;
  let newSeenMessages = filteredMessages.length;

  if (newSeenMessages > currentSeenMessages) {
  setNotSeenMessages(newSeenMessages - currentSeenMessages)
  }

//   localStorage.setItem("seenMessages", JSON.stringify(newSeenMessages));
  localStorage.setItem("messages", JSON.stringify(filteredMessages));

  let users: any[] = [];

  async function fetchUsers() {
   let users = messages.map(async (message) => {
    let user: { publicKey: anchor.web3.PublicKey } & TypeDef<
     {
      name: "user";
      type: {
       kind: "struct";
       fields: [
        { name: "user"; type: "publicKey" },
        { name: "username"; type: "string" },
        { name: "image"; type: "string" },
        { name: "timestamp"; type: "i64" },
        { name: "bookmarks"; type: { vec: "publicKey" } }
       ];
      };
     },
     anchor.IdlTypes<User>
    >;
    try {
     user = await getUserByPubkey({
      program: userProgram!,
      pubkey:
       message.from.toBase58() === wallet?.publicKey.toBase58()
        ? message.to.toBase58()
        : message.from.toBase58(),
     });
    } catch (error) {}
    return { username: user!.username, img: user!.image, publickeyString: user!.user.toBase58() };
   });
   return Promise.all(users);
  }
  users = await fetchUsers();
  users = users.filter(
   (user, index) =>
    index === users.findIndex((other) => user.publickeyString === other.publickeyString)
  );

  setUsers(users);
  setMessages(filteredMessages);
 }
 useEffect(() => {
  if (userProgram && wallet?.publicKey) {
   setUser();
   fetchMessages();

   setFetchEvery(setInterval(() => fetchMessages(), 5000));
  }
  if (!wallet?.publicKey) {
   clearInterval(fetchEvery);
   disconnect();
   localStorage.clear()
  }
  return () => {
   clearInterval(fetchEvery);
  };
 }, [wallet?.publicKey]);
 async function setUser() {
  let user = await getUserByPubkey({ program: userProgram!, pubkey: wallet?.publicKey.toBase58() });
  if (!user) {
   setShowSignupModal(true);
  } else {
   let userr = {
    timestamp: user.timestamp,
    username: user.username,
    publickey:user.publicKey,
    image: user.image,
    foundUser: true,
   };

   changeState({ data: userr, action: "username" });
  }
 }
 function disconnect() {
  changeState({ data: { username: "", foundUser: false }, action: "username" });
 }

 return (
  <ProgramContext.Provider
   value={{
    userProgram,
    showSignupModal,
    notSeenMessages,
    setNotSeenMessages,
    setShowSignupModal,
    disconnect,
    postProgram,
    blockProgram,
    commentProgram,
    messageProgram,
    state,
    users,
    messages,
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
