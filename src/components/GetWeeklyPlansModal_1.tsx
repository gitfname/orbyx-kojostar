
import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { ConfigProvider, TimePicker } from "antd"
import { Dayjs } from "dayjs"
import { ReactNode } from "react"

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
    setMorningTime = undefined,
    setAfternoonTime = undefined,
    startMorningTime = undefined,
    endMorningTime = undefined,
    startAfternoonTime = undefined,
    endAfternoonTime = undefined
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

export {
    GetWeeklyPlan
}