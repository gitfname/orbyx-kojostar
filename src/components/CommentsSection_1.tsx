
import { GoCommentDiscussion } from "react-icons/go"
import Rating_1 from "./Rating_1"
import { Link, useNavigate } from "react-router-dom"
import { ApplicationRoutes } from "../routes"

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

function Comment({ data }: CommentProps) {
    return (
        <div className="w-full">

            <div className="flex items-center justify-between w-full">

                <div className="flex items-center gap-x-3">

                    {
                        (data?.user?.avatar && data?.user?.avatar?.trim() !== "")
                            ?
                            <img
                                loading="lazy"
                                alt=""
                                src={data?.user?.avatar}
                                className="w-11 h-11 rounded-full object-center object-cover shadow-sm shadow-black/10"
                            />

                            :
                            <div className="w-11 h-11 rounded-full bg-blue-500/80 grid place-items-center">
                                <p className="text-slate-800 text-xs font-[vazir]">{data?.user?.first_name?.[0]}</p>
                            </div>
                    }


                    <p
                        className="text-sm text-slate-800 font-[vazir]"
                    >
                        {data?.user?.first_name}
                    </p>

                </div>

                <Rating_1
                    max={5}
                    positive={Math.floor(data?.rate)}
                />

            </div>

            <div className="mt-5 w-full flex items-center justify-between gap-8">


                <p
                    className="text-xs text-slate-700/95 font-[vazir]"
                >
                    {data?.content}
                </p>

                <p
                    className="text-xs text-blue-700/70 font-[vazir]"
                >
                    {data?.date}
                </p>

            </div>

        </div>
    )
}


interface CommentsSection_1Props {
    comments: Array<CommentOptions>,
    showTopSection?: boolean,
    showJob?: boolean,
    jobId: number,
    jobTitle: string;
}

function CommentsSection_1({ comments, showJob = false, showTopSection = true, jobId, jobTitle }: CommentsSection_1Props) {

    const navigate = useNavigate();

    const handleOnAllCommentsClick = () => {
        navigate(
            ApplicationRoutes.pages.allComments__getPageUrl(jobId),
            {
                state: {
                    job_id: jobId,
                    title: jobTitle
                }
            }
        )
    }

    return (
        <div className="w-full px-4">

            {
                showTopSection
                    ?
                    <div className="flex items-center justify-between mb-12">

                        <div className="flex items-center gap-x-3">
                            <GoCommentDiscussion className="w-5 h-5 fill-blue-500" />
                            <p
                                className="text-sm text-slate-800 font-[vazir]"
                            >
                                نظرات
                            </p>
                        </div>

                        <button
                            onClick={handleOnAllCommentsClick}
                            className="text-xs text-blue-500 font-[vazir] p-2 px-3
                            rounded-lg hover:bg-blue-500/10 transition-all duration-300 cursor-pointer active:scale-95">
                            همه نظرات
                        </button>
                    </div>
                    :
                    false
            }


            <div className="flex flex-col gap-y-6 w-full">
                {
                    comments?.map(comment => (
                        <Comment key={comment?.id} data={comment} />
                    ))
                }
            </div>


        </div>
    )
}

export default CommentsSection_1