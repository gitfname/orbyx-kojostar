import { useSearchParamsStore } from "../stores/useSearchParams"
import useSWR from "swr"
import DataSection_1 from "../components/DataSection_1"
import { searchOptions } from "../utils/http/api/search"
import Card_1 from "../components/Card_1"
import getBaseUrl from "../utils/base-url"
import { useEffect, useState } from "react"
import { getMostCommentedJobs } from "../utils/http"
import Loading from "../components/Loading"

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

  if(isLoading) return <Loading />

  return (
    <div className="w-full h-max">
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
              />
            )}
            emptyFallback={
              <div className="w-full p-10 grid place-items-center">
                <img
                  alt="no data"
                  src={getBaseUrl() + "/assets/images/no-data.svg"}
                  className="w-72 h-auto border border-purple-600 inline-block"
                />
              </div>
            }
            loading={
              <div className="w-full h-72 grid place-items-center">
                <div className="p-4 px-6 rounded-2xl flex flex-col items-center justify-center gap-y-5 bg-blue-500/80
            shadow-lg shadow-black/5">
                  <p className="text-base text-slate-50 font-[iranyekan300]">درحال لود</p>
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