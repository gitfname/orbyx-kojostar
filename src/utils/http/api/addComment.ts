import { addCommentApiUrl } from "../../../constants";
import useUserStore from "../../../stores/userStore";


interface addCommentProps {
    job_id: number;
    content: string;
    rate: string;
}

interface addCommentOutPut {
    data: Data;
}

interface Data {
    id: number;
    content: string;
    user: User;
    date: string;
    time: string;
    rate: string;
    status: number;
}

interface User {
    id: number;
    first_name: string;
    avatar: string;
    username: string;
}

async function addComment({ content, job_id, rate }: addCommentProps): Promise<addCommentOutPut> {
    const url = addCommentApiUrl

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        },
        body: JSON.stringify({
            job_id: job_id,
            content: content,
            rate: rate
        })
    }

    const res = await fetch(url, fetchOptions)

    if (res.ok) {
        return await res.json()
    }
    else {
        throw new Error("something went wrong")
    }
}

export {
    addComment
}

export type {
    addCommentOutPut
}