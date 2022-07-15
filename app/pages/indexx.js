import { Sidebar, SidebarFixed } from "../components/sidebar";
import Layout from "../sections/Layout";
import { Divider } from "../utils/divider";
import { Post } from "../components/postss";
import { NewPost } from "../components/new-post";
import { useRef, useEffect, useState } from "react";
import { postMockup } from "../mockup/post-mockup";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useProgram } from '../program/useProgram.ts'
import { getAllPosts, sendPost, like } from '../program/posts.ts'
import * as anchor from "@project-serum/anchor";

const endpoint = "https://explorer-api.devnet.solana.com";

const connection = new anchor.web3.Connection(endpoint);
export default function Home() {
  const wallet = useAnchorWallet();
  const { program } = useProgram({ connection, wallet });
  const [posts, setPosts] = useState([])

  async function fetchPosts() {
    let posts = []
    if (program) {
      posts = await getAllPosts({ program: program, filter: [] });
    }
    posts = posts.sort(function (a, b) {
      return b.getTimestamp - a.getTimestamp
    });
    setPosts(posts)
  }

  useEffect(() => {
    if (wallet) localStorage.setItem("wallet", wallet?.publicKey.toBase58())
    fetchPosts()
  }, [program, wallet])
  async function likePost(postPubkey) {
    return await like({ wallet, program, postPubkey })
  }
  async function testPost(topic, content) {
    return await sendPost({
      wallet,
      program,
      topic,
      content,
    });
    try {

    } catch (error) {
      console.log('got error');
      console.log(error);
    }

  }
  function checkPostLikes(walletPubkey, postLikes) {
    postLikes.forEach(p => {
      if (walletPubkey === p.toBase58()) return true;
      return false
    });
  }
  function displayPosts() {
    if (!posts) return <div></div>
    return posts.map((post, index, { length }) => {
      let wallet = wallet? wallet.publicKey.toBase58() : localStorage.getItem('wallet')
      let didLike = checkPostLikes(wallet, post.getLikes)
      return (<><Post didLike={didLike} likePost={likePost} key={post.key}
        pubKey={post.key}
        data={post}
        // comments={account.comments} tag={account.topic} likes={account.likes} shares={account.shares}

        //   content={account.content} pubKey={publicKey.toBase58()}
        //   ownerPubkey={account.author.toBase58()} name={account.username} date={account.timestamp} 
        className="flex flex-row" />

        {index + 1 !== length &&
          <div className="divider"></div>
        }


      </>
      )
    })
  }


  return (
    <Layout>
      {/* Hero Section  */}
      <main className="flex-grow container sm:px-6">
        <button className="" onClick={async () => await testPost('test     post', "this is a test post content")} >logg</button>
        {/* top isit !!!!!! Headlines */}
        {/* CTA */}

        <div className="flex   justify-start flex-row">
          <div className='invisible'>
            <Sidebar active='1' hasSpace={false} />
          </div>
          {/* <SidebarFixed active='1' hasSpace={false} /> */}
          <div className=" mr-14 ml-14 flex grow  flex-col">
            <NewPost post={testPost} />
            {/* <div className="  " ></div> */}
            <div className="divider"></div>
            {posts && displayPosts()}


            {/* <Post name="aland" date="4 hours ago" className="flex flex-row" />
            <Divider paddingY='6' />
            <Post name="kala" date="8 hours ago" className="flex flex-row" />
            <Divider paddingY='6' />
            <Post name="aland" date="4 hours ago" className="flex flex-row" />
            <Divider paddingY='6' />
            <Post name="aland" date="4 hours ago" className="flex flex-row" />
            <Divider paddingY='6' />
            <Post name="aland" date="4 hours ago" className="flex flex-row" />
            <Post name="aland" date="4 hours ago" className="flex flex-row" />
            <Post name="aland" date="4 hours ago" className="flex flex-row" />
            <Post name="aland" date="4 hours ago" className="flex flex-row" /> */}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const Tabs = () => {
  return (
    <div class="tabs justify-center">
      <a class="tab w-32 tab-lg tab-bordered">Posts</a>
      <a class="tab w-32 tab-lg tab-bordered tab-active">Comments</a>
      <a class="tab w-32 tab-lg tab-bordered">Bookmarks</a>
    </div>
  )
}


export const ActionButton = ({ text }) => {
  return (
    <button class="btn bg-transparent m-1 w-32 border-opacity-0 gap-2 ">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      <span className="font-semibold text-slate-300" >{text}</span>
    </button>
  )
}
export const Search = () => {
  return (
    <div className="flex  flex-row">
      <textarea cols='4' type="text" placeholder="Search…" className="input rounded-r-none grow " />
      <button className="btn rounded-l-none btn-square">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    </div>
  )
}
export const SearchButton = ({ text }) => {

  return (
    <div className=" m-1">
      <button class="btn btn-lg bg-transparent border-opacity-0 gap-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        {text}
      </button>
    </div>
  )
}

