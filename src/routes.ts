import getBaseUrl from "./utils/base-url";

export const ApplicationRoutes = {

    pages: {
        home: import.meta.env.BASE_URL,
        search: getBaseUrl()+"/search",
        bookmarks: getBaseUrl()+"/bookmarks",
        profile: getBaseUrl()+"/profile",
        nearByJobs: getBaseUrl()+"/near-jobs",
        jobPage: getBaseUrl()+"/jobs/:id",
        adminJobPage: getBaseUrl()+"/admin/jobs/:id",
        guestJobPage: getBaseUrl()+"/jobs/guest/:id",
        singleJob: (id: number) => getBaseUrl()+"/jobs/"+id,
        adminSingleJob: (id: number) => getBaseUrl()+"/admin/jobs/"+id,
        SingleGuestJob: (id: number) => getBaseUrl()+"/jobs/guest/"+id,
        newJob: getBaseUrl()+"/new-job",
        lastSeenJobs: getBaseUrl()+"/last-seen-jobs",
        myComments: getBaseUrl()+"/my-comments",
        suggestAddNewPlace: getBaseUrl()+"/suggest-add-new-place",
        contactUsAndAds: getBaseUrl()+"/contact-us-and-ads",
        commentsAndSuggestions: getBaseUrl()+"/comments-and-suggestios",
        editProfile: getBaseUrl()+"/edit-profile",
        allComments: getBaseUrl()+"/jobs/:jobid/comments",
        allComments__getPageUrl: (jobId: number) => getBaseUrl()+`/jobs/${jobId}/comments`,
        allJobs: getBaseUrl()+"/admin/all-jobs"
    }

}