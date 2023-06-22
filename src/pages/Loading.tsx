import { useApplicationLoadingStore } from "../stores/useApplicationLoadingStore"

function Loading() {
    const isLoading = useApplicationLoadingStore(selector => selector.isLoading)

    return (
        <>
            {
                isLoading
                    ?
                    <div className="w-full h-screen fixed top-0 left-0 z-50 bg-blue-600 flex flex-col gap-y-5 items-center justify-center">
                        <p className="text-xl text-white tracking-wide font-[iranyekan300]">لطفا صبر کنید</p>
                        <div className="w-8 h-8 rounded-full border-t border-white animate-spin"></div>
                    </div>
                    :
                    false
            }
        </>
    )
}

export default Loading