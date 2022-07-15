import { ProfileSidebar } from "../components/profile-sidebar";
import Link from 'next/link'
import Layout from "../sections/Layout";
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';
import { Sidebar } from "../components/sidebar";
import { createUsername, getUsername, findUsernamePDA } from "../program/users.ts";
import { getAllPosts, sendPost, like, unlike, comment } from '../program/posts.ts'
import { UseProgramContext } from "../contexts/programContextProvider";
import { Post, Commentt } from "../components/posts";
import { getAllComments } from '../program/comments.ts';

import { useNotifier } from 'react-headless-notifier';
import { SuccessAlert, InfoAlert, DangerAlert, SpecialAlert, WarningAlert } from "../components/alert";

export default function Home() {
  const { notify } = useNotifier();
  const { state, program, commentProgram, getWallet, userProgram, changeState } = UseProgramContext();
  const [username, setUsername] = useState(state.username)
  const router = useRouter()

  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [activeTab, setActiveTab] = useState("0")
  let searchInputRef = useRef("")
  const [searchContent, setSearchContent] = useState('')
  async function fetchPosts() {
    const authorFilter = (authorBase58PublicKey) => ({
      memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
      },
    });
    let filter = [authorFilter(getWallet.publicKey.toBase58())]
    let posts = []
    if (program) {
      posts = await getAllPosts({ program: program, filter: filter });
    }
    posts = posts.sort(function (a, b) {
      return b.getTimestamp - a.getTimestamp
    });
    setPosts(posts)
  } async function getUsername0(pubKey) {
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
  const [alreadyFetched, setAlreadyFetched] = useState(false)
  useEffect(() => {
    if (program && router?.query?.pubkey && !alreadyFetched) {
      setSearchContent(router?.query?.pubkey)
      getPosts(router?.query?.pubkey)
      getAllComments0(router?.query?.pubkey)
      setAlreadyFetched(true)
    }
    setContent()
    if (!username) {
      if (getWallet) {
        let username = getUsername0(getWallet.publicKey)
      }
    }
  }, [router, program, getWallet, comments, username, posts, activeTab])
  function changeTab(tab) {
    setActiveTab(tab)
  } async function likePost(postPubkey) {
    if (!getWallet?.publicKey) {
      notify(
        <DangerAlert
          text='Please connect to a wallet.'
        />
      );
      // setShowSignupPopup(true)
    } else {
      console.log(getWallet);
      try {
        return await like({ wallet: getWallet, program, postPubkey })
      } catch (e) {

        console.log(e);
      }
    }
  }
  async function unlikePost(postPubkey) {
    if (!getWallet?.publicKey) {
      notify(
        <DangerAlert
          text='Please connect to a wallet.'
        />
      );
      // setShowSignupPopup(true)
    } else {
      return await unlike({ wallet: getWallet, program, postPubkey })
    }
  }
  async function newComment0(commentContent, postPubkey) {
    let commentResult = await newComment({ commentProgram, postPubkey: postPubkey, walletPubkey: getWallet.publicKey, username: username, content: commentContent })
    let commenta = await comment({ wallet: getWallet, program: program, postPubkey: postPubkey })
    return commentResult;
  }
  const [tabContent, setTabContent] = useState("")
  function setContent(tab) {
    tab = tab ? tab : activeTab
    let content = ''
    if (tab === "2") {
      content = (
        <>
          {renderComments()}
        </>
      )
    } else if (tab === "0") {
      content = (<> {renderPosts()}
      </>
      )
    }
    setTabContent(content);
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
  async function getAllComments0(pubkey) {
    let searchValue = searchInputRef?.current?.value
    // queryValue better variable name :/
    let value = searchValue ? searchValue : pubkey
    console.log(pubkey);
    console.log('value');
    const authorFilter = (authorBase58PublicKey) => ({
      memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
      },
    });
    let filter = [authorFilter(value)]
    // console.log(await commentProgram.account.comment.all());
    let commentResult = []
    try {
      commentResult = await getAllComments({ program: commentProgram, filter: filter })
    } catch (e) {
      console.log(e);
      // notify(
      //           <SpecialAlert
      //             text={`Welcome Back ${username}`}
      //           />
      //         );
    }
    console.log(commentResult);
    console.log('comments');
    commentResult = commentResult.sort(function (a, b) {
      return b.getTimestamp - a.getTimestamp
    });
    setComments(commentResult)
    return commentResult;
  } function searchOnClick(e) {
    e.preventDefault()
    // getUser()
    if (searchInputRef.current.value) {
      getPosts()
      getAllComments0()
      setContent()
    }
  }
  async function getPosts(pubkey) {
    let searchValue = searchInputRef?.current?.value
    let value = searchValue ? searchValue : pubkey
    const authorFilter = (authorBase58PublicKey) => ({
      memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
      },
    });
    let filter = [authorFilter(value)]
    let posts = []
    if (program) {
      try {
        posts = await getAllPosts({ program: program, filter: filter });
      } catch (e) {
        console.log(e);
        // notify(
        //           <SpecialAlert
        //             text={`Welcome Back ${username}`}
        //           />
        //         );
      }
    }
    posts = posts.sort(function (a, b) {
      return b.getTimestamp - a.getTimestamp
    });
    setPosts(posts)
  }
  function renderComments() {
    return comments.map((post, index, { length }) => {
      let wallet = getWallet ? getWallet.publicKey.toBase58() : localStorage.getItem('wallet')
      return (<><Commentt key={post.key}

        data={post}
        className="flex flex-row" />
        {index + 1 !== length &&
          <div className="divider"></div>
        }
      </>
      )
    });


  } function renderPosts() {
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
    });


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
            {/* <ProfileSidebar active='0' hasSpace={false} router={router} /> */}
            <Sidebar active='2' router={router} />
            <div className=" md:ml-64 mr-10 ml-52 flex grow  flex-col">
              <Search searchInputRef={searchInputRef} clickSearch={searchOnClick} />

              {/* <Search /> */}
              <Tabs changeTab={changeTab} activeTab={activeTab} />
              {posts.length !== 0 && tabContent}

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

          </div>
          <div className="flex  justify-start grow flex-col" >
            {/* ama newan nawakaw follower a */}
            <div className="flex justify-start  items-center flex-row" >
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> */}
              <span className=" text-2xl " >{name}</span>
              <span className="ml-auto">
                <MoreButton />
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
export const TestPost = ({ name, date, address, content, tags }) => {
  return (
    <div className="  pl-5 border-b-2 border-gray-700 grow  ">
      <div className="flex  justify-start  mt-3  flex-col" >
        {/* margin y nabe yakam dana ^^^^^^^^^^^^^ */}
        <div className="flex justify-start items-center flex-row" >

          <span className=" text-2xl " >{name}</span> <span>&nbsp;•&nbsp;</span>

          <span className="text-1xl" >  {date}</span>
          <span className="ml-auto">

            <MoreButton />
          </span>
        </div>
        <p style={{ marginTop: -7 }} className=" text-sm text-gray-500 truncate w-44" >4216NRJydFjMVDd4Pv3Zjc5M3zSdb3yix6K4Akm6oXoL</p>
      </div>
      <p>iugiugugigggg9gt9gt9t9gtiugggggggggggg</p>
      <p>iugiugugigggg9gt9gt9t9gtiugggggggggggg</p>
      <p>iugiugugigggg9gt9gt9t9gtiugggggggggggg</p>
      <p>iugiugugigggg9gt9gt9t9gtiugggggggggggg</p>
      <span className="flex mt-3 text-violet-500">#test #ww11</span>
      <div className="flex  flex-row">
        <ActionButton text="35" />
        <ActionButton text="44" />
        <ActionButton text="77" />
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
    <form onSubmit={clickSearch}>
      <div className="flex  flex-row">
        <input required ref={searchInputRef} type="text" placeholder="Public Key" className=" border-none rounded-lg bg-gray-100 dark:bg-gray-800 rounded-r-none grow " />
        <button onClick={clickSearch} className="btn rounded-l-none btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
    </form>
  )
}
export const Tabs = ({ activeTab, changeTab }) => {
  return (
    <div className="tabs pt-2 justify-center">
      <Tab text='Posts' index='0' activeTab={activeTab} changeTab={changeTab} />
      <Tab text='Comments' index='2' activeTab={activeTab} changeTab={changeTab} />
      <div class="tooltip" data-tip="Coming Soon">
        <Tab text='Likes' index='1' activeTab={activeTab} changeTab={changeTab} /></div>
      <div class="tooltip" data-tip="Coming Soon">
        <Tab text='Shares' index='3' activeTab={activeTab} changeTab={changeTab} /></div>
      <div class="tooltip" data-tip="Coming Soon">
        <Tab text='Bookmarks' index='4' activeTab={activeTab} changeTab={changeTab} /></div>
    </div>
  )
}
export const Tab = ({ text, index, activeTab, changeTab }) => {
  const [clss, setClss] = useState("tab-active")
  useEffect(() => {

    let show = index === activeTab
    if (show) {
      setClss("  tab-active")
    } else {
      setClss("")
    }
  }, [activeTab])
  return (
    <a onClick={() => changeTab(index)} className={"tab hover:bg-slate-700 rounded-md rounded-b-none transition duration-300  dark:text-gray-500 w-32 tab-lg tab-bordered " + clss}>{text}</a>
  )
}

export const MoreButton = ({ text }) => {
  return (
    <div className=" m-0">
      <div className="self-start place-content-start   btn-circle bg-transparent border-0 p-3 ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </div>
      {text}
    </div>
  )
}