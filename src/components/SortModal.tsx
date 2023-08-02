
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
import { useSearchParamsStore } from "../stores/useSearchParams";
import { getCategoriesOptionsTest } from "../utils/http/api/getCategories";
import { useEffect, useState } from "react";

function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
    data,
    onChange,
    checked
}) {

    const _data: getCitiesAndStatesOptionsTest = data;

    return (
        <div
            key={key}
            style={style}
            className="px-2"
        >
            {
                _data.is_parent
                    ?
                    <p
                        className="text-sm text-slate-900 !h-7 font-[vazir]"
                    >
                        {_data.name}
                    </p>
                    :
                    <div className="flex items-center gap-x-2 cursor-pointer rounded-lg w-full" onClick={() => onChange(!checked, _data)}>
                        <Checkbox isChecked={checked} />
                        <p
                            className="text-sm text-slate-700 font-[vazir]"
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
    const [
        add_city_id,
        remove_city_id,
        is_city_id_includes,

        is_category_id_active,
        set_category_id
    ] = useSearchParamsStore(selector => [
        selector.api.add_city_id,
        selector.api.remove_city_id,
        selector.api.is_city_id_includes,

        selector.api.is_category_id_active,
        selector.api.set_category_id
    ])

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

    // filter search city
    const [citiesAndStatesSearchValue, setCitiesAndStatesSearchValue] = useState<string>("")
    const [filteredCitiesAndStates, setFilteredCitiesAndStates] = useState<Array<getCitiesAndStatesOptionsTest>>(null);
    useEffect(
        () => {
            if (citiesAndStates?.data) {
                setFilteredCitiesAndStates(citiesAndStates.data)
            }
        },
        [citiesAndStates]
    )
    useEffect(
        () => {
            if (citiesAndStates?.data) {
                setFilteredCitiesAndStates(
                    citiesAndStates.data.filter(item => item.name.includes(citiesAndStatesSearchValue))
                )
            }
        },
        [citiesAndStatesSearchValue]
    )


    // filter category
    const [categoriesSearchValue, setCategoriesSearchValue] = useState<string>("")
    const [filteredCategories, setFilteredCategories] = useState<Array<getCategoriesOptionsTest>>(null);
    useEffect(
        () => {
            if (categories?.data) {
                setFilteredCategories(categories.data)
            }
        },
        [categories]
    )
    useEffect(
        () => {
            if (categories?.data) {
                setFilteredCategories(
                    categories.data.filter(item => item.name.includes(categoriesSearchValue))
                )
            }
        },
        [categoriesSearchValue]
    )


    return (
        <>
            <div onClick={onOpen}>
                {children}
            </div>
            {
                (isCitiesAndStatesLoading || isCateGoriesLoading)
                    ?
                    false
                    :
                    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader
                                fontSize="medium"
                                className="font-[vazir]"
                            >
                                مرتب سازی
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
                                            <div className="h-72 grid grid-rows-[3.8rem_calc(100%-3.8rem)]">
                                                <input
                                                    onChange={(e) => {
                                                        setCategoriesSearchValue(e.target.value)
                                                    }}
                                                    value={categoriesSearchValue}
                                                    className="primary-text-input h-max text-sm py-3 w-11/12 mx-auto block"
                                                    placeholder="دسته بندی مورد نظر را جستجو کنید"
                                                />
                                                <List
                                                    className="!w-full !gap-y-0"
                                                    width={900}
                                                    height={200}
                                                    rowCount={filteredCategories?.length || 0}
                                                    rowHeight={({ index }) => filteredCategories[index + 1]?.is_parent ? 50 : 30}
                                                    rowRenderer={(item) => {
                                                        return rowRenderer({
                                                            ...item,
                                                            data: filteredCategories[item.index],
                                                            checked: is_category_id_active(filteredCategories[item.index].id),
                                                            onChange: (value: boolean, data: getCategoriesOptionsTest) => {
                                                                if (value) {
                                                                    set_category_id(data.id)
                                                                }
                                                                else {
                                                                    console.log(data.id);

                                                                    set_category_id(undefined)
                                                                }
                                                            }
                                                        })
                                                    }}
                                                />
                                            </div>
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
                                            pb={0}
                                            px={0}
                                            maxH="72"
                                            overflowY="hidden"
                                        >

                                            <div className="h-72 grid grid-rows-[3.8rem_calc(100%-3.8rem)]">
                                                <input
                                                    onChange={(e) => {
                                                        setCitiesAndStatesSearchValue(e.target.value)
                                                    }}
                                                    value={citiesAndStatesSearchValue}
                                                    className="primary-text-input h-max text-sm py-3 w-11/12 mx-auto block"
                                                    placeholder="شهر مورد نظر را جستجو کنید"
                                                />
                                                <List
                                                    className="!w-full !gap-y-0"
                                                    width={200}
                                                    height={190}
                                                    rowCount={filteredCitiesAndStates?.length || 0}
                                                    rowHeight={({ index }) => citiesAndStates.data[index + 1]?.is_state ? 50 : 30}
                                                    rowRenderer={(item) => {
                                                        return rowRenderer({
                                                            ...item,
                                                            data: filteredCitiesAndStates[item.index],
                                                            checked: is_city_id_includes(filteredCitiesAndStates[item.index].id),
                                                            onChange: (value: boolean, data: getCitiesAndStatesOptionsTest) => {
                                                                if (value) {
                                                                    add_city_id([data.id])
                                                                }
                                                                else {
                                                                    console.log(data.id);

                                                                    remove_city_id([data.id])
                                                                }
                                                            }
                                                        })
                                                    }}
                                                />

                                            </div>

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