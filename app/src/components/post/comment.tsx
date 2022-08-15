/** @format */

import Link from "next/link";
import { useRef } from "react";

import { PublicKey } from "@solana/web3.js";
import { useNotifier } from "react-headless-notifier";
import { UseProgramContext } from "../../contexts/programContextProvider";
import { newComment } from "../../program/comments";
import { CheckWallet } from "../../utils/walletError";
import { DangerAlert } from "../alert";
interface Props {
 name: string;
 date: string;
 content: string;
 image:string
 authorPubkeyString: string;
}
export const Comment = ({ name, date, content,image, authorPubkeyString }: Props) => {
 return (
  <div>
   <div className="h-1 border-b-2 my-2 border-gray-700"></div>
   <div className="flex break-all flex-col">
    <div className=" mt-1 mx-5 flex justify-start items-center flex-row">
     <div className="pb- pr-2">
      <img
       className="w-10 h-10  rounded-full"
           src={image?image:'/img.png'}    
       
      />
     </div>
     <div className="flex break-all flex-col">
      <div>
       <span className=" text-xl ">{name}</span> <span>&nbsp;•&nbsp;</span>
       <span className="text-1xl"> {date}</span>
      </div>
      <Link href={`/users?pubkey=${authorPubkeyString}`}>
       <p
        style={{ marginTop: -7 }}
        className=" text-sm text-blue-500 hover:underline truncate  w-44">
        {authorPubkeyString}
       </p>
      </Link>
     </div>
    </div>
    <span className="ml-5 ">{content}</span>
   </div>
  </div>
 );
};
interface NewCommentProps {
 postPubkey: PublicKey;
 addComment:any
}

export const NewComment = ({ postPubkey,addComment }: NewCommentProps) => {
 let commentInputRef: any = useRef();

 const { notify } = useNotifier();
 let programContext = UseProgramContext()!;
 
 async function newComment0(e: { preventDefault: () => void }) {
  e.preventDefault();
  let walletError = await CheckWallet(programContext.getWallet, notify,programContext);
  if (walletError.error) {
  } else {
   let comment = commentInputRef.current.value;
   try {
    let result = await newComment({
     content: comment,
     commentProgram: programContext.commentProgram!,
     postPubkey,
     walletPubkey: programContext.getWallet?.publicKey!,
     username:programContext.state.user.username,
     image:programContext.state.user.image
    });
    commentInputRef.current.value=''
    addComment(result)
   } catch (e) {
    console.log(e);
    
notify(<DangerAlert text="An Error Occured comment..." dismiss={undefined} />);
    console.log("comment Erorr");
   }
  }
 }

 return (
  <form onSubmit={newComment0}>
   <div className="flex my-4 flex-row">
    <input
     required
     ref={commentInputRef}
     type="text"
     placeholder="Comment"
     className="input  grow "
    />
    <button className="btn w-32 ml-5  btn-square">Commment</button>
   </div>
  </form>
 );
};
