
import { create } from "zustand"

interface useApplicationLoadingStoreProps {
    isLoading: boolean,
    setIsLoading(data: boolean): void
}

const useApplicationLoadingStore = create<useApplicationLoadingStoreProps>(set => ({
    isLoading: false,
    setIsLoading: (data) => set({isLoading: data})
}))

export {
    useApplicationLoadingStore
}
