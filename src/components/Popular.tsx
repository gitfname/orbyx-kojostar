import { useSearchParamsStore } from "../stores/useSearchParams"
import useSWR from "swr"
import { getPopulars } from "../utils/http"
import DataSection_1 from "./DataSection_1"
import { search, searchOptions } from "../utils/http/api/search"
import Card_1 from "./Card_1"
import getBaseUrl from "../utils/base-url"
import { useEffect, useState } from "react"
import { useDebounce } from "ahooks"

interface PopularProps {
  className?: string
}

function Popular({ className }: PopularProps) {
  const [
    searchText, catId, cityIDs
  ] = useSearchParamsStore(selector => [selector.data.key, selector.data.category_id, selector.data.city_id])
  const { data, error, isLoading, mutate } = useSWR(
    "search/popular",
    async () => getPopulars({ category_id: catId, city_id: cityIDs, key: searchText }),
    {
      shouldRetryOnError: false
    }
  )
  const debouncedSearchText = useDebounce(
    searchText,
    {
      wait: 750
    }
  )
  const [loading, setLoading] = useState(isLoading)

  useEffect(
    () => {
      console.log(searchText);
      setLoading(true)
      mutate()
      .then(() => setLoading(false))
    },
    [debouncedSearchText]
  )

  return (
    <div className="w-full h-max">
      {
        error
          ?
          <p>Something went wrong</p>
          :
          <DataSection_1
            title=""
            dataProvider={data?.data}
            dataRenderer={(item: searchOptions) => <Card_1 key={item.id} title={item.title} category={item.category} />}
            emptyFallback={
              <div className="w-full p-10 grid place-items-center">
                <img
                  alt="no data"
                  src={getBaseUrl() + "assets/images/no-data.svg"}
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

export default Popular