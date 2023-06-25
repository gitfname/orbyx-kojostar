
import { ReactNode } from "react"
import { MdKeyboardArrowLeft } from "react-icons/md"

interface Card_2Props {
    title: string,
    titleIcon?: ReactNode,
    icon?: ReactNode,
    onClick(): void,
    textClassName?: string,
    containerClassName?: string
}

function Card_2({ title, titleIcon, icon, onClick, containerClassName, textClassName }: Card_2Props) {
    return (
        <div onClick={() => onClick&&onClick()} className={`p-3 transition-colors duration-300 rounded-lg hover:bg-transparent/5
    flex items-center justify-between cursor-pointer ` + containerClassName}>

            <div className="flex items-center">
                {
                    titleIcon
                        ?
                        <div className="w-8">
                            {titleIcon}
                        </div>
                        :
                        false
                }
                <p
                    className={`text-xs text-slate-800 font-[iranyekan400] ` + textClassName}
                >
                    {title}
                </p>
            </div>

            {icon}
        </div>
    )
}

export default Card_2