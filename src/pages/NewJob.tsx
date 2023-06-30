import TextInput_1 from "../components/TextInput_1"
import { MdTitle } from "react-icons/md"
import { GoLocation } from "react-icons/go"
import { IoNewspaperOutline } from "react-icons/io5"
import { BiBarChart } from "react-icons/bi"
import { BsTelephone } from "react-icons/bs"
import Modal_1, { Modal_1AccordionOptions } from "../components/Modal_1"
import { addJob, getCategories, getCitiesAndStates } from "../utils/http"
import useSWR from "swr"
import dayjs from 'dayjs';
import { Dayjs } from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { useRef, useState, useId, useEffect } from "react"
import FileUpload from "../components/FileUpload"
import { useApplicationLoadingStore } from "../stores/useApplicationLoadingStore"
import { GetWeeklyPlan } from "../components/GetWeeklyPlansModal_1"
import Modal_2 from "../components/Modal_2"
import AddPhoneNumber_1, { PhonesOptions } from "../components/AddPhoneNumber_1"
import GetAnAddressFromGoogleMap from "../components/GetAnAddressFromGoogleMap";
import { v4 as uuidv4 } from "uuid"
import { LatLng } from "leaflet"
import Loading from "../components/Loading"
import WeeklyPlanCard_1 from "../components/WeeklyPlanCard_1"
import getDayNameByIndex from "../utils/getDayNameByIndex"


interface WeeklyPlans {
    plans: Array<{
        start_morning_time?: Dayjs,
        end_morning_time?: Dayjs,
        start_afternoon_time?: Dayjs,
        end_afternoon_time?: Dayjs
    }>
}

