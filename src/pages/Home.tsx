import Card_1 from "../components/Card_1"
import DataSection_1 from "../components/DataSection_1"
import Loading from "../components/Loading"
import getBaseUrl from "../utils/base-url"
import { getHomeData } from "../utils/http"
import useSWR from "swr"

function Home() {
  const { data, error, isLoading } = useSWR("api/home", getHomeData, {
    shouldRetryOnError: false
  })

  if (isLoading) return <Loading />
  if (error) return <p>Error</p>
  if (!isLoading) {
    console.log(data);
  }

  return (
    <div className="max-lg:h-full h-screen overflow-y-auto p-4 pt-7">

      <DataSection_1
        title="پیشنهاد ویژه"
        dataProvider={data?.special}
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
        isLoading={isLoading}
        containerClassName="grid grid-cols-1 lg:grid-cols-2 pt-8"
        dataRenderer={(item) => <Card_1 {...item} />}
      />

      <div className="mt-16"></div>

      <DataSection_1
        title="پرطرفدار ها"
        dataProvider={data?.popular}
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
        isLoading={isLoading}
        containerClassName="grid grid-cols-1 lg:grid-cols-2 pt-8"
        dataRenderer={(item) => <div className="w-10 h-10 bg-red-600" key={item.id}></div>}
      />

    </div>
  )
}

export default Home