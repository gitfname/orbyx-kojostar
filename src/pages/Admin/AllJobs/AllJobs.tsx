
import useSWR from "swr"
import { getAllJobsFromAdminRoute } from "../../../utils/http"
import DataSection_1 from "../../../components/DataSection_1"
import Loading from "../../../components/Loading"
import getBaseUrl from "../../../utils/base-url"
import Card_1 from "../../../components/Card_1"
import { ApplicationRoutes } from "../../../routes"


function AllJobs() {

    // get all jobs
    const {
        data: jobs,
        error: jobsError,
        isLoading: isJobsLoading
    } = useSWR(
        "/admin/all-jobs",
        async () => await getAllJobsFromAdminRoute(),
        {
            shouldRetryOnError: false,
            revalidateOnFocus: false
        }
    )

    

    if (isJobsLoading) return <Loading />
    if (jobsError) return <p>something went wrong</p>

    return (
        <div className="w-full max-lg:h-full h-screen overflow-y-auto">
            <div className="w-full h-max py-8 px-4">

                <p
                    className="text-lg text-slate-800 font-[vazirMedium]"
                >
                    مشاغل
                </p>

                <DataSection_1
                    title=""
                    dataProvider={jobs?.data}
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
                    isLoading={isJobsLoading}
                    containerClassName="grid grid-cols-1 gap-6 lg:grid-cols-2 pt-8"
                    dataRenderer={(item) => <Card_1 showStatus={true} {...item}  link={ApplicationRoutes.pages.adminSingleJob(item.id)} />}
                />

            </div>
        </div>
    )
}

export default AllJobs