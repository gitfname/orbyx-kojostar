import { FilePond, FilePondFile } from "filepond"
import { addNewJobApiUrl } from "../../../constants"
import useUserStore from "../../../stores/userStore"


interface addJobProps {
    title: string
    desc: string
    address: string
    lat: string
    lng: string
    category_id: string
    city_id: string
    phones: Array<string>
    images: FilePondFile[]
}

interface addJobOutPut {
    message: string,
    status: number,
    job_id: number
}

async function addJob({
    address, category_id, city_id, desc, images, lat, lng, phones, title
}: addJobProps): Promise<addJobOutPut> {

    const form = new FormData();

    form.append("Title", title)
    form.append("description", desc)
    form.append("address", address)
    form.append("city_id", city_id)
    form.append("category_id", category_id)
    form.append("lat", lat)
    form.append("lng", lng)
    phones.forEach(phone => form.append("phones[]", phone))
    images.forEach(image => form.append("images[]", image.file))

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
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