

import { useNavigate } from "react-router-dom"
import { ApplicationRoutes } from "../../routes";
import getBaseUrl from "../../utils/base-url";
import Question from "./components/Question";
import Answer from "./components/Answer";
import CTA_1 from "./components/CTA_1";
import { color } from "@chakra-ui/react";
import { colors } from "../../utils/colors";
import FeatureCard_1 from "./components/FeatureCard_1";
import { useApplicationLoadingStore } from "../../stores/useApplicationLoadingStore";
import { useEffect } from "react";

function Landing() {

  const navigate = useNavigate();
  const setIsLoading = useApplicationLoadingStore(selector => selector.setIsLoading);

  const handleHeroImgLoaded = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }

  useEffect(
    () => {
      setIsLoading(true)
    },
    []
  )

  return (
    <div className="w-full pb-28">
      <img
        alt="hero section"
        onLoad={handleHeroImgLoaded}
        src={getBaseUrl() + "/images/langing-bg.png"}
        className="w-full h-auto object-center object-cover"
      />


      {/* question and answer section */}
      <div className="flex flex-col max-sm:gap-y-8 gap-y-3 px-4 md:px-6 mt-16 [&>div:nth-child(even)]:mr-auto">

        <Question text="- تا حالا شده یه جایی دنبال نزدیکترین پمپ بنزین بگردی؟" />
        <Answer text="حتما از این جور سوال ها برای شما هم پیش اومده. با این برنامه توی کوتاه ترین زمان و با دقیق ترین اطلاعات به جواب همه ی سوالات میرسی" />

      </div>


      <div
        className="w-full mt-36 grid grid-cols-1 md:grid-cols-2 place-items-center px-4 md:px-6 gap-7"
      >

        <div>
          <p className="text-sm font-[vazir] text-slate-900 leading-6">
            اپلیکیشن کوجو یکی از محصولات شرکت راه ستاره نشان است.یک بانک اطلاعات مشاغل و اماکن شهری که با استفاده از آن، میتوانید به راحتی به طلاعات مورد نیازتان از کسب و کارها و اماکن عمومی مختلف دسترسی پیدا کنید.<br />
            اطلاعاتی شامل آدرس و لوکیشن دقیق جهت مسیریابی، شماره تماس ها، عکسها، ساعات کاری، امتیازات کاربران ،تخفیفات و... .
            فیلترهای کاربردی و منحصربفرد این برنامه به شما این امکان را می دهد تا بتوانید بر اساس نوع نیاز خود، خدماتی که در نظر دارید را بر اساس فاصله و یا میزان محبوبیت آنها بصورت لیستی و طبقه بندی شده مشاهده و به درستی انتخاب کنید.
          </p>

          <div className="mt-6 flex flex-col gap-y-2 w-full max-w-[15rem] max-md:mx-auto max-md:max-w-xs">

            <CTA_1
              text="ورود به وب اپ"
              img={getBaseUrl() + "/images/pwa.png"}
              onCLick={() => navigate(ApplicationRoutes.pages.home + "home")}
            />

            <CTA_1
              text="نسخه اندروید"
              bgColor="#98C425"
              img={getBaseUrl() + "/images/android.png"}
            />

          </div>

        </div>

        <img
          alt=""
          src={getBaseUrl() + "/images/image-1.png"}
          className="w-9/12 h-auto block mx-auto object-center object-cover"
        />

      </div>


      <div
        className="w-full mt-36 grid grid-cols-1 md:grid-cols-2 place-items-center px-4 md:px-6 gap-7"
      >

        <img
          alt=""
          src={getBaseUrl() + "/images/image-2.png"}
          className="w-full h-auto object-center object-cover"
        />

        <div dir="ltr" className="flex flex-col items-start justify-center place-self-start w-full h-full">

          <div className="relative p-3 px-6 rounded-xl bg-blue-500 mb-12 mx-auto">

            <p className="text-sm text-gray-50 font-[vazirLight] leading-6 max-w-prose text-center" dir="rtl">
              تجارت های امروز به 2 دسته تقسیم می شوند.آنهایی که در محیط مجازی جایگاهی دارند و آنهایی که فاقد این جایگاهند.
              بدون شک آنهایی که فاقد این جایگاهند رو به فراموشی خواهند رفت.
            </p>

            <div className="absolute message-mark bottom-0 translate-y-[99%] left-12 w-8 h-12 bg-blue-500"></div>
          </div>

          <img
            alt=""
            src={getBaseUrl() + "/images/bill-gates.png"}
            className="w-16 h-16 rounded-full object-center object-cover block shadow shadow-black/10"
          />

          <p
            dir="rtl"
            className="text-sm text-slate-800 font-[vazir] mt-8 leading-6"
          >
            اگر صاحب کسب و کار و یا مدیر یک مجموعه هستید، می توانید به راحتی و با صرف کمترین هزینه برای ثبت اطلاعات و معرفی کسب و کار خود در این برنامه اقدام کنید، تا هرچه بیشتر دیده شوید و از بازار نوین کسب و کار عقب نمانید.
            اپلیکیشن Kojo یک تحول جدید در عرصه ی تبلیغات، معرفی کسب و کارها و اماکن در فضای مجازی است.
            یک بازار نوین که اگر از همین امروز در آن سهیم باشید، در بازار فردا جایگاه ویژه ای خواهید داشت.
            امروزه دیگر نمی توان نقش تعیین کننده ی تکنولوژی در موفقیت مشاغل را نادیده گرفت و برای کسانی که دچار این سهل انگاری می شوند، عقب ماندن از رقبا اجتناب ناپذیر و خسارت ناشی از این اشتباه در آینده جبران ناپیر خواهد بود.
            در این میان، اپلیکیشن کوجو به واسطه ی تیم خلاق و باتجربه، پشتیبانی قوی و تبلیغات موثر می تواند یک انتخاب مناسب برای صاحبان کسب و کاری باشد که می خواهند در این بازار سهیم و پویا باشند.
          </p>

        </div>

      </div>

      <div
        className="w-full mt-36 px-4 md:px-6"
      >

        <p className="text-lg font-[vazir] text-[#187FE2]">
          علاوه بر اپلیکیشن کوجو، می توانید از دیگر خدمات ما در زمینه های زیر استفاده کنید
        </p>

        <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3.5 gap-y-5">

          <FeatureCard_1
            img={getBaseUrl() + "/images/tick.png"}
            text="ثبت اماکن و مشاغل"
          />

          <FeatureCard_1
            img={getBaseUrl() + "/images/tick.png"}
            text="طراحی سایت و اپلیکیشن"
          />

          <FeatureCard_1
            img={getBaseUrl() + "/images/tick.png"}
            text="تبلیغات در صفحه اول اپلیکیشن قسمت پیشنهاد ویژه"
          />

          <FeatureCard_1
            img={getBaseUrl() + "/images/tick.png"}
            text="ساخت تیزر، انیمیشن، موشن و لوگو"
          />

          <FeatureCard_1
            img={getBaseUrl() + "/images/tick.png"}
            text="تبلیغات اینستاگرامی، پیج گردانی، تولید محتوا"
          />

          <FeatureCard_1
            img={getBaseUrl() + "/images/tick.png"}
            text="افزودن برچسب تخفیفات برای مشاغل"
          />

          <FeatureCard_1
            img={getBaseUrl() + "/images/tick.png"}
            text="مشاوره رایگان کسب و کار"
          />

          <FeatureCard_1
            img={getBaseUrl() + "/images/tick.png"}
            text="و چندین خدمت دیگر..."
          />

        </div>

      </div>


      <div
        className="w-full mt-36 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >

        <div className="flex flex-col gap-y-5">

          <p
            className="text-base text-slate-800 font-[vazirMedium]"
          >
            ما را در فضای مجازی دنبال کنید
          </p>

          <p
            className="text-sm text-slate-600 font-[vazirLight] leading-6 max-w-[40ch]"
          >
            برترین و محبوب ترین مکان های هر شهر بر اساس امتیازات مردمی،
            در صفحات رسمی برنامه معرفی خواهند شد.
          </p>

          <div className="mt-3 flex flex-col gap-y-3.5">

            <div dir="ltr" className="flex items-center justify-end gap-x-2">

              <a
                href="instagram.com/kojo_official_"
                className="text-sm text-slate-800 font-[vazir]"
              >
                instagram.com/kojo_official_
              </a>

              <img
                alt=""
                src={getBaseUrl() + "/assets/icons/instagram1.png"}
                className="w-7 h-7 object-center object-cover"
              />

            </div>

            <div dir="ltr" className="flex items-center justify-end gap-x-2">

              <a
                href="t.me/kojo_official"
                className="text-sm text-slate-800 font-[vazir]"
              >
                t.me/kojo_official
              </a>

              <img
                alt=""
                src={getBaseUrl() + "/assets/icons/telegram.png"}
                className="w-8 h-8 object-center object-cover"
              />

            </div>

            <div dir="ltr" className="flex items-center justify-end gap-x-2">

              <a
                href="#"
                className="text-sm text-slate-800 font-[vazir]"
              >
                0991 930 9031
              </a>

              <img
                alt=""
                src={getBaseUrl() + "/assets/icons/whatsApp.png"}
                className="w-7 h-7 object-center object-cover"
              />

            </div>

          </div>

        </div>

        <div className="w-11/12 md:w-10/12 rounded-3xl aspect-video bg-gray-400 max-md:mx-auto">

        </div>

      </div>

    </div>
  )
}

export default Landing