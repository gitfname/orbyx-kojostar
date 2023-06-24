
const getBaseUrl = () => {
    return ( import.meta.env.BASE_URL === "/" || import.meta.env.BASE_URL === "" ? "" : import.meta.env.BASE_URL )
}

export default getBaseUrl