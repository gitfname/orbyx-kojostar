import getBaseUrl from "../utils/base-url"
import { searchOptions } from "../utils/http/api/search"


function Card_1({
    title, category, address, city, discount, id, image, lat, lng, rate, rate_count
}: searchOptions) {
  return (
    <div className="bg-gray-100 rounded-xl shadow-md shadow-black/5 w-full grid grid-cols-[45%_1fr] gap-x-3">
      <div className="p-3">
        <p className="text-gray-900 text-sm font-[iranyekan500] line-clamp-2">{ title }</p>
        <p className="mt-5 text-xs text-gray-500 font-[iranyekan500]">
          دسته بندی : <span className="text-gray-700 cursor-pointer px-2 transition-colors duration-300 hover:bg-transparent/5 rounded-lg py-0.5">{category}</span>
        </p>
        {/* <p className="text-gray-600 text-xs font-[iranyekan500] line-clamp-1 mt-2">{ category }</p> */}
        <p className="mt-3.5 text-xs text-gray-500 font-[iranyekan500]">
          آدرس : <span className="text-gray-700 cursor-pointer px-2 transition-colors duration-300 hover:bg-transparent/5 rounded-lg py-0.5">{address}</span>
        </p>
        <p className="mt-3.5 text-xs text-gray-500 font-[iranyekan500]">
          نظر ها : <span className="text-gray-700 cursor-pointer px-2 transition-colors duration-300 hover:bg-transparent/5 rounded-lg py-0.5">{rate_count}</span>
        </p>
      </div>

      <img
        alt=""
        src={image ? image : getBaseUrl()+"assets/images/no-data.svg"}
        className="w-full h-64 rounded-l-xl object-center object-cover"
      />

    </div>
  )
}

export default Card_1