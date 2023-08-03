
import { create } from "zustand"
import { produce } from "immer"


interface useSearchParamsStoreProps {
    data: {
        type?: 1 | 2 | 3 | 4,
        category_id?: number,
        city_id?: Array<number>,
        lat?: number,
        lng?: number,
        key?: string
    },
    api: {
        set_city_id?(city_id:Array<number>): void,
        add_city_id?(city_id:Array<number>): void,
        remove_city_id?(city_id:Array<number>): void,
        is_city_id_includes?(city_id:number): boolean,

        set_category_id?(catid: number): void,
        is_category_id_active(cat_id:number): boolean,

        set_type?(type: 1 | 2 | 3 | 4): void,
        set_key?(value: string): void,
        set_lat?(value: number): void,
        set_lng?(value: number): void
    }
}

const useSearchParamsStore = create<useSearchParamsStoreProps>(((set, get) => ({
    data: {
        city_id: undefined,
        type: 1,
        category_id: undefined,
        key: undefined,
        lat: undefined,
        lng: undefined
    },
    api: {
        set_type: (type) => set(
            produce((state:useSearchParamsStoreProps) => {
                state.data.type = type
            })
        ),

        set_category_id: (catid) => set(
            produce((state: useSearchParamsStoreProps) => {
                state.data.category_id = catid
            })
        ),

        is_category_id_active: (value) => {
            return value === get().data.category_id
        },

        set_key: (value) => set(
            produce((state: useSearchParamsStoreProps) => {
                state.data.key = value
            }
        )),

        set_lat: (value) => set(
            produce((state: useSearchParamsStoreProps) => {
                state.data.lat = value
            })
        ),

        set_lng: (value) => set(
            produce((state: useSearchParamsStoreProps) => {
                state.data.lng = value
            })
        ),

        set_city_id: (city_id) => set({data:{ city_id }}),

        add_city_id: (city_id) => set(
            produce((state: useSearchParamsStoreProps) => {
                const prevCityIDs = state.data.city_id
                let newCityIDs = []
                if(prevCityIDs) {
                    newCityIDs = [...prevCityIDs, ...city_id]
                }
                else {
                    newCityIDs = city_id
                }
                state.data.city_id = newCityIDs
            })
        ),

        remove_city_id: (city_id) => set(
            produce((state: useSearchParamsStoreProps) => {
                const prevCityIDs = state.data.city_id
                let newCityIDs = []
                if(prevCityIDs) {
                    newCityIDs = [...prevCityIDs.filter(v => !city_id.includes(v))]
                    state.data.city_id = newCityIDs
                }
            })
        ),

        is_city_id_includes: (city_id) => {
            const prevCityIDs = get().data.city_id
            if(prevCityIDs) {
                return prevCityIDs.includes(city_id)
            }
        }
    }
})))

export {
    useSearchParamsStore
}