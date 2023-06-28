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


import { useRef, useState } from "react"
import FileUpload from "../components/FileUpload"
import { FilePond } from "filepond"
import { useApplicationLoadingStore } from "../stores/useApplicationLoadingStore"
import { GetWeeklyPlan } from "../components/GetWeeklyPlansModal_1"
import { AiOutlinePlusCircle } from "react-icons/ai"
import Modal_2 from "../components/Modal_2"
import AddPhoneNumber_1, { PhonesOptions } from "../components/AddPhoneNumber_1"


function NewJob() {
    const setIsLoading = useApplicationLoadingStore(selector => selector.setIsLoading)
    const filePondRef = useRef<FilePond>(undefined)
    const [phones, setPhones] = useState<Array<PhonesOptions>>(undefined)

    const titleRef = useRef<HTMLInputElement>(undefined);
    const addressRef = useRef<HTMLInputElement>(undefined)
    const descriptionRef = useRef<HTMLInputElement>(undefined)
    const hashtagRef = useRef<HTMLInputElement>(undefined)
    const [categoryIDs, setCategoryIDs] = useState<Array<number>>(undefined)
    const [cityId, setCityId] = useState<number>(undefined)

    const [morningTime, setMorningTime] = useState<{
        startMorningTime: Dayjs,
        endMorningTime: Dayjs
    }>(undefined)

    const [afternoonTime, setAfternoonTime] = useState<{
        startAfternoonTime: Dayjs,
        endAfternoonTime: Dayjs
    }>(undefined)

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

    if (isCateGoriesLoading || isCitiesAndStatesLoading) return <p>Loading</p>
    if (categoriesError || citiesAndStatesError) return <p>error</p>

    const data: Modal_1AccordionOptions = {
        data: [
            {
                title: "انتخاب شهر",
                data: citiesAndStates.data.map(item => ({
                    id: item.id,
                    is_parent: item.is_parent,
                    title: item.name,
                    command(data) {
                        setCityId(data.id)
                    },
                }))
            },
            {
                title: "انتخاب گروه",
                data: categories.data.map(item => ({
                    id: item.id,
                    is_parent: item.is_parent,
                    title: item.name,
                    command(data) {
                        categoryIDs
                            ?
                            setCategoryIDs(catIDs => [...catIDs, data.id])
                            :
                            setCategoryIDs(catIDs => [data.id])
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
            !hashtagRef?.current?.value ||
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
                lat: "33",
                lng: "45",
                phones: ["033", "0601"],
                title: titleRef.current.value,
                images: filePondRef.current.getFiles().map(file => file),
                dailyPlans: Array.from({ length: 7 }).map((_, index) => ({
                    dayIndex: index,
                    is_holiday: index === 6,
                    start_morning_time: `${morningTime.startMorningTime.format("HH")}:${morningTime.startMorningTime.format("mm")}`,
                    end_morning_time: `${morningTime.endMorningTime.format("HH")}:${morningTime.endMorningTime.format("mm")}`,
                    start_afternoon_time: `${afternoonTime.startAfternoonTime.format("HH")}:${afternoonTime.startAfternoonTime.format("mm")}`,
                    end_afternoon_time: `${afternoonTime.endAfternoonTime.format("HH")}:${afternoonTime.endAfternoonTime.format("mm")}`
                }))
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
        <div className="w-full h-screen overflow-y-auto">
            <div className="w-full p-4 h-max">

                <p className="text-lg text-slate-800 font-[iranyekan400]">
                    افزودن مجموعه جدید
                </p>

                <div className="max-w-lg mx-auto mt-10 flex flex-col gap-y-5">
                    <TextInput_1
                        placeHolder="عنوان"
                        ref={titleRef}
                        icon={<MdTitle className="w-5 h-5 fill-blue-500" />}
                    />

                    <TextInput_1
                        ref={addressRef}
                        placeHolder="آدرس"
                        icon={<GoLocation className="w-5 h-5 fill-blue-500" />}
                    />

                    <TextInput_1
                        ref={descriptionRef}
                        placeHolder="توضیحات"
                        icon={<IoNewspaperOutline className="w-5 h-5 fill-blue-500 stroke-blue-500" />}
                    />

                    <TextInput_1
                        ref={hashtagRef}
                        placeHolder="هشتگ"
                        icon={<BiBarChart className="w-5 h-5 fill-blue-500 stroke-blue-500" />}
                    />


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
                            placeHolder="شماره تماس"
                            icon={<BsTelephone className="w-[1.15rem] h-[1.15rem] fill-blue-500 stroke-blue-500" />}
                        />
                    </Modal_2>


                    <div className="mt-5 flex flex-col gap-y-3 max-w-xs w-full mx-auto">

                        <Modal_1
                            data={data}
                            title="انتخاب شهر و دسته بندی"
                        >
                            <button className="primary-btn">انتخاب شهر و گروه</button>
                        </Modal_1>
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