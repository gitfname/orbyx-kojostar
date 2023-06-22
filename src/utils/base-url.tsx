
const getBaseUrl = () => {
    return ( import.meta.env.BASE_URL === "/".trim() || import.meta.env.BASE_URL.trim() === "" ? "/" : import.meta.env.BASE_URL )
}

export default getBaseUrl