function NewJob() {
    const setIsLoading = useApplicationLoadingStore(selector => selector.setIsLoading)
    const filePondRef = useRef(undefined)
    const [phones, setPhones] = useState<Array<PhonesOptions>>(undefined)

    const titleRef = useRef<HTMLInputElement>(undefined);
    const addressRef = useRef<HTMLInputElement>(undefined)
    const descriptionRef = useRef<HTMLInputElement>(undefined)
    const hashtagRef = useRef<HTMLInputElement>(undefined)
    const [hashtags, setHashtags] = useState<Array<{ value: string, id: string }>>(undefined)
    const [categoryIDs, setCategoryIDs] = useState<Array<number>>(undefined)
    const [cityId, setCityId] = useState<number>(undefined)
    const [latlng, setLatLng] = useState<LatLng>(undefined)

    const [morningTime, setMorningTime] = useState<{
        startMorningTime: Dayjs,
        endMorningTime: Dayjs
    }>(undefined);

    const [afternoonTime, setAfternoonTime] = useState<{
        startAfternoonTime: Dayjs,
        endAfternoonTime: Dayjs
    }>(undefined);

    const [weeklyPlan, setWeeklyPlan] = useState<Array<{
        start_morning_time?: Dayjs,
        end_morning_time?: Dayjs,
        start_afternoon_time?: Dayjs,
        end_afternoon_time?: Dayjs
    }>>([])

    useEffect(
        () => {
            const plans: Array<{
                start_morning_time?: Dayjs,
                end_morning_time?: Dayjs,
                start_afternoon_time?: Dayjs,
                end_afternoon_time?: Dayjs
            }> = []
            if (morningTime && afternoonTime) {
                Array.from({ length: 7 }).forEach(v => {
                    plans.push({
                        start_morning_time: morningTime.startMorningTime,
                        end_morning_time: morningTime.endMorningTime,
                        start_afternoon_time: afternoonTime.startAfternoonTime,
                        end_afternoon_time: afternoonTime.endAfternoonTime
                    })
                })
                setWeeklyPlan(plans)
            }
            console.log("hi");
            
        },
        [morningTime, afternoonTime]
    )


    // getCitiesAndStates
    const {
        data: citiesAndStates,
        error: citiesAndStatesError,
        isLoading: isCitiesAndStatesLoading
    } = useSWR(
        "sort-modal/getCitiesAndState",
        async () => getCitiesAndStates(),
        {
            shouldRetryOnError: false
        }
    )

    // getCategories
    const {
        data: categories,
        error: categoriesError,
        isLoading: isCateGoriesLoading
    } = useSWR(
        "sort-modal/getCategories",
        async () => getCategories(),
        {
            shouldRetryOnError: false
        }
    )

    if (isCateGoriesLoading || isCitiesAndStatesLoading) return <Loading />
    if (categoriesError || citiesAndStatesError) return <p>error</p>

    // data structure for cities modal
    const citiesmodal: Modal_1AccordionOptions = {
        data: [
            {
                title: "انتخاب شهر",
                data: citiesAndStates.data.map(item => ({
                    id: item.id,
                    is_parent: item.is_parent,
                    title: item.name,
                    command(checked, data) {
                        setCityId(data.id)
                    },
                }))
            }
        ]
    }

    // data structure for categories modal
    const categorieemodal: Modal_1AccordionOptions = {
        data: [
            {
                title: "انتخاب گروه",
                data: categories.data.map(item => ({
                    id: item.id,
                    is_parent: item.is_parent,
                    title: item.name,
                    command(checked, data) {
                        if (checked) {
                            categoryIDs
                                ?
                                setCategoryIDs(catIDs => [...catIDs, data.id])
                                :
                                setCategoryIDs(catIDs => [data.id])
                        }
                        else {
                            setCategoryIDs(
                                prev => prev.filter(item => item !== data.id)
                            )
                        }
                    },
                }))
            }
        ]
    }

    const onSubmit = () => {

        if (
            !titleRef?.current?.value ||
            !addressRef?.current?.value ||
            !descriptionRef?.current?.value ||
            !(hashtags?.length > 0) ||
            typeof cityId !== "number" || cityId < 0 ||
            typeof categoryIDs === "undefined" || !(categoryIDs?.length > 0)
        ) {
            alert("fill the fields correctly")
        }
        else {
            setIsLoading(true)
            addJob({
                address: addressRef.current.value,
                category_IDs: categoryIDs,
                city_id: cityId,
                desc: descriptionRef.current.value,
                lat: latlng.lat.toString(),
                lng: latlng.lng.toString(),
                phones: phones.map(item => item.value),
                title: titleRef.current.value,
                images: filePondRef.current.getFiles().map(file => file),
                dailyPlans: weeklyPlan.map((plan, i) => ({
                    dayIndex: i,
                    is_holiday: i === 6,
                    start_morning_time: `${plan.start_morning_time.format("HH")}:${plan.start_morning_time.format("mm")}`,
                    end_morning_time: `${plan.end_morning_time.format("HH")}:${plan.end_morning_time.format("mm")}`,
                    start_afternoon_time: `${plan.start_afternoon_time.format("HH")}:${plan.start_afternoon_time.format("mm")}`,
                    end_afternoon_time: `${plan.end_afternoon_time.format("HH")}:${plan.end_afternoon_time.format("mm")}`
                })),
                // dailyPlans: Array.from({ length: 7 }).map((_, index) => ({
                //     dayIndex: index,
                //     is_holiday: index === 6,
                //     start_morning_time: `${morningTime.startMorningTime.format("HH")}:${morningTime.startMorningTime.format("mm")}`,
                //     end_morning_time: `${morningTime.endMorningTime.format("HH")}:${morningTime.endMorningTime.format("mm")}`,
                //     start_afternoon_time: `${afternoonTime.startAfternoonTime.format("HH")}:${afternoonTime.startAfternoonTime.format("mm")}`,
                //     end_afternoon_time: `${afternoonTime.endAfternoonTime.format("HH")}:${afternoonTime.endAfternoonTime.format("mm")}`
                // })),
                hashtags: hashtags.map(hashtag => hashtag.value).join("|")
            })
                .then(d => {
                    console.log(d);
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false)
                })

        }

    }

    return (
        <div className="w-full max-lg:h-full h-screen overflow-y-auto">
            <div className="w-full p-4 h-max">

                <p className="text-lg text-slate-800 font-[vazirMedium]">
                    افزودن مجموعه جدید
                </p>

                <div className="max-w-lg mx-auto mt-10 flex flex-col gap-y-5">

                    {/* title TextInput */}
                    <TextInput_1
                        placeHolder="عنوان"
                        ref={titleRef}
                        icon={<MdTitle className="w-5 h-5 fill-blue-500" />}
                    />

                    {/* address textInput */}
                    <TextInput_1
                        ref={addressRef}
                        placeHolder="آدرس"
                        icon={<GoLocation className="w-5 h-5 fill-blue-500" />}
                    />

                    {/* map */}
                    <div className="max-w-lg z-10 w-full mx-auto">
                        <GetAnAddressFromGoogleMap
                            onClick={data => {
                                setLatLng(data)
                            }}
                        />
                    </div>

                    {/* description TextInput */}
                    <TextInput_1
                        ref={descriptionRef}
                        placeHolder="توضیحات"
                        icon={<IoNewspaperOutline className="w-5 h-5 fill-blue-500 stroke-blue-500" />}
                    />

                    {/* hashtags */}
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

                    {/* hashtgs TextInput */}
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

                    {/* add phone numbers modal */}
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


                    <div className="mt-8 flex flex-col gap-y-3 max-w-lg w-full mx-auto">

                        {/* select city modal  */}
                        <Modal_1
                            showCheckBox={true}
                            onActiveItemChange={(checked, data) => {
                                setCityId(data.id)
                            }}
                            activeItem={[cityId]}
                            data={citiesmodal}
                            title="انتخاب شهر"
                        >
                            <button className="primary-btn">انتخاب شهر</button>
                        </Modal_1>

                        {/* select categories modal */}
                        <Modal_1
                            showCheckBox={true}
                            onActiveItemChange={(checked, data) => {
                                if (checked) {
                                    categoryIDs
                                        ?
                                        setCategoryIDs(catIDs => [...catIDs, data.id])
                                        :
                                        setCategoryIDs(catIDs => [data.id])
                                }
                                else {
                                    setCategoryIDs(
                                        prev => prev.filter(item => item !== data.id)
                                    )
                                }
                            }}
                            activeItem={categoryIDs}
                            data={categorieemodal}
                            title="انتخاب دسته بندی"
                        >
                            <button className="primary-btn">انتخاب دسته بندی</button>
                        </Modal_1>

                        {
                            weeklyPlan?.length > 0
                                ?
                                <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-4 w-full">
                                    {
                                        weeklyPlan.map((plan, index) => (
                                            <GetWeeklyPlan
                                                startMorningTime={weeklyPlan[index].start_morning_time}
                                                endMorningTime={weeklyPlan[index].end_morning_time}
                                                startAfternoonTime={weeklyPlan[index].start_afternoon_time}
                                                endAfternoonTime={weeklyPlan[index].end_afternoon_time}
                                                setMorningTime={data => {
                                                    const plans: Array<{
                                                        start_morning_time?: Dayjs,
                                                        end_morning_time?: Dayjs,
                                                        start_afternoon_time?: Dayjs,
                                                        end_afternoon_time?: Dayjs
                                                    }> = []

                                                    Array.from({ length: 7 }).forEach((v, i) => {
                                                        if (i === index) {
                                                            plans.push({
                                                                start_morning_time: data.start_morning_time,
                                                                end_morning_time: data.end_morning_time,
                                                                start_afternoon_time: weeklyPlan[i].start_afternoon_time,
                                                                end_afternoon_time: weeklyPlan[i].end_afternoon_time
                                                            })
                                                        }
                                                        else {
                                                            plans.push({
                                                                start_morning_time: weeklyPlan[i].start_morning_time,
                                                                end_morning_time: weeklyPlan[i].end_morning_time,
                                                                start_afternoon_time: weeklyPlan[i].start_afternoon_time,
                                                                end_afternoon_time: weeklyPlan[i].end_afternoon_time
                                                            })
                                                        }
                                                    })
                                                    setWeeklyPlan(plans)
                                                }}
                                                setAfternoonTime={data => {
                                                    const plans: Array<{
                                                        start_morning_time?: Dayjs,
                                                        end_morning_time?: Dayjs,
                                                        start_afternoon_time?: Dayjs,
                                                        end_afternoon_time?: Dayjs
                                                    }> = []

                                                    Array.from({ length: 7 }).forEach((v, i) => {
                                                        if (i === index) {
                                                            plans.push({
                                                                start_morning_time: weeklyPlan[i].start_morning_time,
                                                                end_morning_time: weeklyPlan[i].end_morning_time,
                                                                start_afternoon_time: data.start_afternoon_time,
                                                                end_afternoon_time: data.end_afternoon_time
                                                            })
                                                        }
                                                        else {
                                                            plans.push({
                                                                start_morning_time: weeklyPlan[i].start_morning_time,
                                                                end_morning_time: weeklyPlan[i].end_morning_time,
                                                                start_afternoon_time: weeklyPlan[i].start_afternoon_time,
                                                                end_afternoon_time: weeklyPlan[i].end_afternoon_time
                                                            })
                                                        }
                                                    })
                                                    setWeeklyPlan(plans)
                                                }}
                                            >
                                                <div>
                                                    <WeeklyPlanCard_1
                                                        key={index}
                                                        day_name={getDayNameByIndex(index)}
                                                        is_holiday={index === 6}
                                                        start_morning_time={`${plan.start_morning_time.format("HH")}:${plan.start_morning_time.format("mm")}`}
                                                        end_morning_time={`${plan.end_morning_time.format("HH")}:${plan.end_morning_time.format("mm")}`}
                                                        start_afternoon_time={`${plan.start_afternoon_time.format("HH")}:${plan.start_afternoon_time.format("mm")}`}
                                                        end_afternoon_time={`${plan.end_afternoon_time.format("HH")}:${plan.end_afternoon_time.format("mm")}`}
                                                    />
                                                </div>
                                            </GetWeeklyPlan>
                                        ))
                                    }

                                </div>
                                :
                                null
                        }

                        {/* get weekly plan */}
                        <GetWeeklyPlan
                            startMorningTime={morningTime?.startMorningTime}
                            endMorningTime={morningTime?.endMorningTime}
                            startAfternoonTime={afternoonTime?.startAfternoonTime}
                            endAfternoonTime={afternoonTime?.endAfternoonTime}
                            setMorningTime={data => {
                                setMorningTime({
                                    startMorningTime: data.start_morning_time,
                                    endMorningTime: data.end_morning_time
                                })
                            }}
                            setAfternoonTime={data => {
                                setAfternoonTime({
                                    startAfternoonTime: data.start_afternoon_time,
                                    endAfternoonTime: data.end_afternoon_time
                                })
                            }}
                        >
                            <button className="primary-btn">انتخاب ساعت</button>
                        </GetWeeklyPlan>


                        {/* file upload section */}
                        <FileUpload
                            name="images[]"
                            filePondRef={(filePond) => {
                                filePondRef.current = filePond
                            }}
                        />

                        <button onClick={onSubmit} className="primary-btn mt-3 mb-5">ادامه</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NewJob