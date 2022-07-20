/** @format */

import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Layout from "../sections/Layout";

export default function InboxPage() {
 return (
  <>
   <Head>
    <title>Social Block</title>
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <Layout>
    <main className="  bg-slate-900   flex justify-center flex-row">
     <Inbox />
     {/* <div style={{ width: 733 }} className="flex mt-4 items-center flex-col space-y-2"></div> */}
    </main>
   </Layout>
  </>
 );
}

function Inbox() {
 return (
  <div className="flex flex-row h-screen antialiased ">
   <div className="flex flex-row w-96 flex-shrink-0 p-4">
    <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
     <MessageHeader />
     <MessageList />
    </div>
   </div>
   <div className="flex flex-col h-full w-full  px-4 py-6">
    <MessageHeader1 username="aland" />
    {/* messages */}
    <div className="h-full overflow-hidden py-4">
     <div className="h-full overflow-y-auto">
      <div className="grid grid-cols-12 gap-y-2">
       <Message
        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        message="hi"
        self={false}
       />{" "}
       <Message
        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        message="hi"
        self={true}
       />
       <div className="invisible">
        <Message
         img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
         message="hi"
         self={true}
        />
       </div>
      </div>
     </div>
    </div>
    {/* messages */}

    <div className="flex flex-row items-center">
     <div className="flex flex-row items-center w-full rounded-3xl h-12 px-2">
      <div className="w-full">
       <textarea
        className=" bg-transparent  w-full rounded-lg text-sm h-10 flex items-center"
        placeholder="Type your message...."
       />
      </div>
     </div>
     <div className="">
      <button className="flex items-center justify-center h-10 w-10 rounded-full  transition-colors duration-300 hover:bg-gray-800 ">
       <svg
        className="w-5 h-5 transform rotate-90 -mr-px"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
         stroke-linecap="round"
         stroke-linejoin="round"
         stroke-width="2"
         d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
       </svg>
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}
interface Message {
 self: boolean;
 message: string;
 img: string;
}
function Message({ self, message, img }: Message) {
 return (
  <div className={`${!self ? "col-start-1 col-end-8 p-3" : "col-start-6 col-end-13"}  rounded-lg`}>
   <div className={`flex ${!self ? "flex-row" : "flex-row-reverse"} items-center`}>
    <img className="w-10 h-10  rounded-full" src={!self ? img : ""} alt="Rounded avatar" />
    <div
     className={`relative ${
      !self ? "ml-3" : "mr-3"
     } text-sm bg-slate-800 py-2 px-4 shadow rounded-xl`}>
     <div className="text-base">{message}</div>
    </div>
   </div>
  </div>
 );
}
function MessageHeader1({ username }: { username: string }) {
 return (
  <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
   <img
    className="w-10 h-10  rounded-full"
    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    alt="Rounded avatar"
   />
   <div className="flex flex-col ml-2">
    <div className="font-semibold text-lg">{username}</div>
   </div>
  </div>
 );
}
function MessageHeader() {
 return (
  <div className="flex flex-row items-center">
   <div className="flex flex-row items-center">
    <div className="text-xl font-semibold">Messages</div>
    <div className="flex items-center justify-center ml-2 text-xs h-5 w-5  bg-red-500 rounded-full font-medium">
     5
    </div>
   </div>
   <div className="ml-auto">
    {/* <button className="flex items-center justify-center h-7 w-7 bg-gray-200  rounded-full">
     <svg
      className="w-4 h-4 stroke-current"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
       stroke-linecap="round"
       stroke-linejoin="round"
       stroke-width="2"
       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
     </svg>
    </button> */}
   </div>
  </div>
 );
}
interface User {
 index: number;
 selectedMessage: number;
 username: string;
 lastMessage: string;
 setSelectedMessage: Dispatch<SetStateAction<number>>;
 img: string;
}
function MessageList() {
 const [selectedMessage, setSelectedMessage] = useState(0);

 return (
  <div className="mt-2">
   <div className="flex flex-col -mx-4">
    <User
     lastMessage="asfaqsfasf asfasfasfd asfas "
     username="aland"
     img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
     selectedMessage={selectedMessage}
     setSelectedMessage={setSelectedMessage}
     index={0}
    />
    <User
     lastMessage="asfaqsfasf asfasfasfd asfas "
     username="aland"
     img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
     selectedMessage={selectedMessage}
     setSelectedMessage={setSelectedMessage}
     index={1}
    />
    <User
     lastMessage="asfaqsfasf asfasfasfd asfas "
     username="aland"
     img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
     selectedMessage={selectedMessage}
     setSelectedMessage={setSelectedMessage}
     index={2}
    />
   </div>
  </div>
 );
}
function User({ username, lastMessage, index, selectedMessage, setSelectedMessage, img }: User) {
 const [selected, setSelected] = useState(index === selectedMessage);
 useEffect(() => {
  setSelected(index === selectedMessage);
 }, [selectedMessage]);

 return (
  <div
   onClick={() => setSelectedMessage(index)}
   className={` transition-colors duration-300 cursor-pointer  rounded-lg my-1 flex flex-row items-center p-4 ${
    selected
     ? "bg-gradient-to-r from-blue-600 to-transparent border-l-2 border-sky-600 hover:border-sky-500 hover:from-blue-500"
     : "hover:bg-slate-800"
   }`}>
   <img className="w-10 h-10  rounded-full" src={img} alt="Rounded avatar" />
   <div className="flex flex-col flex-grow ml-3">
    <div className="text-base font-semibold">{username}</div>
    <div className="text-sm truncate w-40">{lastMessage}</div>
   </div>
   <div className="flex-shrink-0 ml-2 self-end mb-1">
    <span className="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
     5
    </span>
   </div>
  </div>
 );
}
