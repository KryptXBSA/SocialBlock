/** @format */

import Layout from "../sections/Layout";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, SetStateAction, Dispatch } from "react";
import { Sidebar } from "../components/sidebar";
import { getAllPosts, sendPost, like, unlike } from "../program/posts";
import { UseProgramContext } from "../contexts/programContextProvider";
import { Post } from "../components/post/post";
import { getAllComments, newComment } from "../program/comments";

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
import { ProfileModal } from "../components/profile/profile-modal";

interface UserData {
 publickeyString: string;
 username: string;
 img: string;
 date: string;
}
export default function Home() {
 const [selected, setSelected] = useState(1);
 const { notify } = useNotifier();
 //  @ts-ignore
 const { state, postProgram, commentProgram, getWallet, userProgram, changeState } =
  UseProgramContext();
 const [showProfileModal, setShowProfileModal] = useState(false);
 const router = useRouter();
 const [posts, setPosts]: any = useState([]);
 const [userData, setUserData] = useState<UserData | undefined>({
  username: "aland",
  img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
  date: "15 March 2022",
  publickeyString: "pubkey",
 });

 let searchInputRef: any = useRef("");

 const [alreadyFetched, setAlreadyFetched] = useState(false);
 useEffect(() => {
  if (getWallet?.publicKey) {
  }
  if (postProgram && router?.query?.pubkey && !alreadyFetched) {
   getUser();
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

 async function getUser() {
  setUserData({
   username: "aland",
   img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
   date: "15 March 2022",
   publickeyString: "pubkey",
  });
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
  console.log(posts);
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
 console.log(posts.length);

 if (!router.asPath) {
  return null;
 } else {
  return (
   <Layout>
    {showProfileModal && <ProfileModal setShowModal={setShowProfileModal} />}
    <main className="flex  w-1/3 ">
     {/* top isit !!!!!! Headlines */}
     <div className="flex w-full  justify-start flex-row">
      <div className=" flex grow  flex-col">
       {userData && (
        <Profile
         img={userData.img}
         publickeyString={userData.publickeyString}
         username={userData.username}
         date={userData.date}
         setShowProfileModal={setShowProfileModal}
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
 setShowProfileModal: Dispatch<SetStateAction<boolean>>;
 username: string;
 date: string;
 img: string;
 publickeyString: string;
}
function Profile({ setShowProfileModal, username, date, img, publickeyString }: ProfileProps) {
 return (
  <>
   <div className="mt-6 pb-2 border-b-2 border-gray-700 ">
    <div className="flex  justify-start items-center flex-row">
     <div className="flex justify-start   items-center w-full  flex-row">
      <div className="flex cursor-pointer items-center">
       <div className="pb- pr-2">
        <img className="w-14 h-14  rounded-full" src={img}  />
       </div>
       <div className="flex items-center space-x-1">
        <span className=" text-3xl ">{username}</span>{" "}
        <svg
         onClick={() => setShowProfileModal(true)}
         className="cursor-pointer w-5 h-5 fill-gray-500 "
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 512 512">
         <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
        </svg>
       </div>
      </div>
      <span>&nbsp;•&nbsp;</span>
      <span className="text-base">Joined {date}</span>
     </div>
    </div>
    <Link href={`/users?pubkey=${"publickeyString"}`}>
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
