import Link from "next/link";

export const Comment = ({ name, date, content, ownerPubkey }: any) => {
 return (
  <div>
   <div className="h-1 border-b-2 my-2 border-gray-700"></div>
   <div className="flex break-all flex-col">
    <div className=" mt-1 mx-5 flex justify-start items-center flex-row">
     {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> */}
     <div className="flex break-all flex-col">
      <div>
       <span className=" text-xl ">{name}</span> <span>&nbsp;•&nbsp;</span>
       <span className="text-1xl"> {date}</span>
      </div>
      <Link href={`/users?pubkey=${ownerPubkey}`}>
       <p
        style={{ marginTop: -7 }}
        className=" text-sm text-blue-500 hover:underline truncate  w-44">
        {ownerPubkey}
       </p>
      </Link>
     </div>
    </div>
    <span className="ml-5 ">{content}</span>
   </div>
  </div>
 );
};