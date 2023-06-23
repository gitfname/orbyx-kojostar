
import { useDisclosure } from "@chakra-ui/react"
import List from 'react-virtualized/dist/commonjs/List';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,

    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    AccordionButton,
    Checkbox
} from "@chakra-ui/react"
import useSWR from "swr"
import { getCategories, getCitiesAndStates } from "../utils/http";
import { getCitiesAndStatesOptionsTest } from "../utils/http/api/getCitiesAndStates";

function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
    data
}) {

    const _data: getCitiesAndStatesOptionsTest = data;

    return (
        <div
            key={key}
            style={style}
            className="px-2"
        >
            {
                _data.is_state || _data?.is_parent
                    ?
                    <p
                        className="text-sm text-slate-900 !h-7 font-[iranyekan400]"
                    >
                        {_data.name}
                    </p>
                    :
                    <div className="flex items-center gap-x-2">
                        <Checkbox />
                        <p
                            className="text-sm text-slate-700 font-[iranyekan300]"
                        >
                            {_data.name}
                        </p>
                    </div>
            }

        </div>
    );
}



function SortModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

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


    return (
        <>
            <div onClick={onOpen}>
                {children}
            </div>
            {
                isCitiesAndStatesLoading
                    ?
                    false
                    :
                    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader
                                fontSize="medium"
                                className="font-[iranyekan400]"
                            >
                                مرتب کردن
                            </ModalHeader>
                            <ModalCloseButton left="8px" right="unset" />
                            <ModalBody pb="12px">

                                <Accordion
                                    allowMultiple
                                    allowToggle
                                    display="flex"
                                    flexDirection="column"
                                    rowGap="10px"
                                >

                                    <AccordionItem border="none">
                                        <AccordionButton
                                            borderRadius="lg"
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            دسته بندی
                                            <AccordionIcon />
                                        </AccordionButton>

                                        <AccordionPanel>
                                            <List
                                                className="!w-full !gap-y-0"
                                                width={200}
                                                height={200}
                                                rowCount={categories.data.length}
                                                rowHeight={({ index }) => categories.data[index + 1]?.is_parent ? 50 : 30}
                                                rowRenderer={(item) => {
                                                    return rowRenderer({ ...item, data: categories.data[item.index] })
                                                }}
                                            />
                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem border="none">
                                        <AccordionButton
                                            borderRadius="lg"
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            انتخاب شهر
                                            <AccordionIcon />
                                        </AccordionButton>

                                        <AccordionPanel
                                            pt="14px"
                                            pb={0}
                                            px={0}
                                            maxH="72"
                                            overflowY="auto"
                                        >
                                            <List
                                                className="!w-full !gap-y-0"
                                                width={200}
                                                height={200}
                                                rowCount={citiesAndStates.data.length}
                                                rowHeight={({ index }) => citiesAndStates.data[index + 1]?.is_state ? 50 : 30}
                                                rowRenderer={(item) => {
                                                    return rowRenderer({ ...item, data: citiesAndStates.data[item.index] })
                                                }}
                                            />
                                        </AccordionPanel>
                                    </AccordionItem>

                                </Accordion>

                            </ModalBody>
                        </ModalContent>
                    </Modal>
            }
        </>
    )
}

export default SortModal