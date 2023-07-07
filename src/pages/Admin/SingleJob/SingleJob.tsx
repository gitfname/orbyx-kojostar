
import useSWR from "swr"
import { useLocation, useParams } from "react-router-dom"
import { getSingleJob, getSingleJobOutPut } from "../../../utils/http/api/getSingleJob"
import Rating_1 from "../../../components/Rating_1"
import { AiOutlineHeart, AiFillHeart, AiOutlinePlusCircle, AiOutlinePlus } from "react-icons/ai"
import { LuEdit } from "react-icons/lu"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { BsSticky, BsClock, BsTelephone } from "react-icons/bs"
import { HiHashtag } from "react-icons/hi"
import CommentsSection_1 from "../../../components/CommentsSection_1"
import { toggleBookMark } from "../../../utils/http/api/toggleBookMark"
import { useEffect, useRef, useState } from "react"
import AddCommentModal from "../../../components/AddCommentModal"
import { useToast } from "@chakra-ui/react"
import Loading from "../../../components/Loading"
import JobImageSlider_1 from "../../../components/JobImageSlider_1"
import WeeklyPlanCard_1 from "../../../components/WeeklyPlanCard_1"
import getDayNameByIndex from "../../../utils/getDayNameByIndex"
import { MdLocationOn, MdOutlineCancel } from "react-icons/md"
import MarkPlaceOnMap from "../../../components/MarkPlaceOnMap"
import Modal_2 from "../../../components/Modal_2"
import EditTextField from "./components/EditTextField"
import AddPhoneNumber_1, { PhonesOptions } from "../../../components/AddPhoneNumber_1"
import TextInput_1 from "../../../components/TextInput_1"
import { updateJob } from "../../../utils/http/api/updateJob"
import { useApplicationLoadingStore } from "../../../stores/useApplicationLoadingStore"
import { LatLng, latLng } from "leaflet"
import { BiBarChart } from "react-icons/bi"
import { v4 as uuidv4 } from "uuid"
import dayjs, { Dayjs } from "dayjs"
import { GetWeeklyPlan } from "../../../components/GetWeeklyPlansModal_1"
import GetPickImages from "../../../components/GetPickImages/GetPickImages"
import Status_1 from "../../../components/Status_1"
import { getSingleJobFromAdminRoute } from "../../../utils/http"
import JobStatus from "./components/JobStatus"


interface WeeklyPlans {
    start_morning_time?: Dayjs;
    end_morning_time?: Dayjs;
    start_afternoon_time?: Dayjs;
    end_afternoon_time?: Dayjs;
    is_holiday: boolean;
    is_morning_holiday: boolean;
    is_afternoon_holiday: boolean;
    day: number;
}

const convertDayJsToString = (time: Dayjs) => {
    if (time?.format) {
        return time?.format("HH") + ":" + time.format("mm")
    }
    return undefined
}

const getDayJsTimeOrDefaultValue = (time: Dayjs, hour: number = 8, minute: number = 0) => {
    return time ? time : dayjs().set("hour", hour).set("minute", minute)
}

interface addPlanProps {
    setWeeklyPlan;
    dayIndex: number,
    prevData: Array<WeeklyPlans>
}
const addPlan = ({ prevData, setWeeklyPlan, dayIndex }: addPlanProps) => {
    console.log(dayIndex);

    setWeeklyPlan([
        ...prevData,
        {
            day: dayIndex,
            is_morning_holiday: false,
            is_afternoon_holiday: false,
            is_holiday: false,
            start_morning_time: dayjs().set("hour", 8).set("minute", 0),
            end_morning_time: dayjs().set("hour", 14).set("minute", 0),
            start_afternoon_time: dayjs().set("hour", 18).set("minute", 0),
            end_afternoon_time: dayjs().set("hour", 23).set("minute", 0)
        }
    ])
}

const firstUndefiendIndexOfWeeklyPlan = (arr: Array<WeeklyPlans>): number => {
    const indexes = Array.from({ length: 7 });
    arr.forEach(item => indexes[item.day] = item.day)
    return indexes.findIndex(item => typeof item === "undefined")
}

