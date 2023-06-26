import useUserStore from "../stores/userStore"
import { FaPhoneAlt } from "react-icons/fa"
import { ImLocation } from "react-icons/im"
import Card_2 from "../components/Card_2"
import { MdKeyboardArrowLeft, MdOutlineAddLocationAlt } from "react-icons/md"
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai"
import { TbLocation } from "react-icons/tb"
import { GoCommentDiscussion, GoPencil } from "react-icons/go"
import { SlLike } from "react-icons/sl"
import { BsTelephone } from "react-icons/bs"
import { IoNewspaperOutline } from "react-icons/io5"
import { HiOutlinePencil } from "react-icons/hi2"
import { RxExit } from "react-icons/rx"
import { useNavigate } from "react-router-dom"
import { ApplicationRoutes } from "../routes"
import SelectCitiesModal from "../components/SelectCitiesModal"

function Profile() {

    const navigate = useNavigate();

    const [
        userData
    ] = useUserStore(selector => [selector.user])

    return (
        <div className="w-full h-screen overflow-y-auto pb-20">
            <div className="w-full h-max p-4">

                <div className="w-full pt-8 flex flex-col items-center justify-center gap-y-5">

                    <div className="w-56 h-56 rounded-full bg-red-300"></div>
                    <p
                        className="text-lg text-slate-800 font-[iranyekan400]"
                    >
                        {userData.firstname}
                        &nbsp;&nbsp; - &nbsp;&nbsp;
                        {userData.lastname}
                    </p>

                    <p
                        dir="ltr"
                        className="text-base text-slate-600 font-[iranyekan300]"
                    >
                        @{userData.username}
                    </p>

                </div>

                <div className="w-11/12 mx-auto border-b border-b-slate-400 my-10"></div>

                <div
                    className="w-full flex items-center justify-center gap-x-10"
                >
                    <div className="flex flex-col gap-y-3 items-center px-16">
                        <p
                            className="text-xs text-slate-800 font-[iranyekan400]"
                        >
                            {userData.city}
                        </p>
                        <ImLocation className="w-5 h-5 fill-slate-800" />
                    </div>

                    <div className="flex flex-col gap-y-3 items-center px-16">
                        <p
                            className="text-xs text-slate-800 font-[iranyekan400]"
                        >
                            {userData.phone}
                        </p>
                        <FaPhoneAlt className="w-5 h-5 fill-slate-800" />
                    </div>
                </div>

                <div className="mt-14 w-full flex flex-col gap-y-2">

                    <Card_2
                        title="افزودن مجموعه"
                        icon={<MdKeyboardArrowLeft className="w-5 h-5 fill-slate-800" />}
                        titleIcon={<AiOutlinePlus className="w-5 h-5 fill-slate-800" />}
                        onClick={() => navigate(ApplicationRoutes.pages.newJob)}
                    />

                    <SelectCitiesModal>
                        <Card_2
                            title="انتخاب شهر"
                            icon={<MdKeyboardArrowLeft className="w-5 h-5 fill-slate-800" />}
                            titleIcon={<TbLocation className="w-5 h-5 fill-transparent stroke-slate-800" />}
                            onClick={undefined}
                        />
                    </SelectCitiesModal>


                    <Card_2
                        title="آخرین بازدید ها"
                        icon={<MdKeyboardArrowLeft className="w-5 h-5 fill-slate-800" />}
                        titleIcon={<AiOutlineEye className="w-5 h-5 fill-slate-800" />}
                        onClick={undefined}
                    />

                    <Card_2
                        title="نظر های من"
                        icon={<MdKeyboardArrowLeft className="w-5 h-5 fill-slate-800" />}
                        titleIcon={<GoCommentDiscussion className="w-5 h-5 fill-slate-800" />}
                        onClick={undefined}
                    />

                    <Card_2
                        title="دعوت از دوستان"
                        icon={<MdKeyboardArrowLeft className="w-5 h-5 fill-slate-800" />}
                        titleIcon={<SlLike className="w-5 h-5 fill-slate-800" />}
                        onClick={undefined}
                    />

                    <Card_2
                        title="پیشنهاد اضافه کردن مکان"
                        icon={<MdKeyboardArrowLeft className="w-5 h-5 fill-slate-800" />}
                        titleIcon={<MdOutlineAddLocationAlt className="w-5 h-5 fill-slate-800" />}
                        onClick={undefined}
                    />

                    <Card_2
                        title="ارتباط با ما و درج تبلیغات"
                        icon={<MdKeyboardArrowLeft className="w-5 h-5 fill-slate-800" />}
                        titleIcon={<BsTelephone className="w-5 h-5 fill-slate-800" />}
                        onClick={undefined}
                    />

                    <Card_2
                        title="نظرات و پیشنهادات"
                        icon={<MdKeyboardArrowLeft className="w-5 h-5 fill-slate-800" />}
                        titleIcon={<IoNewspaperOutline className="w-5 h-5 fill-slate-800" />}
                        onClick={undefined}
                    />

                    <Card_2
                        title="ویرایش اطلاعات"
                        icon={<MdKeyboardArrowLeft className="w-5 h-5 fill-slate-800" />}
                        titleIcon={<HiOutlinePencil className="w-5 h-5 stroke-slate-800 fill-transparent" />}
                        onClick={undefined}
                    />

                    <Card_2
                        title="خروج"
                        titleIcon={<RxExit className="w-5 h-5 text-rose-500" />}
                        onClick={undefined}
                        textClassName="!text-rose-500"
                    />

                </div>

            </div>
        </div>
    )
}

export default Profile