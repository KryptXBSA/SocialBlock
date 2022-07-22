/** @format */

import { useRef, useState } from "react";
import { UseProgramContext } from "../contexts/programContextProvider";
import {
 SuccessAlert,
 InfoAlert,
 DangerAlert,
 SpecialAlert,
 WarningAlert,
} from "../components/alert";
import { useNotifier } from "react-headless-notifier";
import { CheckWallet } from "../utils/walletError";
export const NewPost = ({ post }: any) => {
 //  @ts-ignore
 const { getWallet } = UseProgramContext();
 let contentInputRef: any = useRef("");
 let blockInputRef: any = useRef("");

 const [blockValue, setBlockValue] = useState("");

 const { notify } = useNotifier();
 async function newPost(e: { preventDefault: () => void }) {
  e.preventDefault();
  let walletError = await CheckWallet(getWallet, notify);
  if (walletError.error) {
   console.log(walletError);
  } else {
   let content = contentInputRef.current.value;
   let block = blockValue;
   post({ block, content });
   try {
    // return await like({ wallet: getWallet, program: postProgram, postPubkey });
   } catch (e) {}
  }
 }

 function onblockChange(e: { target: { value: any } }) {
  let str = e.target.value;
  str = str.replace(/\s+/g, "-");
  if (str.slice(-2) === "--") {
   str = blockValue;
  }
  setBlockValue(str);
 }
 return (
  <>
   <div className="w-full">
    <div className="flex w-full flex-row">
     <textarea
      ref={contentInputRef}
      className="block p-2.5 w-full text-sm rounded-lg dark:bg-gray-800 "
     />
    </div>
    <div className="   form-control">
     <form onSubmit={newPost}>
      <div className="flex items-center align-middle flex-row">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        className=" ml-3  absolute h-6 self-center w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}>
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
        />
       </svg>
       <input
        onChange={onblockChange}
        value={blockValue}
        ref={blockInputRef}
        type="text"
        placeholder="Block"
        className=" max-h-10 px-11 input w-44  rounded-3xl  "
       />
       <button
        onClick={newPost}
        className="p-3 mt-2 px-4 transition duration-300  font-semibold btn1 tracking-normal text-lg  dark:bg-slate-800 ml-auto rounded-2xl ">
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> */}
        New Post
       </button>
      </div>
     </form>
    </div>
   </div>
  </>
 );
};
