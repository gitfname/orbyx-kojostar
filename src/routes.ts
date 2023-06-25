import getBaseUrl from "./utils/base-url";

export const ApplicationRoutes = {

    pages: {
        home: import.meta.env.BASE_URL,
        search: getBaseUrl()+"/search",
        bookmarks: getBaseUrl()+"/bookmarks",
        profile: getBaseUrl()+"/profile",
        jobPage: getBaseUrl()+"/jobs/:id",
        newJob: getBaseUrl()+"/new-job"
    }

}