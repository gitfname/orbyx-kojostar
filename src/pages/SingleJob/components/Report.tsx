
import { Menu, MenuButton, MenuList, MenuItem, useToast } from "@chakra-ui/react"
import Modal_2 from "../../../components/Modal_2"
import useSWR from "swr"
import { getReportOptions } from "../../../utils/http"
import { reportJob } from "../../../utils/http/api/reportJob"
import { useRef } from "react"


interface Props {
    job_id: number;
}

function Report({ job_id }: Props) {

    const toast = useToast()
    const reportContentRef = useRef<HTMLTextAreaElement>(undefined)

    const {
        data: reportOptions,
        error: reportOptionsError,
        isLoading: isReportOptionsLoading
    } = useSWR(
        "/report-options",
        async () => getReportOptions(),
        {
            shouldRetryOnError: false,
            revalidateOnFocus: false
        }
    )

    const handleReport = (job_id: number, report_option_id: number) => {
        if (reportContentRef.current.value.trim() === "") {
            toast({
                description: "متن پیام را وارد کنید",
                duration: 4000,
                isClosable: true,
                position: "top-right",
                status: "warning"
            })
        }
        else {
            reportJob({
                content: reportContentRef.current.value,
                job_id,
                report_option_id
            })
                .then(() => {
                    toast({
                        title: "ممنون",
                        description: "گزارش شما با موفقیت به دست ما رسید",
                        duration: 4000,
                        isClosable: true,
                        position: "top-right",
                        status: "info"
                    })
                })
                .catch(() => {
                    toast({
                        title: "خطا",
                        description: "گزارش شما ارسال نشد. لطفا بعدا دوباره امتحان کنید",
                        duration: 4000,
                        isClosable: true,
                        position: "top-right",
                        status: "warning"
                    })
                })
        }
    }

    return (
        <Menu>
            <MenuButton
                fontFamily="vazir"
                fontSize="sm"
                color="red.500"
                rounded="lg"
                py="1.5"
                px="2.5"
                transition="all"
                bg={isReportOptionsLoading ? "red.50" : "transparent"}
                transitionDuration="300ms"
                _hover={{
                    bg: "red.50"
                }}
                _active={{
                    bg: "red.50"
                }}
            >
                {
                    isReportOptionsLoading
                        ?
                        <div className="w-5 h-5 rounded-full border-t border-t-rose-500 animate-spin"></div>
                        :
                        "گزارش"
                }
            </MenuButton>
            <MenuList
                borderColor="blackAlpha.100"
                display="flex"
                flexDir="column"
                rowGap="8px"
                px="6px"
            >
                {
                    reportOptions?.data?.length > 0
                        ?
                        reportOptions?.data?.map(reportOption => (
                            reportOptionsError
                                ?
                                <>
                                    <div className="w-full p-3 bg-slate-300 animate-pulse rounded-lg"></div>
                                    <div className="w-full p-3 bg-slate-300 animate-pulse rounded-lg"></div>
                                    <div className="w-full p-3 bg-slate-300 animate-pulse rounded-lg"></div>
                                </>
                                :
                                <Modal_2
                                    key={reportOption.id}
                                    title={reportOption.name}
                                    modalBody={
                                        <>
                                            <textarea
                                                rows={4}
                                                className="primary-text-input"
                                                placeholder="لطفا بیشتر توضیح دهید"
                                                ref={reportContentRef}
                                            >
                                            </textarea>

                                            <div className="flex items-center gap-x-3 mt-8 max-w-sm mx-auto">
                                                <button
                                                    onClick={() => {
                                                        handleReport(job_id, reportOption.id)
                                                    }}
                                                    className="primary-btn bg-rose-500 py-2.5"
                                                >
                                                    گزارش
                                                </button>
                                            </div>
                                        </>
                                    }
                                >
                                    <MenuItem
                                        fontFamily="vazir"
                                        fontSize="0.85rem"
                                        rounded="lg"
                                        transition="all"
                                        transitionDuration="300ms"
                                        _hover={{
                                            bg: "blackAlpha.50"
                                        }}
                                    >
                                        {reportOption.name}
                                    </MenuItem>
                                </Modal_2>
                        ))
                        :
                        <>
                            <div className="w-full p-3 bg-slate-300 animate-pulse rounded-lg"></div>
                            <div className="w-full p-3 bg-slate-300 animate-pulse rounded-lg"></div>
                            <div className="w-full p-3 bg-slate-300 animate-pulse rounded-lg"></div>
                        </>

                }
            </MenuList>
        </Menu>
    )
}

export default Report