/** @format */

import { ProfileSidebar } from "../components/profile-sidebar";
import Layout from "../sections/Layout";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, SetStateAction } from "react";
import { Sidebar } from "../components/sidebar";
import { createUsername, getUsername, findUsernamePDA } from "../program/users";
import { getAllPosts, sendPost, like, unlike, comment } from "../program/posts";
import { UseProgramContext } from "../contexts/programContextProvider";
import { Post, Commentt } from "../components/posts";
import { getAllComments, newComment } from "../program/comments";

import { useNotifier } from "react-headless-notifier";
import {
 SuccessAlert,
 InfoAlert,
 DangerAlert,
 SpecialAlert,
 WarningAlert,
} from "../components/alert";

export default function Home() {
 const { notify } = useNotifier();
 const { state, program, commentProgram, getWallet, userProgram, changeState } =
  UseProgramContext();
 const [username, setUsername] = useState(state.username);
 const router = useRouter();

 const [posts, setPosts]: any = useState([]);
 const [comments, setComments] = useState([]);
 const [activeTab, setActiveTab] = useState("0");

 let searchInputRef: any = useRef("");
 const [searchContent, setSearchContent]: any = useState("");

 async function getUsername0(pubKey: any) {
  let userStatsPDA = await findUsernamePDA({ userProgram, pubKey });
  let result = await getUsername({ userProgram, userStatsPDA });

  if (result) {
   let username = result.user.username.name;
   changeState(username);
   setUsername(username);
   return username;
  }

  // setUsername(null)
  return "Not registered";
 }
 const [alreadyFetched, setAlreadyFetched] = useState(false);
 useEffect(() => {
  if (getWallet?.publicKey && !username) {
   getUsername0(getWallet?.publicKey);
  }
  if (program && router?.query?.pubkey && !alreadyFetched) {
   setSearchContent(router?.query?.pubkey);
   getPosts(router?.query?.pubkey);
   getAllComments0(router?.query?.pubkey);
   setAlreadyFetched(true);
  }
  setContent();
 }, [router, program, getWallet, comments, username, posts, activeTab]);
 function changeTab(tab: SetStateAction<string>) {
  setActiveTab(tab);
 }
 async function likePost(postPubkey: any) {
  if (!getWallet?.publicKey) {
   notify(
    <DangerAlert text="Please connect to a wallet." dismiss={undefined} />
   );
   // setShowSignupPopup(true)
  } else {
   try {
    return await like({ wallet: getWallet, program, postPubkey });
   } catch (e) {}
  }
 }
 async function unlikePost(postPubkey: any) {
  if (!getWallet?.publicKey) {
   notify(
    <DangerAlert text="Please connect to a wallet." dismiss={undefined} />
   );
   // setShowSignupPopup(true)
  } else {
   return await unlike({ wallet: getWallet, program, postPubkey });
  }
 }
 async function newComment0(commentContent: any, postPubkey: any) {
  let commentResult = await newComment({
   commentProgram,
   postPubkey: postPubkey,
   walletPubkey: getWallet.publicKey,
   username: username,
   content: commentContent,
  });
  notify(
   <InfoAlert
    text="Please also confirm the next transaction."
    dismiss={undefined}
   />
  );
  let commenta = await comment({
   wallet: getWallet,
   program: program,
   postPubkey: postPubkey,
  });
  return commentResult;
 }
 const [tabContent, setTabContent] = useState("");
 function setContent(tab?: string | undefined) {
  tab = tab ? tab : activeTab;
  let content: any = "";
  if (tab === "2") {
   content = <>{renderComments()}</>;
  } else if (tab === "0") {
   content = <> {renderPosts()}</>;
  }
  setTabContent(content);
 }

 async function getAllComments0(pubkey?: any) {
  let searchValue = searchInputRef?.current?.value;
  // queryValue better variable name :/

  let value = searchValue ? searchValue : pubkey;
  if (router?.query?.pubKey) {
    value = router?.query?.pubKey
  }
  console.log(value);
  
  // value = value ? value : router.query?.pubkey;
  const authorFilter = (authorBase58PublicKey: any) => ({
   memcmp: {
    offset: 40, // Discriminator.
    bytes: authorBase58PublicKey,
   },
  });
  let filter = [authorFilter(value)];
  //
  let commentResult = [];
  try {
   commentResult = await getAllComments({
    program: commentProgram,
    filter: filter,
   });
   console.log(commentResult);
   
  } catch (e) {
   // notify(
   //           <SpecialAlert
   //             text={`Welcome Back ${username}`}
   //           />
   //         );
  }

  commentResult = commentResult.sort(function (
   a: { getTimestamp: number },
   b: { getTimestamp: number }
  ) {
   return b.getTimestamp - a.getTimestamp;
  });
  if(!pubkey)setComments(commentResult);

  return commentResult;
 }
 function searchOnClick(e: { preventDefault: () => void }) {
  e.preventDefault();
  // getUser()
  if (searchInputRef.current.value) {
   getPosts();
   getAllComments0();
   setContent();
  }
 }

 async function getPosts(pubkey?: string | string[] | undefined) {
  let searchValue = searchInputRef?.current?.value;
  let value = searchValue ? searchValue : pubkey;
  const authorFilter = (authorBase58PublicKey: any) => ({
   memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey,
   },
  });
  let filter = [authorFilter(value)];
  let posts: any[] | ((prevState: never[]) => never[]) = [];
  if (program) {
   try {
    posts = await getAllPosts({ program: program, filter: filter });
   } catch (e) {
    // notify(
    //           <SpecialAlert
    //             text={`Welcome Back ${username}`}
    //           />
    //         );
   }
  }
  posts = posts.sort(function (a, b) {
   return b.getTimestamp - a.getTimestamp;
  });
  setPosts(posts);
 }

 function renderComments() {
  return comments.map((post: any, index, { length }) => {
   return (
    <>
     <Commentt key={post.key} data={post} className="flex flex-row" />
     {index + 1 !== length && <div className="divider"></div>}
    </>
   );
  });
 }
 function renderPosts() {
  return posts.map(
   (
    post: { getLikes: any; key: any; publicKey: any },
    index: number,
    { length }: any
   ) => {
    let wallet = getWallet
     ? getWallet.publicKey.toBase58()
     : localStorage.getItem("wallet");
    return (
     <>
      <Post
       getAllComments={getAllComments0}
       commentProgram={commentProgram}
       newComment={newComment0}
       walletPubkey={wallet}
       postLikes={post.getLikes}
       unlikePost={unlikePost}
       likePost={likePost}
       key={post.key}
       pubKey={post.key}
       postPublicKey={post.publicKey}
       data={post}
       className="flex flex-row"
      />
      {index + 1 !== length && <div className="divider"></div>}
     </>
    );
   }
  );
 }
 if (!router.asPath) {
  return null;
 } else {
  return (
   <Layout>
    {/* Hero Section  */}
    {/* <Search /> */}
    {/* <Tabs changeTab={changeTab} activeTab={activeTab} /> */}
    <main className="flex-grow  px-4 sm:px-6">
     {/* top isit !!!!!! Headlines */}
     {/* CTA */}
     <div className="flex   justify-start flex-row">
      {/* <ProfileSidebar active='0' hasSpace={false} router={router} /> */}
      <Sidebar active="2" router={router} hasSpace={undefined} />
      <div className=" md:ml-64 mr-10 ml-52 flex grow  flex-col">
       <Search searchInputRef={searchInputRef} clickSearch={searchOnClick} />

       {/* <Search /> */}
       <Tabs changeTab={changeTab} activeTab={activeTab} />
       {posts.length !== 0 && tabContent}
      </div>
     </div>
    </main>
   </Layout>
  );
 }
}

