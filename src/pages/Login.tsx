import { useEffect, useRef, useState } from "react";
import useUserStore from "../stores/userStore"
import { get_phone_number, checkOtp, getUserInfo } from "../utils/http";
import { useTranslation } from "react-i18next";
import { useApplicationLoadingStore } from "../stores/useApplicationLoadingStore";
import { localStorage_token_key } from "../constants";

interface loginSteps {
    getPhoneNumber: "waiting" | "inprogress" | "complete" | "incomplete" | "not-stated",
    checkOtp: "waiting" | "inprogress" | "complete" | "incomplete" | "not-stated",
    getUserDetails: "waiting" | "inprogress" | "complete" | "incomplete" | "not-stated"
}

interface handleStepCompleteProps {
    step: "getPhoneNumber" | "checkOtp" | "getUserDetail",
    data: {
        userid?: number,
        username?: string,
        firstname?: string,
        lastname?: string,
        phone?: string,
        status?: -1 | 0 | 1,
        role?: 1 | 2 | 3,
        token?: string
    }
}

const handleStepComplete = ({ data, step }: handleStepCompleteProps) => {
    switch (step) {
        case "getPhoneNumber":
            useUserStore.getState().api.setUser({
                userid: data.userid,
                phone: data.phone,
                ...data
            })
        break;

        case "checkOtp":
            useUserStore.getState().api.setUser({
                role: data.role,
                status: data.status,
                token: data.token,
                ...data
            })
        break;

    }
}

function Login() {
    const userData = useUserStore(selector => selector.user);


    if(!userData.phone) {
        return <Wrapper><GetPhoneNumber /></Wrapper>
    }
    else if (!userData.role || !userData.status || !userData.token)
    {
        return <Wrapper><CheckOtp /></Wrapper>
    }
    else if (!userData.firstname || !userData.lastname || !userData.username) {
        return <Wrapper><GetUserDetails /></Wrapper>
    }
    return <Wrapper><Loading /></Wrapper>
}


function Wrapper({children}) {
    return (
        <div className="w-full min-h-screen grid grid-cols-1 grid-rows-1 relative">
            <p className="text-gray-50 text-xs tracking-wide fixed bottom-4 left-4 z-20 font-[iranyekan200]">powerd by <span className="text-white">Orbyx</span></p>
            {children}
        </div>
    )
}


function GetPhoneNumber() {
    const phoneInputRef = useRef(null)
    const setApplicationLoading = useApplicationLoadingStore(selector => selector.setIsLoading)

    const handleLogin = () => {
        if (phoneInputRef.current.value.trim() === "") {
            alert("enter phone number")
        }
        else {
            setApplicationLoading(true)
            get_phone_number({ phoneNumber: phoneInputRef.current.value })
            .then(data => {
                handleStepComplete({
                    step: "getPhoneNumber",
                    data: {
                        phone: data.phone_number,
                        userid: data.user_id
                    }
                })
                setApplicationLoading(false)
            })
        }
    }

    return (
        <div dir="ltr" className="w-full h-full grid grid-cols-1 lg:grid-cols-[50%_1fr]">

            <div className="bg-blue-500 grid place-items-center">

                <div dir="rtl" className="flex flex-col items-center justify-center gap-y-8 w-full p-6 overflow-y-auto">

                    <div className="relative overflow-hidden">
                        <img
                            alt=""
                            src={import.meta.env.BASE_URL + "img.png"}
                            className="w-80 h-auto"
                        />
                        <div className="bg-blue-500 w-40 h-40 rounded-t-full absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 z-10"></div>
                    </div>
                    <p
                        className="text-white text-sm font-[iranyekan400] tracking-wide leading-6"
                    >
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصل.
                    </p>
                </div>

            </div>

            <div dir="rtl" className="grid place-items-center bg-gray-100 max-lg:py-16 max-lg:pb-32">
                <div className="flex flex-col gap-y-3 w-full max-w-sm">

                    <p
                        className="text-xs font-[iranyekan400] text-blue-500/80 tracking-wide text-center mb-3"
                    >موبایل</p>

                    <input
                        maxLength={11}
                        minLength={11}
                        className="primary-text-input"
                        placeholder="شماره تماس"
                        ref={phoneInputRef}
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full rounded-xl border-none focus:outline-none text-white text-sm
                    bg-blue-500 cursor-pointer active:scale-95 duration-300 py-4 px-5"
                    >
                        ورود
                    </button>

                </div>
            </div>

        </div>
    )
}


