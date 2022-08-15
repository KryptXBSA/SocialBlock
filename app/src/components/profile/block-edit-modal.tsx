/** @format */

import { useEffect, useRef, useState } from "react";
import { changeImage, changeName } from "../../program/block/block-methods";

import * as anchor from "@project-serum/anchor";
import { useNotifier } from "react-headless-notifier";
import { UseProgramContext } from "../../contexts/programContextProvider";
import { CheckWallet } from "../../utils/walletError";
import { DangerAlert, SuccessAlert } from "../alert";

export function BlockEditModal({
 blockName,
 setShowModal,
 blockImage,
 publickey,
}: {
 blockName: string;
 setShowModal: any;
 blockImage: string;
 publickey: anchor.web3.PublicKey;
}) {
 const programContext = UseProgramContext();
 let blockImageRef: any = useRef("");
 let blockNameRef: any = useRef("");
 const [error, setError] = useState("");

 const { notify } = useNotifier();
 useEffect(() => {
  blockImageRef.current.value = blockImage;
  blockNameRef.current.value = blockName;
 }, [blockImage, blockName]);

 async function changeBlock(e: any) {
  e.preventDefault();
  setError("");
  let error = false;
  let image = await loadImage(blockImageRef.current.value, 3e3);
  let newName: any = blockNameRef.current.value;
  let newImage: any = blockImageRef.current.value;
  if (!image && blockImage !== newImage) setError("Not a valid Image"), (error = true);
  if (newName && newName.length > 50) setError("Block Name Too long");
  if (!error) {
   let walletError = await CheckWallet(programContext!.getWallet, notify, programContext);
   if (walletError.error) {
   } else {
    try {
     if (blockImage !== newImage) {
      
      let result = await changeImage({
       wallet: programContext?.getWallet!,
       block: publickey,
       program: programContext?.blockProgram!,
       newImage: newImage,
      });
      
     }
     if (newName !== blockName) {
        
      let result = await changeName({
       block: publickey,
       wallet: programContext?.getWallet!,
       program: programContext?.blockProgram!,
       newName: newName,
      });
     }
     //  setShowModal(false);
     notify(<SuccessAlert text="Success" dismiss={undefined} />);
    } catch (error) {
     notify(<DangerAlert text="An error occured!" dismiss={undefined} />);
    }
   }
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
      <h3 className="flex flex-row text-lg font-bold">Change Block Details </h3>
     </div>
     <form className=" items-center flex flex-row" onSubmit={changeBlock}>
      <div className="relative rounded-lg w-full">
       <input
        ref={blockImageRef}
        className="block mb-2 rounded-lg p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder={"Block Image (Link to image)"}
       />
       <input
        ref={blockNameRef}
        className="mb-2 block rounded-lg p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="Block Name"
       />
       {error && <span className="text-red-500 ml-1">{error}</span>}
       <br />
       <button
        type="submit"
        className=" btn w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 capitalize  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Save Changes
       </button>
      </div>
     </form>
    </div>
   </div>
  </>
 );
}
type LoadedCallback = (loaded: boolean) => void;
function loadImage(url: string, timeout?: number): Promise<boolean>;
function loadImage(url: string, timeout: number, callback: LoadedCallback): void;
function loadImage(url: string, callback: LoadedCallback): void;
function loadImage(
 url: string,
 timeoutOrCallback?: number | LoadedCallback,
 maybeCallback?: LoadedCallback
) {
 let timeout: number | undefined;
 let callback: LoadedCallback;

 if (typeof timeoutOrCallback === "number") {
  timeout = timeoutOrCallback;
  if (typeof maybeCallback === "function") callback = maybeCallback;
 } else if (typeof timeoutOrCallback === "function") callback = timeoutOrCallback;

 // @ts-expect-error
 const promise = callback
  ? undefined
  : new Promise<boolean>((resolve) => void (callback = resolve));

 const onlyRunOnce = { once: true };
 let timerId: any = 0;
 let done = false;

 if (typeof timeout === "number") {
  timerId = setTimeout(() => {
   done = true;
   callback(false);
  }, timeout);
 }

 const img = new Image();

 img.addEventListener(
  "load",
  () => {
   if (done) return;
   clearTimeout(timerId);
   done = true;
   callback(true);
  },
  onlyRunOnce
 );

 img.addEventListener(
  "error",
  () => {
   if (done) return;
   clearTimeout(timerId);
   done = true;
   callback(false);
  },
  onlyRunOnce
 );

 img.src = url;
 return promise;
}
