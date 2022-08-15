import React, { useState, useEffect, useMemo } from 'react'
import { UseAlertContext } from '../contexts/alertsContextProvider';
import { nanoid } from 'nanoid'
import Link from 'next/link';
// import nanoid from 'nanoid'
// let testAlerts = [
//     {
//         text: 'Connecting To Your Wallet...',
//         type: 'info',
//         id: nanoid()
//     },
//     {
//         text: 'Getting your account info...',
//         type: 'info'
//     },
//     {
//         text: 'Welcome back USERNAME',
//         type: 'special'
//     },
//     {
//         text: "You don't have an account please create one.",
//         type: 'warning'
//     },
//     {
//         text: "failed to fetch data",
//         type: 'danger'
//     }, {
//         text: "Made a new post LINK TX",
//         type: 'success'
//     },
// ]
let hide = 'animate__animated animate__fadeOutLeft'
export function Alert({ alerts }) {
    const { alertState, changeAlertState } = UseAlertContext();
    const [alertList, setAlertList] = useState(alertState.alerts)
    function renderAlerts() {

        return alertList.map(a => {
            return (<Alertt forr={a.for} closing={a.closing} key={a.id} id={a.id} type={a.type} text={a.text} icon={a.icon} />)
        })
    }
    useEffect(() => {
        // setAlertList(alertState.alerts)


    }, [alertState.alerts])

    return (
        <div className=' bottom-0 z-10 left-3 fixed'>
            <div className='flex  flex-col-reverse'>
                {renderAlerts()}
            </div>
        </div>
    )
}
function Alertt({ forr, type, text, id, closing = false }) {

    const { changeAlertState } = UseAlertContext();
    const [alertClass, setAlertClass] = useState('')
    async function closeAlert() {
        pause(3000)
        setAlertClass('animate__animated animate__fadeOutLeft')
        setTimeout(changeAlertState0, 1000);
        // changeAlertState({ action: 'remove', id: id })
        if (forr === 'walletConnect') {
            // changeAlertState({
            //     action: 'push', alert: {
            //         text: 'No Wallet Found',
            //         type: 'danger',
            //         for: 'noWallet',
            //         id: nanoid()
            //     }
            // })
        }
    }
    useEffect(() => {
        if (closing) {
            closeAlert()

        }
    }, [closing])

    function changeAlertState0() {
        changeAlertState({ action: 'remove', id: id })
    }
    let AlertType = InfoAlert;
    switch (type) {
        case 'info':
            AlertType = <InfoAlert closeAlert={closeAlert} text={text} />
            break;
        case 'success':
            AlertType = <SuccessAlert closeAlert={closeAlert} text={text} />
            break;
        case 'warning':
            AlertType = <WarningAlert closeAlert={closeAlert} text={text} />
            break; case 'danger':
            AlertType = <DangerAlert closeAlert={closeAlert} text={text} />
            break;
        case 'special':
            AlertType = <SpecialAlert closeAlert={closeAlert} text={text} />
            break;
        default:
            // AlertType = InfoAlert
            break;
    }

    setTimeout(closeAlert, 19000);
    return (
        <div className={alertClass}>
            {AlertType}
        </div>)
}
export function MessageAlert({ text, dismiss }) {
    return (
        <Link href={'/inbox'}>
            <div id="alert-border-1" className="w-96 cursor-pointer flex p-4 mb-4 rounded-lg animate__animated animate__fadeInRight bg-blue-100 border-t-4 border-blue-500 dark:bg-blue-200" role="alert">
                <svg className="flex-shrink-0 w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <div className="ml-3 text-sm font-semibold text-blue-700">
                    {text}
                </div>
                <button onClick={dismiss} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-blue-100 dark:bg-blue-200 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 dark:hover:bg-blue-300 inline-flex h-8 w-8" data-dismiss-target="#alert-border-1" aria-label="Close">
                    <span className="sr-only">Dismiss</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div></Link>
    )
}
export function InfoAlert({ text, dismiss }) {
    console.log('alert');
    return (<div id="alert-border-1" className="w-96  flex p-4 mb-4 rounded-lg animate__animated animate__fadeInRight bg-blue-100 border-t-4 border-blue-500 dark:bg-blue-200" role="alert">
        <svg className="flex-shrink-0 w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
        <div className="ml-3 text-sm font-semibold text-blue-700">
            {text}
        </div>
        <button onClick={dismiss} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-blue-100 dark:bg-blue-200 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 dark:hover:bg-blue-300 inline-flex h-8 w-8" data-dismiss-target="#alert-border-1" aria-label="Close">
            <span className="sr-only">Dismiss</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
    </div>
    )
}
export function SuccessAlert({ text, dismiss }) {
    return (<div id="alert-border-3" className="w-96 flex animate__animated animate__fadeInRight p-4 mb-4 rounded-lg bg-green-100 border-t-4 border-green-500 dark:bg-green-200" role="alert">
        <svg className="flex-shrink-0 w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
        <div className="ml-3 text-sm font-semibold text-green-700">
            {text}
        </div>
        <button onClick={dismiss} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-100 dark:bg-green-200 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 dark:hover:bg-green-300 inline-flex h-8 w-8" data-dismiss-target="#alert-border-3" aria-label="Close">
            <span className="sr-only">Dismiss</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
    </div>)
}
export function DangerAlertWallet({ text, dismiss }) {
    return (
        <div id="alert-border-2" className="w-96 rounded-lg animate__animated animate__fadeInRight flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200" role="alert">
            <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <div className="ml-3 text-sm font-semibold text-red-700">
                Insufficient Devnet Balance, Actions require lamports(SOL), You can get some SOL here:<br /><a target='blank' href='http://solfaucet.com' >solfaucet.com</a>
            </div>
            <button type="button" onClick={dismiss} className="ml-auto -mx-1.5 -my-1.5 bg-red-100 dark:bg-red-200 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:hover:bg-red-300 inline-flex h-8 w-8" data-dismiss-target="#alert-border-2" aria-label="Close">
                <span className="sr-only">Dismiss</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    )

} export function DangerAlert({ text, dismiss }) {
    return (
        <div id="alert-border-2" className="w-96 rounded-lg animate__animated animate__fadeInRight flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200" role="alert">
            <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <div className="ml-3 text-sm font-semibold text-red-700">
                {text}
            </div>
            <button type="button" onClick={dismiss} className="ml-auto -mx-1.5 -my-1.5 bg-red-100 dark:bg-red-200 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:hover:bg-red-300 inline-flex h-8 w-8" data-dismiss-target="#alert-border-2" aria-label="Close">
                <span className="sr-only">Dismiss</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    )

}
export function WarningAlert({ text, dismiss }) {
    return (
        <div id="alert-border-4" className="w-96 rounded-lg animate__animated animate__fadeInRight flex p-4 mb-4 bg-yellow-100 border-t-4 border-yellow-500 dark:bg-yellow-200" role="alert">
            <svg className="flex-shrink-0 w-5 h-5 text-yellow-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <div className="ml-3 text-sm font-semibold  text-yellow-700">
                {text}
            </div>
            <button type="button" onClick={dismiss} className="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 dark:bg-yellow-200 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 dark:hover:bg-yellow-300 inline-flex h-8 w-8" data-dismiss-target="#alert-border-4" aria-label="Close">
                <span className="sr-only">Dismiss</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    )

}
export function SpecialAlert({ text, dismiss }) {
    return (
        <div id="alert-border-4" className=" w-96 border-t-4 border-blue-500  rounded-lg animate__animated animate__fadeInRight flex p-4 mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-500" role="alert">
            <svg className="flex-shrink-0 w-5 h-5 text-yellow-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <div className="ml-3 text-sm font-semibold  text-violet-900">
                {text}
            </div>
            <button onClick={dismiss} type="button" className="ml-auto -mx-1.5 -my-1.5 rounded-lg hover:bg-indigo-400 p-1.5  inline-flex h-8 w-8" data-dismiss-target="#alert-border-4" aria-label="Close">
                <span className="sr-only">Dismiss</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    )

}
function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}