function AdminSingleJob() {
    const { id: jobId } = useParams()
    const [isBookMarked, setIsBookMarked] = useState(false)
    const toast = useToast()
    const [phones, setPhones] = useState<Array<PhonesOptions>>(undefined)
    const setIsLoading = useApplicationLoadingStore(selector => selector.setIsLoading)
    const [hashtags, setHashtags] = useState<Array<{ value: string, id: string }>>(undefined)
    const hashtagRef = useRef<HTMLInputElement>(undefined)
    const [geolocatoinPos, setGeolocatoinPos] = useState<LatLng>(undefined)
    const oldImagesRef = useRef<Array<string>>([])
    const newImagesRef = useRef<Array<File>>([])
    const jobStatusRef = useRef<-1 | 0 | 1>(undefined)
    const [weeklyPlan, setWeeklyPlan] = useState<Array<WeeklyPlans>>([])

    const {
        data,
        error,
        isLoading
    } = useSWR(
        "admin/job/view/" + jobId,
        async () => getSingleJobFromAdminRoute({ jobId: parseInt(jobId) }),
        {
            shouldRetryOnError: false,
            focusThrottleInterval: 5000,
            revalidateOnFocus: true
        }
    )

    const [jobData, setJobdata] = useState<getSingleJobOutPut>(undefined)

    useEffect(
        () => {
            if (data && !isLoading && !jobData) {
                setJobdata(data)
                setPhones(data.job.phones.map((phone => ({ id: parseInt(phone), value: phone }))))
                setHashtags(data.job.hashtags.map(hashtag => ({ id: hashtag, value: hashtag })))
                jobStatusRef.current = data.job.status

                const convertStringToDayJs = (time: string) => {
                    if (time?.split) {
                        const [hour, minute] = time.split(":")
                        const today = dayjs()
                            .set("hour", parseInt(hour))
                            .set("minute", parseInt(minute))
                        return today
                    }
                    return undefined
                }

                setWeeklyPlan(data.plan.map(plan => {
                    console.log(typeof plan?.start_afternoon_time === "string");

                    return {
                        is_holiday: plan.is_holiday,
                        start_afternoon_time: plan.start_afternoon_time ? convertStringToDayJs(plan.start_afternoon_time) : null,
                        end_afternoon_time: plan.end_afternoon_time ? convertStringToDayJs(plan.end_afternoon_time) : null,
                        start_morning_time: plan.start_morning_time ? convertStringToDayJs(plan.start_morning_time) : null,
                        end_morning_time: plan.end_morning_time ? convertStringToDayJs(plan.end_morning_time) : null,
                        is_afternoon_holiday: plan.start_afternoon_time ? false : true,
                        is_morning_holiday: plan.start_morning_time ? false : true,
                        day: plan.day
                    }
                }))
            }
        },
        [data, isLoading]
    )

    useEffect(
        () => {
            if (weeklyPlan) {
                weeklyPlan.forEach(plan => {
                    console.log(plan);
                })
            }
        },
        [weeklyPlan]
    )

    const handleSaveChanges = () => {
        setIsLoading(true)
        updateJob({
            id: jobId,
            address: jobData.job.address,
            title: jobData.job.title,
            desc: jobData.job.description,
            phones: phones.map(phone => phone.value),
            hashtags: hashtags.map(hashtag => hashtag.value).join("|"),
            dailyPlans: weeklyPlan.map((plan, i) => ({
                dayIndex: i,
                is_holiday: plan.is_holiday,
                start_morning_time: plan.is_morning_holiday ? null : `${plan.start_morning_time.format("HH")}:${plan.start_morning_time.format("mm")}`,
                end_morning_time: plan.is_morning_holiday ? null : `${plan.end_morning_time.format("HH")}:${plan.end_morning_time.format("mm")}`,
                start_afternoon_time: plan.is_afternoon_holiday ? null : `${plan.start_afternoon_time.format("HH")}:${plan.start_afternoon_time.format("mm")}`,
                end_afternoon_time: plan.is_afternoon_holiday ? null : `${plan.end_afternoon_time.format("HH")}:${plan.end_afternoon_time.format("mm")}`
            })),
            lat: geolocatoinPos?.lat?.toString(),
            lng: geolocatoinPos?.lng?.toString(),
            oldImages: oldImagesRef.current,
            newImages: newImagesRef.current,
            status: jobStatusRef.current
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

            <div className="w-full min-h-[34rem] md:min-h-[38rem] p-4">
                {/* <JobImageSlider_1
                    images={jobData?.job?.medias.map(item => item.url)}
                /> */}
                <GetPickImages
                    initialImages={jobData?.job?.medias.map(image => image.url)}
                    onChange={(oldImages, newImages) => {
                        oldImagesRef.current = oldImages
                        newImagesRef.current = newImages
                    }}
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
                        className="text-xs text-slate-500 font-[vazir] flex items-center"
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
                        &nbsp;&nbsp;
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
                            <div className="p-1.5 rounded-lg hover:bg-emerald-500/10 cursor-pointer transition-colors duration-300">
                                <LuEdit
                                    className="w-4 h-4 fill-transparent stroke-emerald-500"
                                />
                            </div>
                            {/* <TextInput_1
                                data={phones?.map(phone => phone?.value)?.join(" - ")}
                                placeHolder="شماره تماس"
                                icon={<BsTelephone className="w-[1.15rem] h-[1.15rem] fill-blue-500 stroke-blue-500" />}
                            /> */}
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

                    <p
                        className="text-xs text-slate-500 font-[vazir] flex items-center"
                    >
                        وضعیت :&nbsp;&nbsp;
                        <JobStatus status={jobStatusRef.current} onChange={(status) => jobStatusRef.current = status} />
                        &nbsp;&nbsp;&nbsp;
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
                    className="text-sm text-slate-800 font-[vazir] flex items-center"
                >
                    هشتگ
                    &nbsp;&nbsp;
                    <Modal_2
                        title="هشتگ"
                        modalBody={
                            <div className="w-full space-y-3 pb-2">
                                <TextInput_1
                                    ref={hashtagRef}
                                    placeHolder="هشتگ"
                                    icon={<BiBarChart className="w-5 h-5 fill-blue-500 stroke-blue-500" />}
                                    debounce={0}
                                    onBeforeChange={data => {
                                        if (data.trim() === "") return false
                                        if (data.endsWith(" ")) {
                                            setHashtags(prev => {
                                                if (prev) {
                                                    return [...prev, { id: uuidv4(), value: data.trim() }]
                                                }
                                                return [{ id: uuidv4(), value: data.trim() }]
                                            })
                                            return ""
                                        }
                                        return true
                                    }}
                                />
                            </div>
                        }
                    >
                        <div className="p-1.5 rounded-lg hover:bg-emerald-500/10 cursor-pointer transition-colors duration-300">
                            <LuEdit
                                className="w-4 h-4 fill-transparent stroke-emerald-500"
                            />
                        </div>
                    </Modal_2>
                </p>
            </div>

            <div className="flex items-center gap-x-2 px-4 mt-4">
                {
                    hashtags?.length > 0
                        ?
                        <div className="flex items-center gap-x-2 mt-3">
                            {
                                hashtags?.map(item => (
                                    <p
                                        onClick={() => {
                                            setHashtags(prev => prev.filter(prevItem => prevItem.id !== item.id))
                                        }}
                                        key={item.id}
                                        className=" select-none py-1 px-2 flex-wrap rounded-lg bg-blue-500/5 hover:bg-blue-500/20
                                            transition-colors duration-300 cursor-pointer text-sm font-[vazir]"
                                    >{item.value}</p>
                                ))
                            }
                        </div>
                        :
                        null
                }
            </div>


            {/* map */}
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
                        markable={true}
                        zoom={16}
                        onChange={(pos) => {
                            setGeolocatoinPos(pos)
                        }}
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

            {
                weeklyPlan?.length > 0
                    ?
                    <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-4 w-full">
                        {
                            weeklyPlan.map((plan, index) => (
                                <GetWeeklyPlan
                                    index={index}
                                    show_is_holiday={true}
                                    is_holiday={plan.is_holiday}
                                    startMorningTime={weeklyPlan[index].start_morning_time}
                                    endMorningTime={weeklyPlan[index].end_morning_time}
                                    startAfternoonTime={weeklyPlan[index].start_afternoon_time}
                                    endAfternoonTime={weeklyPlan[index].end_afternoon_time}
                                    is_afternoon_holiday={weeklyPlan[index].is_afternoon_holiday}
                                    is_morning_holiday={weeklyPlan[index].is_morning_holiday}
                                    show_is_afternoon_holiday={true}
                                    show_is_morning_holiday={true}
                                    onIsHolidayChange={(index, is_holiday) => {

                                        const plans: Array<WeeklyPlans> = []
                                        Array.from({ length: weeklyPlan.length }).forEach((v, i) => {
                                            if (i === index) {
                                                plans.push({
                                                    day: weeklyPlan[index].day,
                                                    start_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_morning_time, 8),
                                                    end_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_morning_time, 14),
                                                    start_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_afternoon_time, 16),
                                                    end_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_afternoon_time, 22),
                                                    is_holiday: is_holiday,
                                                    is_afternoon_holiday: weeklyPlan[i]?.is_afternoon_holiday,
                                                    is_morning_holiday: weeklyPlan[i]?.is_morning_holiday
                                                })
                                            }
                                            else {
                                                plans.push({
                                                    day: weeklyPlan[i].day,
                                                    start_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_morning_time, 8),
                                                    end_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_morning_time, 14),
                                                    start_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_afternoon_time, 16),
                                                    end_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_afternoon_time, 22),
                                                    is_holiday: weeklyPlan[i]?.is_holiday,
                                                    is_afternoon_holiday: weeklyPlan[i]?.is_afternoon_holiday,
                                                    is_morning_holiday: weeklyPlan[i]?.is_morning_holiday
                                                })
                                            }
                                        })
                                        setWeeklyPlan(plans)
                                    }}
                                    setMorningTime={data => {
                                        const plans: Array<WeeklyPlans> = []

                                        Array.from({ length: weeklyPlan.length }).forEach((v, i) => {
                                            if (i === index) {
                                                plans.push({
                                                    day: weeklyPlan[index]?.day,
                                                    start_morning_time: getDayJsTimeOrDefaultValue(data.start_morning_time, 8),
                                                    end_morning_time: getDayJsTimeOrDefaultValue(data.end_morning_time, 14),
                                                    start_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_afternoon_time, 16),
                                                    end_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_afternoon_time, 22),
                                                    is_holiday: weeklyPlan[i]?.is_holiday,
                                                    is_afternoon_holiday: weeklyPlan[i]?.is_afternoon_holiday,
                                                    is_morning_holiday: weeklyPlan[i]?.is_morning_holiday
                                                })
                                            }
                                            else {
                                                plans.push({
                                                    day: weeklyPlan[i].day,
                                                    start_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_morning_time, 8),
                                                    end_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_morning_time, 14),
                                                    start_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_afternoon_time, 16),
                                                    end_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_afternoon_time, 22),
                                                    is_holiday: weeklyPlan[i]?.is_holiday,
                                                    is_afternoon_holiday: weeklyPlan[i]?.is_afternoon_holiday,
                                                    is_morning_holiday: weeklyPlan[i]?.is_morning_holiday
                                                })
                                            }
                                        })
                                        setWeeklyPlan(plans)
                                    }}
                                    setAfternoonTime={data => {
                                        const plans: Array<WeeklyPlans> = []

                                        Array.from({ length: weeklyPlan.length }).forEach((v, i) => {
                                            if (i === index) {
                                                plans.push({
                                                    day: weeklyPlan[index].day,
                                                    start_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_morning_time, 8),
                                                    end_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_morning_time, 14),
                                                    start_afternoon_time: getDayJsTimeOrDefaultValue(data.start_afternoon_time, 16),
                                                    end_afternoon_time: getDayJsTimeOrDefaultValue(data.end_afternoon_time, 22),
                                                    is_holiday: weeklyPlan[i]?.is_holiday,
                                                    is_afternoon_holiday: weeklyPlan[i]?.is_afternoon_holiday,
                                                    is_morning_holiday: weeklyPlan[i]?.is_morning_holiday
                                                })
                                            }
                                            else {
                                                plans.push({
                                                    day: weeklyPlan[i].day,
                                                    start_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_morning_time, 8),
                                                    end_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_morning_time, 14),
                                                    start_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_afternoon_time, 16),
                                                    end_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_afternoon_time, 22),
                                                    is_holiday: weeklyPlan[i]?.is_holiday,
                                                    is_afternoon_holiday: weeklyPlan[i]?.is_afternoon_holiday,
                                                    is_morning_holiday: weeklyPlan[i]?.is_morning_holiday
                                                })
                                            }
                                        })
                                        setWeeklyPlan(plans)
                                    }}
                                    onIsMorningHolidayChange={(index, is_holiday) => {
                                        console.log("on morning hi=oliday change");
                                        const plans: Array<WeeklyPlans> = []
                                        Array.from({ length: weeklyPlan.length }).forEach((v, i) => {
                                            if (i === index) {
                                                plans.push({
                                                    day: weeklyPlan[index].day,
                                                    start_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_morning_time, 8),
                                                    end_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_morning_time, 14),
                                                    start_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_afternoon_time, 16),
                                                    end_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_afternoon_time, 22),
                                                    is_holiday: weeklyPlan[index]?.is_holiday,
                                                    is_afternoon_holiday: weeklyPlan[i]?.is_afternoon_holiday,
                                                    is_morning_holiday: is_holiday
                                                })
                                            }
                                            else {
                                                plans.push({
                                                    day: weeklyPlan[i].day,
                                                    start_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_morning_time, 8),
                                                    end_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_morning_time, 14),
                                                    start_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_afternoon_time, 16),
                                                    end_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_afternoon_time, 22),
                                                    is_holiday: weeklyPlan[i]?.is_holiday,
                                                    is_afternoon_holiday: weeklyPlan[i]?.is_afternoon_holiday,
                                                    is_morning_holiday: weeklyPlan[i]?.is_morning_holiday
                                                })
                                            }
                                        })
                                        setWeeklyPlan(plans)
                                    }}
                                    onIsAfternoonHolidayChange={(index, is_holiday) => {
                                        console.log("on afternnon change");
                                        const plans: Array<WeeklyPlans> = []
                                        Array.from({ length: weeklyPlan.length }).forEach((v, i) => {
                                            if (i === index) {
                                                plans.push({
                                                    day: weeklyPlan[index]?.day,
                                                    start_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_morning_time, 8),
                                                    end_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_morning_time, 14),
                                                    start_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_afternoon_time, 16),
                                                    end_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_afternoon_time, 22),
                                                    is_holiday: weeklyPlan[index]?.is_holiday,
                                                    is_afternoon_holiday: is_holiday,
                                                    is_morning_holiday: weeklyPlan[i]?.is_morning_holiday
                                                })
                                            }
                                            else {
                                                plans.push({
                                                    day: weeklyPlan[i].day,
                                                    start_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_morning_time, 8),
                                                    end_morning_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_morning_time, 14),
                                                    start_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].start_afternoon_time, 16),
                                                    end_afternoon_time: getDayJsTimeOrDefaultValue(weeklyPlan[i].end_afternoon_time, 22),
                                                    is_holiday: weeklyPlan[i]?.is_holiday,
                                                    is_afternoon_holiday: weeklyPlan[i]?.is_afternoon_holiday,
                                                    is_morning_holiday: weeklyPlan[i]?.is_morning_holiday
                                                })
                                            }
                                        })
                                        setWeeklyPlan(plans)
                                    }}
                                >
                                    <div className="h-full">
                                        <WeeklyPlanCard_1
                                            key={index}
                                            day_name={getDayNameByIndex(weeklyPlan[index].day)}
                                            is_holiday={(index === 6 && weeklyPlan?.[6]?.is_holiday) || plan.is_holiday}
                                            start_morning_time={plan.is_morning_holiday ? "--" : `${plan.start_morning_time?.format("HH")}:${plan.start_morning_time?.format("mm")}`}
                                            end_morning_time={plan.is_morning_holiday ? "--" : `${plan.end_morning_time?.format("HH")}:${plan.end_morning_time?.format("mm")}`}
                                            start_afternoon_time={plan.is_afternoon_holiday ? "--" : `${plan.start_afternoon_time?.format("HH")}:${plan.start_afternoon_time?.format("mm")}`}
                                            end_afternoon_time={plan.is_afternoon_holiday ? "--" : `${plan.end_afternoon_time?.format("HH")}:${plan.end_afternoon_time?.format("mm")}`}
                                        />
                                    </div>
                                </GetWeeklyPlan>
                            ))
                        }
                        {
                            weeklyPlan?.length < 7
                                ?
                                <div className="grid place-items-center">
                                    <div onClick={() => {
                                        addPlan({
                                            prevData: weeklyPlan,
                                            dayIndex: firstUndefiendIndexOfWeeklyPlan(weeklyPlan),
                                            setWeeklyPlan: setWeeklyPlan
                                        })
                                    }} className="w-14 h-14 bg-blue-500 rounded-full cursor-pointer grid place-items-center">
                                        <AiOutlinePlus className="w-7 h-7 fill-gray-50" />
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                    :
                    null
            }

            {
                jobData?.comments?.length > 0
                    ?
                    <div className="mt-16 w-full">
                        <CommentsSection_1 jobTitle={jobData?.job?.title} jobId={jobData?.job?.id} comments={jobData?.comments} />
                    </div>
                    :
                    false
            }

            <button onClick={handleSaveChanges} className="primary-btn mt-20 w-full max-w-sm block mx-auto">
                ذخیره تغییرات
            </button>

        </div>
    )
}

export default AdminSingleJob