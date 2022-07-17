import Link from "next/link";
import { useRef } from "react";

export const BookmarkButton = ({ text }: any) => {
 return (
  <div className=" m-0">
   {/* <button class=" btn btn-sm bg-transparent border-opacity-0 gap-0  flex "> */}
   <div className="self-start place-content-start  btn btn-circle bg-transparent border-0 p-3 ">
    <svg
     xmlns="http://www.w3.org/2000/svg"
     className="h-6 w-6"
     fill="none"
     viewBox="0 0 24 24"
     stroke="currentColor"
     strokeWidth={2}>
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
     />
    </svg>
   </div>
   {text}
  </div>
 );
};


// export const LikeButton = ({ text, likePost, unlikePost, postPubkey, postLikes }:any) => {
//     const wallet = useAnchorWallet();
//     const [didLike, setDidLike] = useState(false)

//     const [likedPost, setLikedPost] = useState(false)
//     function checkPostLikes(walletPubkey: string | null, postLikes: any[]) {
//         postLikes.forEach((p: { toBase58: () => any; }) => {
//             if (walletPubkey === p.toBase58()) {
//                 setDidLike(true);
//                 setLikedPost(true)
//             } else {
//                 setDidLike(false)
//                 setLikedPost(false)
//             }
//         });
//     }

//     useEffect(() => {
//         let wallet0 = wallet ? wallet.publicKey.toBase58() : localStorage.getItem('waallet')
//         checkPostLikes(wallet0, postLikes)
//     }, [wallet])

//     const [likeCount, setLikeCount] = useState(text)
//     async function likePost0() {
//         let response = ''
//         if (likedPost) response = await unlikePost(postPubkey);
//         else response = await likePost(postPubkey);
//         if (response === "liked") {
//             setLikedPost(true)
//             setLikeCount(likeCount + 1)
//         } else if (response === 'unliked') {
//             setLikedPost(false)
//             setLikeCount(likeCount - 1)
//         }
//     }

//     const [notLikedIcon, setNotLikedIcon] = useState(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//     </svg>)

//     const [likedIcon, setLikedIcon] = useState(<svg xmlns="http://www.w3.org/2000/svg" className="h-5 fill-red-600 w-5" viewBox="0 0 20 20" fill="currentColor">
//         <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//     </svg>)

//     function didLikePost() {
//         return (likedPost ? <>{likedIcon}<span className="font-semibold text-slate-300">{likeCount}</span></>
//             : <>{notLikedIcon}<span className="font-semibold text-slate-300">{likeCount}</span></>);
//     }
//     return (
//         <button onClick={likePost0} className="btn bg-transparent m-1 w-32 border-opacity-0 gap-2 ">
//             {didLikePost()}
//         </button>
//     )
// }

export const ShareButton = ({ text }: any) => {
 return (
  <button className="btn hover:bg-slate-800 bg-transparent m-1 w-32 border-opacity-0 gap-2 ">
   <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}>
    <path
     strokeLinecap="round"
     strokeLinejoin="round"
     d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
   </svg>
   <span className="font-semibold text-slate-300">{text}</span>
  </button>
 );
};
export const CommentButton = ({ text, setCommentsVisible }: any) => {
 return (
  <button
   onClick={setCommentsVisible}
   className="btn bg-transparent m-1 w-32 border-opacity-0 gap-2 ">
   <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}>
    <path
     strokeLinecap="round"
     strokeLinejoin="round"
     d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
    />
   </svg>
   <span className="font-semibold text-slate-300">{text}</span>
  </button>
 );
};
export const NewComment = ({ newComment, postPubKey }: any) => {
 let commentInputRef: any = useRef();
 async function newComment0(e: { preventDefault: () => void }) {
  e.preventDefault();
  let comment = commentInputRef.current.value;
  let result = await newComment(comment, postPubKey);
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
