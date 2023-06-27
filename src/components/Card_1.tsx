import { Link } from "react-router-dom"
import getBaseUrl from "../utils/base-url"
import { searchOptions } from "../utils/http/api/search"
import Rating_1 from "./Rating_1"
import { GoComment, GoLocation } from "react-icons/go"
import { HiOutlineSquares2X2 } from "react-icons/hi2"


function Card_1({
    title, category, address, city, discount, id, image, lat, lng, rate, rate_count
}: searchOptions) {
  return (
    <Link to={getBaseUrl()+"/jobs/"+id} className="bg-gray-100 rounded-xl shadow-md shadow-black/5 w-full grid grid-cols-1 sm:grid-cols-[45%_1fr] gap-3">
      <div className="p-3 max-sm:order-2">
        <p className="text-gray-900 text-sm font-[iranyekan500] line-clamp-2">{ title }</p>
        <div className="mt-4 flex items-center gap-x-2 py-1.5 cursor-pointer transition-colors
        duration-300 px-2.5 rounded-lg hover:bg-transparent/5 w-max">
          <HiOutlineSquares2X2 className="w-[1.15rem] h-[1.15rem] fill-transparent stroke-gray-600" />
          <span className="text-gray-700 text-xs font-[iranyekan500]">{category}</span>
        </div>
        {/* <p className="text-gray-600 text-xs font-[iranyekan500] line-clamp-1 mt-2">{ category }</p> */}
        <div className="mt-2.5 flex items-center gap-x-2 py-1.5 cursor-pointer transition-colors
        duration-300 px-2.5 rounded-lg hover:bg-transparent/5 w-max">
          <GoLocation className="w-4 h-4 fill-gray-600" />
          <span className="text-gray-700 text-xs font-[iranyekan500]">{address}</span>
        </div>
        <div className="mt-2.5 flex items-center gap-x-2 py-1.5 cursor-pointer transition-colors
        duration-300 px-2.5 rounded-lg hover:bg-transparent/5 w-max">
          <GoComment className="w-4 h-4 fill-gray-600" />
          <span className="text-gray-700 text-xs font-[iranyekan500]">{rate_count}</span>
        </div>

        <Rating_1 positive={Math.floor(rate)} max={5} containerClassName="mt-4" />
      </div>

      <img
        alt=""
        src={image ? image : getBaseUrl()+"/assets/images/no-data.svg"}
        className="w-full max-sm:order-1 h-64 rounded-l-xl object-center object-cover"
      />

    </Link>
  )
}

export default Card_1