
import { useEffect } from "react"
import middleware from "./middleware"

function SuggestAddNewPlace() {

    useEffect(
        () => {
            middleware()
        },
        []
    )

    return (
        <div className="w-full max-lg:h-full h-screen overflow-y-auto">
            <div className="w-full h-min py-8 px-4">

                <p
                    className="text-lg text-slate-800 font-[vazirMedium]"
                >
                    پیشنهاد اضافه کردن مکان
                </p>

                <textarea
                    rows={8}
                    className="primary-text-input mt-14"
                    placeholder="اطلاعاتی درمورد مکان مورد نظر خود به ما بدهید"
                >
                </textarea>

                <p className="text-slate-900 text-xs font-[vazir] mt-8">
                    درصور تمایل میتوانید شماره تماس خودرا وارد کنید
                </p>
                <input
                    type="text"
                    maxLength={11}
                    className="primary-text-input mt-4"
                    placeholder="تلفن"
                />

                <button className="primary-btn mt-12 max-w-xs mx-auto block">
                    ثبت
                </button>
                
            </div>
        </div>
    )
}

export default SuggestAddNewPlace