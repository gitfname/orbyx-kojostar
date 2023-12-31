import { FilePond, FilePondFile } from "filepond"
import { addNewJobApiUrl } from "../../../constants"
import useUserStore from "../../../stores/userStore"
import { map } from "leaflet"
import { getCategoriesOptionsTest } from "./getCategories"


interface dailyPlansOptions {
    dayIndex: number
    start_morning_time?: string
    end_morning_time?: string
    start_afternoon_time?: string
    end_afternoon_time?: string
    is_holiday: boolean
}

interface addJobProps {
    title: string;
    desc: string;
    address: string;
    lat: string;
    lng: string;
    category_IDs:Array<number>;
    city_id: number;
    phones: Array<string>;
    images: FilePondFile[];
    dailyPlans: Array<dailyPlansOptions>;
    hashtags:  string;
}

interface addJobOutPut {
    message: string,
    status: number,
    job_id: number
}

async function addJob({
    address, category_IDs, city_id, desc, images, lat, lng, phones, title, dailyPlans, hashtags
}: addJobProps): Promise<addJobOutPut> {

    const form = new FormData();

    let catIDs = {}
    category_IDs.forEach(catId => catIDs[catId]=catId)

    form.append("title", title)
    form.append("description", desc)
    form.append("address", address)
    form.append("city_id", city_id.toString())
    // category_IDs?.forEach(catId => form.append("categories[]", catId.toString()))
    Object.keys(catIDs)?. forEach(catId => form.append("categories[]", catId.toString()))
    form.append("lat", lat)
    form.append("lng", lng)
    form.append("hashtags", hashtags)
    phones.forEach(phone => form.append("phones[]", phone))
    images?.forEach(image => form.append("images[]", image.file))
    dailyPlans.forEach(plan => {
        if(plan.is_holiday) {
            form.append(`plan[${plan.dayIndex}][day]`, plan.dayIndex.toString())
            form.append(`plan[${plan.dayIndex}][is_holiday]`, "1")
        }
        else {
            form.append(`plan[${plan.dayIndex}][day]`, plan.dayIndex.toString())
            form.append(`plan[${plan.dayIndex}][is_holiday]`, "0")
            plan?.start_morning_time&&form.append(`plan[${plan.dayIndex}][start_morning_time]`, plan.start_morning_time)
            plan?.end_morning_time&&form.append(`plan[${plan.dayIndex}][end_morning_time]`, plan.end_morning_time)
            plan?.start_afternoon_time&&form.append(`plan[${plan.dayIndex}][start_afternoon_time]`, plan.start_afternoon_time)
            plan?.end_afternoon_time&&form.append(`plan[${plan.dayIndex}][end_afternoon_time]`, plan.end_afternoon_time)
        }
    })


    const fetchOptions = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        },
        body: form
    }

    const res = await fetch(addNewJobApiUrl, fetchOptions);

    return await res.json()
}

export {
    addJob
}