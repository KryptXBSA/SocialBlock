/** @format */

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UseProgramContext } from "../contexts/programContextProvider";



export const Button = ({ href, text, index, active, icon }: any) => {
 const [clss, setClss] = useState("bg-transparent dark:hover:bg-slate-700");
 useEffect(() => {
  let show = index === active;
  if (show) {
   setClss(" bg-sky-600 hover:bg-sky-500 ");
  } else {
   setClss(" dark:bg-transparent dark:hover:bg-slate-700 ");
  }
 }, [active]);

 return (
  <Link href={href}>
   <button
    className={
     clss +
     " px-5 mb-2 mx-1 rounded-md py-3 inline-flex items-center  bg-transparent w-48 flex-row   transition duration-300  text-white  tracking-wider font-semibold text-sm sm:text-xl whitespace-nowrap"
    }>
    <div className="mr-3">{icon}</div>
    {text}
   </button>
  </Link>
 );
};

export const Tabs = ({ activeTab, changeTab }: any) => {
 if (activeTab === "0") {
  return (
   <div className="tabs justify-center">
    {/* <a className="tab w-32 tab-lg tab-bordered">Posts</a>  */}
    {/* <a className="tab w-32 tab-lg tab-bordered tab-active">Comments</a>  */}
    <a onClick={() => changeTab("0")} className="tab w-44 tab-lg tab-active tab-bordered ">
     Users
    </a>
   </div>
  );
 }
 if (activeTab === "1") {
  return (
   <div className="tabs justify-center">
    {/* <a className="tab w-32 tab-lg tab-bordered">Posts</a>  */}
    {/* <a className="tab w-32 tab-lg tab-bordered tab-active">Comments</a>  */}
    <a onClick={() => changeTab("0")} className="tab w-44 tab-lg tab-bordered ">
     Users
    </a>
   </div>
  );
 }
};
let inboxIcon = (
 <svg 
  className="fill-slate-300"
  width="22"
  height="24"
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path d="M447 56.25C443.5 42 430.7 31.1 416 31.1H96c-14.69 0-27.47 10-31.03 24.25L3.715 304.9C1.247 314.9 0 325.2 0 335.5v96.47c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48v-96.47c0-10.32-1.247-20.6-3.715-30.61L447 56.25zM352 352H160L128 288H72.97L121 96h270l48.03 192H384L352 352z" />
 </svg>
);
let blocksIcon = (
 <svg
  className="fill-slate-300"
  width="28"
  height="24"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 576 512">
  <path d="M172.1 40.16L268.1 3.76C280.9-1.089 295.1-1.089 307.9 3.76L403.9 40.16C425.6 48.41 440 69.25 440 92.52V204.7C441.3 205.1 442.6 205.5 443.9 205.1L539.9 242.4C561.6 250.6 576 271.5 576 294.7V413.9C576 436.1 562.9 456.2 542.5 465.1L446.5 507.3C432.2 513.7 415.8 513.7 401.5 507.3L288 457.5L174.5 507.3C160.2 513.7 143.8 513.7 129.5 507.3L33.46 465.1C13.13 456.2 0 436.1 0 413.9V294.7C0 271.5 14.39 250.6 36.15 242.4L132.1 205.1C133.4 205.5 134.7 205.1 136 204.7V92.52C136 69.25 150.4 48.41 172.1 40.16V40.16zM290.8 48.64C289 47.95 286.1 47.95 285.2 48.64L206.8 78.35L287.1 109.5L369.2 78.35L290.8 48.64zM392 210.6V121L309.6 152.6V241.8L392 210.6zM154.8 250.9C153 250.2 150.1 250.2 149.2 250.9L70.81 280.6L152 311.7L233.2 280.6L154.8 250.9zM173.6 455.3L256 419.1V323.2L173.6 354.8V455.3zM342.8 280.6L424 311.7L505.2 280.6L426.8 250.9C425 250.2 422.1 250.2 421.2 250.9L342.8 280.6zM528 413.9V323.2L445.6 354.8V455.3L523.2 421.2C526.1 419.9 528 417.1 528 413.9V413.9z" />
 </svg>
);
let usersIcon = (
 <svg
  xmlns="http://www.w3.org/2000/svg"
  width="26"
  height="26"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="feather feather-user">
  <script />
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" />
 </svg>
);
let homeIcon = (
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
   d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  />
 </svg>
);
export const Sidebar = ({ active }: { active: number | undefined }) => {
 const { disconnect } = useWallet();

 const programContext = UseProgramContext()!;

 return (
  <div className="flex z-20  flex-col">
   <div className="flex w-52 z-20   h-full bg-slate-800 flex-col left-0 fixed">
    <div className="h-20 w-52 border-b-2 mb-2 border-gray-700  z-10 top-0 bg-slate-800 inline-flex items-center">
     <span className="font-bold ml-10 text-lg"> LOGO</span>
    </div>
    <Button icon={homeIcon} index={0} active={active} href="/" text="Home" />
    <Button icon={inboxIcon} index={1} active={active} href="/inbox" text="Inbox" />
    <Button icon={usersIcon} index={2} active={active} href="/users" text="Users" />

    <Button icon={blocksIcon} index={3} active={active} href="/blocks" text="Blocks" />

    <WalletMultiButton className=" ml-1 hover:bg-violet-600 py-3 btn1 px-5 inline-flex items-center  w-48  " />
    {programContext.state.user.foundUser && (
     <div className=" mb-8 ml-6 mt-auto">
      <div className="flex cursor-pointer items-center">
       <Link href="/profile">
        <div className="flex cursor-pointer items-center">
         <div className="pb- pr-2">
          <img
           className="w-10 h-10  rounded-full"
           src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
         </div>
         <span className=" text-2xl hover:text-slate-400 ">
          {programContext.state.user.username}
         </span>
        </div>
       </Link>
       <svg
        onClick={() => {
         programContext.disconnect();
         disconnect();
        }}
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 ml-2 h-6 hover:fill-slate-400 fill-slate-300"
        viewBox="0 0 512 512">
        <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" />
       </svg>
      </div>
     </div>
    )}
   </div>
  </div>
 );
};