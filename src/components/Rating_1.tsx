
import { ReactNode } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

interface Rating_1Props {
    positive: number,
    max: number
    fillElement?: ReactNode,
    outlineElement?: ReactNode,
    containerClassName?: string
}

function Rating_1({ positive, max, fillElement, outlineElement, containerClassName }: Rating_1Props) {
  
  return (
    <div className={"flex items-center gap-x-2 " + containerClassName}>
        {
          Array.from({length: positive}).map(_ => <AiFillStar className="fill-yellow-400 w-3.5 h-3.5" />)
        }
        {
          Array.from({length: Math.abs(positive-max)}).map(_ => <AiFillStar className="fill-gray-400 w-3.5 h-3.5" />)
        }
    </div>
  )
}

export default Rating_1