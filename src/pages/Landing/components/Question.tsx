
import { AiOutlineQuestion } from "react-icons/ai"
import getBaseUrl from "../../../utils/base-url";

interface Props {
    text: string;
}

function Question({ text }: Props) {
  return (
    <div className="max-sm:flex-col max-sm:items-start flex items-center gap-3">
        <div className="p-2 rounded-full bg-blue-500">
            {/* <AiOutlineQuestion className="w-6 h-6 fill-gray-50" /> */}
            <img
                alt="Question Mark"
                src={getBaseUrl()+"/images/question.png"}
                className="w-7 h-7 object-center object-scale-down"
            />
        </div>

        <div className="rounded-l-xl rounded-r-sm bg-blue-500 p-3.5 px-5">
            <p className="text-sm text-gray-50 font-[vazir]">{text}</p>
        </div>
    </div>
  )
}

export default Question