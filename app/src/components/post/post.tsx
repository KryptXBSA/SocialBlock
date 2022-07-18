/** @format */

import Link from "next/link";
import { useState } from "react";
import { BookmarkButton, LikeButton } from "./buttons";
import { ShareButton, CommentButton } from "./buttons";
import { Comment, NewComment } from "./comment";

interface Props {
 content: string;
 username: string;
 date: string;
 publickeyString: string;
 block: string;
}

import { UseProgramContext } from "../../contexts/programContextProvider";
export function Post({
 content,
 username,
 date,
 publickeyString,
 block,
}: Props) {
 const programContext = UseProgramContext();
 const [commentsVisible, setCommentsVisible] = useState(false);
 const [postComments, setPostComments]: any = useState("");
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
      <span className=" text-2xl ">{username}</span>
      <span>&nbsp;•&nbsp;</span>
      <span className="text-base">{date}</span>
      <span className="text-base ml-2 cursor-pointer   text-sky-600">
       <span className=" tracking-widest">#</span>
       {block}
      </span>
     </div>
     <div className="justify-self-end  ml-auto">
      <div className="tooltip" data-tip="Coming Soon">
       <BookmarkButton />
      </div>
     </div>
    </div>

    <Link href={`/users?pubkey=${publickeyString}`}>
     <p
      style={{ marginTop: 32, marginLeft: 49 }}
      className=" absolute cursor-pointer   text-sm underline text-blue-500 hover:text-blue-600 visited:text-purple-600 truncate w-44">
      {publickeyString}
     </p>
    </Link>
    <p className=" w-fit p- break-words">{content}</p>
    {/* <span className="flex mt-3 text-violet-500">{data.topic}</span> */}
    <div className="flex   justify-around items-stretch flex-row">
     <LikeButton
      walletPubkey={programContext?.getWallet?.publicKey!}
      postLikes={[programContext?.getWallet?.publicKey!]}
      postPubkey={programContext?.getWallet?.publicKey!}
      unlikePost={'unlikePost'}
      likePost={'likePost'}
      text={'data.getLikesCount'}
     />
     <CommentButton setCommentsVisible={() => displayComments()} />
     <div className="tooltip" data-tip="Coming Soon">
      <ShareButton />
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
