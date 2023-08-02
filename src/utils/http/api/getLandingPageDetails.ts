import { getLandignPageDetails } from "../../../constants"



interface getLandingPageDetailsOutPut {
    data: Data6;
    meta: Meta;
}

interface Meta {
}

interface Data6 {
    id: number;
    attributes: Attributes6;
}

interface Attributes6 {
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
    hero_image: Heroimage;
    section_2__img: Section2img;
    section_3__img_1: Section3img1;
    section_3__img_2: Section3img2;
    section_6__video: Section6video;
}

interface Section6video {
    data: Data5;
}

interface Data5 {
    id: number;
    attributes: Attributes5;
}

interface Attributes5 {
    name: string;
    alternativeText?: any;
    caption?: any;
    width?: any;
    height?: any;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
}

interface Section3img2 {
    data: Data4;
}

interface Data4 {
    id: number;
    attributes: Attributes4;
}

interface Attributes4 {
    name: string;
    alternativeText?: any;
    caption?: any;
    width: number;
    height: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
}

interface Section3img1 {
    data: Data3;
}

interface Data3 {
    id: number;
    attributes: Attributes3;
}

interface Attributes3 {
    name: string;
    alternativeText?: any;
    caption?: any;
    width: number;
    height: number;
    formats: Formats3;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
}

interface Formats3 {
    small: Large;
    medium: Large;
    thumbnail: Large;
}

interface Section2img {
    data: Data2;
}

interface Data2 {
    id: number;
    attributes: Attributes2;
}

interface Attributes2 {
    name: string;
    alternativeText?: any;
    caption?: any;
    width: number;
    height: number;
    formats: Formats2;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
}

interface Formats2 {
    small: Large;
    thumbnail: Large;
}

interface Heroimage {
    data: Data;
}

interface Data {
    id: number;
    attributes: Attributes;
}

interface Attributes {
    name: string;
    alternativeText?: any;
    caption?: any;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
}

interface Formats {
    large: Large;
    small: Large;
    medium: Large;
    thumbnail: Large;
}

interface Large {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path?: any;
    size: number;
    width: number;
    height: number;
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