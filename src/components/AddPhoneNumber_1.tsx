
import { AiOutlinePlusCircle } from "react-icons/ai"
import { useState } from "react"
import { MdOutlineCancel } from "react-icons/md"


interface PhonesOptions {
    value: string
    id: number
}

interface AddPhoneNumber_1Props {
    setPhoneNumbers(data: Array<PhonesOptions>): void,
    phoneNumbers: Array<PhonesOptions>
}

function AddPhoneNumber_1({ setPhoneNumbers, phoneNumbers }: AddPhoneNumber_1Props) {
    const [phones, setPhones] = useState<Array<PhonesOptions>>(phoneNumbers)

    const onSubmit = () => {
        setPhoneNumbers(phones)
    }

    const onAddNewTextInput = () => {
        setPhones((prev: Array<PhonesOptions>) => {
            if (prev?.length > 0) {
                return [
                    ...prev,
                    {
                        id: prev[prev.length - 1].id + 1,
                        value: ""
                    }
                ]
            }
            return [
                {
                    id: 0,
                    value: ""
                }
            ]
        })
    }

    const onPhoneNumberChange = (value, index) => {
        setPhones((prev: Array<PhonesOptions>) => {
            if (prev.length > 0) {
                return prev.map(item => (
                    item.id === index
                        ?
                        {
                            id: item.id,
                            value: value
                        }
                        :
                        item
                ))
            }
            return [
                {
                    id: 0,
                    value: ""
                }
            ]
        })
    }

    return (
        <>
            {
                phones?.map((phone, i) => (
                    <div className="w-full flex items-stretch gap-x-2">
                        <div
                            onClick={() => setPhones(phones => phones.filter(item => item.id !== phone.id))}
                            className="p-1 rounded-lg z-10 grid place-items-center
                                            hover:bg-transparent/10 bg-transparent/[0.03] transition-all
                                            duration-300 backdrop-blur-sm cursor-pointer px-2.5 active:scale-95"
                        >
                            <MdOutlineCancel className="w-5 h-5 fill-red-500" />
                        </div>
                        <input
                            type="text"
                            className="primary-text-input py-2"
                            defaultValue={phone.value}
                            key={phone.id}
                            placeholder="شماره تماس"
                            onChange={e => onPhoneNumberChange(e.target.value, phone.id)}

                        />
                    </div>
                ))
            }

            <div className="w-full flex items-center justify-between">

                <div onClick={onAddNewTextInput} className="flex !mt-5 items-center gap-x-2 py-1.5 px-3 rounded-lg
                hover:bg-emerald-600/5 transition-all duration-300 cursor-pointer w-max border
                border-emerald-500 hover:border-emerald-500/5 select-none active:scale-95">

                    <AiOutlinePlusCircle className="w-4 h-4 fill-emerald-600" />
                    <p className="text-emerald-600 text-xs font-[vazir]">افزودن شماره جدید</p>

                </div>

                <div onClick={onSubmit} className="flex !mt-5 items-center gap-x-2 py-1.5 px-3 rounded-lg
                hover:bg-emerald-600/10 transition-all duration-300 cursor-pointer w-max border
                border-cyan-500 hover:border-cyan-500/10 active:scale-95 select-none">

                    <p className="text-cyan-600 text-xs font-[vazir]">تایید</p>

                </div>

            </div>

        </>
    )
}

export default AddPhoneNumber_1

export type {
    PhonesOptions
}