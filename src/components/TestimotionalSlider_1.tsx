
import { Swiper, SwiperSlide  } from "swiper/react";
import "swiper/css"
import { Swiper as SwiperInstance } from "swiper/types";
import { useState } from "react";

export default function TestimotionalsSlider_1({items=[], renderer}) {

    const [swiper, setSwiper] = useState<SwiperInstance>(undefined)

    return (
        <Swiper
            onSwiper={swiper => setSwiper(swiper)}
            spaceBetween={0}
            breakpoints={{
                640: {
                    slidesPerView: "auto",
                    centeredSlides: true
                }
            }}
            slidesPerView={1.25}
            centeredSlides={true}
        >
            {
                items.map((item, index) => (
                    <SwiperSlide
                        onClick={() => swiper.slideTo(index)}
                        key={item.id}
                        className="sm:!w-max cursor-pointer"
                    >
                        {
                            renderer(item)
                        }
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}