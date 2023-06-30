import { useEffect, useState } from "react"
import { AiOutlineHome, AiOutlineMenu, AiOutlineUser } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ChangeLangButton from "./ChangeLangButton"
// import { menuItems } from "../utils/http/api/getPhoneNumber"
// import { menuItemOptions } from "../utils/http/menuItems"
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box
} from "@chakra-ui/react"
import { ApplicationRoutes } from "../routes"
import DesktopNavlink_1 from "./DesktopNavlink_1"
import { BsBookmark, BsSearch } from "react-icons/bs"

const getLang = (lng) => {
    const languages = ["en", "fa"]
    return languages.find(v => v === lng) || "fa"
}

function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [t, i18n] = useTranslation()
    // const [items, setItems] = useState<menuItemOptions>()
    const navigate = useNavigate()


    // useEffect(
    //     () => {
    //         menuItems({ lng: getLang(i18n.language) })
    //             .then(data => setItems(data))
    //     },
    //     [i18n.language]
    // )


    return (
        <>
            <button onClick={() => setIsOpen(true)} className="p-2 rounded-lg bg-white/10 grid place-items-center active:scale-95 transition-transform duration-200">
                <AiOutlineMenu className="w-5 h-5 fill-slate-100" />
            </button>
            <div
                className={`fixed top-0 left-0 w-full h-full pointer-events-none z-50
                ${isOpen ? "!pointer-events-auto" : ""}
                `}
            >
                <div
                    onClick={() => setIsOpen(false)}
                    className={`absolute top-0 left-0 z-10 w-full h-full bg-black/40 pointer-events-none opacity-0
                    transition-opacity duration-300
                    ${isOpen ? "!opacity-100 !pointer-events-auto" : ""}`}
                ></div>

                <div
                    className={`w-64 h-full bg-blue-600 absolute top-0 right-0 translate-x-full z-[99999]
                    gap-y-3 pt-6 grid grid-rows-[max-content_1fr_max-content]
                    transition-transform duration-300 ${isOpen ? "!translate-x-0" : ""}`}
                >

                    <Link
                        to={ApplicationRoutes.pages.home}
                        className="text-3xl w-max mx-auto block lg:mb-2 italic"
                    >
                        <span className="text-blue-900 font-[forte]">Kojo</span>
                        <span className="text-white/70 font-[forte]">star</span>
                    </Link>

                    <div className="px-2 space-y-3 mt-5">

                        <DesktopNavlink_1
                            text="خانه"
                            link={ApplicationRoutes.pages.home}
                            icon={<AiOutlineHome className="fill-white w-5 h-5" />}
                        />

                        <DesktopNavlink_1
                            end={false}
                            text="جستجو"
                            link={ApplicationRoutes.pages.search}
                            icon={<BsSearch className="fill-white w-4 h-4" />}
                        />

                        <DesktopNavlink_1
                            text="نشان شده"
                            link={ApplicationRoutes.pages.bookmarks}
                            icon={<BsBookmark className="fill-white w-4 h-4" />}
                        />

                        <DesktopNavlink_1
                            text="پروفایل"
                            link={ApplicationRoutes.pages.profile}
                            icon={<AiOutlineUser className="fill-white w-5 h-5" />}
                        />

                    </div>

                </div>
            </div>
        </>
    )
}

export default MobileMenu