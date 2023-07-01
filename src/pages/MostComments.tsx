import { useSearchParamsStore } from "../stores/useSearchParams"
import useSWR from "swr"
import DataSection_1 from "../components/DataSection_1"
import { searchOptions } from "../utils/http/api/search"
import Card_1 from "../components/Card_1"
import getBaseUrl from "../utils/base-url"
import { useEffect, useState } from "react"
import { getMostCommentedJobs } from "../utils/http"
import Loading from "../components/Loading"
import { BsMap } from "react-icons/bs"
import ShowJobsInMap from "./ShowJobsInMap"
import { LatLng } from "leaflet"

interface MostCommentsProps {
  className?: string
}

function MostComments({ className }: MostCommentsProps) {
  const [
    searchText, catId, cityIDs
  ] = useSearchParamsStore(selector => [selector.data.key, selector.data.category_id, selector.data.city_id])

  const { data, error, isLoading, mutate } = useSWR(
    "search/most-comments",
    async () => getMostCommentedJobs({ category_id: catId, city_ids: cityIDs, key: searchText }),
    {
      shouldRetryOnError: false
    }
  )

  const [loading, setLoading] = useState(isLoading)

  useEffect(
    () => {
      setLoading(true)
      mutate()
        .then(() => setLoading(false))
    },
    [searchText]
  )
  useEffect(
    () => {
      setLoading(true)
      mutate()
        .then(() => setLoading(false))
    },
    [cityIDs, catId]
  )

  if (isLoading) return <Loading />

  return (
    <div className="w-full h-max">

      {
        data?.data?.length > 0
          ?
          <ShowJobsInMap latlng={data.data.map(job => ({ title: job.title, latlng: new LatLng(job.lat, job.lng) }))} >
            <div className="fixed z-30 bottom-4 left-4 p-3 rounded-xl bg-blue-500
      shadow-md shadow-black/10 grid place-items-center cursor-pointer">
              <BsMap className="w-4 h-4 fill-gray-50" />
            </div>
          </ShowJobsInMap>
          :
          null
      }

      {
        error
          ?
          <p>Something went wrong</p>
          :
          <DataSection_1
            containerClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
            title=""
            dataProvider={data?.data}
            dataRenderer={(item: searchOptions) => (
              <Card_1
                key={item.id}
                title={item.title}
                category={item.category}
                address={item.address}
                city={item.city}
                discount={item.discount}
                id={item.id}
                image={item.image}
                lat={item.lat}
                lng={item.lng}
                rate={item.rate}
                rate_count={item.rate_count}
                link={getBaseUrl() + "/jobs/" + item.id}
              />
            )}
            emptyFallback={
              <div className="w-full p-10 grid place-items-center">
                <img
                  alt="no data"
                  src={getBaseUrl() + "/images/noItem.png"}
                  className="w-28 h-auto border border-purple-600 inline-block"
                />
                <p className="text-sm text-slate-800 font-[vazirMedium] mt-3.5">
                  هیچ موردی وجود ندارد
                </p>
              </div>
            }
            loading={
              <div className="w-full h-72 grid place-items-center">
                <div className="p-4 px-6 rounded-2xl flex flex-col items-center justify-center gap-y-5 bg-blue-500/80
            shadow-lg shadow-black/5">
                  <p className="text-base text-slate-50 font-[vazir]">درحال لود</p>
                  <div className="w-10 h-10 border-t border-t-white rounded-full animate-spin"></div>
                </div>
              </div>
            }
            isLoading={loading}
          />

      }
    </div>
  )
}

export default MostComments