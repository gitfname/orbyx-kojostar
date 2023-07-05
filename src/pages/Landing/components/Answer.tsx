
import { AiOutlineQuestion } from "react-icons/ai"
import getBaseUrl from "../../../utils/base-url";

interface Props {
    text: string;
}

function Answer({ text }: Props) {
    return (
        <div className="max-sm:flex-col-reverse max-sm:items-end flex items-center gap-3">

            <div className="rounded-r-xl rounded-l-sm bg-[#0E1F57] p-3.5 px-5">
                <p className="text-sm text-gray-50 font-[vazir] text-center max-w-prose">{text}</p>
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