/** @format */

import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { NewPost } from "../components/new-post";
import { Post } from "../components/post/post";
import Layout from "../sections/Layout";

import moment from "moment";
import { ProgramContextInterface, UseProgramContext } from "../contexts/programContextProvider";
import { getAllPosts } from "../program/posts";

interface PostType {
 username: string;
 publickeyString: string;
 content: string;
 block: string;
 date: string;
}

export default function Home() {
 const programContext = UseProgramContext()!;

 const [posts, setPosts] = useState<PostType[]>([]);
 const [fetchedPosts, setFetchedPosts] = useState(false);
 useEffect(() => {
  if (programContext.postProgram) {
   if (!fetchedPosts) {
    fetchPosts();
    setFetchedPosts(true);
   }
  }
 }, [programContext]);

 function addPost(post: PostType) {
  let postss = [post].concat(posts);
  postss.sort(
   (a: any, b: any) =>
    parseInt(b.timestamp) - parseInt(a.timestamp)
  );
  setPosts(postss);
 }
 async function fetchPosts() {
  try {
   let posts: any = await getAllPosts({ program: programContext.postProgram! });
   posts.sort(
    (a: { timestamp: string }, b: { timestamp: string }) =>
     parseInt(b.timestamp) - parseInt(a.timestamp)
   );
   setPosts(posts);
   return posts;
  } catch (e) {
   console.log("posts fetch error", e);
  }
 }

 function displayPosts() {
  return posts.map((p: any) => (
   // 2 pubkey man haya 1- bo user 2- bo post
   <Post
    commentCount={p.comments}
    key={p.publicKey}
    tip={18000000}
    content={p.content}
    username={p.username}
    date={p.timestamp}
    likes={p.likes}
    publickeyString={p.authorDisplay}
    block={p.block}
    postPubkey={p.publicKey}
   />
  ));
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
      <NewPost addPost={addPost} />
      {displayPosts()}
      {posts.length < 7 && <div style={{ marginBottom: 999 }} className=""></div>}
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
