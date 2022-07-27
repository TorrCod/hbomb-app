import { Button } from "antd";
import ModelProduct, { ModelProductItems} from "./ModelProduct";
import {OnlineShopSetting} from "./OnlineShop";
import './css/ProductPage.css';
import { Link, Route, Routes } from "react-router-dom";
import FullScrollSlide, {FullScrollSection,FsHandle} from "../../../Feature/FullScrollSlide";
import { useEffect, useRef, useState} from "react";
import MyCart from "./MyCart";
import ProductPageContext from "../../../hooks/ProductPageContext";
import { UploadFile } from "antd/es/upload";
import OnlineShopSwipe, { Category, CategoryItems, CatItem, OLSitems, ViewItems } from "./ShopProduct";
import VerticalSlideCtrl, { SwiperMethod } from "../../../Feature/VerticalSlideCtrl";

let timeOut:NodeJS.Timeout;

function ProductPage() {
    const FsRef = useRef<FsHandle>(null);
    const ImageData:UploadFile[] = ProductPageContext().state.landingPageImages
    const sect1Ref = useRef<HTMLDivElement>(null)
    const sect2Ref = useRef<HTMLDivElement>(null)
    const [shouldScroll, setShouldScroll] = useState(true);
    const nextSlide = useRef<HTMLDivElement>(null);
    const prevSlide = useRef<HTMLDivElement>(null);
    const [onViewItem, setOnViewItem] = useState<OLSitems>();
    const [itemOnEdit, setItemOnEdit] = useState(false)

    const olspItems:OLSitems[] = [
        {
            'url':'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
            'name':'Shorts',
            'price':100,'stock':5,itemId:'as564asd','categoryName':'Hasdadas'
        },
        {
            'url':'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
            'name':'Shorts',
            'price':100,'stock':5,itemId:'a65s4d','categoryName':'Hasdasdasdas'
        },
        {
            'url':'https://d346xxcyottdqx.cloudfront.net/wp-content/uploads/2020/07/Utilities-AI-Blg-CGI-800x600-1.jpg',
            'name':'Shorts',
            'price':100,'stock':5,itemId:'+as5d','categoryName':'Hdas'
        },
        {
            'url':'https://d346xxcyottdqx.cloudfront.net/wp-content/uploads/2020/07/Utilities-AI-Blg-CGI-800x600-1.jpg',
            'name':'Shorts',
            'price':100,'stock':5,itemId:'60540asd','categoryName':'Has1231adas'
        },
        {
            'url':'https://d346xxcyottdqx.cloudfront.net/wp-content/uploads/2020/07/Utilities-AI-Blg-CGI-800x600-1.jpg',
            'name':'Shorts',
            'price':100,'stock':5,itemId:'5a04sd6','categoryName':'5231adas'
        },{
            'url':'https://d346xxcyottdqx.cloudfront.net/wp-content/uploads/2020/07/Utilities-AI-Blg-CGI-800x600-1.jpg',
            'name':'Shorts',
            'price':100,'stock':5,itemId:'06a4ssds','categoryName':'sda'
        },
        {
            'url':'https://d346xxcyottdqx.cloudfront.net/wp-content/uploads/2020/07/Utilities-AI-Blg-CGI-800x600-1.jpg',
            'name':'Shorts',
            'price':100,'stock':5,itemId:'a65s40d','categoryName':'sasd123'
        },
    ]

    const productItemState:CatItem = [
        {'categoryTitle':'shorts',items:olspItems,categoryId:'+asd0'},
        {'categoryTitle':'tshirst',items:olspItems,categoryId:'0a6sd46'},
        {'categoryTitle':'hoodie',items:olspItems,categoryId:'0a4s6d4'},
        {'categoryTitle':'panty',items:olspItems,categoryId:'08as6d4'},
        {'categoryTitle':'bra',items:olspItems,categoryId:'a08s4d56'},
    ]

    const stopSrollonInteract = {
        onMouseOver:() => {setShouldScroll(false)},
        onMouseLeave:() => {setShouldScroll(true)}
    }

    const handleItemOnview:((item: OLSitems) => void) = (item) => {
        setOnViewItem(item)
        prevSlide.current?.click()
    }

    const catScrollHandler = () => {
        setShouldScroll(false)
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            setShouldScroll(true)
        },500)
    }

    const handleItemOnEdit: (item: OLSitems) => void = (item) => {
        setOnViewItem(item);
        setItemOnEdit(true);
        prevSlide.current?.click()
    }

    return ( 
        <div>
            <FullScrollSlide 
            stateShouldScroll={shouldScroll}
            childRef={[sect1Ref,sect2Ref]} 
            ref={FsRef} 
            slideSpeed={500}>
                <FullScrollSection
                ref={sect1Ref} 
                key="section1" 
                classname="fullscroll-section fullscroll-section-1 flex-center">
                    <section 
                        className="product-section product-section-landingpage flex-center">
                        <div className="product-section-container flex-center">
                            <ModelProduct>
                                {ImageData.map((child,index) => {return(
                                    <ModelProductItems key={child.uid+index} className='flex-center' >
                                        <img className="image" src={child.url} alt='product items'/>
                                    </ModelProductItems>
                                )})}
                            </ModelProduct>
                        </div>
                        <div className="productsection-buttons flex-center web-left">
                            <Button
                            shape="round"
                            className="productsection-buttons-primary" 
                            onClick={()=>{
                                const baseGoTo = FsRef.current!.GoTo;
                                baseGoTo!('section2');
                            }}
                            size='large' 
                            type='primary'>
                                    GETTING STARTED
                                </Button>
                                    
                            <Link to='/aboutus'>
                                <Button
                                shape="round"
                                className="productsection-buttons-secondary" 
                                size='large'>
                                    About Us
                                </Button>
                            </Link>
                        </div>
                    </section>
               </FullScrollSection>
                <FullScrollSection 
                ref={sect2Ref}
                key="section2" 
                classname="fullscroll-section fullscroll-section-2 flex-center">
                    <div className="shopcart">
                        <MyCart className="productshop-cart flex-center"/>
                        <Button style={{'display':'none'}} ref={nextSlide}>test</Button>
                        <Button style={{'display':'none'}} ref={prevSlide}>test</Button>
                    </div>
                    <div className="shop">
                        <VerticalSlideCtrl nextBtnRef={nextSlide} prevBtnRef={prevSlide}>
                            <OnlineShopSwipe>
                                {productItemState.map(({categoryTitle,items},index) => {
                                    return(
                                        <div key={'cat-id-'+index}>
                                            <Category catScrolling={catScrollHandler} title={categoryTitle}>
                                                {items.map((child,index) => {return(
                                                    <CategoryItems onEdit={handleItemOnEdit} onView={handleItemOnview} key={'cat-items-'+index} items={{...child}} />
                                                )})}
                                            </Category>
                                        </div>
                                    )
                                })}
                            </OnlineShopSwipe>
                            <ViewItems 
                                onEdit={itemOnEdit}
                                onBackButton={() => nextSlide.current?.click()}
                                items={{...onViewItem!}}
                            />
                        </VerticalSlideCtrl>
                    </div>
               </FullScrollSection>
            </FullScrollSlide>
        </div>
     );
}

export default ProductPage;