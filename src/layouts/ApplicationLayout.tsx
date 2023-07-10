import { Link } from "react-router-dom"
import { ApplicationRoutes } from "../routes"
import DesktopNavlink_1 from "../components/DesktopNavlink_1"

// icons
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai"
import { BsBookmark, BsSearch } from "react-icons/bs"
import { useSearchParamsStore } from "../stores/useSearchParams"
import MobileMenu from "../components/MobileMenu"
import getBaseUrl from "../utils/base-url"


function ApplicationLayout({children}) {
  return (
    <div dir="ltr" className="w-screen h-screen grid grid-cols-1 max-lg:grid-rows-[55px_calc(100%-55px)] lg:grid-cols-[calc(100%-13rem)_13rem]">

      {/* main section */}
      <div dir="rtl" className="max-lg:order-2 overflow-y-auto">
        {children}
      </div>

      {/* sidebar */}
      <div
        dir="rtl"
        className="overflow-y-auto bg-gradient-to-r flex max-lg:flex-row-reverse lg:flex-col
        max-lg:order-1 from-blue-500 to-blue-500/95 px-2 max-lg:items-center max-lg:justify-between
        max-lg:px-4 lg:h-screen"
      >
        
        <Link
          to={ApplicationRoutes.pages.home}
          className="text-3xl lg:text-4xl w-max lg:mx-auto block max-lg:py-3 py-6 lg:mb-2 italic"
        >
          <span className="text-blue-900 font-[forte]">Kojo</span>
          <span className="text-blue-950/50 font-[forte]">star</span>
        </Link>

        <div className="h-max flex flex-col gap-y-2 max-lg:hidden">
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

        <div className="lg:hidden z-[999999]">
          <MobileMenu />
        </div>


      </div>

    </div>
  )
}

export default ApplicationLayout