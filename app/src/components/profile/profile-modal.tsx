/** @format */

import React, { useRef, useState, useEffect } from "react";

export function ProfileModal({ message, setShowModal, username }: any) {
 let usernameInputRef: any = useRef("");

 async function tip(e: { preventDefault: () => void }) {
  let username = usernameInputRef.current.value;
  e.preventDefault();
  if (!username) {
  }
  if (username) {
   await message(usernameInputRef.current.value);
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
     <div className="flex mb-1 items-center">
      <h3 className="flex flex-row text-lg font-bold">Settings </h3>
     </div>
     <form className=" items-center flex flex-row" onSubmit={tip}>
      <div className="relative rounded-lg w-full">
       <input
        id="search-dropdown"
        className="block mb-2 rounded-lg p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="Image Url"
       />
       <input
        id="search-dropdown"
        className="mb-2 block rounded-lg p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="Username"
       />
       <button
        type="submit"
        className=" btn w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 capitalize  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Change Settings
       </button>
      </div>
     </form>
    </div>
   </div>
  </>
 );
}
