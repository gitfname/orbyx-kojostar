
import { useState } from "react"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperInstanceType } from "swiper/types"

interface Props {
    images: Array<string>
}

function JobImageSlider_1({ images }: Props) {

    const [swiperInstance, setSwiperInstance] = useState<SwiperInstanceType>(undefined)

    return (
        <div className="w-full h-full relative">
            {
                images?.length > 0
                    ?
                    <Swiper
                        onSwiper={swiper => setSwiperInstance(swiper)}
                        className="w-full h-full"
                    >
                        {
                            images?.map(image => (
                                <SwiperSlide>
                                    <img
                                        alt=""
                                        src={image}
                                        className="w-full h-full object-center object-cover shadow-md shadow-black/10"
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    :
                    <div dir="ltr" className="w-full h-full bg-slate-200 grid items-center">
                        <p className="text-3xl text-center font-[vazirBold] text-slate-600">No Image :(</p>
                    </div>
            }

            {
                images?.length > 1
                    ?
                    <>
                        <button
                            onClick={() => swiperInstance.slidePrev()}
                            className="z-20 w-max bg-blue-400 backdrop-blur-md absolute top-1/2 right-4 -translate-y-1/2
                            py-3 px-4 rounded-xl text-sm textwhite transition-all duration-300 cursor-pointer active:scale-95"
                        >
                            <MdKeyboardArrowRight className="w-5 h-5 fill-gray-50" />
                        </button>

                        <button
                            onClick={() => swiperInstance.slideNext()}
                            className="z-20 w-max bg-blue-400 backdrop-blur-md absolute top-1/2 left-4 -translate-y-1/2
                            py-3 px-4 rounded-xl text-sm textwhite transition-all duration-300 cursor-pointer active:scale-95"
                        >
                            <MdKeyboardArrowLeft className="w-5 h-5 fill-gray-50" />
                        </button>
                    </>
                    : null
            }

        </div>
    )
}

export default JobImageSlider_1