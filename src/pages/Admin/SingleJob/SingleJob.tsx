
import useSWR from "swr"
import { useLocation, useParams } from "react-router-dom"
import { getSingleJob, getSingleJobOutPut } from "../../../utils/http/api/getSingleJob"
import Rating_1 from "../../../components/Rating_1"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { LuEdit } from "react-icons/lu"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { BsSticky, BsClock, BsTelephone } from "react-icons/bs"
import { HiHashtag } from "react-icons/hi"
import CommentsSection_1 from "../../../components/CommentsSection_1"
import { toggleBookMark } from "../../../utils/http/api/toggleBookMark"
import { useEffect, useState } from "react"
import AddCommentModal from "../../../components/AddCommentModal"
import { useToast } from "@chakra-ui/react"
import Loading from "../../../components/Loading"
import JobImageSlider_1 from "../../../components/JobImageSlider_1"
import WeeklyPlanCard_1 from "../../../components/WeeklyPlanCard_1"
import getDayNameByIndex from "../../../utils/getDayNameByIndex"
import { MdLocationOn } from "react-icons/md"
import MarkPlaceOnMap from "../../../components/MarkPlaceOnMap"
import Modal_2 from "../../../components/Modal_2"
import EditTextField from "./components/EditTextField"
import AddPhoneNumber_1, { PhonesOptions } from "../../../components/AddPhoneNumber_1"
import TextInput_1 from "../../../components/TextInput_1"
import { updateJob } from "../../../utils/http/api/updateJob"
import { useApplicationLoadingStore } from "../../../stores/useApplicationLoadingStore"
import { LatLng, latLng } from "leaflet"

