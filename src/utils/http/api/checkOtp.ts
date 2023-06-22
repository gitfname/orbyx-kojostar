
import { checkOtpApiUrl } from "../../../constants";

interface checkOtpProps {
    user_id: number,
    code: number
}

interface checkOtpOutput {
    message: string,
    is_correct: boolean,
    token: string,
    status?: -1 | 0 | 1,
    role?: 1 | 2 | 3,
    user_id: number
}

async function checkOtp({ code, user_id }: checkOtpProps): Promise<checkOtpOutput> {    

    const data: checkOtpOutput = await (await fetch(checkOtpApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "code": code.toString(),
            "user_id": user_id.toString()
        })
    })).json()
    
    return new Promise(resolve => {
        resolve({
            is_correct: data.is_correct,
            message: data.message,
            role: data.role,
            status: data.status,
            token: data.token,
            user_id: data.user_id
        })
    })
}

export {
    checkOtp
}