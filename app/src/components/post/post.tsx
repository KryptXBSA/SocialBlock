/** @format */

import * as anchor from "@project-serum/anchor";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useNotifier } from "react-headless-notifier";
import { UseProgramContext } from "../../contexts/programContextProvider";
import { getAllComments } from "../../program/comments";
import { DangerAlert } from "../alert";
import { CommentButton, LikeButton, TipButton } from "./buttons";
import { Comment, NewComment } from "./comment";
import { TipModal } from "./tip-modal";
interface Props {
 likes: anchor.web3.PublicKey[];
 content: string;
 username: string;
 date: string;
 image: string;
 publickeyString: string;
 block: string;
 tip: number;
 postPubkey: anchor.web3.PublicKey;
 commentCount: number;
}

export function Post({
 likes,
 content,
 username,
 date,
 publickeyString,
 block,
 tip,
 postPubkey,
 commentCount,
 image,
}: Props) {
 const { notify } = useNotifier();
 //  @ts-ignore
 const { state, postProgram, commentProgram, getWallet, userProgram, changeState } =
  UseProgramContext();
 const [commentcount0, setCommentcount0] = useState(commentCount);
 const [commentsVisible, setCommentsVisible] = useState(false);
 const [postComments, setPostComments]: any = useState([]);
 const [postComments0, setPostComments0]: any = useState([]);
 const [showTipModal, setShowTipModal] = useState(false);
 function displayComments() {
  setCommentsVisible(!commentsVisible);
  setPostComments(
   <>
    {postComments0.map((c: any) => (
     <Comment
      image={c.image}
      key={c.publicKey}
      content={c.content}
      //   postPubKey={comment.postPublicKey}
      //   pubKey={comment.key}
      authorPubkeyString={c.authorDisplay}
      name={c.username}
      date={c.createdAgo}
     />
    ))}
   </>
  );
 }
 const [postedAt, setPostedAt] = useState(
  moment(new Date(parseInt(date) * 1000).toUTCString()).fromNow()
 );
 async function fetchComments() {
  let comments;
  try {
   comments = await getAllComments({
    program: commentProgram,
    publicKey: postPubkey.toBase58(),
   });
  } catch (error) {
   console.log(error);
   notify(<DangerAlert text="An Error Occured (fetch)..." dismiss={undefined} />);
  }

  setCommentcount0(comments.length);
  setPostComments(comments);
  setPostComments0(comments);
 }
 useEffect(() => {
  const interval = setInterval(() => {
   setPostedAt(moment(new Date(parseInt(date) * 1000).toUTCString()).fromNow());
  }, 1000);
  if (postComments) fetchComments();
  return () => {
   clearInterval(interval);
  };
 }, [getWallet]);
 function addComment(comment: any) {
  let comments = [comment].concat(postComments0);
  setCommentcount0(comments.length);
  setPostComments(
   comments.map((c: any) => (
    <Comment
     image={c.image}
     key={c.publicKey}
     content={c.content}
     //   postPubKey={comment.postPublicKey}
     //   pubKey={comment.key}
     authorPubkeyString={c.authorDisplay}
     name={c.username}
     date={c.createdAgo}
    />
   ))
  );
 }
 return (
  <div className="pl- break-all w-full border-gray-700 grow  ">
   {showTipModal && <TipModal username={username} setShowTipModal={setShowTipModal} />}
   <div className="flex  justify-start   border-b-2 border-gray-700  flex-col">
    {/* margin y nabe yakam dana ^^^^^^^^^^^^^ */}
    <div className="flex justify-start items-center flex-row">
     <div className="flex flex-col">
      <div className="flex justify-start   items-center flex-row">
       <Link href={`/users?pubkey=${publickeyString}`}>
        <div className="flex cursor-pointer items-center">
         <div className="pb- pr-2">
          <img className="w-10 h-10  rounded-full" src={image ? image : "/img.png"} />
         </div>
         <span className=" text-2xl ">{username}</span>
        </div>
       </Link>
       <span>&nbsp;•&nbsp;</span>
       <span className="text-base">{postedAt}</span>
       <Link href={`/blocks?block_name=${block}`}>
        <span className="text-base ml-2 cursor-pointer hover:text-sky-700  text-sky-600">
         <span className=" tracking-widest">#</span>
         {block}
        </span>
       </Link>
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
    {/* shared post */}
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
    <div className="flex   justify-around items-stretch flex-row">
     <LikeButton
      likes={likes}
      postPubkey={postPubkey}
      unlikePost={"unlikePost"}
      likePost={"likePost"}
     />
     <CommentButton commentCount={commentcount0} setCommentsVisible={() => displayComments()} />
     {/* <div className="tooltip" data-tip="Coming Soon"> */}
     {/* <ShareButton /> */}
     {/* </div> */}
     <TipButton setShowTipModal={setShowTipModal} />
    </div>

    {/* {tip > 0 && (
     <div className="flex  mb-2  items-center">
      <div className="tooltip flex items-center" data-tip="Sol Received From tips">
       <img className=" mx-1 h-7 w-7 rounded-full  " src="/icons/sol-icon.png" />{" "}
       <span className="">{tip / LAMPORTS_PER_SOL}</span>
      </div>
     </div>
    )} */}
    {commentsVisible && (
     <>
      {postComments}
      {!postComments && <div className="divider"></div>}
      <NewComment postPubkey={postPubkey} addComment={addComment} />
     </>
    )}
   </div>
  </div>
 );
}
