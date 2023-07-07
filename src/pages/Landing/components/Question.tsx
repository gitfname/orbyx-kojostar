
import { AiOutlineQuestion } from "react-icons/ai"
import getBaseUrl from "../../../utils/base-url";
import { TypeAnimation } from "react-type-animation";

interface Props {
    text: string | Array<{ duration: number, value: string }>;
}

function Question({ text }: Props) {

    const textSequence = []

    if (typeof text === "object") {
        text.forEach(item => {
            textSequence.push(item.value)
            textSequence.push(item.duration)
        })
    }

    return (
        <div className="max-sm:flex-col max-sm:items-start flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-500">
                {/* <AiOutlineQuestion className="w-6 h-6 fill-gray-50" /> */}
                <img
                    alt="Question Mark"
                    src={getBaseUrl() + "/images/question.png"}
                    className="w-7 h-7 object-center object-scale-down"
                />
            </div>

            <div className="rounded-l-xl rounded-r-sm bg-[#187FE2] p-3.5 px-5">
                <p className="text-sm text-gray-50 font-[vazir]">
                    {
                        typeof text === "string"
                            ?
                            text
                            :
                            <TypeAnimation
                                wrapper="span"
                                sequence={textSequence}
                                speed={44}
                                repeat={Infinity}
                            />

                    }
                </p>
            </div>
        </div>
    )
}

export default Question