
import { GoCommentDiscussion } from "react-icons/go"
import Rating_1 from "./Rating_1"

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
                                <p className="text-slate-800 text-xs font-[iranyekan300]">{data?.user?.first_name?.[0]}</p>
                            </div>
                    }


                    <p
                        className="text-sm text-slate-800 font-[iranyekan400]"
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
                    className="text-xs text-slate-700/95 font-[iranyekan400]"
                >
                    {data?.content}
                </p>

                <p
                    className="text-xs text-blue-700/70 font-[iranyekan400]"
                >
                    {data?.date}
                </p>

            </div>

        </div>
    )
}


interface CommentsSection_1Props {
    comments: Array<CommentOptions>
}

function CommentsSection_1({ comments }: CommentsSection_1Props) {

    return (
        <div className="w-full px-4">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-x-3">
                    <GoCommentDiscussion className="w-5 h-5 fill-blue-500" />
                    <p
                        className="text-sm text-slate-800 font-[iranyekan400]"
                    >
                        نظرات
                    </p>
                </div>

                <p className="text-xs text-blue-500 font-[iranyekan400]">
                    همه نظرات
                </p>
            </div>

            <div className="mt-12 flex flex-col gap-y-6 w-full">
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