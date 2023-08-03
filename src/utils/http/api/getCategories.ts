
import { getCategoriesApiUrl } from "../../../constants";
import useUserStore from "../../../stores/userStore";

interface getCategoriesOptions {
    id: number,
    name: string,
    children: Array<{
        id: number,
        parent_id: number,
        name: string
    }>
}

interface getCategoriesOutPut {
    data: Array<getCategoriesOptions>
}

interface getCategoriesOptionsTest {
    id: number,
    is_parent: boolean
    parent_id: number
    name: string
}

interface getCategoriesOutPutTest {
    data?: Array<getCategoriesOptionsTest>
}

async function getCategories(): Promise<getCategoriesOutPutTest> {

    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        }
    }

    const data:getCategoriesOutPut = await (await fetch(
        getCategoriesApiUrl,
        fetchOptions
    )).json();
    

    let d:getCategoriesOutPutTest = {
        data: []
    }
    

    data.data.forEach((parent , _) => {
        d.data.push({
            id: parent.id,
            is_parent: true,
            name: parent.name,
            parent_id: undefined
        })

        parent.children.forEach((subCategory, _) => {
            d.data.push({
                id: subCategory.id,
                name: subCategory.name,
                is_parent: false,
                parent_id: parent.id
            })
        })
        
    }) 

    return d
}

export {
    getCategories
}

export type {
    getCategoriesOutPutTest,
    getCategoriesOptions,
    getCategoriesOptionsTest
}