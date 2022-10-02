import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const HorizontalSlide = ({ children }: { children: ReactNode }) => {
  return (
    <Swiper
      slidesPerView={1}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {children}
    </Swiper>
  );
};

export const Item = ({ children }: { children: ReactNode }) => {
  return <SwiperSlide className="flex-center">{children}</SwiperSlide>;
};
