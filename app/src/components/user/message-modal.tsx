/** @format */

import React, { useRef, useState, useEffect } from "react";
import { useNotifier } from "react-headless-notifier";
import { UseProgramContext } from "../../contexts/programContextProvider";
import { getAllMessages, newMessage } from "../../program/message/message-methods";
import { CheckWallet } from "../../utils/walletError";
import { DangerAlert } from "../alert";

export function MessageModal({ message, setShowModal, username,userKey }: any) {
 let programContext = UseProgramContext();
 let messageInputRef: any = useRef("");

 const { notify } = useNotifier();

 async function sendNewMessage(e: { preventDefault: () => void }) {
  e.preventDefault();
  let message = messageInputRef.current.value;
  if (!message) {
  }
  if (message) {
   let allMessages = await getAllMessages({
    program: programContext?.messageProgram!,
    pubkey: programContext?.getWallet?.publicKey.toBase58()!,
   });

   try {
    let walletError = await CheckWallet(programContext?.getWallet, notify, programContext);
    if (walletError.error) {
    } else {
await newMessage({
      wallet: programContext?.getWallet!,
      program: programContext?.messageProgram!,
      content: message,
      to: userKey,
     });
    }
   } catch (e) {
    console.log(e);
notify(<DangerAlert text="newMessageError" dismiss={undefined} />);
    console.log("newMessageError");
   }

   setShowModal(false);
  }
 }

 const [modalClass, setModalClass] = useState("modal modal-middle modal-open");
 useEffect(() => {}, []);
 function closeModal() {
  setShowModal(false);
 }

 return (
  <>
   <div className={modalClass}>
    <div className="modal-box  ">
     <label
      onClick={closeModal}
      htmlFor="my-modal-3"
      className="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
     </label>
     <div className="flex mb-1 items-center"></div>
     <form className=" mt-5 items-center flex flex-row" onSubmit={sendNewMessage}>
      <div className="relative rounded-lg w-full">
       <textarea
        cols={3}
        ref={messageInputRef}
        id="search-dropdown"
        className="block rounded-lg p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="Message"
        required
       />
       <div className="flex w-full justify-center ">
        <button
         type="submit"
         className=" m-2 btn w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 capitalize  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
         Send
        </button>
       </div>
      </div>
     </form>
    </div>
   </div>
  </>
 );
}
