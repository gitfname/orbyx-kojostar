
import { filter, useDisclosure } from "@chakra-ui/react"
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
import { getCitiesAndStatesOptionsTest } from "../utils/http/api/getCitiesAndStates";
import { getCategoriesOptionsTest } from "../utils/http/api/getCategories";
import { ReactNode, useEffect, useState } from "react";
import { log } from "logrocket";

function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
    data,
    onChange,
    checked,
    showCheckBox
}) {

    const _data: Modal_1SingleItemOptions = data;

    return (
        <div
            key={key}
            style={style}
        >
            {
                _data.is_parent
                    ?
                    <p
                        className="text-base text-slate-800 font-[vazir]"
                    >
                        {_data.title}
                    </p>
                    :
                    <div
                        onClick={() => _data.command && _data.command(!checked, _data)}
                        className="flex select-none cursor-pointer items-center gap-x-2 p-2 transition-colors duration-200 rounded-lg hover:bg-transparent/5"
                    >
                        <Checkbox isChecked={checked} onChange={e => onChange(e.target.checked, _data)} />
                        <p
                            className="text-sm text-slate-700 font-[vazir]"
                        >
                            {_data.title}
                        </p>
                    </div>
            }

        </div>
    );
}


interface Modal_1SingleItemOptions {
    id: number,
    title: string,
    command?(checked: boolean, data: Modal_1SingleItemOptions): void,
    className?: string,
    additionalData?: any,
    is_parent: boolean
}

interface Modal_1AccordionOptions {
    data: Array<{
        title: string,
        titleIcon?: ReactNode,
        icon?: ReactNode,
        className?: string,
        additionalData?: any,
        data: Array<Modal_1SingleItemOptions>
    }>
}

interface Modal_1Props {
    children: ReactNode;
    className?: string;
    data: Modal_1AccordionOptions;
    title?: string;
    showCloseIcon?: boolean;
    closeIcon?: ReactNode;
    showCheckBox?: boolean;
    activeItem: Array<number>,
    onActiveItemChange(checked: boolean, data: any): void;
    placeHolder?: string;
}


function Modal_1({
    children, data, className, closeIcon = undefined, showCloseIcon = true, title = "default title", showCheckBox = false,
    activeItem = undefined, onActiveItemChange = undefined, placeHolder=""
}: Modal_1Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()


    const [filteredData, setFilteredData] = useState<Modal_1AccordionOptions>(null);
    const [dataSearchValue, setDataSearchValue] = useState<string>("")

    useEffect(
        () => {
            if (data?.data?.length > 0) {
                setFilteredData({
                    data: data.data
                })
            }
        },
        [data]
    )

    // filteredData.
    useEffect(
        () => {
            if (data?.data) {
                const _data = [...data.data];
                _data.forEach((accordionItem, index) => {
                    const res = []
                    accordionItem.data.forEach(item => {
                        if(item.title.includes(dataSearchValue)) {
                            res.push(item)
                        }
                    })
                    _data[index] = {
                        ...accordionItem,
                        data: res
                    }
                }) 
                setFilteredData({
                    data: _data
                })
            }
        },
        [dataSearchValue]
    )

    return (
        <>
            <div onClick={onOpen}>
                {children}
            </div>
            <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="medium"
                        className="font-[vazir]"
                    >
                        {title}
                    </ModalHeader>
                    {
                        showCloseIcon
                            ? <ModalCloseButton left="8px" right="unset" />
                            : false
                    }
                    <ModalBody pb="12px">

                        <Accordion
                            allowMultiple
                            allowToggle
                            display="flex"
                            flexDirection="column"
                            rowGap="10px"
                        >


                            <input
                                onChange={e => setDataSearchValue(e.target.value)}
                                value={dataSearchValue}
                                className="primary-text-input h-max text-sm py-3 w-11/12 mx-auto block"
                                placeholder={placeHolder}
                            />

                            {
                                filteredData?.data.map((item, index) => (
                                    <AccordionItem border="none">
                                        <AccordionButton
                                            borderRadius="lg"
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            {item.title}
                                            <AccordionIcon />
                                        </AccordionButton>

                                        <AccordionPanel>
                                            <List
                                                className="!w-full !gap-y-0"
                                                width={800}
                                                height={200}
                                                rowCount={item.data.length}
                                                rowHeight={({ index }) => (item.data[index + 1]?.is_parent) ? 60 : 40}
                                                rowRenderer={(row) => {
                                                    return rowRenderer({
                                                        ...row,
                                                        showCheckBox: showCheckBox,
                                                        data: item.data[row.index],
                                                        checked: activeItem?.includes(item.data[row.index].id),
                                                        onChange: (checked, data) => {
                                                            if (onActiveItemChange) onActiveItemChange(checked, data)
                                                        }
                                                    })
                                                }}
                                            />
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))
                            }


                        </Accordion>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Modal_1

export type {
    Modal_1AccordionOptions
}