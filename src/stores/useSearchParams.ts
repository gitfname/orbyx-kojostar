
import { create } from "zustand"

interface useSearcgParamsStoreProps {
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
        set_type?(type: 1 | 2 | 3 | 4): void,
        set_category_id?(catid: number): void,
        set_key?(value: string): void,
        set_lat?(value: number): void,
        set_lng?(value: number): void
    }
}

const useSearchParamsStore = create<useSearcgParamsStoreProps>(set => ({
    data: {
        city_id: undefined,
        type: 1,
        category_id: undefined,
        key: undefined,
        lat: undefined,
        lng: undefined
    },
    api: {
        set_city_id: (city_id) => set({data:{ city_id }}),
        set_type: (type) => set({data: { type } }),
        set_category_id: (catid) => set({ data: { category_id: catid } }),
        set_key: (value) => set({ data: { key: value } }),
        set_lat: (value) => set({ data: { lat: value } }),
        set_lng: (value) => set({ data: { lng: value } })
    }
}))

export {
    useSearchParamsStore
}