
function Loading() {
    return (
        <div className="w-full h-full grid place-items-center">
            <div className="w-full h-72 grid place-items-center">
                <div className="p-4 px-6 rounded-2xl flex flex-col items-center justify-center gap-y-5 bg-blue-500/80
          shadow-lg shadow-black/5">
                    <p className="text-base text-slate-50 font-[vazir]">در حال بارگذاری</p>
                    <div className="w-10 h-10 border-t border-t-white rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading