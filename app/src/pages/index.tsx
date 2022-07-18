/** @format */

import Head from "next/head";
import { NewPost } from "../components/new-post";
import { Post } from "../components/post/post";
import Layout from "../sections/Layout";

let posts = [
 "fsffssfssff",
 "fsfsfsfs",
 "sffssffsfs",
 "fsffssfssff",
 "fsfsfsfs",
 "sffssffsfs",
 "fsffssfssff",
 "fsfsfsfs",
 "sffssffsfs",
 "fsfsfsfsfs",
];
for (let index = 0; index < 3; index++) {
 posts = posts.concat(posts);
}
export default function Home() {

 function displayPosts() {
  return posts.map((p) => <Post content={"hi"} username={"aland"} date={"1 day ago"} publickeyString={"H8X9LMrxbah3U4PjbN21dHip8Nr4puSbntK75DA4xqW8"}  block={'solana-summer'} />);
 }

 return (
  <>
   <Head>
    <title>Social Block</title>
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <Layout>
    <main className="  bg-slate-900  w-1/3 flex justify-center flex-row">
     <div
      style={{ width: 733 }}
      className="flex items-center flex-col space-y-2">
      <NewPost />
      {displayPosts()}
     </div>
    </main>
   </Layout>
  </>
 );
}


// async function fetchComments() {
//         setCommentsVisible(!commentsVisible)
//         let comments0 = await getAllComments(postPublicKey)
//         // comments0 = comments0.filter(c => c.postPublicKey == postPublicKey)
//         if (data.getComments > 0) {
//             let postComments0 = comments0.map((comment: { publicKey: Key | null | undefined; postPublicKey: any; content: any; key: any; authorDisplay: any; username: any; createdAgo: any; }) => {
//                 // let dateFormated = moment(post.date).fromNow()
//                 return (<><Comment key={comment.publicKey} postPubKey={comment.postPublicKey}
//                     content={comment.content} pubKey={comment.key}
//                     ownerPubkey={comment.authorDisplay} name={comment.username} date={comment.createdAgo} />
//                 </>
//                 )
//             })
//             setPostComments(postComments0)
//         }
//     }
