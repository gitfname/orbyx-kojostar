
import { useDebounce } from "ahooks"
import { ReactNode, forwardRef, useEffect, useState } from "react"

interface TextInput_1Props {
    defaultText?: string,
    placeHolder?: string,
    className?: string,
    onChange?(value: string): void,
    debounce?: number,
    icon?: ReactNode,
    iconPos?: "r" | "l",
    maxLength?: number
}

const TextInput_1 = forwardRef<HTMLInputElement>((
    {
        className="", debounce=0, defaultText="", onChange=undefined, placeHolder="",
        icon=undefined, iconPos="r", maxLength=300
    }: TextInput_1Props,
    ref
) => {
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce(value, {wait: debounce})

    useEffect(
        () => {
            if(onChange) {
                onChange(debouncedValue)
            }
        },
        [debouncedValue]
    )

    return (
        <div
            className="w-full relative"
        >

            {
                icon
                ?
                    <div className={`absolute top-1/2 ${iconPos==="r"?"right-4":"left-4"} -translate-y-1/2`}>
                        {icon}
                    </div>
                :
                    false
            }

            <input
                ref={ref}
                type="text"
                className={`w-full p-3 primary-text-input ${iconPos==="r"?"pr-12":" pl-12"}`}
                placeholder={placeHolder}
                defaultValue={defaultText}
                onChange={e => setValue(e.target.value)}
                maxLength={maxLength}
            />

        </div>
    )
})

// const TextInput_1 = ({
//     className="", debounce=0, defaultText="", onChange=undefined, placeHolder="",
//     icon=undefined, iconPos="r", maxLength=300
// }: TextInput_1Props) => {

//     const [value, setValue] = useState("")
//     const debouncedValue = useDebounce(value, {wait: debounce})

//     useEffect(
//         () => {
//             if(onChange) {
//                 onChange(debouncedValue)
//             }
//         },
//         [debouncedValue]
//     )

//     return (
//         <div
//             className="w-full relative"
//         >

//             {
//                 icon
//                 ?
//                     <div className={`absolute top-1/2 ${iconPos==="r"?"right-4":"left-4"} -translate-y-1/2`}>
//                         {icon}
//                     </div>
//                 :
//                     false
//             }

//             <input
//                 type="text"
//                 className={`w-full p-3 primary-text-input ${iconPos==="r"?"pr-12":" pl-12"}`}
//                 placeholder={placeHolder}
//                 defaultValue={defaultText}
//                 onChange={e => setValue(e.target.value)}
//                 maxLength={maxLength}
//             />

//         </div>
//     )
// }

export default TextInput_1