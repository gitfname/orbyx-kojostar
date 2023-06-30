
import { useEffect } from "react"
import middleware from "./middleware"
import { name } from "../../constants"

function ContactUsAndAds() {

    useEffect(
        () => {
            middleware()
        },
        []
    )

    return (
        <div className="w-full max-lg:h-full h-screen overflow-y-auto">
            <div className="w-full h-max py-8 px-4">

                <p
                    className="text-lg text-slate-800 font-[vazirMedium]"
                >
                    ارتباط با ما و درج تبلیغات
                </p>

                <textarea
                    rows={8}
                    className="primary-text-input mt-14"
                    placeholder="متن پیام"
                >
                </textarea>

                <button className="primary-btn mt-4 w-max px-10">
                    ارسال
                </button>

                <p
                    className="text-slate-900 text-sm font-[vazir] mt-12"
                >
                    خدمات تیم {name.fa}
                </p>

                <div className="mt-3.5 space-y-2.5">
                    <p
                        className="text-slate-700/90 text-xs font-[vazir]"
                    >
                        - ثبت اماکن و مشاغل
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[vazir]"
                    >
                        - مشاور رایگان کسب و کار
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[vazir]"
                    >
                       - تبلیغات در صفحه اول اپلیکیشن قسمت پیشنهاد ویژه
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[vazir]"
                    >
                       - تبلیغات اینستاگرامی , پیج گردانی , تولید محتوا
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[vazir]"
                    >
                       - اضافه کردن برچس تخفیفات برای صاحبان مشاغل
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[vazir]"
                    >
                       - ساخت تیز , انیمیشن , موشن و لوگو
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[vazir]"
                    >
                       - طراحی سایت و اپلیکیشن
                    </p>
                </div>


            </div>
        </div>
    )
}

export default ContactUsAndAds