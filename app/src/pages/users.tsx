/** @format */

import Layout from "../sections/Layout";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, SetStateAction, Dispatch } from "react";
import { Sidebar } from "../components/sidebar";
import { getAllPosts, sendPost, like, unlike } from "../program/posts";
import { UseProgramContext } from "../contexts/programContextProvider";
import { Post } from "../components/post/post";
import { getAllComments, newComment } from "../program/comments";
import * as anchor from "@project-serum/anchor";

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
import { getUserByPubkey, getUserByUsername } from "../program/user/user-methods";
import Head from "next/head";

interface UserData {
 publicKey: anchor.web3.PublicKey;
 user: anchor.web3.PublicKey;
 timestamp: string | any;
 username: string;
 image: string;
 bookmarks: anchor.web3.PublicKey[];
}
export default function Home() {
 const [selected, setSelected] = useState(0);
 const { notify } = useNotifier();
 //  @ts-ignore
 const { state, postProgram, commentProgram, getWallet, userProgram, changeState } =
  UseProgramContext();
 const [showMessageModal, setShowMessageModal] = useState(false);
 const router = useRouter();
 const [posts, setPosts]: any = useState([]);
 const [userData, setUserData] = useState<UserData[] | undefined>();
 const [userKey, setUserKey] = useState('')
 let searchInputRef: any = useRef("");

 const [alreadyFetched, setAlreadyFetched] = useState(false);
 useEffect(() => {
  if (getWallet?.publicKey) {
  }
  if (postProgram && router?.query?.pubkey && !alreadyFetched) {
   getUser(router?.query?.pubkey!);
   getPosts(router?.query?.pubkey);
   setAlreadyFetched(true);
  }
 }, [router, postProgram, getWallet, posts]);

 function searchOnClick(e: { preventDefault: () => void }) {
  e.preventDefault();
  getUser();
  if (searchInputRef.current.value) {
   getPosts(searchInputRef.current.value);
  }
 }

 async function getUser(pub?: string | string[] | undefined) {
  let data: UserData;
  try {
   if (selected === 1) {
    data = await getUserByUsername({
     program: userProgram,
     username: searchInputRef.current.value,
    });
   } else {
    data = await getUserByPubkey({
     program: userProgram,
     pubkey: pub ? pub : searchInputRef.current.value,
    });
   }
   getPosts(data.user.toBase58())
   
   setUserData([data]);
  } catch (error) {}
 }
 async function getPosts(pubkey?: string | string[] | undefined) {
  let searchValue = searchInputRef?.current?.value;
  let value = pubkey ? pubkey:searchValue ;
  setUserKey(value)
  const authorFilter = (authorBase58PublicKey: any) => ({
   memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey,
   },
  });
  let filter = [authorFilter(value)];
  let posts: any[] | ((prevState: never[]) => never[]) = [];
  if (postProgram) {
   try {
    posts = await getAllPosts({ program: postProgram, filter: filter });
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
   <Layout active={2}>
<Head>
     <title>{userData?userData[0].username:'Users'}</title>
    </Head>
    {showMessageModal && <MessageModal userKey={userKey} setShowModal={setShowMessageModal} />}
    <main className="flex  w-1/3 ">
     {/* top isit !!!!!! Headlines */}
     <div className="flex w-full  justify-start flex-row">
      <div className=" flex grow  flex-col">
       <Search
        selected={selected}
        setSelected={setSelected}
        searchInputRef={searchInputRef}
        clickSearch={searchOnClick}
       />

       {userData &&
        userData.map((u: UserData) => (
         <Profile
          img={u.image}
          publickeyString={u.user.toBase58()}
          username={u.username}
          date={new Date(parseInt(u.timestamp) * 1000).toLocaleDateString()}
          setShowMessageModal={setShowMessageModal}
         />
        ))}

       {/* {userData && (
        <Profile
         img={userData[0].img}
         publickeyString={userData[0].publickeyString}
         username={userData[0].username}
         date={userData[0].date}
         setShowMessageModal={setShowMessageModal}
        />
       )} */}

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
 setShowMessageModal: Dispatch<SetStateAction<boolean>>;
 username: string;
 date: string;
 img: string;
 publickeyString: string;
}
function Profile({ setShowMessageModal, username, date, img, publickeyString }: ProfileProps) {
 return (
  <>
   <div className="mt-6 pb-2 border-b-2 border-gray-700 ">
    <div className="flex  justify-start items-center flex-row">
     <div className="flex justify-start   items-center w-full  flex-row">
      <Link href={`/users?pubkey=${publickeyString}`}>
       <div className="flex cursor-pointer items-center">
        <div className="pb- pr-2">
         <img className="w-14 h-14  rounded-full" src={img?img:'/img.png'}  />
        </div>
        <span className=" text-3xl ">{username}</span>
       </div>
      </Link>
      <span>&nbsp;•&nbsp;</span>
      <span className="text-base">Joined {date}</span>
      <button
       onClick={() => setShowMessageModal(true)}
       className="text-base rounded-full ml-auto btn bg-blue-700 hover:bg-blue-600 text-slate-100 ">
       <div className="flex flex-row items- justify-center">
        {/* <svg
        style={{marginTop:3}}
        className="w-5 h-5  fill-slate-100 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <path d="M511.1 63.1v287.1c0 35.25-28.75 63.1-64 63.1h-144l-124.9 93.68c-7.875 5.75-19.12 .0497-19.12-9.7v-83.98h-96c-35.25 0-64-28.75-64-63.1V63.1c0-35.25 28.75-63.1 64-63.1h384C483.2 0 511.1 28.75 511.1 63.1z" />
       </svg>{" "} */}
        <span>Message</span>
       </div>
      </button>
     </div>
    </div>
    <Link href={`/users?pubkey=${publickeyString}`}>
     <p
      style={{ marginLeft: 65, marginTop: -19 }}
      className=" cursor-pointer   text-sm underline text-blue-500 hover:text-blue-600 visited:text-purple-600 truncate w-44">
      {publickeyString}
     </p>
    </Link>
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
 selected: number;
 setSelected: Dispatch<SetStateAction<number>>;
}
export const Search = ({ searchInputRef, clickSearch, selected, setSelected }: SearchProps) => {
 const [dropDownOpen, setDropDownOpen] = useState(false);
 return (
  <>
   <div className="flex mt-2">
    <div className=" flex ">
     <button
      onClick={() => setDropDownOpen(!dropDownOpen)}
      id="dropdownDefault"
      data-dropdown-toggle="dropdown"
      className="mr-2 text-white bg-blue-700 hover:bg-blue-800  transition-colors duration-300 font-medium rounded-lg text-sm  px-3  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 "
      type="button">
      {selected === 1 ? "Username" : "Public Key"}
      <svg
       className="ml-2 w-4 h-4"
       aria-hidden="true"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
     </button>
     <div
      id="dropdown"
      style={{ width: 121, marginTop: 53 }}
      className={`z-10 ${
       dropDownOpen ? "" : "hidden"
      }  absolute bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 `}>
      <ul className=" text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
       <li
        onClick={() => {
         setSelected(1);
         setDropDownOpen(!dropDownOpen);
        }}
        className="transition-colors duration-300 text-base rounded cursor-pointer py-2.5 px-4 hover:bg-gray-600">
        Username
       </li>
       <li
        onClick={() => {
         setSelected(2);
         setDropDownOpen(!dropDownOpen);
        }}
        className="transition-colors duration-300 text-base cursor-pointer py-2.5 px-4 hover:bg-gray-600">
        Public Key
       </li>
      </ul>
     </div>
    </div>
    <form className="flex grow flex-row" onSubmit={clickSearch}>
     <input
      required
      ref={searchInputRef}
      type="text"
      placeholder={selected === 1 ? "Username" : "Public Key"}
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
