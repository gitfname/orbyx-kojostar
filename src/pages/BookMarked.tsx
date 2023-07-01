
import Card_1 from "../components/Card_1"
import useSWR from "swr"
import { getAllBookMarks } from "../utils/http"
import { MdOutlineCancel } from "react-icons/md"
import { toggleBookMark } from "../utils/http/api/toggleBookMark"
import useUserStore from "../stores/userStore"
import getBaseUrl from "../utils/base-url"
import Loading from "../components/Loading"

function BookMarked() {
    const {
        data,
        error,
        isLoading,
        mutate
    } = useSWR(
        "/get-all-bookmarks",
        async () => getAllBookMarks(),
        {
            shouldRetryOnError: false
        }
    )

    const onToggleBookMark = (jobId: number): void => {
        toggleBookMark({ job_id: jobId })
            .then(data => {
                mutate()
            })
    }

    if (isLoading) return <Loading />
    if (error) return <p>Error</p>

    return (
        <div className="w-full max-lg:h-full h-screen overflow-y-auto">
            <div className="w-full h-max px-4 py-8">

                <p
                    className="text-lg text-slate-800 font-[vazirMedium]"
                >
                    نشان شده ها
                </p>

                {
                    data?.data?.length > 0
                        ?
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                            {
                                data?.data?.map(item => (
                                    <div className="relative">
                                        <Card_1
                                            {...item}
                                            link={getBaseUrl() + "/jobs/" + item?.id}
                                        />
                                        <div
                                            onClick={() => onToggleBookMark(item.id)}
                                            className="absolute bottom-2 left-2 p-1.5 rounded-lg z-10
                                            hover:bg-transparent/10 bg-transparent/[0.03] transition-all
                                            duration-300 backdrop-blur-sm cursor-pointer px-2.5 active:scale-95"
                                        >
                                            <MdOutlineCancel className="w-6 h-6 fill-red-500" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div className="w-full mt-12 grid place-items-center">
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
            </div>
        </div>
    )
}

export default BookMarked