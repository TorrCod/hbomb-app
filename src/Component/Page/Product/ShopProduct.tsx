import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation} from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "./css/OnlineShopSwipe.css"
import { useScrolling, useWindowSize } from "react-use";
import { Button, Input, Space} from "antd";
import useHoverStyle from "../../../customhooks/useHoverStyle";
import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight, AiOutlinePlus, AiOutlineUpload, AiTwotoneEdit } from "react-icons/ai";
import AdminPreviledge from "../../../Feature/AdminPreviledge";
import OnDelete from "../../../Feature/OnDelete";
import { BsFillBackspaceFill, BsFillTrashFill } from "react-icons/bs";
import { MdDriveFileRenameOutline } from "react-icons/md";
import UploadAntD from "../../../Feature/UploadImg";
import './css/ViewItems.css';
import TextArea from "antd/lib/input/TextArea";
import EditImageButton from "../../../Feature/EditImageAdmin";

const OnlineShopSwipe = ({children,autoplay}:DivProp) => {
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
    (width<500)?1:
    (width<1150)?2:3;

    return (
        <div ref={OLSref} className="olsp-container">
            <AiFillCaretRight className="-aiIcons -aiIcons-right"/>
            <AiFillCaretLeft className="-aiIcons -aiIcons-left"/>
            <Swiper
            autoplay = {autoplay?autoplay:true}
            modules={[Navigation,Autoplay]}
            slidesPerView={viewCount}
            spaceBetween={30}
            navigation={true}
            className='olsp-swiper'
            {...(width <= 500)?{
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
            </Swiper>
        </div>
    )
}
export const Category = ({title,children,catScrolling}:Category_props) => {
    const [onRename, setOnRename] = useState(false);

    return (
        <div className="olsp-category box-shadow-default flex-center">
                <Space>
                {(!onRename)?
                    <h2>
                        {title.toUpperCase()}
                    </h2>:
                    <Input 
                        className="olsp-cat-input"
                        maxLength={10}
                        defaultValue={title.toUpperCase()} 
                        style={{
                            'width':'7em',
                            'textAlign':'center'
                        }}
                    />
                }
                <AdminPreviledge>
                    <Space>
                        <Button 
                            type="primary" 
                            icon={<MdDriveFileRenameOutline/>}
                            shape='circle'
                            onClick={() => setOnRename(!onRename)}
                        />
                        <Button 
                            type="primary" 
                            icon={<AiOutlinePlus/>}
                            shape='circle'
                        />
                        <OnDelete 
                            shape='circle'
                            icon={<BsFillTrashFill/>} 
                            onDelete={() => {console.log('deleted');
                            }}
                        />
                    </Space>
                </AdminPreviledge>
                </Space>
            <div 
                onScroll={() => catScrolling?catScrolling():{}}
                className="olsp-item-container">
                {children}
            </div>
        </div>
    )
}

type DivProp = {
    children:React.ReactNode;
    autoplay?:boolean;
}
export type CatItem = {
    categoryTitle: string;
    categoryId:string;
    items: OLSitems[];
}[]
type Category_props = {
    title:string;
    children:React.ReactNode;
    catScrolling?:() => void;
}

export const CategoryItems = (props:OLSitem_props) => {
    const {
        url,
        name,
        price,
        stock,
    } = props.items;
    const {state,props:hoverProps} =  useHoverStyle({
        height: '26em',
    })

    const handleOnView = () => {
        if(props.onView){
            props.onView(props.items);
        }
    }

    return(
        <div {...hoverProps} style={state}  className="olsp-category-item box-shadow-default">
            <img className="image" src={url} alt='olsp-items'/>
            <div className="olsp-category-desc">
                <Space>
                    <h3>
                        {name.toUpperCase()}
                    </h3>
                    <AdminPreviledge>
                        <Space>
                            <Button 
                                type="primary" 
                                icon={<MdDriveFileRenameOutline/>}
                                shape='circle'
                                onClick={() => props.onEdit?props.onEdit(props.items):{}}
                            />
                            <OnDelete 
                                shape='circle'
                                icon={<BsFillTrashFill/>} 
                                onDelete={() => {console.log('deleted');
                                }}
                            />
                        </Space>
                    </AdminPreviledge>
                </Space>
                <span>Price:₱{price}</span>
                <span>Stock:{stock}pcs</span>
                <Button 
                onClick={handleOnView}
                type='primary'>
                    View
                </Button>
                <Button type='primary'>
                    CHECK OUT
                </Button>
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
    categoryName?:string
    description?:string
}

export type OLSitem_props = {
    onView? : (item:OLSitems) => void;
    onCheckOut? : () => void;
    onAddToCart? : () => void;
    onEdit?:(item:OLSitems) => void;
    items:OLSitems
}

export const ViewItems = (props:ViewItem_props) => {
    const [onEdit, setOnEdit] = useState(props.onEdit)
    console.log(onEdit);
    
    const {items,onAddToCart,onBackButton,onCheckOut} = props;
    const {
        url,
        name,
        categoryName,
        price,
        stock,
        description
    } = items;

    const onCancelHandle = () => {

        setOnEdit(false)
    }

    const onSaveHandle = () => {

        setOnEdit(false)
    }

    return (
        <div className="ols-item-view box-shadow-default">
            <div className="ols-item-view-top">
                    <Button 
                    onClick={() => {if(onBackButton)onBackButton()}}
                    style={{'fontSize':'1em'}}
                    className='flex-center box-shadow-solid'
                    type="primary" 
                    shape="circle" 
                    icon={<BsFillBackspaceFill/>}
                    />
                    <Space style={{'placeSelf':'center end'}}>
                        {(onEdit)?  
                            <>
                                <Button
                                    onClick={onCancelHandle}
                                >Cancel</Button>
                                <Button 
                                    onClick={onSaveHandle}
                                type="primary">Save</Button>
                            </>
                        :
                            <AdminPreviledge>
                                <Button 
                                    type="primary"
                                    shape="circle"
                                    className="flex-center"
                                    icon={<AiTwotoneEdit/>}
                                    onClick = {() => setOnEdit(true)}
                                />
                            </AdminPreviledge>
                        }
                    </Space>
            </div>
            <div className="flex-center flex-column">
                <main>
                    <div className="ols-item-view-img-container">
                        {(onEdit)?
                        <EditImageButton 
                            icon={<MdDriveFileRenameOutline/>}
                            imageList={[]}
                            onsave={() => {}}
                            onchange={() => {}}
                            onCancel={() => {}}
                            maxList = {1}
                        />
                        :null}
                        <img className="image-cover" src={url} alt="onview-img" />
                    </div>
                    <div className="ols-item-view-info">
                        <h1>
                            <div>{categoryName}</div>
                            {(onEdit)?
                                <TextArea
                                maxLength={20}
                                autoSize = {{'minRows':1,'maxRows':2}} 
                                style={{'fontSize':'1em','textAlign':'center','fontWeight':'600'}}
                                defaultValue={'TITLE'}
                                />:
                                name
                            }
                        </h1>
                        <h3>
                            Price: P
                            {(onEdit)?<Input 
                                style={{
                                    'fontSize':'1em',
                                    'fontWeight':'600',
                                    'width':'3.5em'
                                }}
                                defaultValue={'100'}
                            />:price}
                        </h3>
                        <h3>
                            Stock:  
                            {(onEdit)?<Input 
                                style={{
                                    'fontSize':'1em',
                                    'fontWeight':'600',
                                    'width':'3.5em'
                                }}
                                defaultValue={'50'} 
                            />:" "+stock}
                            pcs
                        </h3>
                        <Button 
                            onClick={() => {if(onAddToCart)onAddToCart()}}
                            shape="round" 
                            size="large" 
                            type="primary"
                        >
                            ADD TO CART
                        </Button>
                        <Button 
                            onClick={() => {if(onCheckOut)onCheckOut()}}
                            shape="round" 
                            size="large"
                        >
                            CHECK OUT
                        </Button>
                    </div>
                    <div className="ols-item-view-desc" style={{
                        'justifySelf':'flex-start'
                    }}>
                        <h3>Description:</h3>
                        <span >
                            
                            {(onEdit)?
                            <TextArea 
                                style={{'minWidth':'20em'}}
                                autoSize = {{'minRows':2}}
                                defaultValue = {description}/>
                            :
                                description
                            }
                        </span>
                    </div>
                </main>
            </div>
        </div>
    )
}
type ViewItem_props = {
    items: OLSitems;
    onEdit?:boolean;
    onBackButton?: () => void;
    onAddToCart?: () => void;
    onCheckOut?:() => void;
    onSaveEdit?:() => void;
    onCancelEdit?:() => void;
}

export default OnlineShopSwipe;