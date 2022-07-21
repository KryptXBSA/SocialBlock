/** @format */

import Head from "next/head";
import { ReactNode } from "react";

import { Sidebar } from "../components/sidebar";
const Layout = ({ children, active }: { children: ReactNode; active: number }) => {
 return (
  <>
   <Head>
    <link rel="icon" href="/favicon.ico" />
   </Head>
   {/* <div className="mr-52"> */}
   <Sidebar active={active}  />
   {/* </div> */}
   <div className="relative justify-center flex flex-row ">
    <div className=" invisible">
     <Trending />
    </div>
    {children}
    <Trending />
   </div>
  </>
 );
};

export default Layout;
function Trending() {
 return (
  <>
   <div className="pr-40 ml-12 bg-slate-900">
    trending
    <div className="max-w-sm  fixed bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
     <a href="#">
      <img
       className="rounded-t-lg"
       src="https://static.wixstatic.com/media/5c4681_86416decada249daa9442db5b884d2f7~mv2.jpg"
       alt=""
      />
     </a>
     <div className="p-5">
      <a href="#">
       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
       </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
       Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
       chronological order.
      </p>
      <a
       href="#"
       className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
       Read more
       <svg
        aria-hidden="true"
        className="ml-2 -mr-1 w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
         fill-rule="evenodd"
         d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
         clip-rule="evenodd"></path>
       </svg>
      </a>
     </div>
    </div>
   </div>
  </>
 );
}
