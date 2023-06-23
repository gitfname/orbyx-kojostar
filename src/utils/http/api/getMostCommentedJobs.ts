
import { search } from "./search"


interface getMostCommentedJobsProps {
    category_id: number,
    city_ids: Array<number>
    key: string
}

async function getMostCommentedJobs({ category_id, city_ids, key }: getMostCommentedJobsProps) {

    const data = await search({
        type: 3,
        key: key,
        city_id: city_ids,
        category_id: category_id
    });

    return data
}

export {
    getMostCommentedJobs
}