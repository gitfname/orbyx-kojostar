
import { Swiper, SwiperSlide  } from "swiper/react";
import "swiper/css"

export default function TestimotionalsSlider_1({items=[], renderer}) {
    return (
        <Swiper
            spaceBetween={10}
            breakpoints={{
                640: {
                    slidesPerView: "auto"
                }
            }}
            slidesPerView={1}
            centeredSlides={true}
        >
            {
                items.map(item => (
                    <SwiperSlide key={item.id} className="sm:!w-max">
                        {
                            renderer(item)
                        }
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}