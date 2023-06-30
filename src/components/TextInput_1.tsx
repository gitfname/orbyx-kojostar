
import { useDebounce } from "ahooks"
import { ChangeEvent, KeyboardEvent, KeyboardEventHandler, ReactNode, Ref, forwardRef, useEffect, useRef, useState } from "react"

interface TextInput_1Props {
    defaultText?: string,
    placeHolder?: string,
    className?: string,
    onChange?(value: string): void,
    debounce?: number,
    icon?: ReactNode,
    iconPos?: "r" | "l",
    maxLength?: number,
    data?: string,
    onKeyDown?(value: string, ref:HTMLInputElement): void,
    onBeforeChange?(data: string): string | boolean
}

const TextInput_1 = forwardRef<HTMLInputElement, TextInput_1Props>((
    {
        className="", debounce=0, defaultText="", onChange=undefined, placeHolder="",
        icon=undefined, iconPos="r", maxLength=300, data, onKeyDown, onBeforeChange=undefined
    },
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

    useEffect(
        () => {
            setValue(data)
        },
        [data]
    )

    const handleOnKeyDown = (e) => {
        if(onKeyDown) onKeyDown(e.key, undefined)
    }

    const handleOnChange = (data: string) => {
        if(onBeforeChange) {
            const res = onBeforeChange(data)
            if(typeof res === "boolean" && res) {
                setValue(data)
            }
            else if (typeof res === "string") {
                setValue(res)
            }
        }
        else {
            setValue(data)
        }
    }

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
                value={value}
                onChange={e => handleOnChange(e.target.value)}
                onKeyDown={e => handleOnKeyDown(e)}
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