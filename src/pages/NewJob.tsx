import TextInput_1 from "../components/TextInput_1"
import { MdTitle } from "react-icons/md"
import { GoLocation } from "react-icons/go"
import { IoNewspaperOutline } from "react-icons/io5"
import { BiBarChart } from "react-icons/bi"
import { BsTelephone } from "react-icons/bs"
import Modal_1, { Modal_1AccordionOptions } from "../components/Modal_1"
import { addJob, getCategories, getCitiesAndStates } from "../utils/http"
import useSWR from "swr"
import { TimePicker, ConfigProvider } from "antd"

import dayjs from 'dayjs';
import { Dayjs } from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { Box, useDisclosure } from "@chakra-ui/react"
import {
    Modal,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    ModalHeader,
    ModalBody
} from "@chakra-ui/react"
import { ReactNode, useRef, useState } from "react"
import FileUpload from "../components/FileUpload"
import { FilePond } from "filepond"
import useUserStore from "../stores/userStore"


interface GetWeeklyPlanProps {
    children: ReactNode,
    setMorningTime?(data: {
        start_morning_time: Dayjs,
        end_morning_time: Dayjs
    }): void,
    setAfternoonTime?(data: {
        start_afternoon_time: Dayjs,
        end_afternoon_time: Dayjs
    }): void,
    startMorningTime?: Dayjs,
    endMorningTime?: Dayjs,
    startAfternoonTime?: Dayjs,
    endAfternoonTime?: Dayjs
}

function GetWeeklyPlan({
    children,
    setMorningTime=undefined,
    setAfternoonTime=undefined,
    startMorningTime=undefined,
    endMorningTime=undefined,
    startAfternoonTime=undefined,
    endAfternoonTime=undefined
}: GetWeeklyPlanProps) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const titleRef = useRef<HTMLInputElement>(undefined);
    const addressRef = useRef<HTMLInputElement>(undefined)
    const descriptionRef = useRef<HTMLInputElement>(undefined)
    const [categoryId, setCategoryId] = useState<number>(undefined)
    const [cityId, setCityId] = useState<number>(undefined)
    const phoneNumbers = useRef<HTMLInputElement>(undefined)
    

    const onMorningTimeChange = (start: Dayjs, end: Dayjs) => {
        setMorningTime&&setMorningTime({
            start_morning_time: start,
            end_morning_time: end
        })
    }
    const onAfternoonChange = (start: Dayjs, end: Dayjs) => {
        setAfternoonTime&&setAfternoonTime({
            start_afternoon_time: start,
            end_afternoon_time: end
        })
    }

    const handleSubmit = () => {
        // if(
        //     titleRef?.current?.value?.trim() === "" ||
        //     addressRef?.current?.value?.trim() === "" ||
        //     descriptionRef?.current?.value?.trim() === "" ||
        //     categoryId === undefined ||
        //     cityId === undefined ||
        //     phoneNumbers?.current?.value?.trim() === ""
        // ) {
        //     alert("fill the fields currectly")
        // }
        // else {
        // }


    }

    return (
        <>
            <div onClick={onOpen}>
                {children}
            </div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>

                    <ModalHeader
                        fontSize="medium"
                        className="font-[iranyekan400]"
                    >
                        انتخاب ساعات کاری
                    </ModalHeader>
                    <ModalCloseButton left="8px" right="unset" />

                    <ModalBody dir="ltr" pb="20px" mt={"15px"}>

                        <Box
                            width="full"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            rowGap="15px"
                        >

                            <p className="text-right text-slate-800 text-sm font-[iranyekan300]">
                                ساعت شروع و اتمام در صبح
                            </p>

                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorTextLightSolid: "rgb(40,40,40)",
                                        colorPrimary: 'rgb(130,130,255)',
                                        colorPrimaryActive: "rgb(175,175,175)",
                                        zIndexPopupBase: 100000,
                                        controlHeightLG: 50,
                                        fontSize: 13
                                    }
                                }}
                            >
                                <TimePicker.RangePicker defaultValue={[startMorningTime, endMorningTime]} onChange={e => onMorningTimeChange(e[0], e[1])} format="HH:mm" />
                            </ConfigProvider>

                        </Box>


                        <Box
                            width="full"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            rowGap="15px"
                            mt="30px"
                        >

                            <p className="text-right text-slate-800 text-sm font-[iranyekan300]">
                                ساعت شروع و اتمام در عصر
                            </p>

                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorTextLightSolid: "rgb(40,40,40)",
                                        colorPrimary: 'rgb(130,130,255)',
                                        colorPrimaryActive: "rgb(175,175,175)",
                                        zIndexPopupBase: 100000,
                                        controlHeightLG: 50,
                                        fontSize: 13
                                    }
                                }}
                            >
                                <TimePicker.RangePicker defaultValue={[startAfternoonTime, endAfternoonTime]} onChange={e => onAfternoonChange(e[0], e[1])} format="HH:mm" />
                            </ConfigProvider>

                        </Box>


                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}


function NewJob() {
    const filePondRef = useRef<FilePond>(undefined)

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
                        alert(data.title + " is clicked")
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
                        alert(data.title + " is clicked")
                    },
                }))
            }
        ]
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
                        icon={<MdTitle className="w-5 h-5 fill-blue-500" />}
                    />

                    <TextInput_1
                        placeHolder="آدرس"
                        icon={<GoLocation className="w-5 h-5 fill-blue-500" />}
                    />

                    <TextInput_1
                        placeHolder="توضیحات"
                        icon={<IoNewspaperOutline className="w-5 h-5 fill-blue-500 stroke-blue-500" />}
                    />

                    <TextInput_1
                        placeHolder="هشتگ"
                        icon={<BiBarChart className="w-5 h-5 fill-blue-500 stroke-blue-500" />}
                    />

                    <TextInput_1
                        placeHolder="شماره تماس"
                        icon={<BsTelephone className="w-[1.15rem] h-[1.15rem] fill-blue-500 stroke-blue-500" />}
                    />

                    <div className="mt-5 flex flex-col gap-y-3 max-w-xs w-full mx-auto">

                        <Modal_1
                            data={data}
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
                        <button onClick={() =>{
                            addJob({
                                address: "test-add-1",
                                category_id: "5",
                                city_id: "22",
                                desc: "test description for test-job-1",
                                lat: "33",
                                lng: "45",
                                phones: ["033", "0601"],
                                title: "test-job-1",
                                images: filePondRef.current.getFiles()
                            })
                            .then(d => {
                                console.log(d);
                            })
                        }} className="primary-btn mt-3">ادامه</button>
                        <FileUpload
                            name="images[]"
                            filePondRef={(filePond) => {
                                filePondRef.current = filePond
                            }}
                            reqHeaders={{
                                "Authorization": "Bearer "+useUserStore.getState().user.token
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NewJob