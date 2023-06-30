
import { Box, Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { ConfigProvider, TimePicker } from "antd"
import { Dayjs } from "dayjs"
import { ReactNode, useEffect } from "react"


interface ChangeIsHolidayProps {
    title: string;
    index: number;
    onIsHolidayChange?(index: number, is_holiday: boolean): void;
    is_holiday: boolean,
    className?: string
}

function ChangeIsHoliday({ title, onIsHolidayChange, is_holiday, index, className = "" }: ChangeIsHolidayProps) {
    return (
        <div dir="rtl" className={"flex select-none items-center gap-x-3 w-full " + className}>
            <Checkbox onChange={e => onIsHolidayChange(index, e.target.checked)} isChecked={is_holiday} />
            <p onClick={() => onIsHolidayChange(index, !is_holiday)} className="text-sm text-slate-800 font-[vazirLight] cursor-pointer">
                {title}
            </p>
        </div>
    )
}

interface GetWeeklyPlanProps {
    index?: number;
    children: ReactNode;
    setMorningTime?(data: {
        start_morning_time: Dayjs;
        end_morning_time: Dayjs;
    }): void;
    setAfternoonTime?(data: {
        start_afternoon_time: Dayjs;
        end_afternoon_time: Dayjs;
    }): void;
    startMorningTime?: Dayjs;
    endMorningTime?: Dayjs;
    startAfternoonTime?: Dayjs;
    endAfternoonTime?: Dayjs;
    is_holiday?: boolean;
    show_is_holiday?: boolean
    onIsHolidayChange?(index: number, is_holiday: boolean): void;
    onIsMorningHolidayChange?(index: number, is_holiday: boolean): void;
    onIsAfternoonHolidayChange?(index: number, is_holiday: boolean): void;
    is_morning_holiday?: boolean;
    show_is_morning_holiday?: boolean;
    is_afternoon_holiday?: boolean;
    show_is_afternoon_holiday?: boolean;
}

function GetWeeklyPlan({
    index = undefined,
    children,
    setMorningTime = undefined,
    setAfternoonTime = undefined,
    startMorningTime = undefined,
    endMorningTime = undefined,
    startAfternoonTime = undefined,
    endAfternoonTime = undefined,
    is_holiday = false,
    show_is_holiday = true,
    onIsHolidayChange = undefined,
    onIsMorningHolidayChange = undefined,
    onIsAfternoonHolidayChange = undefined,
    is_morning_holiday = false,
    is_afternoon_holiday = false,
    show_is_afternoon_holiday = false,
    show_is_morning_holiday = false
}: GetWeeklyPlanProps) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const onMorningTimeChange = (start: Dayjs, end: Dayjs) => {
        setMorningTime && setMorningTime({
            start_morning_time: start,
            end_morning_time: end
        })
    }
    const onAfternoonChange = (start: Dayjs, end: Dayjs) => {
        setAfternoonTime && setAfternoonTime({
            start_afternoon_time: start,
            end_afternoon_time: end
        })
    }

    useEffect(
        () => {
            if(is_morning_holiday && is_afternoon_holiday && onIsHolidayChange) {
                onIsHolidayChange(index, true)
            }
            else if(is_morning_holiday || is_afternoon_holiday && is_holiday && onIsHolidayChange) {
                onIsHolidayChange(index, false)
            }
        },
        [is_morning_holiday, is_afternoon_holiday]
    )

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
                        className="font-[vazir]"
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

                            <p className="text-right text-slate-800 text-sm font-[vazirMedium]">
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
                                <TimePicker.RangePicker
                                    disabled={is_holiday || is_morning_holiday}
                                    defaultValue={[startMorningTime, endMorningTime]}
                                    onChange={e => onMorningTimeChange(e[0], e[1])}
                                    format="HH:mm"
                                />
                            </ConfigProvider>

                            {
                                show_is_morning_holiday
                                    ?
                                    <ChangeIsHoliday
                                        title="آیا در صبح تعطیل هست ؟"
                                        index={index}
                                        is_holiday={is_morning_holiday}
                                        onIsHolidayChange={onIsMorningHolidayChange}
                                        className="mt-2"
                                    />
                                    :
                                    null
                            }


                        </Box>

                        <div className="w-11/12 mx-auto border-b border-b-slate-300 my-8"></div>

                        <Box
                            width="full"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            rowGap="15px"
                        >

                            <p className="text-right text-slate-800 text-sm font-[vazirMedium]">
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
                                <TimePicker.RangePicker
                                    disabled={is_holiday || is_afternoon_holiday}
                                    defaultValue={[startAfternoonTime, endAfternoonTime]}
                                    onChange={e => onAfternoonChange(e[0], e[1])}
                                    format="HH:mm"
                                />
                            </ConfigProvider>

                            {
                                show_is_afternoon_holiday &&
                                !(is_morning_holiday && is_afternoon_holiday)
                                    ?
                                    <ChangeIsHoliday
                                        title="آیا در عصر تعطیل هست ؟"
                                        index={index}
                                        is_holiday={is_afternoon_holiday}
                                        onIsHolidayChange={onIsAfternoonHolidayChange}
                                        className="mt-2"
                                    />
                                    :
                                    null
                            }


                        </Box>

                        {
                            show_is_holiday
                                ?
                                <div dir="rtl" className="mt-10 flex items-center gap-x-3 w-full">
                                    <Checkbox onChange={e => onIsHolidayChange(index, e.target.checked)} isChecked={is_holiday} />
                                    <p onClick={() => onIsHolidayChange(index, !is_holiday)} className="text-sm text-slate-800 font-[vazir] cursor-pointer">
                                        آیا تعطیل هست ؟
                                    </p>
                                </div>
                                :
                                false
                        }



                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export {
    GetWeeklyPlan
}