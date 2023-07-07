import { get_phone_number } from "./api/getPhoneNumber";
import { checkOtp } from "./api/checkOtp";
import { getUserInfo } from "./api/getUserInfo";
import { getHomeData } from "./api/home";
import { getPopulars } from "./api/getPopulars";
import { getCitiesAndStates } from "./api/getCitiesAndStates";
import { getCategories } from "./api/getCategories";
import { getMostCommentedJobs } from "./api/getMostCommentedJobs";
import { getDisCounts } from "./api/getDisCounts";
import { getAllBookMarks } from "./api/getAllBookMarks";
import { addJob } from "./api/addJob";
import { updateCity } from "./api/updateCity";
import { lastViewedJobs} from "./api/lastViewedJobs";
import { getMyComments } from "./api/getMyComments";
import { checkIsLoggedIn } from "./api/checkIsLoggedIn";
import { updateProfile } from "./api/updateProfile";
import { signUp } from "./api/signUp";
import { getReportOptions } from "./api/getReportOption";
import { getSingleGuestJob } from "./api/getSingleGuestJob";
import { getAllJobsFromAdminRoute } from "./api/getAllJobs__fromAdminRoute";
import { getNearByJobs } from "./api/getNearByJobs";
import { getSingleJob } from "./api/getSingleJob";
import { getSingleJobFromAdminRoute } from "./api/getSingleJobFromAdminRoute";

export {
    get_phone_number,
    checkOtp,
    getUserInfo,
    getHomeData,
    getPopulars,
    getCitiesAndStates,
    getCategories,
    getMostCommentedJobs,
    getDisCounts,
    getAllBookMarks,
    addJob,
    updateCity,
    lastViewedJobs,
    getMyComments,
    checkIsLoggedIn,
    updateProfile,
    signUp,
    getReportOptions,
    getSingleGuestJob,
    getAllJobsFromAdminRoute,
    getNearByJobs,
    getSingleJobFromAdminRoute,
    getSingleJob
}