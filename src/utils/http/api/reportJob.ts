import { reportJobApiUrl } from "../../../constants";
import useUserStore from "../../../stores/userStore";

interface reportJobProps {
    content: string;
    job_id: number;
    report_option_id: number;
}

interface reportJobOutPut {
    message: string;
}

async function reportJob({ content, job_id, report_option_id }: reportJobProps):Promise<reportJobOutPut> {
    const url = reportJobApiUrl +
    "?content="+content+
    "&job_id="+job_id+
    "&report_option_id="+report_option_id

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        }
    }

    const res = await fetch(url, fetchOptions)

    if(res.ok) {
        return await res.json()
    }
    else {
        throw new Error("something went wrong")
    }
}

export {
    reportJob
}

export type {
    reportJobOutPut
}