export const ActionButton = ({ text }: any) => {
 return (
  <div className=" m-1">
   <button className="btn bg-transparent border-opacity-0 gap-2 ">
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
  </div>
 );
};
export const Search = ({ searchInputRef, clickSearch }: any) => {
 return (
  <form onSubmit={clickSearch}>
   <div className="flex  flex-row">
    <input
     required
     ref={searchInputRef}
     type="text"
     placeholder="Public Key"
     className=" border-none rounded-lg bg-gray-100 dark:bg-gray-800 rounded-r-none grow "
    />
    <button onClick={clickSearch} className="btn rounded-l-none btn-square">
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
  </form>
 );
};
export const Tabs = ({ activeTab, changeTab }: any) => {
 return (
  <div className="tabs pt-2 justify-center">
   <Tab text="Posts" index="0" activeTab={activeTab} changeTab={changeTab} />
   <Tab text="Comments" index="2" activeTab={activeTab} changeTab={changeTab} />
   <div className="tooltip" data-tip="Coming Soon">
    <Tab text="Likes" index="1" activeTab={activeTab} changeTab={changeTab} />
   </div>
   <div className="tooltip" data-tip="Coming Soon">
    <Tab text="Shares" index="3" activeTab={activeTab} changeTab={changeTab} />
   </div>
   <div className="tooltip" data-tip="Coming Soon">
    <Tab
     text="Bookmarks"
     index="4"
     activeTab={activeTab}
     changeTab={changeTab}
    />
   </div>
  </div>
 );
};
export const Tab = ({ text, index, activeTab, changeTab }: any) => {
 const [clss, setClss] = useState("tab-active");
 useEffect(() => {
  let show = index === activeTab;
  if (show) {
   setClss("  tab-active");
  } else {
   setClss("");
  }
 }, [activeTab]);
 return (
  <a
   onClick={() => changeTab(index)}
   className={
    "tab hover:bg-slate-700 rounded-md rounded-b-none transition duration-300  dark:text-gray-500 w-32 tab-lg tab-bordered " +
    clss
   }>
   {text}
  </a>
 );
};

export const MoreButton = ({ text }: any) => {
 return (
  <div className=" m-0">
   <div className="self-start place-content-start   btn-circle bg-transparent border-0 p-3 ">
    <svg
     xmlns="http://www.w3.org/2000/svg"
     className="h-6 w-6"
     fill="none"
     viewBox="0 0 24 24"
     stroke="currentColor"
     strokeWidth={2}>
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
     />
    </svg>
   </div>
   {text}
  </div>
 );
};
