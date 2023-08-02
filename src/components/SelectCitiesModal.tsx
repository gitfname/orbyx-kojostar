
import { useEffect, useState } from "react";
import { useApplicationLoadingStore } from "../stores/useApplicationLoadingStore";
import useUserStore from "../stores/userStore";
import { getCitiesAndStates, getUserInfo, updateCity } from "../utils/http";
import Modal_1, { Modal_1AccordionOptions } from "./Modal_1";
import useSWR from "swr"
import { getCitiesAndStatesOptionsTest } from "../utils/http/api/getCitiesAndStates";

function SelectCitiesModal({ children }) {

    const [
        set_city_id, set_city
    ] = useUserStore(selector => [selector.api.set_city_id, selector.api.set_city]);

    const [setLoading] = useApplicationLoadingStore(selector => [selector.setIsLoading])

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

    const [citiesAndStatesSearchValue, setCitiesAndStatesSearchValue] = useState<string>(null)
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

    if (isCitiesAndStatesLoading) return <p>Loading</p>
    if (citiesAndStatesError) {
        console.log(citiesAndStatesError);
        return <p>Error</p>
        
    }

    const data: Modal_1AccordionOptions = {
        data: [
            {
                title: "انتخاب شهر",
                data: citiesAndStates.data.map(item => ({
                    id: item.id,
                    is_parent: item.is_parent,
                    title: item.name,
                    command(checked, data) {
                        setLoading(true)
                        updateCity({ city_id: data.id })
                            .then(data => {
                                set_city_id(data.data.city_id)
                                set_city(data.data.city)
                                console.log(data);
                                setLoading(false)
                            })
                            .catch(err => {
                                console.log(err);
                                setLoading(false)
                            })
                    },
                }))
            }
        ]
    }

    return (
        <Modal_1
            activeItem={[useUserStore.getState().user.city_id]}
            showCheckBox={false}
            onActiveItemChange={undefined}
            data={data}
            title="انتخاب شهر"
            placeHolder="اسم شهر مورد نظر"
        >
            {children}
        </Modal_1>
    )
}

export default SelectCitiesModal