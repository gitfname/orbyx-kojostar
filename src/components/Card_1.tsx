import { Link } from "react-router-dom"
import getBaseUrl from "../utils/base-url"
import { searchOptions } from "../utils/http/api/search"
import Rating_1 from "./Rating_1"
import { GoComment, GoLocation } from "react-icons/go"
import { HiOutlineSquares2X2 } from "react-icons/hi2"
import Status_1 from "./Status_1"

interface Props extends searchOptions {
  link: string;
  status?: -1 | 0 | 1;
  showStatus?: boolean;
  showDiscount?: boolean
}


function Card_1({
  title, category, showDiscount, address, city, discount, id, image, lat, lng, rate, rate_count, link, showStatus = false, status = undefined
}: Props) {
  return (
    <Link to={link} className="bg-gray-100 relative h-full rounded-xl shadow-md shadow-black/5 w-full grid grid-cols-1 sm:grid-cols-[45%_1fr] gap-3">
      <div className="p-3 max-sm:order-2">

        {
          showDiscount
            ?
            discount
              ?
              <div className="absolute max-sm:top-2 max-sm:left-2 sm:bottom-2 sm:left-2 py-2.5 px-3 bg-rose-500 z-10 price-discount shadow shadow-black/10">
                <p className="text-gray-50 font-[vazir] text-xs leading-none">{discount}% تخفیف</p>
              </div>
              :

              <div className="absolute max-sm:top-2 max-sm:left-2 sm:bottom-2 sm:left-2 py-2.5 px-3 bg-rose-500 z-10 price-discount shadow shadow-black/10">
                <p className="text-gray-50 font-[vazir] text-xs leading-none">0% تخفیف</p>
              </div>
            :
            null

        }


        <p className="text-gray-900 text-sm font-[vazirMedium] line-clamp-2">{title}</p>

        <div className="mt-4 flex items-center gap-x-2 py-1.5 cursor-pointer transition-colors
        duration-300 px-2.5 rounded-lg hover:bg-transparent/5 w-max">
          <HiOutlineSquares2X2 className="w-[1.15rem] h-[1.15rem] fill-transparent stroke-gray-600" />
          <span className="text-gray-700 text-xs font-[vazir]">{category}</span>
        </div>

        <div className="mt-2.5 flex items-center gap-x-2 py-1.5 cursor-pointer transition-colors
        duration-300 px-2.5 rounded-lg hover:bg-transparent/5 w-max">
          <GoLocation className="w-4 h-4 fill-gray-600" />
          <span className="text-gray-700 text-xs font-[vazir] xl:max-w-[33ch] max-w-[25ch] line-clamp-1">{address}</span>
        </div>

        <div className="mt-2.5 flex items-center gap-x-2 py-1.5 cursor-pointer transition-colors
        duration-300 px-2.5 rounded-lg hover:bg-transparent/5 w-max">
          <GoComment className="w-4 h-4 fill-gray-600" />
          <span className="text-gray-700 text-xs font-[vazir]">{rate_count}</span>
        </div>

        <div className="mt-2.5 w-max">
          {
            typeof status === "number" && showStatus
              ?
              <Status_1 status={status} />
              :
              null
          }
        </div>

        <Rating_1 positive={Math.floor(rate)} max={5} containerClassName="mt-4" />

      </div>

      <div className="w-full h-64 grid place-items-center">
        <img
          alt=""
          src={image ? image : getBaseUrl() + "/images/kojo.png"}
          className={`${image ? "w-full h-64" : "w-auto h-52"} max-sm:order-1 max-md:rounded-lg md:rounded-l-xl object-center object-cover block`}
        />

      </div>

    </Link>
  )
}

export default Card_1