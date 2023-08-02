
import { log } from "logrocket";
import { getCityLatLng } from "..";
import useUserStore from "../../../stores/userStore";
import { sortObjectsByDistance } from "../../sortObjectsByDistance";
import { search } from "./search"
import { getCityLatLng_utility } from "../../getCityLatLng";


interface getNearByJobsProps {
    category_id: number;
    city_ids: Array<number>;
    key: string;
    lat: number;
    lng: number;
}

async function getNearByJobs({ category_id, city_ids, key, lat, lng }: getNearByJobsProps) {

    try {
        // const cityDetail = await getCityLatLng({ name: useUserStore.getState().user.city })
        // const cityDetail = await getCityLatLng_utility(useUserStore.getState().user.city_id)
        

        const data = await search({
            type: 2,
            key: key,
            city_id: city_ids,
            category_id: category_id,
            lat: lat,
            lng: lng
        });

        if (data?.data?.length > 0) {
            return {
                data: sortObjectsByDistance(data.data, lat, lng)
            }
        }

    }
    catch (err) {
        console.log(err);
        return {data: []}
    }

}

export {
    getNearByJobs
}