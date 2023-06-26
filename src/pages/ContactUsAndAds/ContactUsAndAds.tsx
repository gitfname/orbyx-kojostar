
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
        <div className="w-full h-screen overflow-y-auto">
            <div className="w-full h-max py-8 px-4">

                <p
                    className="text-lg text-slate-800 font-[iranyekan400]"
                >
                    ارتباط با ما و درج تبلیغات
                </p>

                <textarea
                    rows={8}
                    className="primary-text-input mt-14"
                    placeholder="متن پیام"
                >
                </textarea>

                <p
                    className="text-slate-900 text-sm font-[iranyekan600] mt-8"
                >
                    خدمات تیم {name.fa}
                </p>

                <div className="mt-3.5 space-y-2.5">
                    <p
                        className="text-slate-700/90 text-xs font-[iranyekan400]"
                    >
                        - ثبت اماکن و مشاغل
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[iranyekan400]"
                    >
                        - مشاور رایگان کسب و کار
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[iranyekan400]"
                    >
                       - تبلیغات در صفحه اول اپلیکیشن قسمت پیشنهاد ویژه
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[iranyekan400]"
                    >
                       - تبلیغات اینستاگرامی , پیج گردانی , تئلید محتوا
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[iranyekan400]"
                    >
                       - اضافه کردن برچس تخفیفات برای صاحبان مشاغل
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[iranyekan400]"
                    >
                       - ساخت تیز , انیمیشن , موشن و لوگو
                    </p>

                    <p
                        className="text-slate-700/90 text-xs font-[iranyekan400]"
                    >
                       - طراحی سایت و اپلیکیشن
                    </p>
                </div>


            </div>
        </div>
    )
}

export default ContactUsAndAds