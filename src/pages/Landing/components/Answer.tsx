
import { AiOutlineQuestion } from "react-icons/ai"
import getBaseUrl from "../../../utils/base-url";
import { TypeAnimation } from "react-type-animation"

interface Props {
    text: string | Array<{ duration: number, value: string }>;
}

function Answer({ text }: Props) {

    const textSequence =  []

    if(typeof text === "object") {
        text.forEach(item => {
            textSequence.push(item.value)
            textSequence.push(item.duration)
        })
    }

    return (
        <div className="max-sm:flex-col-reverse max-sm:items-end flex items-center gap-3">

            <div className="rounded-r-xl rounded-l-sm bg-[#0E1F57] p-3.5 px-5">
                <p className="text-sm text-gray-50 font-[vazir] text-center max-w-prose">
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

            <img
                alt="Question Mark"
                src={getBaseUrl() + "/images/KojoLogo.png"}
                className="w-12 h-12 object-center object-scale-down"
            />

        </div>
    )
}

export default Answer