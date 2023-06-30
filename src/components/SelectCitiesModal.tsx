
import { useApplicationLoadingStore } from "../stores/useApplicationLoadingStore";
import useUserStore from "../stores/userStore";
import { getCitiesAndStates, getUserInfo, updateCity } from "../utils/http";
import Modal_1, { Modal_1AccordionOptions } from "./Modal_1";
import useSWR from "swr"

function SelectCitiesModal({ children }) {

    const [
        set_city_id, set_city
    ] = useUserStore(selector => [selector.api.set_city_id, selector.api.set_city]);

    const [ setLoading ] = useApplicationLoadingStore(selector => [selector.setIsLoading])

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

    if (isCitiesAndStatesLoading) return <p>Loading</p>
    if (citiesAndStatesError) return <p>error</p>

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
                        updateCity({city_id: data.id})
                        .then(data => {
                            set_city_id(data.data.city_id)
                            set_city(data.data.city)
                            console.log(data);
                            setLoading(false)
                        })
                        .catch(err =>{
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
        >
            {children}
        </Modal_1>
    )
}

export default SelectCitiesModal