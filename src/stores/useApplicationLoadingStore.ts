
import { create } from "zustand"

interface useApplicationLoadingStoreProps {
    isLoading: boolean,
    setIsLoading(data: boolean): void
}

const useApplicationLoadingStore = create<useApplicationLoadingStoreProps>(set => ({
    isLoading: false,
    setIsLoading: (data) => {
        if(data) {
            document.body.classList.add("h-screen", "overflow-y-hidden")
        }
        else {
            document.body.classList.remove("h-screen", "overflow-y-hidden")
        }
        set({isLoading: data})
    }
}))

export {
    useApplicationLoadingStore
}
