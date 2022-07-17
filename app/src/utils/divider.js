import {useState} from 'react'

export function Divider({paddingY}) {
   const [p, setp] = useState( `m-1 py-${paddingY}`)
    // let p=` m-1 py-${paddingY}`
    if (!paddingY) {
        return null;
    }
    return (
        <div className={p}>
            <div className=" border-b mt-1 border-gray-700"></div>
        </div>
    )
}
