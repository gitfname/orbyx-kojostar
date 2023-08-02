
import useSWR from "swr"
import { getLandingPageDetails } from "../utils/http/api/getLandingPageDetails"


function LoadInitialData() {
    useSWR(
        "/landing-page",
        async () => await getLandingPageDetails(),
        {
            revalidateOnFocus: false,
            shouldRetryOnError: true,
            errorRetryInterval: 2500,
            errorRetryCount: 3
        }
    )
return null
}

export default LoadInitialData