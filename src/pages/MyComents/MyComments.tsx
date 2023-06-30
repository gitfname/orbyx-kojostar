
import useSWR from "swr"
import CommentsSection_1 from "../../components/CommentsSection_1"
import { getMyComments } from "../../utils/http"
import middleware from "./middleware"
import { useEffect } from "react"
import MyComment from "../../components/MyCommentsSection/MyCommentsSection"
import Loading from "../../components/Loading"

function MyComments() {

    useEffect(
        () => {
            middleware()
        },
        []
    )

    const {
        data,
        error,
        isLoading
    } = useSWR(
        "my-comments",
        async () => getMyComments(),
        {
            shouldRetryOnError: false
        }
    )

    if(isLoading) return <Loading />
    if(error) return <p>Error</p>    

    return (
        <div className="w-full max-lg:h-full h-screen overflow-y-auto">
            <div className="w-full h-max px-4 py-8">

                <p
                    className="text-lg text-slate-800 font-[vazirMedium]"
                >
                    نظر های من
                </p>

                <div className="mt-12 w-full flex flex-col gap-y-7">
                    {
                        data.data.map(item => (
                            <>
                                <MyComment {...item} key={item.id} />
                                <div className="w-11/12 mx-auto border-b border-b-slate-200"></div>
                            </>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default MyComments