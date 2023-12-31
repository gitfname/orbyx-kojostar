import { FilePondFile } from "filepond"
import { addNewJobApiUrl, updateJobApiUrl } from "../../../constants"
import useUserStore from "../../../stores/userStore"


interface dailyPlansOptions {
    dayIndex: number
    start_morning_time?: string
    end_morning_time?: string
    start_afternoon_time?: string
    end_afternoon_time?: string
    is_holiday: boolean
}

interface addJobProps {
    id: string
    title: string;
    desc: string;
    address: string;
    lat: string;
    lng: string;
    // category_IDs:Array<number>;
    // city_id: number;
    phones: Array<string>;
    // images: FilePondFile[];
    oldImages: Array<string>;
    newImages: Array<File>;
    dailyPlans: Array<dailyPlansOptions>;
    hashtags:  string;
    status: -1 | 0 | 1;
}

interface addJobOutPut {
    message: string
}

async function updateJob({
    address, desc, phones, title, id, hashtags, dailyPlans, lat, lng, newImages, oldImages, status
}: addJobProps): Promise<addJobOutPut> {

    const form = new FormData();

    let catIDs = {}
    // category_IDs.forEach(catId => catIDs[catId]=catId)

    form.append("id", id)
    form.append("title", title)
    form.append("description", desc)
    form.append("address", address)
    form.append("status", status.toString())
    // form.append("city_id", city_id.toString())
    // Object.keys(catIDs)?. forEach(catId => form.append("categories[]", catId.toString()))
    lat && form.append("lat", lat)
    lng && form.append("lng", lng)
    oldImages?.length > 0 ? oldImages.forEach(image => form.append("old_images[]", image)) : form.append("old_images[]", "")
    newImages && newImages.forEach(image => form.append("new_images[]", image))
    form.append("hashtags", hashtags)
    phones.forEach(phone => form.append("phones[]", phone))
    // images?.forEach(image => form.append("images[]", image.file))
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

    const res = await fetch(updateJobApiUrl, fetchOptions);

    return await res.json()
}

export {
    updateJob
}