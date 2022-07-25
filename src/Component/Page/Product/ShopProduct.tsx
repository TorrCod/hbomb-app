import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation} from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "./css/OnlineShopSwipe.css"
import { useWindowSize } from "react-use";
import { Button } from "antd";
import useHoverStyle from "../../../customhooks/useHoverStyle";
import React, { useEffect, useRef } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const OnlineShopSwipe = ({children}:DivProp) => {
    const OLSref = useRef<HTMLDivElement>(null);
    const {width} = useWindowSize();

    useEffect(() => {
        const AiButtonLeft = document.getElementsByClassName('-aiIcons-left')[0]
        const AiButtonRight = document.getElementsByClassName('-aiIcons-right')[0]
        OLSref.current?.getElementsByClassName('swiper-button-next')[0].replaceChildren(AiButtonRight);
        OLSref.current?.getElementsByClassName('swiper-button-prev')[0].replaceChildren(AiButtonLeft)
        return () => {

        }
    },[])

    const viewCount = 
    (width<700)?1:
    (width<1150)?2:3;

    return (
        <div ref={OLSref} className="olsp-container">
            <AiFillCaretRight className="-aiIcons -aiIcons-right"/>
            <AiFillCaretLeft className="-aiIcons -aiIcons-left"/>
            <Swiper
            modules={[Navigation]}
            slidesPerView={viewCount}
            spaceBetween={30}
            navigation={true}
            className='olsp-swiper'
            {...(width <= 600)?{
                centeredSlides:true,
                init:true,
                initialSlide:1
            }:{
                centeredSlides:false,
                init:false,
                initialSlide:0
            }}
            >
                {(children as []).map((child,index) => (
                    <SwiperSlide key={'swiper-child-'+index}>
                        {child}
                    </SwiperSlide> 
                ))}
                {/* <SwiperSlide>
                    <div className="olsp-category box-shadow-default"></div>
                </SwiperSlide> */}
                {/* {children} */}
            </Swiper>
        </div>
    )
}
export const Category = ({title,children}:Category_props) => {
    return (
        <div className="olsp-category box-shadow-default flex-center">
            <h2>{title.toUpperCase()}</h2>
            <div className="olsp-item-container">
                {/* {items.map((child,index) => {
                    return(
                    <div key={'olsp-item-'+index} className="olsp-category-item">
                        <div className="olsp-category-item-image-container">
                            <img className="image" src={child.url} alt='olsp-items'></img>
                        </div>
                        <h3>{child.name}</h3>
                        <p>Price: P{child.price}</p>
                        <p>Stock: P{child.stock}</p>
                    </div>
                )})} */}
                {children}
            </div>
        </div>
    )
}

type DivProp = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export type CatItem = {
    categoryTitle: string;
    categoryId:string;
    items: OLSitems[];
}[]
type Category_props = {
    title:string;
    children:React.ReactNode
}

export const CategoryItems = (props:OLSitems) => {
    const {url,name,price,stock} = props;
    const {state,props:hoverProps} =  useHoverStyle({
        height: '28em',
      })

    return(
        <div {...hoverProps} style={state}  className="olsp-category-item box-shadow-default">
            <img className="image" src={url} alt='olsp-items'></img>
            <div className="olsp-category-desc">
                <h3>{name.toUpperCase()}</h3>
                <p>Price: P{price}</p>
                <p>Stock: {stock}pcs</p>
                <Button type='primary'>View</Button>
                <Button type='primary'>CHECK OUT</Button>
                <Button>ADD TO CART</Button>
            </div>
        </div>
    )
}

export type OLSitems = {
    url:string,
    price:number,
    stock:number,
    name:string,
    itemId?:string;
}


export default OnlineShopSwipe;