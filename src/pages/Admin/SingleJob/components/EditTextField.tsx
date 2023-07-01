
import { LuEdit } from "react-icons/lu"
import Modal_2 from "../../../../components/Modal_2"
import { useRef } from "react";

interface Props {
    title: string;
    placeHolder: string;
    onChange(data: string): void;
    textArea?: boolean
}

function EditTextField({ onChange, placeHolder, title, textArea=false }: Props) {

    const closeRef = useRef(undefined)
    const textInputRef = useRef<any>(undefined)

    const handleSubmit = () => {
        closeRef.current&&closeRef.current()
        onChange(textInputRef.current.value)
    }

    return (
        <Modal_2
            title={title}
            close={(closeFn => closeRef.current = closeFn)}
            modalBody={
                <div>
                    {
                        textArea
                        ?
                        <textarea
                            ref={textInputRef}
                            rows={4}
                            className="primary-text-input py-3"
                            placeholder={placeHolder}
                        >
                        </textarea>
                        :
                        <input
                            ref={textInputRef}
                            type="text"
                            className="primary-text-input py-3"
                            placeholder={placeHolder}
                        />
                    }

                    <button onClick={handleSubmit} className="w-full max-w-xs block mx-auto rounded-xl bg-emerald-600 text-gray-50
            font-[vazir] py-2 text-sm mt-8 active:scale-95 transition-all duration-300">
                        ذخیره
                    </button>
                </div>
            }
        >
            <div className="p-1.5 rounded-lg hover:bg-emerald-500/10 cursor-pointer transition-colors duration-300">
                <LuEdit
                    className="w-4 h-4 fill-transparent stroke-emerald-500"
                />
            </div>
        </Modal_2>
    )
}

export default EditTextField