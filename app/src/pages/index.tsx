/** @format */

import Head from "next/head";
import { useState } from "react";
import { NewPost } from "../components/new-post";
import { Post } from "../components/post/post";
import Layout from "../sections/Layout";

import { UseProgramContext } from "../contexts/programContextProvider";

export default function Home() {
 //   @ts-ignore
 const { username, publickeyString } = UseProgramContext();
 let posts0 = [
  { username, publickeyString, content: "hi", block: "solana-summber", date: "1 day ago" },
  { username, publickeyString, content: "hijhijhij", block: "ksjdasdjkdjs", date: "3 days ago" },
  {
   username,
   publickeyString,
   content: "jhdsajhd ajdkwsh",
   block: "csajkhsjkh asdkjhn",
   date: "1 min ago",
  },
  {
   username,
   publickeyString,
   content: "jhdsajhd ajdkwsh",
   block: "csajkhsjkh asdkjhn",
   date: "1 min ago",
  },
  { username, publickeyString, content: "hijhijhij", block: "ksjdasdjkdjs", date: "3 days ago" },
  {
   username,
   publickeyString,
   content: "jhdsajhd ajdkwsh",
   block: "csajkhsjkh asdkjhn",
   date: "1 min ago",
  },
  { username, publickeyString, content: "hijhijhij", block: "ksjdasdjkdjs", date: "3 days ago" },
  { username, publickeyString, content: "hi", block: "solana-summber", date: "1 day ago" },
 ];
//  for (let index = 0; index < 3; index++) {
//   posts0 = posts0.concat(posts0);
//  }
 const [posts, setPosts] = useState(posts0);
 function displayPosts() {
  return posts.map((p) => (
   // 2 pubkey man haya 1- bo user 2- bo post
   <Post
    tip={18000000}
    content={p.content}
    username={username}
    date={p.date}
    publickeyString={p.publickeyString}
    block={p.block}
   />
  ));
 }
 function post({ content, block }: { content: string; block: string }) {
  setPosts(posts.concat({ content, block, username, date: "1 day ago", publickeyString }));
 }
 return (
  <>
   <Head>
    <title>Social Block</title>
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <Layout active={0}>
    <main className="  bg-slate-900  w-1/3 flex justify-center flex-row">
     <div style={{ width: 733 }} className="flex mt-4 items-center flex-col space-y-2">
      <NewPost post={post} username={"aland"} />
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
