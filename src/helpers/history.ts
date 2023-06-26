import { Location, NavigateFunction } from "react-router-dom";

interface History {
    navigate: NavigateFunction,
    location: Location
}

export const history: History = {
    navigate: undefined,
    location: undefined
}