import { search } from "./search";

interface getPopularsProps {
    key?: string,
    city_id: Array<number>,
    category_id: number
}

async function getPopulars({ category_id=undefined, city_id=undefined, key=undefined }: getPopularsProps) {
    const data = await search({
        type: 1,
        key,
        category_id,
        city_id
    });

    return data
}

export {
    getPopulars
}