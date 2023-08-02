import { useEffect, useRef, useState } from "react";
import useUserStore from "../stores/userStore"
import { get_phone_number, checkOtp, getUserInfo, signUp } from "../utils/http";
import { useTranslation } from "react-i18next";
import { useApplicationLoadingStore } from "../stores/useApplicationLoadingStore";
import { localStorage_token_key } from "../constants";
import SelectCitiesModal from "../components/SelectCitiesModal";
import { Toast, useToast } from "@chakra-ui/react";
import getBaseUrl from "../utils/base-url";
import { BsArrowRepeat } from "react-icons/bs";

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

    if (!userData.phone) {
        return <Wrapper><GetPhoneNumber /></Wrapper>
    }
    else if (typeof userData.role === "undefined" || typeof userData.status === "undefined" || !userData.token) {
        return <Wrapper><CheckOtp /></Wrapper>
    }
    else if (!userData.firstname || !userData.lastname || !userData.username) {
        return <Wrapper><GetUserDetails /></Wrapper>
    }
    return <Wrapper><Loading /></Wrapper>
}


function Wrapper({ children }) {
    return (
        <div className="w-full min-h-screen grid grid-cols-1 grid-rows-1 relative">
            <p className="text-gray-50 text-xs tracking-wide fixed bottom-4 left-4 z-20 font-[vazirThin]">powerd by <span className="text-white font-[vazirBold]">Orbyx</span></p>
            {children}
        </div>
    )
}


