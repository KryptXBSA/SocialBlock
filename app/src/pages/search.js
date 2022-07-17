import Link from 'next/link'
import Layout from "../sections/Layout";
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';
import { Sidebar } from "../components/sidebar";
import { createUsername, getUsername, findUsernamePDA } from "../program/users.ts";
import { getAllPosts, sendPost, like, unlike, comment } from '../program/posts.ts'
import { UseProgramContext } from "../contexts/programContextProvider";
import { Post } from "../components/posts";
import { Connection, PublicKey } from "@solana/web3.js";
export default function Home() {
  const { state, program, commentProgram, getWallet, userProgram, changeState } = UseProgramContext();
  const [username, setUsername] = useState(state.username)
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState("0")
  const [tabContent, setTabContent] = useState("")
  const [userData, setUserData] = useState(null)
  let searchInputRef = useRef("")
  function changeTab(tab) {
    setActiveTab(tab)
  }

  async function fetchPosts() {
    const authorFilter = (authorBase58PublicKey) => ({
      memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
      },
    });
    let filter = [authorFilter(searchInputRef.current.value)]
    let posts = []
    if (program) {
      posts = await getAllPosts({ program: program, filter: filter });
    }
    posts = posts.sort(function (a, b) {
      return b.getTimestamp - a.getTimestamp
    });
    setPosts(posts)
  }
  async function getUsername0(pubKey) {
    let userStatsPDA = await findUsernamePDA({ userProgram, pubKey })
    let result = await getUsername({ userProgram, userStatsPDA })
    if (!result) {
      setShowSignupPopup(true)
    }
    if (result) {

      changeState(result.name)
      setUsername(result.name)
      return result.name;
    }
    // setUsername(null)
    return 'Not registered'
  }
  useEffect(() => {
    setContent()
    if (posts.length == 0) {
      if (getWallet) {
        
        fetchPosts()
      }
    }
    if (!username) {
      if (getWallet) {
        let username = getUsername0(getWallet.publicKey)
      }

    }
  }, [router, program, getWallet, username,userData])
  async function likePost(postPubkey) {
    return await like({ wallet: getWallet, program, postPubkey })
  }
  async function unlikePost(postPubkey) {
    return await unlike({ wallet: getWallet, program, postPubkey })
  }
  async function newComment0(commentContent, postPubkey) {
    let commentResult = await newComment({ commentProgram, postPubkey: postPubkey, walletPubkey: getWallet.publicKey, username: username, content: commentContent })
    let commenta = await comment({ wallet: getWallet, program: program, postPubkey: postPubkey })
    return commentResult;
  }
  async function getAllComments0(postPubkey) {
    const authorFilter = (authorBase58PublicKey) => ({
      memcmp: {
        offset: 40, // Discriminator.
        bytes: authorBase58PublicKey,
      },
    });
    let filter = [authorFilter(postPubkey)]
    // 
    let commentResult = await getAllComments({ program: commentProgram, filter: filter })
    return commentResult;
  }
  async function getUser() {
    const userPubkey = new PublicKey(searchInputRef.current.value);
    let userStatsPDA = await findUsernamePDA({ userProgram, pubKey: userPubkey })
    let result = await getUsername({ userProgram, userStatsPDA })
    // if (!result) {
    //   setShowSignupPopup(true)
    // }
    if (result) {

      setUserData(result)
      return result.name;
    }
    // setUsername(null)
    return 'Not registered'
  }
  function renderPosts() {
    return posts.map((post, index, { length }) => {
      let wallet = getWallet ? getWallet.publicKey.toBase58() : localStorage.getItem('wallet')
      return (<><Post getAllComments={getAllComments0} commentProgram={commentProgram} newComment={newComment0} walletPubkey={wallet} postLikes={post.getLikes} unlikePost={unlikePost} likePost={likePost} key={post.key}
        pubKey={post.key}
        postPublicKey={post.publicKey}
        data={post}
        className="flex flex-row" />
        {index + 1 !== length &&
          <div className="divider"></div>
        }
      </>
      )
    })
  }
  function setContent(tab) {
    
    tab = tab ? tab : 'users'
    
    tab = tab ? tab : 'users'
    let content = ''
    if (tab === "topics") {
      content = (
        <>
          <Post name="aland" date="4 hours ago" className="flex flex-row" />
          <div className="divider"></div>
          <Post name="kala" date="8 hours ago" className="flex flex-row" />
          <div className="divider"></div>
          <Post name="aland" date="4 hours ago" className="flex flex-row" />
        </>
      )
    } else if (tab === "users") {
      content = (<>{userData &&
        <TestUser name={userData.name} address={searchInputRef.current.value} following={'22'} followers={21} date="4 hours ago" className="flex flex-row" />
      }
      </>
      )
    }
    setTabContent(content);
    
  }
  function searchOnClick(e) {
    e.preventDefault()
    getUser()

      setContent()
  }
  if (!router.asPath) {
    return null
  } else {
    return (
      <Layout>
        {/* Hero Section  */}
        {/* <Search /> */}
        {/* <Tabs changeTab={changeTab} activeTab={activeTab} /> */}
        <main className="flex-grow  px-4 sm:px-6">
          {/* top isit !!!!!! Headlines */}
          {/* CTA */}
          <div className="flex   justify-start flex-row">
            <Sidebar active='1' hasSpace={false} router={router} />
            <div className=" mr-10 ml-52 flex grow  flex-col">

              <Search searchInputRef={searchInputRef} clickSearch={searchOnClick} />
              <Tabs changeTab={changeTab} setContent={setContent} activeTab={activeTab} />
              {tabContent}

            </div>
          </div>
        </main>
      </Layout>
    )
  }
}

