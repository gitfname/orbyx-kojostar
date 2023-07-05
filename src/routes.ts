import getBaseUrl from "./utils/base-url";

export const ApplicationRoutes = {

    pages: {
        home: getBaseUrl()+"/app",
        search: getBaseUrl()+"/app/search",
        bookmarks: getBaseUrl()+"/app/bookmarks",
        profile: getBaseUrl()+"/app/profile",
        nearByJobs: getBaseUrl()+"/app/near-jobs",
        jobPage: getBaseUrl()+"/app/jobs/:id",
        adminJobPage: getBaseUrl()+"/app/admin/jobs/:id",
        guestJobPage: getBaseUrl()+"/app/jobs/guest/:id",
        singleJob: (id: number) => getBaseUrl()+"/app/jobs/"+id,
        adminSingleJob: (id: number) => getBaseUrl()+"/app/admin/jobs/"+id,
        SingleGuestJob: (id: number) => getBaseUrl()+"/app/jobs/guest/"+id,
        newJob: getBaseUrl()+"/app/new-job",
        lastSeenJobs: getBaseUrl()+"/app/last-seen-jobs",
        myComments: getBaseUrl()+"/app/my-comments",
        suggestAddNewPlace: getBaseUrl()+"/app/suggest-add-new-place",
        contactUsAndAds: getBaseUrl()+"/app/contact-us-and-ads",
        commentsAndSuggestions: getBaseUrl()+"/app/comments-and-suggestios",
        editProfile: getBaseUrl()+"/app/edit-profile",
        allComments: getBaseUrl()+"/app/jobs/:jobid/comments",
        allComments__getPageUrl: (jobId: number) => getBaseUrl()+`/app/jobs/${jobId}/comments`,
        allJobs: getBaseUrl()+"/app/admin/all-jobs"
    }

}