function GetPhoneNumber() {
    const phoneInputRef = useRef(null)
    const setApplicationLoading = useApplicationLoadingStore(selector => selector.setIsLoading)
    const toast = useToast()

    const handleLogin = () => {
        if (phoneInputRef.current.value.trim() === "") {
            toast({
                description: "شماره موبایل را وراد کنید",
                duration: 4000,
                isClosable: true,
                status: "warning",
                position: "top-right"
            })
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

            <div className="bg-blue-400 grid place-items-center">

                <div dir="rtl" className="flex flex-col items-center justify-center gap-y-8 w-full p-6 overflow-y-auto">

                    <div className="relative overflow-hidden">
                        <img
                            alt=""
                            src={getBaseUrl() + "/images/login_vector.png"}
                            className="w-80 h-auto"
                        />
                        {/* <div className="bg-blue-500 w-40 h-40 rounded-t-full absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 z-10"></div> */}
                    </div>
                    <p
                        className="text-white text-sm font-[vazir] tracking-wide leading-6"
                    >
                        اپلیکیشن کوجو یکی از محصولات شرکت راه ستاره نشان است.یک بانک اطلاعات مشاغل و اماکن شهری که با استفاده از آن، میتوانید به راحتی به اطلاعات مورد نیازتان از کسب و کارها و اماکن عمومی مختلف دسترسی پیدا کنید.
                        اطلاعاتی شامل آدرس و لوکیشن دقیق جهت مسیریابی، شماره تماس ها، عکسها، ساعات کاری، امتیازات کاربران ،تخفیفات و... .
                    </p>
                </div>

            </div>

            <div dir="rtl" className="grid place-items-center bg-gray-100 max-lg:py-16 max-lg:pb-32">
                <div className="flex flex-col gap-y-3 w-full max-w-sm">

                    <p
                        className="text-xs font-[vazir] text-blue-500/80 tracking-wide text-center mb-3"
                    >موبایل</p>

                    <input
                        maxLength={11}
                        minLength={11}
                        className="primary-text-input"
                        placeholder="شماره تماس"
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                handleLogin()
                            }
                        }}
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
    const otpRef = useRef<HTMLInputElement>(null)
    const [userData, userApi] = useUserStore(selector => [selector.user, selector.api]);
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const setApplicationIsLoading = useApplicationLoadingStore(selector => selector.setIsLoading)

    const handleSubmit = () => {
        if (
            !otpRef.current.value.trim()
        ) {
            toast({
                description: "کد تایید ارسال شده را وارد کنید",
                duration: 4000,
                isClosable: true,
                status: "warning",
                position: "top-right"
            })
        }
        else {
            setIsLoading(true)
            setApplicationIsLoading(true)
            checkOtp({
                code: parseInt(otpRef.current.value),
                user_id: userData.userid
            })
                .then(data => {
                    if (data.is_correct) {
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
                        if (data.status === 1) {
                            getUserInfo({ token: data.token })
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
                                    setIsLoading(false)
                                    setTimeout(() => {
                                        setApplicationIsLoading(false)
                                    }, 250);
                                })
                                .catch(() => {
                                    setIsLoading(false)
                                })
                        }
                        else if (data.status === 0) {
                            userApi.set_status(data.status)
                            userApi.set_token(data.token)
                            userApi.set_role(data.role)
                            setIsLoading(false)
                            setTimeout(() => {
                                setApplicationIsLoading(false)
                            }, 250);
                        }
                    }
                    else {
                        setIsLoading(false)
                        toast({
                            description: "کد وارد شده اشتباه است",
                            duration: 4000,
                            isClosable: true,
                            status: "warning",
                            position: "top-right"
                        })
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
                    className="text-slate-700 text-xl font-[vazirMedium] tracking-wide"
                >
                    تایید شماره تماس
                </p>

                <p
                    className="text-sm text-slate-600 font-[vazir] mt-4"
                >
                    کد پیامک شده به شماره ی وارد شده را وارد کنید
                </p>
                <p
                    className="text-sm text-slate-700 font-[vazir] mt-2"
                >
                    {userData.phone}
                </p>

                <div className="flex flex-col gap-y-5 mt-12">
                    <input
                        ref={otpRef}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                handleSubmit()
                            }
                        }}
                        maxLength={10}
                        className="primary-text-input py-3 font-[vazir]"
                        placeholder="کد تایید"
                    />

                    <button
                        onClick={() => {
                            setApplicationIsLoading(true)
                            get_phone_number({ phoneNumber: userData.phone })
                                .then(() => {
                                    setApplicationIsLoading(false)
                                })
                        }}
                        className="primary-btn bg-emerald-600 px-6 w-max mx-auto flex items-center gap-x-2"
                    >
                        ارسال دوباره
                        <BsArrowRepeat className="w-5 h-5 fill-gray-50" />
                    </button>

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
    const fnameRef = useRef<HTMLInputElement>(null)
    const lnameRef = useRef<HTMLInputElement>(null)
    const toast = useToast()
    const [
        city, cityId, userApi
    ] = useUserStore(selector => [selector.user.city, selector.user.city_id, selector.api])

    const handleSubmit = () => {
        if (
            usernameRef.current.value.trim() !== "" || fnameRef.current.value.trim() !== "" || lnameRef.current.value.trim() !== ""
        ) {

            signUp({
                avatar: undefined,
                city_id: cityId,
                first_name: fnameRef.current.value,
                last_name: lnameRef.current.value,
                username: usernameRef.current.value
            })
                .then(data => {
                    userApi.set_city(city)
                    userApi.set_city_id(cityId)
                    userApi.set_first_name(fnameRef.current.value)
                    userApi.set_last_name(lnameRef.current.value)
                    userApi.set_username(usernameRef.current.value)
                    userApi.set_is_logged_in(true)
                })
                .catch(err => {
                    console.log(err);
                    
                    toast({
                        description: "نام کاربری از قبل انتخاب شده است",
                        duration: 3000,
                        status: "error",
                        position: "top-right"
                    })
                })
        }
        else {
            toast({
                description: "فیلد ها را پر کنید",
                duration: 2600,
                status: "error",
                position: "top-right"
            })
        }
    }

    return (
        <div className="w-full h-full grid place-items-center p-6 bg-blue-500">
            <div className="w-full max-w-lg rounded-xl bg-gray-100 p-6 py-10">
                <p
                    className="text-slate-700 text-xl font-[vazirMedium] tracking-wide mb-12"
                >
                    {t("signup")}
                </p>

                <div className="flex flex-col gap-y-5">
                    <input
                        maxLength={32}
                        className="primary-text-input py-3 font-[vazir]"
                        placeholder="نام *"
                        ref={fnameRef}
                    />

                    <input
                        maxLength={50}
                        className="primary-text-input py-3 font-[vazir]"
                        placeholder="نام خانوادگی*"
                        ref={lnameRef}
                    />

                    <input
                        maxLength={32}
                        className="primary-text-input py-3 font-[vazir]"
                        placeholder="نام کاربری *"
                        ref={usernameRef}
                    />

                    <SelectCitiesModal>
                        <input
                            maxLength={32}
                            className="primary-text-input py-3 font-[vazir]"
                            placeholder="شهر *"
                            value={city}
                        />
                    </SelectCitiesModal>

                    <button onClick={handleSubmit} className="primary-btn mt-5">
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