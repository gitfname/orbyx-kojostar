
import { getCategories } from "./http"
import { getCategoriesOutPutTest } from "./http/api/getCategories";

let categories: getCategoriesOutPutTest = undefined;

async function loadCategories(): Promise<boolean> {
    if (typeof categories === "undefined") {
        categories = await getCategories()
        return true
    }
    return true
}

function getCategoryNameById(id: number): string | 0 {
    if (categories?.data) {
        const value = categories.data.find(item => item.id === id).name
        if (typeof value === "undefined") {
            return 0
        }
        return value
    }
}


export {
    loadCategories,
    getCategoryNameById
}