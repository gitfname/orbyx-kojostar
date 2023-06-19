
import { Link } from "react-router-dom"

interface menuItem {
    text: string,
    href: string
}

interface props {
    text: string,
    items: Array<menuItem>
}

function WithMenu({ text, items=[] }: props) {

    return (
        <div
            tabIndex={0}
            className="text-white text-lg font-medium tracking-wide py-3 px-1.5 relative hover:text-gray-400
            focus:text-gray-400 transition-colors duration-300 inline-block cursor-pointer group"
        >
            {text}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-slate-300/80
            transition-colors duration-500 group-focus-within:bg-slate-300/80"></div>

            {
                items.length > 0

                ?
                    <div tabIndex={0} className="w-48 z-10 absolute bottom-0 left-0 translate-y-[95%] shadow-lg
                    shadow-black/10 rounded-xl bg-slate-50 opacity-0 pointer-events-none transition-all duration-300
                    group-focus:opacity-100 group-focus:pointer-events-auto group-focus:translate-y-[102%]
                    cursor-auto flex flex-col gap-y-1 overflow-hidden p-1 py-2 focus-within:opacity-100 focus-within:pointer-events-auto
                    focus-within:translate-y-[102%]"
                    >
                        {
                            items.map(item => (
                                <Link
                                    to={item.href}
                                    className="w-full p-3 text-gray-800 text-sm font-medium hover:bg-transparent/10
                                    transition-colors duration-300 cursor-pointer rounded-lg"
                                >
                                    {item.text}
                                </Link>
                            ))
                        }
                    </div>
                :
                    false
            }
        </div>
    )
}

export default WithMenu