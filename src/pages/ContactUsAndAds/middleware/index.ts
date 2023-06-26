
import { checkAuth } from "../../../middleware/checkAuth";
import { history } from "../../../helpers/history";
import { ApplicationRoutes } from "../../../routes";

async function middleware() {
    const isLoggedIn = await checkAuth()
    if(!isLoggedIn) {
        history.navigate(ApplicationRoutes.pages.home)
    }
}

export default middleware