/** @format */

import Link from "next/link";
import { useState } from "react";
import { BookmarkButton, LikeButton } from "./buttons";
import { ShareButton, CommentButton } from "./buttons";
import { Comment, NewComment } from "./comment";

import { UseProgramContext } from "../../contexts/programContextProvider";
import { TipModal } from "./tip-modal";

interface Props {
 content: string;
 username: string;
 date: string;
 publickeyString: string;
 block: string;
 shared: string;
}

export function Post({
 content,
 username,
 date,
 publickeyString,
 block,
 shared,
}: Props) {
 const programContext = UseProgramContext();
 const [commentsVisible, setCommentsVisible] = useState(false);
 const [postComments, setPostComments]: any = useState("");
 const [showTipModal, setShowTipModal] = useState(false);
 function displayComments() {
  setCommentsVisible(!commentsVisible);
  setPostComments(
   <>
    <Comment
     key={"comment.publicKey"}
     content={"comment.content"}
     //  postPubKey={"comment.postPublicKey"}
     //  pubKey={"comment.key"}
     authorPubkeyString={"comment.authorDisplay"}
     name={"comment.username"}
     date={"comment.createdAgo"}
    />
   </>
  );
 }
 return (
  <div className="pl-5 break-all w-full border-gray-700 grow  ">
   {showTipModal && (
    <TipModal username={username} setShowTipModal={setShowTipModal} />
   )}
   <div className="flex  justify-start   border-b-2 border-gray-700  flex-col">
    {/* margin y nabe yakam dana ^^^^^^^^^^^^^ */}
    <div className="flex justify-start items-center flex-row">
     <div className="flex flex-col">
      <div className="flex justify-start   items-center flex-row">
       <Link href={`/users?pubkey=${publickeyString}`}>
        <div className="flex cursor-pointer items-center">
        <div className="pb- pr-2">
         <img
          className="w-10 h-10  rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="Rounded avatar"
         />
        </div>
        <span className=" text-2xl ">{username}</span></div>
       </Link>
       <span>&nbsp;•&nbsp;</span>
       <span className="text-base">{date}</span>
       <span className="text-base ml-2 cursor-pointer hover:text-sky-700  text-sky-600">
        <span className=" tracking-widest">#</span>
        {block}
       </span>
      </div>
       <Link href={`/users?pubkey=${publickeyString}`}>
      <p
       style={{ marginTop: -9, marginLeft: 49 }}
       className=" cursor-pointer   text-sm underline text-blue-500 hover:text-blue-600 visited:text-purple-600 truncate w-44">
       {publickeyString}
      </p>
       </Link>
     </div>
    </div>
    {/* {shared !== "ndo" && (
     <>
      <Link href={`/users?pubkey=${publickeyString}`}>
       <p
        style={{ marginTop: 36, marginLeft: 288 }}
        className=" absolute cursor-pointer   text-sm underline text-blue-500 hover:text-blue-600 visited:text-purple-600 truncate w-44">
        {publickeyString}
       </p>
      </Link>
      <p
       style={{ marginTop: 39, marginLeft: 238 }}
       className=" absolute cursor-pointer   text-sm underline text-blue-500 hover:text-blue-600 visited:text-purple-600 truncate w-44">
       {shared}
      </p>
     </>
    )} */}
    <p className=" w-fit p- break-words">{content}</p>
    {/* <span className="flex mt-3 text-violet-500">{data.topic}</span> */}
    <div className="flex   justify-around items-stretch flex-row">
     <LikeButton
      walletPubkey={programContext?.getWallet?.publicKey!}
      postLikes={[programContext?.getWallet?.publicKey!]}
      postPubkey={programContext?.getWallet?.publicKey!}
      unlikePost={"unlikePost"}
      likePost={"likePost"}
      text={""}
     />
     <CommentButton setCommentsVisible={() => displayComments()} />
     {/* <div className="tooltip" data-tip="Coming Soon"> */}
     {/* <ShareButton /> */}
     {/* </div> */}
    </div>
    <div className="flex  mb-2  items-center">
     <div
      className="tooltip flex items-center"
      data-tip="Sol Received From tips">
      <img className=" mx-1 h-7 w-7 rounded-full  " src="/icons/sol-icon.png" />{" "}
      <span className="">0</span>
     </div>
     <div
      onClick={() => setShowTipModal(true)}
      className="justify-self-end items-center hover:bg-slate-800 p-2 rounded-lg transition-colors  cursor-pointer flex flex-row  ml-auto">
      <span className="font-semibold mr-1">Tip</span>
      <img
       className="  h-7 w-7 rounded-full  "
       src="/icons/sol-icon.png"
      />{" "}
     </div>
    </div>
    {commentsVisible && (
     <>
      {postComments}
      {!postComments && <div className="divider"></div>}
      <NewComment
       commentProgram={programContext?.commentProgram!}
       postPubkey={programContext?.getWallet?.publicKey!}
       walletPubkey={programContext?.getWallet?.publicKey!}
       username={"aland"}
      />
     </>
    )}
   </div>
  </div>
 );
}