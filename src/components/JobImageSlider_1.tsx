
import { useEffect, useState } from "react"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperInstanceType } from "swiper/types"
import getBaseUrl from "../utils/base-url"
import { FullScreen, useFullScreenHandle } from "react-full-screen"

interface Props {
    images: Array<string>
}

function JobImageSlider_1({ images }: Props) {

    const [swiperInstance, setSwiperInstance] = useState<SwiperInstanceType>(undefined)
    const handle = useFullScreenHandle()
    const [activeImagePath, setActiveImagePath] = useState<string>(undefined)

    return (
        <div className="w-full h-full relative">
            {
                images?.length > 0
                    ?
                    <>
                        <Swiper
                            onSwiper={swiper => setSwiperInstance(swiper)}
                            className="w-full h-full"
                        >
                            {
                                images?.map(image => (
                                    <SwiperSlide>
                                        <img
                                            onClick={() => {
                                                setActiveImagePath(image)
                                                handle.enter()
                                            }}
                                            alt=""
                                            src={image}
                                            className="w-full h-full object-center object-cover shadow-md shadow-black/10"
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <FullScreen handle={handle}>
                            {
                                handle.active
                                    ?
                                    <div className="w-full py-6 -z-50 h-screen grid place-items-center overflow-y-auto">
                                        <img
                                            alt=""
                                            src={activeImagePath}
                                            className="w-auto block rounded-lg mx-auto h-full object-center object-cover shadow-md shadow-black/10"
                                        />
                                    </div>
                                    :
                                    null
                            }
                        </FullScreen>
                    </>
                    :
                    <div dir="ltr" className="w-full frid place-items-center h-full bg-slate-200 grid items-center">
                        {/* <p className="text-3xl text-center font-[vazirBold] text-slate-600">No Image :(</p> */}
                        <img
                            alt=""
                            src={getBaseUrl() + "/images/kojo.png"}
                            className="h-[19rem] md:h-[24rem] object-center object-cover"
                        />
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