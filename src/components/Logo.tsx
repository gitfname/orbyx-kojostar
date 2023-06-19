
import { Link } from "react-router-dom"

function Logo() {

  return (
    <Link
        to={import.meta.env.BASE_URL}
        className="text-white text-4xl font-semibold tracking-wide"
    >
        {import.meta.env.VITE_COMPANY_NAME}
    </Link>
  )
}

export default Logo