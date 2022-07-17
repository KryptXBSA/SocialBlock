import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

let marketPlaceIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="rotate-90 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>)

let searchIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="rotate-90 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>)
let profileIcon = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><script xmlns="" /><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>)
let homeIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg>)
export const Sidebar = ({ active, router, hasSpace }) => {
  useEffect(() => {
  }, [router])
  function changeTab(tab) {
    setActive(tab)
  }

  return (

    <div className="flex bg-slate-900 sm:ml-40 lg:ml-44 flex-col">
      {/* {hasSpace && (<div className=' w-44 invisible ' >
        <Search />
        <Tabs changeTab={changeTab} activeTab='1' />
      </div>)} */}

      <Button icon={homeIcon} index='0' active={active} href="/" text="Home" />
      {/* <Button icon={searchIcon} index='1' active={active} href="/search" text="Search" /> */}
      <Button icon={profileIcon} index='2' active={active} href="/users" text="Users" />
      <div class="tooltip" data-tip="Coming Soon">
        <Button icon={marketPlaceIcon} index='3' active={active} href="#" text="Game" /></div>
      <div class="tooltip" data-tip="Coming Soon">
      <Button icon={marketPlaceIcon} index='4' active={active} href="#" text="Marketplace" /></div>
      <WalletMultiButton className=' ml-1 hover:bg-violet-600 py-3 btn1 px-5 inline-flex items-center  w-48  ' />
      {/* {/* <button className="" onClick={() =>  */}
    </div>
  )
}

export const Button = ({ href, text, index, active, icon }) => {
  const [clss, setClss] = useState("bg-transparent ")
  useEffect(() => {

    let show = index === active
    if (show) {
      setClss(" bg-slate-600 dark:bg-gray-800  ")
    } else {
      setClss("bg-slate-400 dark:bg-transparent ")
    }
  }, [active])

  return (
    <Link href={href}>
      <div className=" m-1">
        <button class={clss + "px-5 py-3 inline-flex items-center  bg-transparent w-48 btn1"}>
          <div className='mr-3' >{icon}</div>
          {text}
        </button>
        {/* <button className={clss + "btn btn-lg justify-start flex-row w-52 border-opacity-0 gap-2"}>
          {icon}
          {text}
        </button> */}
      </div>

    </Link>

  )
}

export const Tabs = ({ activeTab, changeTab }) => {
  if (activeTab === '0') {
    return (
      <div className="tabs justify-center">
        {/* <a className="tab w-32 tab-lg tab-bordered">Posts</a>  */}
        {/* <a className="tab w-32 tab-lg tab-bordered tab-active">Comments</a>  */}
        <a onClick={() => changeTab("0")} className="tab w-44 tab-lg tab-active tab-bordered ">Users</a>
      </div>
    )
  }
  if (activeTab === '1') {
    return (
      <div className="tabs justify-center">
        {/* <a className="tab w-32 tab-lg tab-bordered">Posts</a>  */}
        {/* <a className="tab w-32 tab-lg tab-bordered tab-active">Comments</a>  */}
        <a onClick={() => changeTab("0")} className="tab w-44 tab-lg tab-bordered ">Users</a>
      </div>
    )
  }
}
