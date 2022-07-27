import React, { useRef, useState, useEffect, Dispatch, SetStateAction } from 'react'

export function SignupModal({ signup, setShowSignupModal }:{signup:any,setShowSignupModal:Dispatch<SetStateAction<boolean>>}) {
    let usernameInputRef:any = useRef('')

    const [Hidden, setHidden] = useState('')
    async function signUp(e: { preventDefault: () => void }) {
        let username = usernameInputRef.current.value
        e.preventDefault()
        if (!username) {
        }
        if (username) {
            await signup(usernameInputRef.current.value)
            // setHidden('hidden')
            setShowSignupModal(false)
        }
    }

    const [modalClass, setModalClass] = useState('modal modal-middle modal-open')
    useEffect(() => {
        // if (modalOpen) {
        //     // setModalClass('modal modal-middle modal-open')
        // } else {
        //     // setModalClass('modal modal-middle ')
        // }
        setHidden('')
    }, [])
    function closeModal() {
        // setModalOpen(false)
        setShowSignupModal(false)
        // setModalClass('modal modal-middle')
        // setHidden('hidden')
    }

    return (
        <>
            <div className={Hidden} >
                {/* <label for="my-modal-3" className="btn modal-button">open modal</label>
                <input type="checkbox" id="my-modal-3" className="modal-toggle" /> */}
                <div className={modalClass}>
                    <div className="modal-box  relative">
                        <label onClick={closeModal} htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                        <h3 className=" text-lg font-bold">Sign up to continue</h3>
                        <form className="my-2" onSubmit={signUp}>
                            <div>
                                <input ref={usernameInputRef} className="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Username" required />
                            </div>
                            <div className='flex w-full justify-center ' >
                                <button type="submit" className=" btn w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 capitalize  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
