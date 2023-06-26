
import { GoCommentDiscussion } from "react-icons/go"
import Rating_1 from "../Rating_1"
import { getMyCommentOptions } from "../../utils/http/api/getMyComments"
import { AiOutlineClockCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
import { ApplicationRoutes } from "../../routes"

interface CommentOptions {
    id: number,
    content: string,
    user: {
        id: number,
        first_name: string,
        avatar: string,
        username: string
    },
    date: string,
    time: string,
    rate: number,
    status: number
}


interface CommentProps {
    data: CommentOptions
}

function Comment({
    content, date, id, job, rate, status, time, user
}: getMyCommentOptions) {

    return (
        <div className="w-full">

            <div className="flex items-center justify-between w-full">

                <div className="flex items-center gap-x-3">

                    {
                        (job?.image.trim() !== "")
                            ?
                            <img
                                loading="lazy"
                                alt=""
                                src={job?.image}
                                className="w-11 h-11 rounded-full object-center object-cover shadow-sm shadow-black/10"
                            />

                            :
                            <div className="w-11 h-11 rounded-full bg-blue-500/80 grid place-items-center">
                                <p className="text-slate-800 text-xs font-[iranyekan300]">{job?.title[0]}</p>
                            </div>
                    }


                    <p
                        className="text-sm text-slate-800 font-[iranyekan400]"
                    >
                        {job?.title}
                    </p>

                </div>

                <Rating_1
                    max={5}
                    positive={Math.floor(job.rate)}
                />

            </div>

            <div className="mt-5 w-full flex items-center justify-between gap-8">


                <p
                    className="text-xs text-slate-700/95 font-[iranyekan400]"
                >
                    {content}
                </p>

                <p
                    className="text-xs text-blue-700/70 font-[iranyekan400]"
                >
                    {date}
                </p>

            </div>

            <>
                {
                    status === 0
                        ?
                        <div className="flex items-center gap-x-1 mt-8">
                            <AiOutlineClockCircle className="w-4 h-4 fill-blue-500" />
                            <p className="text-xs text-blue-600 font-[iranyekan400]">در انتظار تایید</p>
                        </div>
                        :
                        false
                }
            </>

        </div>
    )
}


function MyComment(props: getMyCommentOptions) {

    return (
        <Link to={ApplicationRoutes.pages.singleJob(props.job.id)} className="block w-full p-4 rounded-xl hover:bg-blue-500/10 transition-colors duration-300">
            <Comment {...props} />
        </Link>
    )
}

export default MyComment