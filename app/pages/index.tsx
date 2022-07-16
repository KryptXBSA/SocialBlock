/** @format */

import { Sidebar } from "../components/sidebar";
import Layout from "../sections/Layout";
import { SignupModal } from "../components/modal";
import { NewPost } from "../components/new-post";
import {
 SuccessAlert,
 InfoAlert,
 DangerAlert,
 SpecialAlert,
 WarningAlert,
 DangerAlertWallet,
} from "../components/alert";
import React, { useRef, useEffect, useState } from "react";
import { useNotifier } from "react-headless-notifier";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { sendPost, like, unlike, comment } from "../program/posts";
import { createUsername, getUsername, findUsernamePDA } from "../program/users";
import * as anchor from "@project-serum/anchor";
import { UseProgramContext } from "../contexts/programContextProvider";
import { UseAlertContext } from "../contexts/alertsContextProvider";
import { DisplayPosts } from "../program-methods/post";
const endpoint = "https://explorer-api.devnet.solana.com";

import { fetchPosts as fetchPosts0 } from "../utils/fetch-posts";
import { getWalletBalance } from "../utils/get-wallet-balance";

const connection = new anchor.web3.Connection(endpoint);

import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
export default function Home() {
 const { notify } = useNotifier();

 const { alertState, changeAlertState, closeAlert } = UseAlertContext();
 const wallet = useAnchorWallet();
 const { userProgram, program, commentProgram, state, changeState } =
  UseProgramContext();

 const [posts, setPosts]: any = useState([]);
 const [username, setUsername] = useState(state?.user?.username?.name);
 const [showSignupPopup, setShowSignupPopup] = useState(false);
 const [fetchedPosts, setFetchedPosts] = useState(false);
 const [searchedForUsername, setSearchedForUsername] = useState(false);
 const [didWelcomeNotify, setDidWelcomeNotify] = useState(false);

 async function fetchPosts() {
  if (!fetchedPosts) {
   fetchPosts0({ program, notify, fetchedPosts, setPosts, setFetchedPosts });
  }
  setFetchedPosts(true);
 }
 const [warnedBalance, setWarnedBalance] = useState(false);
 async function getWBalance(wallet: any) {
  // airdropToWallet()
  let balance = await getWalletBalance(connection, wallet);
  console.log(balance);
  if (balance == 0) {
   notify(<DangerAlertWallet text={"Insufficent Funds"} dismiss={undefined} />);
  }
  return balance;
 }
 // airdrop not working

 useEffect(() => {
 
  if (posts.length == 0) {
   if (program) fetchPosts();
  }
  // displayPosts({posts,setShowSignupPopup});
  //Warn if balance is 0
  if (wallet?.publicKey) {
   if (!warnedBalance) {
    getWBalance(wallet);
    setWarnedBalance(true);
   }
  }
  // welcome back the user
  if (username) {
   if (!state.didWelcome) {
    notify(
     <SpecialAlert text={`Welcome Back ${username}`} dismiss={undefined} />
    );
    changeState({ data: {}, action: "welcome" });
   }
  }

  if (!username && wallet && !searchedForUsername) {
   setUsername0(wallet.publicKey);
   setSearchedForUsername(true);
  }
 }, [program, wallet, username]);

 //  get username and set it
 async function setUsername0(pubKey: any) {
  let userStatsPDA = await findUsernamePDA({ userProgram, pubKey });
  let { user } = await getUsername({ userProgram, userStatsPDA });
  let username = user?.username?.name;
  let balance = await getWalletBalance(connection, wallet);
  if (user.foundUser === false) {
   if (balance > 0) {
    setShowSignupPopup(true);
   }
  }
  if (username) {
   changeState({ data: user, action: "username" });
   setUsername(username);
  }
  if (!user.foundUser) {
   if (balance > 0) {
    notify(
     <WarningAlert
      text="No account found please create one."
      dismiss={undefined}
     />
    );
   }
  }
  return user;
 }

 async function testPost(topic: any, content: any) {
  if (!username) setShowSignupPopup(true);
  let postResult;
  if (username) {
   postResult = await sendPost({
    wallet,
    program,
    topic,
    content,
    username,
   });
   let newArray = [postResult.post].concat(posts);
   setPosts(newArray);
   return postResult.tx;
  }
 }
 async function signup(username: any) {
  let balance = await getWalletBalance(connection, wallet);
  if (balance == 0) {
   notify(<DangerAlertWallet text={undefined} dismiss={undefined} />);
  } else {
   try {
    if (!wallet) {
     notify(
      <DangerAlert text="Please connect to a wallet." dismiss={undefined} />
     );
    } else {
     let usernamee = await createUsername({
      userProgram,
      pubKey: wallet.publicKey,
      username,
     });
     setUsername0(wallet.publicKey);
     return usernamee;
    }
   } catch (e) {
    console.log(e);
   }
  }
 }
 function showSignupPopup0() {
  return (
   <SignupModal
    showSignupPopup={setShowSignupPopup}
    signup={signup}
    show={undefined}
   />
  );
 }

 return (
  <Layout>
   <main className="">
    {showSignupPopup && showSignupPopup0()}
    {/* <Alert /> */}
    <div className="flex  ">
     <div className="">
      <Sidebar active="0" router={undefined} hasSpace={undefined} />
     </div>
     <div className=" mr-14 ml-56 flex grow  flex-col">
      <NewPost username={username} post={testPost} />
      <div className="divider"></div>
      {posts.length !== 0  && (
       <DisplayPosts
        wallet={wallet}
        posts={posts}
        setShowSignupPopup={setShowSignupPopup} username={username}       />
      )}
     </div>
    </div>
   </main>
  </Layout>
 );
}

export const Tabs = () => {
 return (
  <div className="tabs justify-center">
   <a className="tab w-32 tab-lg tab-bordered">Posts</a>
   <a className="tab w-32 tab-lg tab-bordered tab-active">Comments</a>
   <a className="tab w-32 tab-lg tab-bordered">Bookmarks</a>
  </div>
 );
};

export const ActionButton = ({ text }: any) => {
 return (
  <button className="btn bg-transparent m-1 w-32 border-opacity-0 gap-2 ">
   <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
     stroke-linecap="round"
     stroke-linejoin="round"
     stroke-width="2"
     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
   </svg>
   <span className="font-semibold text-slate-300">{text}</span>
  </button>
 );
};
export const Search = () => {
 return (
  <div className="flex  flex-row">
   <textarea
    cols={4}
    placeholder="Search…"
    className="input rounded-r-none grow "
   />
   <button className="btn rounded-l-none btn-square">
    <svg
     xmlns="http://www.w3.org/2000/svg"
     className="h-6 w-6"
     fill="none"
     viewBox="0 0 24 24"
     stroke="currentColor">
     <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
     />
    </svg>
   </button>
  </div>
 );
};
export const SearchButton = ({ text }: any) => {
 return (
  <div className=" m-1">
   <button className="btn btn-lg bg-transparent border-opacity-0 gap-2 ">
    <svg
     xmlns="http://www.w3.org/2000/svg"
     className="h-6 w-6"
     fill="none"
     viewBox="0 0 24 24"
     stroke="currentColor">
     <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
     />
    </svg>
    {text}
   </button>
  </div>
 );
};
