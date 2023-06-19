
import { Link } from "react-router-dom"

interface props {
    text: string,
    href?: string
}

function WithoutMenu({ text, href="" }: props) {
    
    return (
        <Link
            className="text-white text-lg font-medium tracking-wide py-3 px-1.5 relative hover:text-gray-400
            group transition-colors duration-300 inline-block"
            to={href}
        >
            {text}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-slate-300/80
            transition-colors duration-500"></div>
        </Link>
    )
}

export default WithoutMenu