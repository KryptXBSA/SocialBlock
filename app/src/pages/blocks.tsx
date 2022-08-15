/** @format */

import Layout from "../sections/Layout";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, SetStateAction, Dispatch } from "react";
import { Sidebar } from "../components/sidebar";
import { getAllPosts, sendPost, like, unlike } from "../program/posts";
import { UseProgramContext } from "../contexts/programContextProvider";
import { Post } from "../components/post/post";
import { getAllComments, newComment } from "../program/comments";
import bs58 from "bs58";
import * as anchor from "@project-serum/anchor";

import { getDate } from "../utils/get-date-moment";
import { useNotifier } from "react-headless-notifier";
import {
 SuccessAlert,
 InfoAlert,
 DangerAlert,
 SpecialAlert,
 WarningAlert,
} from "../components/alert";
import Link from "next/link";
import { MessageModal } from "../components/user/message-modal";
import { getBlockByName } from "../program/block/block-methods";
import Head from "next/head";

interface UserData {
 blockName: string;
 image: string;
 owner: anchor.web3.PublicKey;
 publicKey: anchor.web3.PublicKey;
 timestamp: anchor.BN;
}
export default function Home() {
 //  @ts-ignore
 const programContext = UseProgramContext()!;
 const [showMessageModal, setShowMessageModal] = useState(false);
 const router = useRouter();
 const [posts, setPosts]: any = useState([]);
 const [blockData, setBlockData] = useState<UserData | undefined>();

 let searchInputRef: any = useRef("");

 const [alreadyFetched, setAlreadyFetched] = useState(false);
 useEffect(() => {
  if (programContext.getWallet?.publicKey) {
  }
  if (programContext.postProgram && router?.query?.block_name && !alreadyFetched) {
   getBlock(router?.query?.block_name);
   getPosts(router?.query?.block_name);
   setAlreadyFetched(true);
  }
 }, [router, programContext.postProgram, programContext.getWallet, posts]);

 function searchOnClick(e: { preventDefault: () => void }) {
  e.preventDefault();
  getBlock();
  if (searchInputRef.current.value) {
   getPosts(searchInputRef.current.value);
  }
 }

 async function getBlock(name?: any) {
  let block = await getBlockByName({
   program: programContext.blockProgram!,
   name: name ? name : searchInputRef.current.value,
  });
  console.log("block", block);
  setBlockData(block);
  // setBlockData({
  //  username: "aland",
  //  img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
  //  date: "15 March 2022",
  //  publickeyString: "pubkey",
  // });
 }
 async function getPosts(name?: string | string[] | undefined) {
  let searchValue = searchInputRef?.current?.value;
  let value = name ? name : searchValue;
  const blockFilter = (name: any) => ({
   memcmp: {
    offset: 44, // Discriminator.
    bytes: bs58.encode(Buffer.from(name)),
   },
  });
  let filter = [blockFilter(value)];
  let posts: any[] | ((prevState: never[]) => never[]) = [];
  if (programContext.postProgram) {
   try {
    posts = await getAllPosts({ program: programContext.postProgram, filter: filter });
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

 function displayPosts() {
  return posts.map((p: any) => (
   // 2 pubkey man haya 1- bo user 2- bo post
   <Post
    image={p.image}
    commentCount={p.comments}
    key={p.publicKey}
    tip={18000000}
    content={p.content}
    username={p.username}
    date={p.timestamp}
    likes={p.likes}
    publickeyString={p.authorDisplay}
    block={p.block}
    postPubkey={p.publicKey}
   />
  ));
 }

 if (!router.asPath) {
  return null;
 } else {
  return (
   <Layout page="blockk" active={3}>
    <Head>
     <title>{blockData?blockData.blockName:'Blocks'}</title>
    </Head>
    {showMessageModal && <MessageModal setShowModal={setShowMessageModal} />}
    <main className="flex  w-1/3 ">
     {/* top isit !!!!!! Headlines */}
     <div className="flex w-full  justify-start flex-row">
      <div className=" flex grow  flex-col">
       <Search searchInputRef={searchInputRef} clickSearch={searchOnClick} />
       {blockData && (
        <BlockProfile
         img={blockData.image}
         publickeyString={blockData.publicKey.toBase58()}
         blockName={blockData.blockName}
         date={getDate(blockData.timestamp)}
        />
       )}

       <div className="mt-2 w-full">
        {displayPosts()}
        {posts.length < 6 && <div style={{ marginBottom: 999 }} className=""></div>}
       </div>
      </div>
     </div>
    </main>
    <div className="mb-96 pb-96"></div>
   </Layout>
  );
 }
}
interface ProfileProps {
 blockName: string;
 date: string;
 img: string;
 publickeyString: string;
}
function BlockProfile({ blockName, date, img, publickeyString }: ProfileProps) {
 return (
  <>
   <div className="mt-6 pb-2 border-b-2 border-gray-700 ">
    <div className="flex  justify-start items-center flex-row">
     <div className="flex justify-start   items-center w-full  flex-row">
      <div className="flex cursor-pointer items-center">
       <div className="pb- pr-2">
        <img className="w-14 h-14  rounded-full" src={img ? img : "/img.png"} />
       </div>
       <span className=" text-3xl ">{blockName}</span>
      </div>
      <span>&nbsp;•&nbsp;</span>
      <span className="text-base">Created {date}</span>
     </div>
    </div>
   </div>
  </>
 );
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
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
     />
    </svg>
    <span className="font-semibold text-slate-300">{text}</span>
   </button>
  </div>
 );
};
interface SearchProps {
 searchInputRef: any;
 clickSearch: any;
}
export const Search = ({ searchInputRef, clickSearch }: SearchProps) => {
 const [dropDownOpen, setDropDownOpen] = useState(false);
 return (
  <>
   <div className="flex mt-2">
    <form className="flex grow flex-row" onSubmit={clickSearch}>
     <input
      required
      ref={searchInputRef}
      type="text"
      placeholder={"Block name"}
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
       />
      </svg>
     </button>
    </form>
   </div>
  </>
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
    <Tab text="Bookmarks" index="4" activeTab={activeTab} changeTab={changeTab} />
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
