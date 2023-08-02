
import useSWR from "swr"
import { useParams } from "react-router-dom"
import Rating_1 from "../../components/Rating_1"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { BsSticky, BsClock, BsBookmark, BsBookmarkFill } from "react-icons/bs"
import { HiHashtag } from "react-icons/hi"
import CommentsSection_1 from "../../components/CommentsSection_1"
import { toggleBookMark } from "../../utils/http/api/toggleBookMark"
import { useEffect, useState } from "react"
import AddCommentModal from "../../components/AddCommentModal"
import { useToast } from "@chakra-ui/react"
import Loading from "../../components/Loading"
import JobImageSlider_1 from "../../components/JobImageSlider_1"
import WeeklyPlanCard_1 from "../../components/WeeklyPlanCard_1"
import getDayNameByIndex from "../../utils/getDayNameByIndex"
import Report from "./components/Report"
import { MdLocationOn } from "react-icons/md"
import MarkPlaceOnMap from "../../components/MarkPlaceOnMap"
import { LatLng } from "leaflet"
import { getSingleJob } from "../../utils/http"
import { HiOutlineSquares2X2 } from "react-icons/hi2"

function SingleJob() {
    const { id: jobId } = useParams()
    const [isBookMarked, setIsBookMarked] = useState(false)
    const toast = useToast()


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
        toggleBookMark({ job_id: job_id })
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

    if (isLoading) return <Loading />
    if (error) return <p>something went wrong</p>

    return (
        <div className="max-lg:h-full h-screen overflow-y-auto pb-8">

            <div className="w-full h-[34rem] md:h-[38rem]">
                <JobImageSlider_1
                    images={data?.job?.medias.map(item => item.url)}
                />
            </div>

            <div className="mt-6 z-10 w-full flex items-center justify-center gap-x-3 relative">

                <div className="flex flex-col gap-y-4 items-center justify-center">

                    <div className="flex items-center gap-x-4">
                        <p
                            className="text-sm text-slate-700 font-[vazir]"
                        >
                            {data?.comments?.length} نظر
                        </p>
                        <Rating_1
                            max={5}
                            positive={Math.floor(data?.job?.rate)}
                        />
                    </div>

                    <button
                        onClick={() => {
                            if (navigator.clipboard) {
                                navigator.clipboard.writeText(location.origin + "/app/jobs/guest/" + jobId)
                                    .then(() => {
                                        toast({
                                            description: "لینک کپی شد",
                                            duration: 2500,
                                            position: "top",
                                            status: "success",
                                            isClosable: false,
                                        })
                                    })
                            }
                        }}
                        className="primary-btn py-2 font-[vazirLight]"
                    >
                        به اشتراک بگذارید
                    </button>
                </div>

                <div className="w-max flex items-center gap-x-3 absolute top-1/2 left-4 -translate-y-1/2">

                    <div onClick={() => onToggleBookMark(data?.job?.id)} className="p-1 rounded-lg hover:bg-transparent/5 self-stretch px-2 grid place-items-center
                    transition-colors duration-300 cursor-pointer">
                        {
                            !isBookMarked
                                ?
                                <BsBookmark className="w-5 h-5 fill-slate-800 pointer-events-none" />
                                :
                                <BsBookmarkFill className="w-5 h-5 fill-slate-800 pointer-events-none" />
                        }
                    </div>

                    <Report
                        job_id={data?.job?.id}
                    />
                </div>
            </div>

            {/* <div className="flex items-center gap-x-2 px-4 mt-6">
                <div
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
                    className="text-sm text-slate-800 font-[vazir]"
                >
                    محبوبیت
                </p>
            </div> */}


            <div className="flex items-center gap-x-2 px-4 mt-9">
                <IoIosInformationCircleOutline className="w-5 h-5 fill-blue-500" />

                <p
                    className="text-sm text-slate-800 font-[vazir]"
                >
                    اطلاعات مجموعه
                </p>
            </div>

            <div className="mt-4 w-full px-5">
                <div className="w-full rounded-xl bg-blue-500/10 p-5 flex flex-col gap-y-4">

                    <p
                        className="text-xs text-slate-500 font-[vazir]"
                    >
                        نام مجموعه :&nbsp;&nbsp;
                        <span className="text-slate-800 font-[vazir]">{data?.job?.title}</span>
                    </p>

                    <p
                        className="text-xs text-slate-500 font-[vazir]"
                    >
                        شهر :&nbsp;&nbsp;
                        <span className="text-slate-800 font-[vazir]">{data?.job?.city}</span>
                    </p>

                    <p
                        className="text-xs text-slate-500 font-[vazir]"
                    >
                        شماره تماس :&nbsp;&nbsp;
                        <div
                            className="inline-flex items-center gap-x-2.5"
                        >
                            {
                                data?.job?.phones?.map(phone => (
                                    <a href={"tel:" + phone} key={phone} className="text-blue-500 font-[vazir]">{phone}</a>
                                ))
                            }
                        </div>
                    </p>

                    <p
                        className="text-xs text-slate-500 font-[vazir]"
                    >
                        آدرس :&nbsp;&nbsp;
                        <span className="text-slate-800 font-[vazir]">{data?.job?.address}</span>
                    </p>

                </div>
            </div>


            <div className="flex items-center gap-x-2 px-4 mt-9">
                <HiOutlineSquares2X2 className="w-5 h-5 stroke-blue-500 fill-transparent" />

                <p
                    className="text-sm text-slate-800 font-[vazir]"
                >
                    دسته بندی
                </p>
            </div>

            <div className="flex items-center gap-x-2 px-4 mt-4 flex-nowrap overflow-x-auto pb-2">

                {
                    data?.job?.categories?.map(category => (
                        <p key={category.id} className="py-1.5 cursor-default px-3 rounded-3xl text-xs text-slate-800 font-[vazir] bg-blue-500/30">
                            {category.name}
                        </p>
                    ))
                }

            </div>


            <div className="flex items-center gap-x-2 px-4 mt-9">
                <BsSticky className="w-5 h-5 fill-blue-500" />

                <p
                    className="text-sm text-slate-800 font-[vazir]"
                >
                    توضیحات
                </p>
            </div>

            <div className="mt-4 w-full px-5">
                <div className="w-full rounded-xl bg-blue-500/10 p-5 flex flex-col gap-y-4">

                    <p
                        className="text-xs text-slate-800 font-[vazir]"
                    >
                        {data?.job?.description}
                    </p>

                </div>
            </div>


            <div className="flex items-center gap-x-2 px-4 mt-9">
                <HiHashtag className="w-5 h-5 fill-blue-500" />

                <p
                    className="text-sm text-slate-800 font-[vazir]"
                >
                    هشتگ
                </p>
            </div>

            <div className="flex items-center gap-x-2 px-4 mt-4 flex-nowrap overflow-x-auto pb-2">

                {
                    data?.job?.hashtags?.map(hastag => (
                        <p className="py-1.5 cursor-default px-3 rounded-3xl text-xs text-slate-800 font-[vazir] bg-blue-500/30">
                            {hastag}
                        </p>
                    ))
                }

            </div>

            <div className="mt-9 w-full px-4">
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center gap-x-2">
                        <MdLocationOn className="w-[1.35rem] h-[1.35rem] fill-blue-500" />
                        <p
                            className="text-sm text-slate-800 font-[vazir]"
                        >
                            موقعیت مکانی
                        </p>
                    </div>

                    <a
                        href={`https://www.google.com/maps?q=${data?.job?.lat},${data?.job?.lng}`}
                        target="_blank"
                        className="text-sm text-blue-500 font-[vazir] py-1.5 px-2.5 rounded-xl hover:bg-blue-500/5
                        transition-colors duration-300"
                    >
                        ورود به مسیریابی
                    </a>
                </div>

                <div className="mt-6 z-10 w-full max-w-4xl mx-auto">
                    <MarkPlaceOnMap
                        zoom={16}
                        latlng={[
                            {
                                latlng: new LatLng(data?.job?.lat, data?.job?.lng),
                                title: data?.job?.title
                            }
                        ]}
                    />
                </div>

            </div>


            <div className="flex items-center gap-x-2 px-4 mt-12">
                <BsClock className="w-5 h-5 fill-blue-500" />

                <p
                    className="text-sm text-slate-800 font-[vazir]"
                >
                    ساعات کاری مجموعه
                </p>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-4">

                {
                    data?.plan?.map((plan, i) => (
                        <WeeklyPlanCard_1
                            key={plan.day}
                            {...plan}
                            day_name={getDayNameByIndex(plan.day)}
                        />
                    ))
                }

            </div>

            {
                data?.comments?.length > 0
                    ?
                    <div className="mt-16 w-full">
                        <CommentsSection_1 jobTitle={data?.job?.title} jobId={data?.job?.id} comments={data?.comments} />
                    </div>
                    :
                    false
            }
            <AddCommentModal
                title="ثبت نظر"
                job_id={data.job.id}
                onSuccess={() => {
                    toast({
                        title: "عملیات موفق",
                        description: "نظرتان با موفقیت به ما ارسال شد",
                        status: "success",
                        duration: 4000,
                        isClosable: true,
                        position: "top-right"
                    })
                }}
            >
                <button
                    className="primary-btn mt-20 w-11/12 mx-auto bg-transparent border
                    border-blue-500 block py-2 text-blue-500"
                >
                    ثبت نظر
                </button>
            </AddCommentModal>


        </div>
    )
}

export default SingleJob