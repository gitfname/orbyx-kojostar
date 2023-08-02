
import { useEffect, useState } from "react"
import useSWR from "swr"
import { getNearByJobs } from "../../utils/http"
import { useSearchParamsStore } from "../../stores/useSearchParams"
import Loading from "../../components/Loading"
import DataSection_1 from "../../components/DataSection_1"
import { searchOptions } from "../../utils/http/api/search"
import Card_1 from "../../components/Card_1"
import getBaseUrl from "../../utils/base-url"
import { ApplicationRoutes } from "../../routes"
import getDistanceBetweenCoordinates from "../../utils/getDistanceBetweenCoordinates"
import isMobileDevice from "../../utils/isMobileDevice"


function YouDontHaveGps() {
    return (
        <div className="w-full min-h-screen grid place-items-center">
            <p className="text-3xl text-slate-600 font-[vazirMedium] text-center">
                دستگاه شما دارای GPS نمیباشد.
            </p>
        </div>
    )
}


function NearByJobs() {

    const [pos, setPos] = useState<{ lat: number, lng: number }>({ lat: 35, lng: 42 })

    const [isGPSAvailable, setIsGPSAvailable] = useState(0)

    const [
        searchText, catId, cityIDs
    ] = useSearchParamsStore(selector => [selector.data.key, selector.data.category_id, selector.data.city_id])
    // const toast = useToast()

    const {
        data, error, isLoading, mutate
    } = useSWR(
        "/search/near-by",
        async () => await getNearByJobs({ category_id: catId, city_ids: cityIDs, key: searchText, lat: pos.lat, lng: pos.lng }),
        {
            shouldRetryOnError: false,
            revalidateOnFocus: false
        }
    )

    useEffect(
        () => {
            // setLoading(true)
            mutate()
            // .then(() => setLoading(false))
        },
        [searchText, cityIDs, catId]
    )

    useEffect(
        () => {
            // check if GeoLocation api is supported in this browser
            if ("geolocation" in navigator) {
                console.log("geolocation available");
                navigator.geolocation.getCurrentPosition(
                    (pos: GeolocationPosition) => {
                        setIsGPSAvailable(1)
                        setPos({
                            lat: pos.coords.latitude,
                            lng: pos.coords.longitude
                        })
                    },
                    (err: GeolocationPositionError) => {
                        setIsGPSAvailable(-1)
                    }
                )
            }
        },
        []
    )

    if (isLoading || isGPSAvailable === 0) return <Loading />
    if (error) return <p>something went wrong</p>
    if (isGPSAvailable === -1) return <YouDontHaveGps />

    return (
        <div className="w-full h-max">
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
                        link={ApplicationRoutes.pages.singleJob(item?.id)}
                        distance={(isMobileDevice() && pos) ? getDistanceBetweenCoordinates({ lat1: item?.lat, lon1: item?.lng, lat2: pos?.lat, lon2: pos?.lng }).toFixed(2) : undefined}
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
                            <p className="text-base text-slate-50 font-[vazir]">در حال بارگذاری</p>
                            <div className="w-10 h-10 border-t border-t-white rounded-full animate-spin"></div>
                        </div>
                    </div>
                }
                isLoading={isLoading}
            />
        </div>
    )
}

export default NearByJobs