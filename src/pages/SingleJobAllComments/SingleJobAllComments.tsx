
import useSWR from "swr"
import { getAllComments } from "../../utils/http/api/getAllComments";
import Loading from "../../components/Loading";
import { useLocation, useParams } from "react-router-dom";
import CommentsSection_1 from "../../components/CommentsSection_1";

function SingleJobAllComments() {

    const location = useLocation()
    const { job_id, title } = location.state

    const {
        data,
        error,
        isLoading
    } = useSWR(
        "/jobs/" + job_id + "/all-comments",
        async () => await getAllComments({ job_id: job_id }),
        {
            shouldRetryOnError: false,
            revalidateOnFocus: false
        }
    )

    if (isLoading) return <Loading />
    if (error) return <p>something went wrong</p>

    return (
        <div className="w-full h-screen overflow-y-auto">
            <div className="w-full h-max p-4 py-8">

                <p
                    className="text-lg text-slate-800 font-[vazirMedium]"
                >
                    نظر های {title}
                </p>

                <div className="mt-16 w-full">
                    <CommentsSection_1 showTopSection={false} jobTitle={title} jobId={job_id} comments={data.data} />
                </div>
            </div>
        </div>
    )
}

export default SingleJobAllComments