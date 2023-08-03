import { NavLink, Outlet } from "react-router-dom"
import { ApplicationRoutes } from "../routes"
import { useSearchParamsStore } from "../stores/useSearchParams"
import { CiSearch } from "react-icons/ci"
import { VscFilter } from "react-icons/vsc"
import SortModal from "../components/SortModal"
import { useDebounce } from "ahooks"
import { useEffect, useState } from "react"
import useUserStore from "../stores/userStore"


function Search() {
  const [searchParamsStoreSetKey, set_city_id] = useSearchParamsStore(selector => [selector.api.set_key, selector.api.set_city_id])
  const [user_city_id] = useUserStore(selector => [selector.user.city_id])
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(
    value,
    {
      wait: 750
    }
  )

  useEffect(
    () => {
      searchParamsStoreSetKey(debouncedValue)
    },
    [debouncedValue]
  )

  useEffect(
    () => {
      set_city_id([user_city_id])
    },
    [user_city_id]
  )

  return (
    <div className="max-lg:h-full h-screen overflow-y-auto grid grid-rows-[max-content_1fr]">

      <div className="pb-1 shadow-lg shadow-black/10 overflow-x-hidden">

        <div className="bg-slate-50 shadow-lg shadow-black/5 p-4 relative">

          <CiSearch className="absolute top-1/2 right-7 -translate-y-1/2 w-7 h-7 fill-blue-500 pointer-events-none" />

          <SortModal>
            <div className="p-2 rounded-lg hover:bg-transparent/5 transition-colors duration-300
            cursor-pointer absolute top-1/2 left-7 -translate-y-1/2">
              <VscFilter className="w-5 h-5 fill-blue-500 pointer-events-none" />
              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-rose-500"></div>
            </div>
          </SortModal>

          <input
            onChange={e => {
              setValue(e.target.value)
            }}
            maxLength={50}
            placeholder="جستجو کنید..."
            className="primary-text-input text-sm py-3.5 font-[vazir] pr-12 pl-16"
          />

        </div>

        <div className=" mt-5 w-full overflow-x-auto pb-4">

          <div className="w-max min-w-full flex items-center justify-center gap-x-5 flex-nowrap px-4">

            <NavLink
              end
              to={ApplicationRoutes.pages.search}
              className={({ isActive }) => `primary-btn font-[vazir] text-xs w-max py-3 bg-transparent text-blue-600 border
            border-blue-500 hover:bg-blue-500 hover:text-white flex-shrink-0 ${isActive ? "!bg-blue-500 !text-white" : ""}`}
            >
              محبوب ترین
            </NavLink>

            <NavLink
              end
              to={ApplicationRoutes.pages.search + "/near-jobs"}
              className={({ isActive }) => `primary-btn font-[vazir] text-xs w-max py-3 bg-transparent text-blue-600 border
            border-blue-500 hover:bg-blue-500 hover:text-white flex-shrink-0 ${isActive ? "!bg-blue-500 !text-white" : ""}`}
            >
              نزدیک ترین
            </NavLink>

            <NavLink
              end
              to={ApplicationRoutes.pages.search + "/most-comment"}
              className={({ isActive }) => `primary-btn font-[vazir] text-xs w-max py-3 bg-transparent text-blue-600 border
            border-blue-500 hover:bg-blue-500 hover:text-white flex-shrink-0 ${isActive ? "!bg-blue-500 !text-white" : ""}`}
            >
              بیشترین نظر
            </NavLink>

            <NavLink
              end
              to={ApplicationRoutes.pages.search + "/discounts"}
              className={({ isActive }) => `primary-btn font-[vazir] text-xs w-max py-3 bg-transparent text-blue-600 border
            border-blue-500 hover:bg-blue-500 hover:text-white flex-shrink-0 ${isActive ? "!bg-blue-500 !text-white" : ""}`}
            >
              تخفیفات
            </NavLink>

          </div>

        </div>
      </div>

      <div dir="ltr" className="w-full h-full overflow-y-auto p-4">
        <div dir="rtl">
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default Search