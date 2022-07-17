import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
export const ProfileSidebar = ({active,router,hasSpace}) => {
  useEffect(() => {
  }, [router])
  function changeTab(tab) {
    setActive(tab)
  }

  return (

    <div className="flex  flex-col">
      {hasSpace && (<div className=' w-44 invisible ' >
        <Tabs changeTab={changeTab} activeTab='1' />
      </div>)}

      <HomeButton index='1' active={active} href="/" text="Home" />
      <SearchButton index='2' active={active} text="Search" />
      <ProfileButton index='0' active={active} href="/profile" text="Profile" />
      <TestButton index='3' active={active} href="/users" text="Users" />
    </div>
  )
}

export const SearchButton = ({ text, index, active }) => {
  const [clss, setClss] = useState("bg-transparent ")
  useEffect(() => {

    let show = index === active
    if (show) {
      setClss(" bg-gray-800  ")
    } else {
      setClss("bg-transparent ")
    }
  }, [active])

  return (
    <Link href="/search">
      <div className=" m-1">

        <button className={clss + "btn btn-lg justify-start flex-row w-44 border-opacity-0 gap-2"}>
          <svg xmlns="http://www.w3.org/2000/svg" className="rotate-90 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {text}
        </button>
      </div>

    </Link>

  )
}
export const TestButton = ({ text, href, active, index }) => {
  const [clss, setClss] = useState("bg-transparent")
  useEffect(() => {

    let show = index === active
    if (show) {
      setClss(" bg-gray-800  ")
    } else {
      setClss("bg-transparent ")
    }
  }, [active])
  return (
    <Link href={href}>
      <div className="  m-1">
        <button className={"btn btn-lg justify-start flex-row w-44  border-opacity-0 gap-2 " + clss}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          {text}
        </button>

      </div>
    </Link>
  )
}
export const ProfileButton = ({ text, href, active, index }) => {
  const [clss, setClss] = useState("bg-transparent")
  useEffect(() => {

    let show = index === active
    if (show) {
      setClss(" bg-gray-800  ")
    } else {
      setClss("bg-transparent ")
    }
  }, [active])
  return (
    <Link href={href}>
      <div className="  m-1">
        <button className={"btn btn-lg justify-start flex-row w-44  border-opacity-0 gap-2 " + clss}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><script xmlns=""/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          
          {text}
        </button>

      </div>
    </Link>
  )
}

export const HomeButton = ({ text, href, active, index }) => {
  const [clss, setClss] = useState("bg-transparent")
  useEffect(() => {

    let show = index === active
    if (show) {
      setClss(" bg-gray-800  ")
    } else {
      setClss("bg-transparent ")
    }
  }, [active])
  return (
    <Link href={href}>
      <div className="  m-1">
        <button className={"btn btn-lg justify-start flex-row w-44  border-opacity-0 gap-2 " + clss}>
        
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg>
          {text}

        </button>

      </div>
    </Link>
  )
}


export const Search = () => {
  return (
    <div className="flex  flex-row">
      <input type="text" placeholder="Search…" className="input rounded-r-none grow " />
      <button className="btn rounded-l-none btn-square">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    </div>
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
