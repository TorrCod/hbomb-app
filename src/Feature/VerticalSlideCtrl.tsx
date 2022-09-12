import { Button } from "antd";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { SwiperSlide,Swiper } from "swiper/react";
import './css/VerticalSlideCtrl.css'

const VerticalSlideCtrl = (props:VerticalSlide_props) => {
    const {children,nextBtnRef,prevBtnRef} = props;
    const child: React.ReactNode[] = [];
    const childList = child.concat(children);
    return (
        <>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: nextBtnRef!.current,
                    nextEl: prevBtnRef!.current,
                }}
                direction={"vertical"}
                className="vertical-slide-ctrl"
                allowTouchMove={false}
            >
                {childList.map((child,index) => {return(
                    <SwiperSlide key={'swiper'+ +index}>
                        {child}
                    </SwiperSlide>
                )})}
            </Swiper>
        </>
    )
}

export type SwiperMethod = {
    slideNext:() => void;
    slidePrev:() => void;
}

type VerticalSlide_props = {
    children:React.ReactNode;
    nextBtnRef?:React.RefObject<HTMLDivElement>;
    prevBtnRef?:React.RefObject<HTMLDivElement>;
}

export default VerticalSlideCtrl