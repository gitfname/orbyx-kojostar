
import useSWR from "swr"
import { useParams } from "react-router-dom"
import { getSingleJob } from "../utils/http/api/getSingleJob"
import Rating_1 from "../components/Rating_1"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { BsSticky, BsClock } from "react-icons/bs"
import { HiHashtag } from "react-icons/hi"
import CommentsSection_1 from "../components/CommentsSection_1"
import { toggleBookMark } from "../utils/http/api/toggleBookMark"
import useUserStore from "../stores/userStore"
import { useEffect, useState } from "react"

function getDayNameByIndex(index) {
    let dayName = 'شنبه'
    switch (index) {
        case 0:
            dayName = "شنبه"
            break;
        case 1:
            dayName = "یکشنبه"
            break;
        case 2:
            dayName = "دو شنبه"
            break;
        case 3:
            dayName = "سه شنبه"
            break;
        case 4:
            dayName = "چهار شنبه"
            break;
        case 5:
            dayName = "پنج شنبه"
            break;
        case 6:
            dayName = "جمعه"
            break;
    }
    return dayName
}

function SingleJob() {
    const { id: jobId } = useParams()
    const [isBookMarked, setIsBookMarked] = useState(false)

    const {
        data,
        error,
        isLoading
    } = useSWR(
        "job/view/" + jobId,
        async () => getSingleJob({ jobId: parseInt(jobId) }),
        {
            shouldRetryOnError: false
        }
    )
    
    const onToggleBookMark = (job_id: number) => {
        toggleBookMark({job_id: job_id})
        .then(data => {
            setIsBookMarked(data?.is_bookmarked)
        })
    }

    useEffect(
        () => {
            setIsBookMarked(data?.is_bookmarked)
        },
        [data?.is_bookmarked]
    )


    if (isLoading) return <p>loading</p>
    if (error) return <p>something went wrong</p>

    return (
        <div className="h-screen overflow-y-auto pb-32">

            {
                (data?.job?.medias && data?.job?.medias?.length > 0)
                    ?
                    <img
                        alt=""
                        src={data?.job?.medias[0]?.url}
                        className="w-full h-[26rem] object-center object-cover shadow-md shadow-black/10"
                    />
                    :
                    <div dir="ltr" className="w-full h-[20rem] bg-slate-200 grid items-center">
                        <p className="text-3xl text-center font-[iranyekan600] text-slate-600">No Image :(</p>
                    </div>
            }


            <div className="mt-6 w-full flex items-center justify-center gap-x-3">
                <Rating_1
                    max={5}
                    positive={Math.floor(data?.job?.rate)}
                />
            </div>

            <div className="flex items-center gap-x-2 px-4 mt-6">
                <div
                    onClick={() => onToggleBookMark(data?.job.id)}
                    className="p-1.5 rounded-lg hover:bg-transparent/5 active:scale-95 transition-transform duration-300
                    cursor-pointer"
                >
                    {
                        isBookMarked
                            ?
                            <AiFillHeart className="w-5 h-5 fill-blue-500" />
                            :
                            <AiOutlineHeart className="w-5 h-5 fill-blue-500" />
                    }
                </div>

                <p
                    className="text-sm text-slate-800 font-[iranyekan400]"
                >
                    محبوبیت
                </p>
            </div>


            <div className="flex items-center gap-x-2 px-4 mt-9">
                <IoIosInformationCircleOutline className="w-5 h-5 fill-blue-500" />

                <p
                    className="text-sm text-slate-800 font-[iranyekan400]"
                >
                    اطلاعات مجموعه
                </p>
            </div>

            <div className="mt-4 w-full px-5">
                <div className="w-full rounded-xl bg-blue-500/10 p-5 flex flex-col gap-y-4">

                    <p
                        className="text-xs text-slate-500 font-[iranyekan300]"
                    >
                        نام مجموعه :&nbsp;&nbsp;
                        <span className="text-slate-800 font-[iranyekan400]">{data?.job?.title}</span>
                    </p>

                    <p
                        className="text-xs text-slate-500 font-[iranyekan300]"
                    >
                        نام گروه :&nbsp;&nbsp;
                        <span className="text-slate-800 font-[iranyekan400]"></span>
                    </p>

                    <p
                        className="text-xs text-slate-500 font-[iranyekan300]"
                    >
                        شماره تماس :&nbsp;&nbsp;
                        <div
                            className="inline-flex items-center gap-x-2.5"
                        >
                            {
                                data?.job?.phones?.map(phone => (
                                    <span key={phone} className="text-blue-500 cursor-pointer font-[iranyekan400]">{phone}</span>
                                ))
                            }
                        </div>
                    </p>

                    <p
                        className="text-xs text-slate-500 font-[iranyekan300]"
                    >
                        آدرس :&nbsp;&nbsp;
                        <span className="text-slate-800 font-[iranyekan400]">{data?.job?.address}</span>
                    </p>

                </div>
            </div>


            <div className="flex items-center gap-x-2 px-4 mt-9">
                <BsSticky className="w-5 h-5 fill-blue-500" />

                <p
                    className="text-sm text-slate-800 font-[iranyekan400]"
                >
                    توضیحات
                </p>
            </div>

            <div className="mt-4 w-full px-5">
                <div className="w-full rounded-xl bg-blue-500/10 p-5 flex flex-col gap-y-4">

                    <p
                        className="text-xs text-slate-800 font-[iranyekan300]"
                    >
                        {data?.job?.description}
                    </p>

                </div>
            </div>


            <div className="flex items-center gap-x-2 px-4 mt-9">
                <HiHashtag className="w-5 h-5 fill-blue-500" />

                <p
                    className="text-sm text-slate-800 font-[iranyekan400]"
                >
                    هشتگ
                </p>
            </div>

            <div className="flex items-center gap-x-2 px-4 mt-4">

                {
                    data?.job?.hashtags?.map(hastag => (
                        <p className="py-1.5 cursor-default px-3 rounded-3xl text-xs text-slate-800 font-[iranyekan300] bg-blue-500/30">
                            {hastag}
                        </p>
                    ))
                }

            </div>


            <div className="flex items-center gap-x-2 px-4 mt-9">
                <BsClock className="w-5 h-5 fill-blue-500" />

                <p
                    className="text-sm text-slate-800 font-[iranyekan400]"
                >
                    ساعات کاری مجموعه
                </p>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3 px-4">

                {
                    data?.plan?.map(plan => (
                        <div className={`flex flex-col gap-y-2 py-4 justify-center border border-blue-500 ${plan?.is_holiday ? "bg-blue-500/20" : "bg-white"} rounded-xl`}>
                            <p
                                className="text-center text-slate-800 text-xs font-[iranyekan400]"
                            >
                                {getDayNameByIndex(plan?.day)}
                            </p>
                            {
                                plan?.is_holiday
                                    ?
                                    <p
                                        className="text-center text-slate-800 text-xs font-[iranyekan400]"
                                    >
                                        تعطیل
                                    </p>
                                    :
                                    <>
                                        <p
                                            className="text-center text-slate-800 text-xs font-[iranyekan400]"
                                        >
                                            {plan?.start_morning_time} - {plan?.end_morning_time}
                                        </p>
                                        <p
                                            className="text-center text-slate-800 text-xs font-[iranyekan400]"
                                        >
                                            {plan?.start_afternoon_time} - {plan?.end_afternoon_time}
                                        </p>
                                    </>
                            }
                        </div>
                    ))
                }

            </div>

            <div className="mt-16 w-full">
                <CommentsSection_1 comments={data?.comments} />
            </div>

        </div>
    )
}

export default SingleJob