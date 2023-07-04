
import { search } from "./search"


interface getNearByJobsProps {
    category_id: number;
    city_ids: Array<number>;
    key: string;
    lat: number;
    lng: number;
}

async function getNearByJobs({ category_id, city_ids, key, lat, lng }: getNearByJobsProps) {

    const data = await search({
        type: 2,
        key: key,
        city_id: city_ids,
        category_id: category_id,
        lat: lat,
        lng: lng
    });

    return data
}

export {
    getNearByJobs
}