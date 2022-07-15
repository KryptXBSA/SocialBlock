import { useRef, useState } from 'react'
export const NewPost = ({ post, username }) => {
  let postInputRef = useRef("")
  let tagsInputRef = useRef("")

  const [tagsValue, setTagsValue] = useState('')
  function newPost(e) {
    e.preventDefault()
    let content = postInputRef.current.value
    let topic = tagsValue
    post(topic, content)
  }
  function onTagsChange(e) {
    let str = e.target.value
    str = str.replace(/\s+/g, '-');
    if (str.slice(-2) === '--') {
      str = tagsValue
    }
    setTagsValue(str)
  }
  return (
    <div>
      <div className="flex  flex-row">

        <textarea ref={postInputRef} id="message" rows="2" class="block p-2.5 w-full text-sm rounded-lg dark:bg-gray-800 " placeholder={`Hey ${username ? username : ''} How’s it going?`} />
        {/* <button className="btn rounded-l-none ">
          New Post
        </button> */}
      </div>

      <div className=" flex mt-2  form-control">
        <form onSubmit={newPost} >
          <div className="flex items-center align-middle flex-row">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className=" ml-3  absolute h-6 self-center w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg> */}
            {/* <input onChange={onTagsChange} value={tagsValue} ref={tagsInputRef} type="text" placeholder="Tags" className=" max-h-10 px-11 input max-w-sm rounded-3xl grow " /> */}
            <button onClick={newPost} className="p-3 px-4 transition duration-300  font-semibold btn1 tracking-normal text-lg  dark:bg-slate-800 ml-auto rounded-2xl ">
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> */}
              New Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}