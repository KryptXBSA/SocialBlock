/** @format */

import { Sidebar } from "../components/sidebar";
import Layout from "../sections/Layout";
import { SignupModal } from "../components/modal";
import { NewPost } from "../components/new-post";
import {
 DangerAlert,
 SpecialAlert,
 WarningAlert,
 DangerAlertWallet,
} from "../components/alert";
import React, { useEffect, useState } from "react";
import { useNotifier } from "react-headless-notifier";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { sendPost } from "../program/posts";
import { createUsername, getUsername, findUsernamePDA } from "../program/users";
import * as anchor from "@project-serum/anchor";
import { UseProgramContext } from "../contexts/programContextProvider";
import { DisplayPosts } from "../program-methods/post";
const endpoint = "https://explorer-api.devnet.solana.com";

import { fetchPosts as fetchPosts0 } from "../utils/fetch-posts";
import { getWalletBalance } from "../utils/get-wallet-balance";
import { signup } from "../program-methods/signup";

const connection = new anchor.web3.Connection(endpoint);

export default function Home() {
 const { notify } = useNotifier();

 const wallet = useAnchorWallet();
 const { userProgram, program, state, changeState } = UseProgramContext();

 const [posts, setPosts]: any = useState([]);
 const [username, setUsername] = useState(state?.user?.username?.name);
 const [showSignupPopup, setShowSignupPopup] = useState(false);
 const [fetchedPosts, setFetchedPosts] = useState(false);
 const [searchedForUsername, setSearchedForUsername] = useState(false);

 async function fetchPosts() {
  if (!fetchedPosts) {
   fetchPosts0({ program, notify,setPosts, setFetchedPosts });
  }
  setFetchedPosts(true);
 }
 const [warnedBalance, setWarnedBalance] = useState(false);
 async function getWBalance(wallet: any) {
  // airdropToWallet()
  let balance = await getWalletBalance(connection, wallet);
  
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
  let username0 = user?.username?.name;
  let balance = await getWalletBalance(connection, wallet);
  if (user.foundUser === false) {
   if (balance > 0) {
    setShowSignupPopup(true);
   }
  }
  if (username0) {
   changeState({ data: user, action: "username" });
   setUsername(username0);
  }
  
  
  
  
  if (!username&&!user.foundUser) {
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

 async function newPost(topic: any, content: any) {
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
 async function signup0(username: any) {
  let result = await signup(
   username,
   notify,
   connection,
   wallet,
   userProgram,
   createUsername,
  );
  setUsername(result.user.username)
   changeState({ data: result.user.username, action: "username" });
  return result;
 }
 function showSignupPopup0() {
  return (
   <SignupModal
    showSignupPopup={setShowSignupPopup}
    signup={signup0}
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
      <NewPost username={username} post={newPost} />
      <div className="divider"></div>
      {posts.length !== 0 && (
       <DisplayPosts
        wallet={wallet}
        posts={posts}
        setShowSignupPopup={setShowSignupPopup}
        username={username}
       />
      )}
     </div>
    </div>
   </main>
  </Layout>
 );
}

