
import { search } from "./search";

interface getDisCountsProps {
    city_ids: Array<number>,
    category_id: number,
    key: string
}

async function getDisCounts({ category_id, city_ids, key }: getDisCountsProps) {
    const data = await search({
        type: 4,
        city_id: city_ids,
        category_id: category_id,
        key: key
    })
    return data
}

export {
    getDisCounts
}