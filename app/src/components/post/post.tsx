import Link from "next/link";
import { useState } from "react";
import { BookmarkButton } from "./buttons";
import { ShareButton, CommentButton, NewComment } from "./buttons";
import { Comment } from "./comment";

export function Post({ content, username, date, publickeyString }: any) {
 const [commentsVisible, setCommentsVisible] = useState(false);
 const [postComments, setPostComments]: any = useState("");
 function displayComments() {
  setCommentsVisible(!commentsVisible);
  setPostComments(
   <>
    <Comment
     key={"comment.publicKey"}
     postPubKey={"comment.postPublicKey"}
     content={"comment.content"}
     pubKey={"comment.key"}
     ownerPubkey={"comment.authorDisplay"}
     name={"comment.username"}
     date={"comment.createdAgo"}
    /><Comment
     key={"comment.publicKey"}
     postPubKey={"comment.postPublicKey"}
     content={"comment.content"}
     pubKey={"comment.key"}
     ownerPubkey={"comment.authorDisplay"}
     name={"comment.username"}
     date={"comment.createdAgo"}
    /><Comment
     key={"comment.publicKey"}
     postPubKey={"comment.postPublicKey"}
     content={"comment.content"}
     pubKey={"comment.key"}
     ownerPubkey={"comment.authorDisplay"}
     name={"comment.username"}
     date={"comment.createdAgo"}
    /><Comment
     key={"comment.publicKey"}
     postPubKey={"comment.postPublicKey"}
     content={"comment.content"}
     pubKey={"comment.key"}
     ownerPubkey={"comment.authorDisplay"}
     name={"comment.username"}
     date={"comment.createdAgo"}
    />
   </>
  );
 }
 return (
  <div className="pl-5 break-all w-full border-gray-700 grow  ">
   <div className="flex  justify-start   border-b-2 border-gray-700  flex-col">
    {/* margin y nabe yakam dana ^^^^^^^^^^^^^ */}
    <div className="flex justify-start items-center flex-row">
     <div className="flex justify-start   items-center flex-row">
      <div className="pb- pr-2">
       <img
        className="w-10 h-10  rounded-full"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        alt="Rounded avatar"
       />
      </div>
      <span className=" text-2xl ">{username}dddd</span>{" "}
      <span>&nbsp;•&nbsp;</span>
      <span className="text-base">{date}2 days ago</span>
      <span className="text-base ml-2 cursor-pointer   text-sky-600">
       {date} <span className=" tracking-widest">#</span>Solana-Summer
      </span>
     </div>
     <div className="justify-self-end  ml-auto">
      <div className="tooltip" data-tip="Coming Soon">
       <BookmarkButton text={undefined} />
      </div>
     </div>
    </div>

    <Link href={`/users?pubkey=${publickeyString}`}>
     <p
      style={{ marginTop: -19, marginLeft: 50 }}
      className=" cursor-pointer   text-sm underline text-blue-500 hover:text-blue-600 visited:text-purple-600 truncate w-44">
      {publickeyString}ggggggggggg
     </p>
    </Link>
    <p className=" w-fit p- break-words">
     {content}hhiiiiiihiiiiiihiiiiiihiiiiiihiiiiiihiiiiiihiiiiii
     hiiiiiihiiiiiihiiiiiihiiiiiihiiiiiihiiiiiihiiiiiihi
    </p>
    {/* <span className="flex mt-3 text-violet-500">{data.topic}</span> */}
    <div className="flex   justify-around items-stretch flex-row">
     <ShareButton />
     <CommentButton setCommentsVisible={() => displayComments()} text={""} />
     <div className="tooltip" data-tip="Coming Soon">
      <ShareButton text={""} />
     </div>
    </div>
    {commentsVisible && (
     <>
      {postComments}
      {!postComments && <div className="divider"></div>}
      <NewComment
       newComment={() => console.log("new Comment")}
       postPubKey={"postPublicKey"}
      />
     </>
    )}
   </div>
  </div>
 );
}