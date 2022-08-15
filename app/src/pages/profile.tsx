/** @format */

import * as anchor from "@project-serum/anchor";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { UseProgramContext } from "../contexts/programContextProvider";
import Layout from "../sections/Layout";

import { TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types";
import Link from "next/link";
import { useNotifier } from "react-headless-notifier";
import { BlockEditModal } from "../components/profile/block-edit-modal";
import { NewBlockModal } from "../components/profile/new-block-modal";
import { ProfileModal } from "../components/profile/profile-modal";
import { getBlockByOwner } from "../program/block/block-methods";
import { Block } from "../program/block/block-type";
import { getUserByPubkey } from "../program/user/user-methods";
import { User } from "../program/user/user-type";
import { getDate } from "../utils/get-date-moment";
import Head from "next/head";

type UserData = {
 publicKey: anchor.web3.PublicKey;
} & TypeDef<
 {
  name: "user";
  type: {
   kind: "struct";
   fields: [
    {
     name: "user";
     type: "publicKey";
    },
    {
     name: "username";
     type: "string";
    },
    {
     name: "image";
     type: "string";
    },
    {
     name: "timestamp";
     type: "i64";
    },
    {
     name: "bookmarks";
     type: {
      vec: "publicKey";
     };
    }
   ];
  };
 },
 anchor.IdlTypes<User>
>;
type BlocksType = {
 publicKey: anchor.web3.PublicKey;
} & TypeDef<
 {
  name: "block";
  type: {
   kind: "struct";
   fields: [
    {
     name: "owner";
     type: "publicKey";
    },
    {
     name: "blockName";
     type: "string";
    },
    {
     name: "image";
     type: "string";
    },
    {
     name: "timestamp";
     type: "i64";
    }
   ];
  };
 },
 anchor.IdlTypes<Block>
>;
export default function Home() {
 const [selected, setSelected] = useState(1);
 const { notify } = useNotifier();
 //  @ts-ignore
 const programContext = UseProgramContext();
 const [showProfileModal, setShowProfileModal] = useState(false);
 const [showBlockEditModal, setSetShowBlockEditModal] = useState(false);
 const [showNewBlockModal, setShowNewBlockModal] = useState(false);
 const [selectedBlockName, setSelectedBlockName] = useState("");
 const [selectedBlockImage, setSelectedBlockImage] = useState("");
 const [selectedBlockPubkey, setSelectedBlockPubkey] = useState<anchor.web3.PublicKey>();
 const router = useRouter();
 const [userData, setUserData] = useState<UserData | undefined>();

 let searchInputRef: any = useRef("");

 const [alreadyFetched, setAlreadyFetched] = useState(false);
 const [blocks, setBlocks] = useState<BlocksType[]>();
 useEffect(() => {
  if (programContext?.blockProgram && programContext.getWallet?.publicKey && !alreadyFetched) {
   getUser();
   setAlreadyFetched(true);

   getOwnedBlocks();
  }

  if (!programContext?.getWallet) {
   setBlocks([]);
   setUserData(undefined);
   setAlreadyFetched(false);
  }
 }, [router, programContext!.postProgram, programContext!.getWallet]);

 async function getUser() {
  try {
   let user = await getUserByPubkey({
    program: programContext?.userProgram!,
    pubkey: programContext?.getWallet?.publicKey.toBase58(),
   });

   setUserData(user);
  } catch (error) {}
 }
 async function getOwnedBlocks() {
  try {
   let blocks = await getBlockByOwner({
    program: programContext!.blockProgram!,
    pubkey: programContext?.getWallet?.publicKey.toBase58(),
   });
   setBlocks(blocks);
  } catch (error) {}
 }

 if (!router.asPath) {
  return null;
 } else {
  return (
   <>
    <Head>
     <title>Profile</title>
    </Head>
    <Layout>
     {showProfileModal && <ProfileModal setShowModal={setShowProfileModal} />}
     {showNewBlockModal && <NewBlockModal setShowModal={setShowNewBlockModal} />}
     {showBlockEditModal && (
      <BlockEditModal
       blockName={selectedBlockName}
       blockImage={selectedBlockImage}
       publickey={selectedBlockPubkey!}
       setShowModal={setSetShowBlockEditModal}
      />
     )}
     <main className="flex  w-1/3 ">
      {/* top isit !!!!!! Headlines */}
      <div className="flex w-full  justify-start flex-row">
       <div className=" flex grow  flex-col">
        {userData && (
         <Profile
          img={userData.image}
          publickeyString={userData.user.toBase58()}
          username={userData.username}
          date={getDate(userData.timestamp)}
          setShowProfileModal={setShowProfileModal}
         />
        )}
        {userData && (
         <button
          onClick={() => setShowNewBlockModal(true)}
          className=" btn mt-1 w-1/3 self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 capitalize  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <div className="w-5 h-5 mr-24 mb-1 fill-blue-300 absolute">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M234.5 5.709C248.4 .7377 263.6 .7377 277.5 5.709L469.5 74.28C494.1 83.38 512 107.5 512 134.6V377.4C512 404.5 494.1 428.6 469.5 437.7L277.5 506.3C263.6 511.3 248.4 511.3 234.5 506.3L42.47 437.7C17 428.6 0 404.5 0 377.4V134.6C0 107.5 17 83.38 42.47 74.28L234.5 5.709zM256 65.98L82.34 128L256 190L429.7 128L256 65.98zM288 434.6L448 377.4V189.4L288 246.6V434.6z" />
           </svg>
          </div>
          New Block
         </button>
        )}
        <div>
         {blocks &&
          blocks.map((b) => (
           <div
           key={b.publicKey.toBase58()}
            onClick={() => {
             setSelectedBlockImage(b.image);
             setSelectedBlockName(b.blockName);
             setSelectedBlockPubkey(b.publicKey);
            }}>
            <BlockProfile
             img={b.image}
             publickeyString={b.publicKey.toBase58()}
             username={b.blockName}
             date={getDate(b.timestamp)}
             setShowProfileModal={setSetShowBlockEditModal}
            />
           </div>
          ))}
        </div>
        <div className="mt-2 w-full">{<div style={{ marginBottom: 999 }} className=""></div>}</div>
       </div>
      </div>
     </main>
     <div className="mb-96 pb-96"></div>
    </Layout>
   </>
  );
 }
}
interface BlockProfileProps {
 setShowProfileModal: Dispatch<SetStateAction<boolean>>;
 username: string;
 date: string;
 img: string;
 publickeyString: string;
}
function BlockProfile({
 setShowProfileModal,
 username,
 date,
 img,
 publickeyString,
}: BlockProfileProps) {
 return (
  <>
   <div className="mt-6 pb-2 border-b-2 border-gray-700 ">
    <div className="flex  justify-start items-center flex-row">
     <div className="flex justify-start   items-center w-full  flex-row">
      <div className="flex cursor-pointer items-center">
       <div className="pb- pr-2">
        <img className="w-14 h-14  rounded-full" src={img ? img : "/img.png"} />
       </div>
       <div className="flex items-center space-x-1">
        <Link href={`/blocks?block_name=${username}`}>
         <span className=" text-3xl ">{username}</span>
        </Link>{" "}
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
      <span className="text-base">Created {date}</span>
     </div>
    </div>
   </div>
  </>
 );
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
        <img className="w-14 h-14  rounded-full" src={img ? img : "/img.png"} />
       </div>
       <div className="flex items-center space-x-1">
        <span className=" text-3xl ">{username}</span>
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
