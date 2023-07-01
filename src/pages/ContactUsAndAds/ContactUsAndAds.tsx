
import { useEffect } from "react"
import middleware from "./middleware"
import { name } from "../../constants"
import getBaseUrl from "../../utils/base-url"
import { AiOutlinePhone } from "react-icons/ai"
import { FaPaperPlane } from "react-icons/fa"
import { BsInstagram, BsWhatsapp } from "react-icons/bs"

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

                <p
                    className="text-slate-900 text-sm font-[vazirMedium] mt-12"
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

                <div
                    className="w-full mt-12 flex flex-col gap-y-4 items-center justify-center"
                >
                    <p className="text-lg text-slate-800 font-[vazirMedium]">ارتباط با ما</p>

                    <div className="p-2 rounded-lg hover:bg-blue-500/10 transition-colors duration-300 cursor-pointer">
                        <AiOutlinePhone className="w-7 h-7 fill-blue-500" />
                    </div>

                    <p className="text-lg text-slate-800 font-[vazirMedium]">ما را در شبکه های اجتماعی دنبال کنید</p>

                    <div className="flex items-center gap-x-8">
                        <a
                            href="https://wa.me/message/ER3DLK325ANAP1"
                            target="_blank"
                        >
                            <BsWhatsapp className="w-6 h-6 fill-blue-500 hover:fill-blue-600 transition-colors duration-300 cursor-pointer" />
                        </a>
                        <a
                            href="https://instagram.com/_kojo_official?igshid=ZGUzMzM3NWJiOQ=="
                            target="_blank"
                        >
                            <BsInstagram className="w-6 h-6 fill-blue-500 hover:fill-blue-600 transition-colors duration-300 cursor-pointer" />
                        </a>
                        <a
                            href="https://t.me/+VOrZg6msKbm1QjCY"
                            target="_blank"
                        >
                            <FaPaperPlane className="w-6 h-6 fill-blue-500 hover:fill-blue-600 transition-colors duration-300 cursor-pointer" />
                        </a>
                    </div>
                </div>

                <button className="primary-btn mt-16 block w-full max-w-sm mx-auto px-10">
                    ارسال
                </button>

            </div>
        </div>
    )
}

export default ContactUsAndAds