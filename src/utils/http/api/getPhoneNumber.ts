import { API_BASE_URL } from "../../../constants"

interface getPhoneNumberProps {
    phoneNumber: string
}

interface getPhoneNumberOutput {
    message: string,
    phone_number: string,
    user_id: number
}

async function get_phone_number(props: getPhoneNumberProps): Promise<getPhoneNumberOutput> {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "phone_number": props.phoneNumber.toString()
        })
    }
    const data = await (await fetch( API_BASE_URL+"/auth/get_phone_number", fetchOptions )).json()    
    return data
}

export {
    get_phone_number
}