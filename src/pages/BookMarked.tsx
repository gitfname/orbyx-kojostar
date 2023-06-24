
import Card_1 from "../components/Card_1"
import useSWR from "swr"
import { getAllBookMarks } from "../utils/http"

function BookMarked() {
    const {
        data,
        error,
        isLoading
    } = useSWR(
        "/get-all-bookmarks",
        async () => getAllBookMarks(),
        {
            shouldRetryOnError: false
        }
    )

    if(isLoading) return <p>Loading</p>
    if(error) return <p>Error</p>

    return (
        <div className="w-full h-screen p-8 overflow-y-auto">
            <div className="h-max w-full grid grid-cols-2 gap-6">
                {
                    data.data.map(item => (
                        <Card_1
                            {...item}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default BookMarked