import { getLandignPageDetails } from "../../../constants"



interface getLandingPageDetailsOutPut {
    data: Data;
    meta: Meta;
}

interface Meta {
}

interface Data {
    id: number;
    attributes: Attributes;
}

interface Attributes {
    text_1: string;
    text_2: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    questions: string;
    answer: string;
    section_2__text: string;
    section_2__btn_1_text: string;
    section_2__btn_2_text: string;
    section_3__text_1: string;
    section_3__text_2: string;
    section_4__text_1: string;
    section_4__items: Section4item[];
    section_5__text_1: string;
    section_6__text_1: string;
    section_6__text_2: string;
}

interface Section4item {
    id: number;
    icon: string;
    text: string;
}

async function getLandingPageDetails(): Promise<getLandingPageDetailsOutPut> {
    const url = getLandignPageDetails

    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
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
    getLandingPageDetails
}

export type {
    getLandingPageDetailsOutPut
}