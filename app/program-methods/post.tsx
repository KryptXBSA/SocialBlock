/** @format */

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { sendPost, like, unlike, comment } from "../program/posts";
import {
 SuccessAlert,
 InfoAlert,
 DangerAlert,
 SpecialAlert,
 WarningAlert,
 DangerAlertWallet,
} from "../components/alert";
import { Post } from "../components/posts";
import { getAllComments0 } from "./comment";

import { newComment } from "../program/comments";

import { UseProgramContext } from "../contexts/programContextProvider";
import { FC, useState } from "react";

import { useNotifier } from "react-headless-notifier";
interface Props {
 posts: any;
 setShowSignupPopup: React.Dispatch<React.SetStateAction<boolean>>;
 wallet: any;
 username: string;
}
export function DisplayPosts({
 posts,
 setShowSignupPopup,
 wallet,
 username,
}: Props) {
 const { userProgram, program, commentProgram, state, changeState } =
  UseProgramContext();

 const { notify } = useNotifier();

 if (!posts)
  return (
   <>
    <div></div>
   </>
  );

 return posts.map(
  (
   post: {
    getLikes: string;
    key: React.Key | null | undefined;
    publicKey: string;
   },
   index: number,
   { length }: any
  ) => {
   let wallett = wallet ? wallet.publicKey.toBase58() : undefined;

   async function newComment(commentContent: any, postPubkey: any) {
    return await newComment0(
     commentContent,
     postPubkey,
     commentProgram,
     setShowSignupPopup,
     notify,
     username,
     program,
     wallet
    );
   }
   async function getAllComments(postPubkey: any) {
    return await getAllComments0(postPubkey, commentProgram);
   }
   async function likePost0(postPubkey: any) {
    return await likePost(postPubkey, program, notify, wallet);
   }
   return (
    <>
     <Post
      getAllComments={getAllComments}
      newComment={newComment}
      walletPubkey={wallett}
      postLikes={post.getLikes}
      unlikePost={unlikePost}
      likePost={likePost0}
      key={post.key}
      pubKey={post.key}
      postPublicKey={post.publicKey}
      data={post}
     />
     {index + 1 !== length && <div className="divider"></div>}
    </>
   );
  }
 );
}
export async function newComment0(
 commentContent: any,
 postPubkey: any,
 commentProgram: any,
 setShowSignupPopup: any,
 notify: any,
 username: string,
 program: any,
 wallet: any
) {
 if (!username) {
  setShowSignupPopup(true);
  notify(
   <WarningAlert
    text="No account found please create one."
    dismiss={undefined}
   />
  );
 } else {
  // new comment
  let commentResult = await newComment({
   commentProgram,
   postPubkey: postPubkey,
   walletPubkey: wallet?.publicKey,
   username: username,
   content: commentContent,
  });
  notify(
   <InfoAlert
    text="Please also confirm the next transaction."
    dismiss={undefined}
   />
  );
  //  increase comment count on post
  await comment({
   wallet: wallet,
   program: program,
   postPubkey: postPubkey,
  });
  return commentResult;
 }
}

export async function likePost(
 postPubkey: any,
 program: any,
 notify: any,
 wallet: any
) {
 if (!wallet?.publicKey) {
  notify(
   <DangerAlert text="Please connect to a wallet." dismiss={undefined} />
  );
 } else {
  try {
   return await like({ wallet, program, postPubkey });
  } catch (e) {
   
  }
 }
}

export async function unlikePost(
 postPubkey: any,
 program: any,
 notify: any,
 wallet: any
) {
 if (!wallet?.publicKey) {
  notify(
   <DangerAlert text="Please connect to a wallet." dismiss={undefined} />
  );
 } else {
  
  try {
   return await unlike({ wallet, program, postPubkey });
  } catch (e) {
   
  }
 }
}