export const TestUser = ({ name, followers, following, date, address, content, tags }) => {
  return (
    <div className="" >
      <div className="  pl-5 border-b-2 border-gray-700 grow  ">
        <div className="flex justify-start align-top  items-start flex-row" >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className=" mt-0 h-12  w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex  justify-start grow flex-col" >
            {/* ama newan nawakaw follower a */}
            <div className="flex justify-start  items-center flex-row" >
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> */}
              <span className=" text-2xl " >{name}</span>
              <span className="ml-auto">
              </span>
            </div>
            <div className="flex justify-start  items-center flex-row" >
              {/* <div className="w-10"></div> */}
              <p style={{ marginTop: -7 }} className=" text-sm text-gray-500  w-44" >{address}</p>
            </div>
            <div className="flex my-2 flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>&nbsp;
              <span>Joined {date}</span>
            </div>
            <div className="flex my-2 flex-row">
              <span>{followers} Followers</span><span> &nbsp;&nbsp;&nbsp;    {following} Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ActionButton = ({ text }) => {
  return (
    <div className=" m-1">
      <button className="btn bg-transparent border-opacity-0 gap-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        <span className="font-semibold text-slate-300" >{text}</span>
      </button>
    </div>
  )
}
export const SearchButton = ({ text }) => {

  return (
    <div className=" m-1">
      <button className="btn btn-lg bg-transparent border-opacity-0 gap-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        {text}
      </button>
    </div>
  )
}
export const TestButton = ({ text }) => {

  return (
    <div className=" m-1">
      <button className="btn btn-lg bg-transparent border-opacity-0 gap-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        {text}
      </button>
    </div>
  )
}
export const Search = ({ searchInputRef, clickSearch }) => {
  return (
    <div className="flex  flex-row">
      <input ref={searchInputRef} type="text" placeholder="Search…" className="input rounded-r-none grow " />
      <button onClick={clickSearch} className="btn rounded-l-none btn-square">

        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    </div>
  )
}
export const Tabs = ({ activeTab, changeTab, setContent }) => {
  if (activeTab === '0') {
    return (
      <div className="tabs justify-center">
        {/* <a className="tab w-32 tab-lg tab-bordered">Posts</a>  */}
        {/* <a className="tab w-32 tab-lg tab-bordered tab-active">Comments</a>  */}
        <a onClick={() => { changeTab("0"); setContent('users') }} className="tab w-44 tab-lg tab-active tab-bordered ">Users</a>
        <a onClick={() => { changeTab("1"); setContent('topics') }} className="tab w-44 tab-lg  tab-bordered">Topics</a>
      </div>
    )
  }
  if (activeTab === '1') {
    return (
      <div className="tabs justify-center">
        {/* <a className="tab w-32 tab-lg tab-bordered">Posts</a>  */}
        {/* <a className="tab w-32 tab-lg tab-bordered tab-active">Comments</a>  */}
        <a onClick={() => { changeTab("0"); setContent('users') }} className="tab w-44 tab-lg tab-bordered ">Users</a>
        <a onClick={() => { changeTab("1"); setContent('topics') }} className="tab w-44 tab-lg tab-active tab-bordered">Topics</a>
      </div>
    )
  }
}

