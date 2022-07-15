import { Divider } from "../utils/divider"
import { useState } from 'react';
import { postComment } from "../mockup/post-mockup";
import moment from "moment";
export const Post = ({ data, pubKey, likePost, didLike }) => {

    // { content, likes, shares, comments, pubKey, ownerPubkey, name, date, tags, }
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [postComments, setPostComments] = useState('')

    async function fetchComments(pubkey) {
        setCommentsVisible(!commentsVisible)
        if (data.getComments > 0) {
            let postComments0 = postComment.map(post => {
                let dateFormated = moment(post.date).fromNow()
                return (<><Comment key={post.pubKey} postPubKey={post.postPubkey}
                    content={post.content} pubKey={post.pubKey}
                    ownerPubkey={post.ownerPubkey} name={post.name} date={dateFormated} className="flex flex-row" />
                </>
                )
            })
            setPostComments(postComments0)
        }
    }

    // let dateFormated = moment(date).fromNow()
    return (
        <div className="  pl-5 break-all  border-gray-700 grow  ">
            <div className="flex  justify-start    flex-col" >
                {/* margin y nabe yakam dana ^^^^^^^^^^^^^ */}
                <div className="flex justify-start items-center flex-row">
                    <div className="flex justify-start   items-center flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className=" text-2xl " >{data.getUsername}</span> <span>&nbsp;•&nbsp;</span>

                        <span className="text-1xl" >  {data.createdAgo}</span>
                        <span className="ml-auto">

                        </span>
                    </div>
                    <div className="justify-self-end  ml-auto">
                        <MoreButton />
                    </div>
                </div>
                <p style={{ marginTop: -7 }} className=" text-sm text-gray-500 truncate w-44" >{data.authorDisplay}</p>
                <p className=" w-fit break-words" >{data.content}</p>
                <span className="flex mt-3 text-violet-500">{data.topic}</span>
                <div className="flex   justify-around items-stretch flex-row">
                    <LikeButton didLike={didLike} postPubkey={pubKey} likePost={likePost} text={data.getLikesCount} />
                    <CommentButton setCommentsVisible={() => fetchComments(pubKey)} text={data.comments} />
                    <ShareButton text={data.getShares} />
                </div>
                {commentsVisible && (<> {postComments}
                    {!postComments &&
                        <div className="divider"></div>
                    }
                    <NewComment /></>)}
            </div>
        </div>
    )
}
export const NewComment = ({ name, date }) => {
    return (
        <div className="flex my-4 flex-row">
            <input type="text" placeholder="Comment" className="input rounded-r-none grow " />
            <button className="btn w-32 rounded-l-none btn-square">
                Commment
            </button>
        </div>

    )
}

export const Comment = ({ name, date }) => {
    return (
        <div>
            <div className="divider"></div>
            <div className="flex break-all flex-col">
                <div className=" mt-1 mx-5 flex justify-start items-center flex-row" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className=" text-xl " >{name}</span> <span>&nbsp;•&nbsp;</span>

                    <span className="text-1xl" >  {date}</span>
                    <span className="ml-auto">

                    </span>
                </div>
                <span className="ml-12">cclassName="ml-12className="ml-12className="ml-12className="ml-12lassName="ml-12"</span>
            </div>
        </div>


    )
}
export const LikeButton = ({ text, likePost, postPubkey, didLike }) => {
    console.log(didLike);
    console.log(didLike);
    const [likedPost, setLikedPost] = useState(didLike)
    const [likeCount, setLikeCount] = useState(text)
    async function likePost0() {
        let like = await likePost(postPubkey)
        if (like == "success") {
            setLikedPost(true)
            setLikeCount(likeCount + 1)
        }
    }

    let notLikedIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>;
    let likedIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>;

    function didLikePost() {
        return (likedPost ? <>{likedIcon}<span className="font-semibold text-slate-300">{likeCount}</span></>
            : <>{notLikedIcon}<span className="font-semibold text-slate-300">{likeCount}</span></>);
    }
    return (
        <button onClick={likePost0} class="btn bg-transparent m-1 w-32 border-opacity-0 gap-2 ">
            {didLikePost()}
        </button>
    )
}

export const ShareButton = ({ text }) => {
    return (
        <button class="btn bg-transparent m-1 w-32 border-opacity-0 gap-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="font-semibold text-slate-300" >{text}</span>
        </button>
    )
}
export const CommentButton = ({ text, setCommentsVisible }) => {
    return (
        <button onClick={setCommentsVisible} class="btn bg-transparent m-1 w-32 border-opacity-0 gap-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            <span className="font-semibold text-slate-300" >{text}</span>
        </button>
    )
}
export const MoreButton = ({ text }) => {
    return (
        <div className=" m-0">
            {/* <button class=" btn btn-sm bg-transparent border-opacity-0 gap-0  flex "> */}
            <div className="self-start place-content-start  btn btn-circle bg-transparent border-0 p-3 ">

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            </div>
            {text}
        </div>
    )
}