import { getAllCommentsApiUrl } from "../../../constants";
import useUserStore from "../../../stores/userStore";


interface getAllCommentsOutPut {
    data: Datum[];
    links: Links;
    meta: Meta;
}

interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

interface Link {
    url?: string;
    label: string;
    active: boolean;
}

interface Links {
    first: string;
    last: string;
    prev?: any;
    next?: any;
}

interface Datum {
    id: number;
    content: string;
    user: User;
    date: string;
    time: string;
    rate: number;
    status: number;
}

interface User {
    id: number;
    first_name: string;
    avatar: string;
    username: string;
}

interface getAllCommentsProps {
    job_id: number
}

async function getAllComments({ job_id }: getAllCommentsProps): Promise<getAllCommentsOutPut> {
    const url = getAllCommentsApiUrl+
    "?job_id="+job_id+
    "&page=1"+
    "&limit=20"

    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        }
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
    getAllComments
}

export type {
    getAllCommentsOutPut
}