

import useUserStore from "../stores/userStore"
import { checkIsLoggedIn } from "../utils/http"

async function checkAuth(): Promise<boolean> {
    const data = await checkIsLoggedIn({token: useUserStore.getState().user.token})

    if(data.is_logged_in) {
        return true
    }
    else {
        return false
    }
}

export {
    checkAuth
}