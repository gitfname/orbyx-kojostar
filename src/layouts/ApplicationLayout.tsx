import { Link } from "react-router-dom"
import { ApplicationRoutes } from "../routes"
import DesktopNavlink_1 from "../components/DesktopNavlink_1"

// icons
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai"
import { BsBookmark, BsSearch } from "react-icons/bs"
import { useSearchParamsStore } from "../stores/useSearchParams"


function ApplicationLayout({children}) {
  const [city_id, key] = useSearchParamsStore(selector => [selector.data.city_id, selector.data.key])
  return (
    <div dir="ltr" className="w-screen h-screen grid grid-cols-[calc(100%-13rem)_13rem]">

      {/* main section */}
      <div dir="rtl">
        {children}
      </div>

      {/* sidebar */}
      <div dir="rtl" className="overflow-y-auto bg-gradient-to-r from-blue-500 to-blue-500/95 px-2">
        
        <Link
          to={ApplicationRoutes.pages.home}
          className="text-3xl w-max mx-auto block py-6 mb-2 italic"
        >
          <span className="text-blue-900 font-[iranyekan600]">Kojo</span>
          <span className="text-blue-950/50 font-[iranyekan600]">star</span>
        </Link>

        <div className="h-max flex flex-col gap-y-2">
          <DesktopNavlink_1 
            text="خانه"
            link={ApplicationRoutes.pages.home}
            icon={<AiOutlineHome className="fill-white w-5 h-5" />}
          />

          <DesktopNavlink_1 
            text="سرچ"
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

          <div dir="ltr" className="mt-6 flex flex-col gap-y-2 border border-red-200">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-slate-800 font-[iranyekan400]">key :</p>
              {key}
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-slate-800 font-[iranyekan400]">city_ids :</p>
              {JSON.stringify(city_id)}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ApplicationLayout