function AdminSingleJob() {
    const { id: jobId } = useParams()
    const [isBookMarked, setIsBookMarked] = useState(false)
    const toast = useToast()
    const [phones, setPhones] = useState<Array<PhonesOptions>>(undefined)
    const setIsLoading = useApplicationLoadingStore(selector => selector.setIsLoading)


    const {
        data,
        error,
        isLoading
    } = useSWR(
        "admin/job/view/" + jobId,
        async () => getSingleJob({ jobId: parseInt(jobId) }),
        {
            shouldRetryOnError: false
        }
    )

    const [jobData, setJobdata] = useState<getSingleJobOutPut>(undefined)

    useEffect(
        () => {
            if (data && !isLoading && !jobData) {
                setJobdata(data)
                setPhones(data.job.phones.map((phone => ({ id: parseInt(phone), value: phone }))))
            }
        },
        [data, isLoading]
    )

    // const onToggleBookMark = (job_id: number) => {
    //     toggleBookMark({ job_id: job_id })
    //         .then(data => {
    //             setIsBookMarked(jobData?.is_bookmarked)
    //         })
    // }

    // useEffect(
    //     () => {
    //         setIsBookMarked(jobData?.is_bookmarked)
    //     },
    //     [jobData?.is_bookmarked]
    // )

    const handleSaveChanges = () => {
        setIsLoading(true)
        updateJob({
            id: jobId,
            address: jobData.job.address,
            title: jobData.job.title,
            desc: jobData.job.description,
            phones: phones.map(phone => phone.value)
        })
            .then(data => {
                toast({
                    description: data.message,
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                    status: "success"
                })
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
                toast({
                    description: "مشکلی رخ داد. لطفا بعدا دوباره امتحان کنید",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                    status: "error"
                })
            })
    }


    if (isLoading || !jobData) return <Loading />
    if (error) return <p>something went wrong</p>

    return (
        <div className="max-lg:h-full h-screen overflow-y-auto pb-8">

            <div className="w-full h-[34rem] md:h-[38rem]">
                <JobImageSlider_1
                    images={jobData?.job?.medias.map(item => item.url)}
                />
            </div>

            <div className="mt-6 z-10 w-full flex items-center justify-center gap-x-3 relative">

                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <Rating_1
                        max={5}
                        positive={Math.floor(jobData?.job?.rate)}
                    />

                    {/* <button
                        onClick={() => {
                            if (navigator.clipboard) {
                                navigator.clipboard.writeText(location.origin + "/jobs/guest/" + jobId)
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
                    </button> */}
                </div>
            </div>

            {/* <div className="flex items-center gap-x-2 px-4 mt-6">
                <div
                    onClick={() => onToggleBookMark(jobData?.job.id)}
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
                        className="text-xs text-slate-500 font-[vazir] flex items-center"
                    >
                        نام مجموعه :&nbsp;&nbsp;
                        <span className="text-slate-800 font-[vazir]">{jobData?.job?.title}</span>
                        &nbsp;&nbsp;&nbsp;
                        <EditTextField
                            title="تغییر نام"
                            placeHolder="نام جدید را وارد کنید"
                            onChange={(newData) => {
                                setJobdata(prev => {
                                    const data = prev;
                                    data.job.title = newData
                                    return { ...data }
                                })
                            }}
                        />
                    </p>

                    {/* <p
                        className="text-xs text-slate-500 font-[vazir]"
                    >
                        نام گروه :&nbsp;&nbsp;
                        <span className="text-slate-800 font-[vazir]"></span>
                    </p> */}

                    <p
                        className="text-xs text-slate-500 font-[vazir]"
                    >
                        شماره تماس :&nbsp;&nbsp;
                        <div
                            className="inline-flex items-center gap-x-2.5"
                        >
                            {
                                phones?.map(phone => (
                                    <a href={"tel:" + phone.value} key={phone.id} className="text-blue-500 font-[vazir]">{phone.value}</a>
                                ))
                            }
                        </div>
                        <Modal_2
                            title="افزودن شماره تماس"
                            modalBody={
                                <div className="w-full space-y-3 pb-2">
                                    <AddPhoneNumber_1
                                        phoneNumbers={phones}
                                        setPhoneNumbers={(phones) => {
                                            setPhones(phones)
                                        }}
                                    />
                                </div>
                            }
                        >
                            <TextInput_1
                                data={phones?.map(phone => phone?.value)?.join(" - ")}
                                placeHolder="شماره تماس"
                                icon={<BsTelephone className="w-[1.15rem] h-[1.15rem] fill-blue-500 stroke-blue-500" />}
                            />
                        </Modal_2>
                    </p>

                    <p
                        className="text-xs text-slate-500 font-[vazir] flex items-center"
                    >
                        آدرس :&nbsp;&nbsp;
                        <span className="text-slate-800 font-[vazir]">{jobData?.job?.address}</span>
                        &nbsp;&nbsp;&nbsp;
                        <EditTextField
                            title="تغییر آدرس"
                            placeHolder="آدرس جدید را وارد کنید"
                            onChange={(newData) => {
                                setJobdata(prev => {
                                    const data = prev;
                                    data.job.address = newData
                                    return { ...data }
                                })
                            }}
                        />
                    </p>

                </div>
            </div>


            <div className="flex items-center gap-x-2 px-4 mt-9">
                <BsSticky className="w-5 h-5 fill-blue-500" />

                <p
                    className="text-sm text-slate-800 font-[vazir] flex items-center"
                >
                    توضیحات
                    <EditTextField
                        textArea={true}
                        title="تغییر توضیحات"
                        placeHolder="توضیحات جدید را وارد کنید"
                        onChange={(newData) => {
                            setJobdata(prev => {
                                const data = prev;
                                data.job.description = newData
                                return { ...data }
                            })
                        }}
                    />

                </p>
            </div>

            <div className="mt-4 w-full px-5">
                <div className="w-full rounded-xl bg-blue-500/10 p-5 flex flex-col gap-y-4">

                    <p
                        className="text-xs text-slate-800 font-[vazir]"
                    >
                        {jobData?.job?.description}
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

            <div className="flex items-center gap-x-2 px-4 mt-4">

                {
                    jobData?.job?.hashtags?.map(hastag => (
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
                        href={`https://www.google.com/maps?q=${jobData?.job?.lat},${jobData?.job?.lng}`}
                        target="_blank"
                        className="text-sm text-blue-500 font-[vazir] py-1.5 px-2.5 rounded-xl hover:bg-blue-500/5
                        transition-colors duration-300"
                    >
                        ورود به مسیریابی
                    </a>
                </div>

                <div className="mt-6 w-full max-w-4xl mx-auto">
                    <MarkPlaceOnMap
                        zoom={16}
                        latlng={[
                            {
                                latlng: new LatLng(jobData?.job?.lat, jobData?.job?.lng),
                                title: jobData?.job?.title
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
                    jobData?.plan?.map((plan, i) => (
                        <WeeklyPlanCard_1
                            key={plan.day}
                            {...plan}
                            day_name={getDayNameByIndex(plan.day)}
                        />
                    ))
                }

            </div>

            {
                jobData?.comments?.length > 0
                    ?
                    <div className="mt-16 w-full">
                        <CommentsSection_1 jobTitle={jobData?.job?.title} jobId={jobData?.job?.id} comments={jobData?.comments} />
                    </div>
                    :
                    false
            }
            {/* <AddCommentModal
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
            </AddCommentModal> */}

            <button onClick={handleSaveChanges} className="primary-btn mt-20 w-full max-w-sm block mx-auto">
                ذخیره تغییرات
            </button>

        </div>
    )
}

export default AdminSingleJob