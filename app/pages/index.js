import { Sidebar, SidebarFixed } from "../components/sidebar";
import Layout from "../sections/Layout";
import { Post } from "../components/posts";
import { NewPost } from "../components/new-post";
import SignupModal from "../components/modal";
import { SuccessAlert, InfoAlert, DangerAlert, SpecialAlert, WarningAlert, DangerAlertWallet } from "../components/alert";
import React, { useRef, useEffect, useState } from "react";
import { useNotifier } from 'react-headless-notifier';
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { sendPost, like, unlike, comment } from '../program/posts.ts'
import { createUsername, getUsername, findUsernamePDA } from "../program/users.ts";
import { newComment, getAllComments } from "../program/comments.ts";
import * as anchor from "@project-serum/anchor";
import { UseProgramContext } from "../contexts/programContextProvider";
import { UseAlertContext } from "../contexts/alertsContextProvider";

const endpoint = "https://explorer-api.devnet.solana.com";

import { fetchPosts as fetchPosts0 } from "../utils/fetch-posts";
import { getWalletBalance } from "../utils/get-wallet-balance";

const connection = new anchor.web3.Connection(endpoint);

import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
export default function Home() {
  if (1 == 3) ff();
  const { notify } = useNotifier();

  const { alertState, changeAlertState, closeAlert } = UseAlertContext();
  const wallet = useAnchorWallet();
  const { userProgram, program, commentProgram, state, changeState } = UseProgramContext();
  const [posts, setPosts] = useState([])
  const [username, setUsername] = useState(state?.user?.username?.name)
  const [showSignupPopup, setShowSignupPopup] = useState(false)
  const [fetchedPosts, setFetchedPosts] = useState(false)
  const [searchedForUsername, setSearchedForUsername] = useState(false)
  const [didWelcomeNotify, setDidWelcomeNotify] = useState(false)

  async function fetchPosts() {
    if (!fetchedPosts) {
      fetchPosts0({ program, notify, fetchedPosts, setPosts, setFetchedPosts })
    }
    setFetchedPosts(true)
  }
  const [warnedBalance, setWarnedBalance] = useState(false)
  async function getWBalance(wallet) {
    // airdropToWallet()
    let balance = await getWalletBalance(connection, wallet)
    console.log(balance);
    if (balance == 0) {
      notify(
        <DangerAlertWallet />
      );
    }
    return balance
  }
  // airdrop not working
  const airdropToWallet = async () => {
    if (wallet) {
      // const signature = await connection.requestAirdrop(
      //   wallet.publicKey,
      //   1000000000
      // );
      const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: "recent",
        commitment: "processed",
      });
      // let tx = await provider.sendAndConfirm(tx, wallet.publicKey)
      // console.log(tx);
      // const tx = await connection.confirmTransaction(signature, confirmOptions);
      // let tx = await connection.requestAirdrop(wallet.publicKey, 10000000000)
      // return tx
      // const signature = await connection.requestAirdrop(wallet.publicKey, 1000000000);
      // await connection.confirmTransaction(signature);
      // (async () => {
      //   const connection = new Connection("https://explorer-api.devnet.solana.com", "confirmed");
      //   const myAddress = new PublicKey(wallet.publicKey);
      //   const signature = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL);
      //   await connection.confirmTransaction(signature);
      // })();
    }
  };

  useEffect(() => {
    if (posts.length == 0) {
      if (program) fetchPosts();
    }
    if (!wallet) {
      // if there is not wallet at all tell them to connect to a wallet after some time maybe?
      // changeAlertState({
      //   action: 'push', alert: {
      //     text: 'Connecting To Your Wallet...',
      //     type: 'info',
      //     for: 'walletConnect',
      //     id: 'connect'
      //   }
      // })
    }
    displayPosts()
    //if balance is 0 drop some sol
    if (wallet?.publicKey) {
      if (!warnedBalance) {
        getWBalance(wallet)
        setWarnedBalance(true)
      }
    }
    if (username) {
      if (!state.didWelcome) {
        notify(
          <SpecialAlert
            text={`Welcome Back ${username}`}
          />
        );
        changeState({ data: {}, action: 'welcome' })
      }
    }
    if (!username && wallet && !searchedForUsername) {
      let user = setUsername0(wallet.publicKey)
      setSearchedForUsername(true)
    }
  }, [program, wallet, username])

  async function setUsername0(pubKey) {
    let userStatsPDA = await findUsernamePDA({ userProgram, pubKey })
    let { user } = await getUsername({ userProgram, userStatsPDA })
    let username = user?.username?.name
    let balance = await getWalletBalance(connection, wallet)
    if (user.foundUser === false) {
      if (balance > 0) {
        setShowSignupPopup(true)
      }
    }
    if (username) {
      changeState({ data: user, action: 'username' })
      setUsername(username)
    }
    if (!user.foundUser) {
      if (balance > 0) {
        notify(
          <WarningAlert
            text='No account found please create one.'
          />
        );
      }
    }
    return user;
  }

  async function likePost(postPubkey) {
    if (!wallet?.publicKey) {
      notify(
        <DangerAlert
          text='Please connect to a wallet.'
        />
      );
      // setShowSignupPopup(true)
    } else {
      console.log(wallet);
      try {
        return await like({ wallet, program, postPubkey })
      } catch (e) {
        console.log(e);
      }
    }
  }
  async function unlikePost(postPubkey) {
    if (!wallet?.publicKey) {
      notify(
        <DangerAlert
          text='Please connect to a wallet.'
        />
      );
    } else {
      console.log(wallet);
      try {
        return await unlike({ wallet, program, postPubkey })
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function getAllComments0(postPubkey) {
    const authorFilter = (authorBase58PublicKey) => ({
      memcmp: {
        offset: 40, // Discriminator.
        bytes: authorBase58PublicKey,
      },
    });
    let filter = [authorFilter(postPubkey)]
    // console.log(await commentProgram.account.comment.all());
    let commentResult = await getAllComments({ program: commentProgram, filter: filter })
    return commentResult;
  }
  async function newComment0(commentContent, postPubkey) {
    if (!username) {
      setShowSignupPopup(true)
      notify(
        <WarningAlert
          text='No account found please create one.'
        />
      );
    } else {

      let commentResult = await newComment({ commentProgram, postPubkey: postPubkey, walletPubkey: wallet.publicKey, username: username, content: commentContent })
      notify(
        <InfoAlert
          text='Please also confirm the next transaction.'
        />
      );
      let commenta = await comment({ wallet: wallet, program: program, postPubkey: postPubkey })
      return commentResult;
    }
  }

  // async function testUsername(pubKey, username) {
  //   return await createUsername({ userProgram, pubKey, username })
  // }
  async function testPost(topic, content) {
    if (!username) setShowSignupPopup(true)
    console.log('sending post');
    let postResult
    if (username) {
      postResult = await sendPost({
        wallet,
        program,
        topic,
        content,
        username
      });
      let newArray = [postResult.post].concat(posts);
      setPosts(newArray);
      return postResult.tx
    }

  }
  // const [renderPosts, setRenderPosts] = useState(null)
  function displayPosts() {
    if (!posts) return <div></div>
    // if (posts && (!renderPosts)) {
    //   setRenderPosts(setRender())
    // }
    let test = setRender()
    return test
    function setRender() {
      return posts.map((post, index, { length }) => {
        let wallett = wallet ? wallet.publicKey.toBase58() : localStorage.getItem('wallet')
        return (<><Post getAllComments={getAllComments0} commentProgram={commentProgram} newComment={newComment0} walletPubkey={wallett} postLikes={post.getLikes} unlikePost={unlikePost} likePost={likePost} key={post.key}
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
  }
  async function signup(username) {
    let balance = await getWalletBalance(connection, wallet)
    if (balance == 0) {
      notify(
        <DangerAlertWallet />
      );
    } else {
      try {
        if (!wallet) {
          notify(
            <DangerAlert
              text='Please connect to a wallet.'
            />
          );
        } else {

          let usernamee = await createUsername({ userProgram, pubKey: wallet.publicKey, username })
          setUsername0(wallet.publicKey)
          return usernamee
        }

      } catch (e) {
        console.log(e);

      }
    }
  }
  function showSignupPopup0() {
    return <SignupModal showSignupPopup={setShowSignupPopup} signup={signup} />
  }
  return (
    <Layout>
      <main className="">
        {showSignupPopup && showSignupPopup0()}
        {/* <Alert /> */}
        <div className="flex  ">
          <div className=''>

            <Sidebar active='0' />
          </div>
          <div className=" mr-14 ml-56 flex grow  flex-col">
            <NewPost username={username} post={testPost} />
            <div className="divider"></div>
            {posts.length !== 0 && displayPosts()}

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

