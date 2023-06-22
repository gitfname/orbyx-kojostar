import { NavLink, Outlet } from "react-router-dom"
import { ApplicationRoutes } from "../routes"
import { useSearchParamsStore } from "../stores/useSearchParams"

function Search() {
  const [ searchParamsStoreSetKey ] = useSearchParamsStore(selector => [selector.api.set_key])

  return (
    <div className="h-screen overflow-y-auto grid grid-rows-[max-content_1fr]">
      <div className="pb-3 shadow-lg shadow-black/10">
        <div className="bg-slate-50 shadow-lg shadow-black/5 p-4">
          <input
            onChange={e => {
              searchParamsStoreSetKey(e.target.value)
            }}
            maxLength={50}
            placeholder="جستجو کنید..."
            className="primary-text-input text-sm py-3.5 font-[iranyekan300] pr-14"
          />
        </div>
        <div className="flex items-center justify-center gap-x-5 mt-5">
          <NavLink
            end
            to={ApplicationRoutes.pages.search}
            className={({isActive}) => `primary-btn font-[iranyekan300] text-xs w-max py-3 bg-transparent text-blue-600 border
            border-blue-500 hover:bg-blue-500 hover:text-white ${isActive?"!bg-blue-500 !text-white":""}`}
          >
            محبوب ترین
          </NavLink>

          <NavLink
            end
            to={ApplicationRoutes.pages.search+"/nearby"}
            className={({isActive}) => `primary-btn font-[iranyekan300] text-xs w-max py-3 bg-transparent text-blue-600 border
            border-blue-500 hover:bg-blue-500 hover:text-white ${isActive?"!bg-blue-500 !text-white":""}`}
          >
            نزدیک ترین
          </NavLink>

          <NavLink
            end
            to={ApplicationRoutes.pages.search+"/most-comment"}
            className={({isActive}) => `primary-btn font-[iranyekan300] text-xs w-max py-3 bg-transparent text-blue-600 border
            border-blue-500 hover:bg-blue-500 hover:text-white ${isActive?"!bg-blue-500 !text-white":""}`}
          >
            بیشترین نظر
          </NavLink>

          <NavLink
            end
            to={ApplicationRoutes.pages.search+"/price-offs"}
            className={({isActive}) => `primary-btn font-[iranyekan300] text-xs w-max py-3 bg-transparent text-blue-600 border
            border-blue-500 hover:bg-blue-500 hover:text-white ${isActive?"!bg-blue-500 !text-white":""}`}
          >
            تخفیفات
          </NavLink>
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