function CheckOtp() {
    const [t] = useTranslation()
    const otpRef = useRef<HTMLInputElement>(null)
    const [userData, userApi] = useUserStore(selector => [selector.user, selector.api]);
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        if(
            !otpRef.current.value.trim()
        ) {
            alert("enter OTP password")
        }
        else {
            setIsLoading(true)
            checkOtp({
                code: parseInt(otpRef.current.value),
                user_id: userData.userid
            })
            .then(data => {
                setIsLoading(false)
                if(data.is_correct) {
                    localStorage.setItem(localStorage_token_key, data.token)
                    handleStepComplete({
                        step: "checkOtp",
                        data: {
                            userid: userData.userid,
                            phone: userData.phone,
                            role: data.role,
                            status: data.status,
                            token: data.token
                        }
                    })
                    if(data.status === 1) {
                        getUserInfo({token: data.token})
                        .then(userInfo => {
                            userApi.setUser({
                                firstname: userInfo.data.first_name,
                                lastname: userInfo.data.last_name,
                                phone: userInfo.data.phone_number,
                                role: userInfo.data.role,
                                status: 1,
                                userid: userInfo.data.id,
                                username: userInfo.data.username,
                                avatar: userInfo.data.avatar,
                                city_id: userInfo.data.city_id,
                                city: userInfo.data.city,
                                token: data.token,
                                isLoggedIn: true
                            })
                        })
                    }
                    else if (data.status === 0) {
                        
                    }
                }
                else {
                    alert("code is not correct")
                }
            })
        }
    }

    const handleChangePhone = () => {
        userApi.setUser({
            phone: ""
        })   
    }

    return (
        <div className="w-full h-full grid place-items-center p-6 bg-blue-500">
            <div className="w-full max-w-lg rounded-xl bg-gray-100 p-6 py-10 shadow-lg shadow-black/10">
                <p
                    className="text-slate-700 text-xl font-[iranyekan500] tracking-wide mb-12"
                >
                    {t("check-otp")}
                </p>

                <div className="flex flex-col gap-y-5">
                    <input
                        ref={otpRef}
                        maxLength={10}
                        className="primary-text-input py-3 font-[iranyekan400]"
                        placeholder="رمز یکبار مصرف (OTP)"
                    />

                    <div className="flex items-center gap-x-3 max-sm:flex-col max-sm:mt-3">
                        <button onClick={handleSubmit} className="primary-btn mt-5 flex-shrink-0 relative overflow-hidden flex-[3]">
                            {
                                isLoading
                                ?
                                    <div className="absolute top-0 left-0 w-full h-full z-10 bg-blue-500 grid place-items-center">
                                        <div className="w-6 h-6 aspect-square rounded-full border-t border-t-white animate-spin"></div>
                                    </div>
                                :
                                    false
                            }
                            بررسی
                        </button>
                        <button onClick={handleChangePhone} className="primary-btn flex-shrink-0 bg-rose-500 mt-5 relative overflow-hidden flex-1">
                            تغییر شماره
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}


function GetUserDetails() {
    const [t] = useTranslation()
    const usernameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const repeatPasswordRef = useRef<HTMLInputElement>(null)

    const handleSubmit = () => {
        if(
            !usernameRef.current.value.trim() || !emailRef.current.value.trim() || !passwordRef.current.value.trim() ||
            !repeatPasswordRef.current.value.trim()
        ) {
            alert("enter correctly")
        }
        else {
        }
    }

    return (
        <div className="w-full h-full grid place-items-center p-6 bg-blue-500">
            <div className="w-full max-w-lg rounded-xl bg-gray-100 p-6 py-10">
                <p
                    className="text-slate-700 text-xl font-[iranyekan500] tracking-wide mb-12"
                >
                    {t("signup")}
                </p>

                <div className="flex flex-col gap-y-5">
                    <input
                        maxLength={32}
                        className="primary-text-input py-3 font-[iranyekan400]"
                        placeholder="نام کاربری *"
                    />

                    <input
                        maxLength={50}
                        className="primary-text-input py-3 font-[iranyekan400]"
                        placeholder="ایمیل *"
                    />
                    
                    <input
                        maxLength={16}
                        className="primary-text-input py-3 font-[iranyekan400]"
                        placeholder="رمز عبور *"
                    />

                    <input
                        maxLength={16}
                        className="primary-text-input py-3 font-[iranyekan400]"
                        placeholder="تکرار رمز عبور *"
                    />

                    <button className="primary-btn mt-5">
                        ثبت نام
                    </button>
                </div>

            </div>
        </div>
    )
}


function Loading() {
    
    return (
        <div className="w-full h-full bg-gray-100 grid place-items-center">
            <div className="w-10 h-10 rounded-full border-t border-slate-900 animate-spin"></div>
        </div>
    )
}

export default Login