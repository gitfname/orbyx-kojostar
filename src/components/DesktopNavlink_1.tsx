import { NavLink } from "react-router-dom"

interface Props {
    text: string,
    link: string,
    icon: any
}

function DesktopNavlink_1({text, link, icon}: Props) {
  return (
    <NavLink
        to={link}
        className={({isActive}) => `flex p-2 pr-0 rounded-lg items-center w-full
        active:scale-95 transition-all duration-300
        ${isActive?
            "bg-gradient-to-r from-blue-950 via-blue-700 to-blue-600"
            :
            "bg-transparent hover:bg-white/10"
        }
        `}
    >
        <div className="w-12 grid place-items-center">
            {icon}
        </div>

        <p
            className="text-white text-sm  tracking-wide font-[iranyekan300]"
        >
            {text}
        </p>
    </NavLink>
  )
}

export default DesktopNavlink_1