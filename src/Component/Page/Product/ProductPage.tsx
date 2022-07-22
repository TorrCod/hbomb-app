import { Button } from "antd";
import ModelProduct, { ModelProductItems} from "./ModelProduct";
import OnlineShop, { OnlineShopCategory, OnlineShopItem, Type_OnlineShopItem } from "./OnlineShop";
import './css/ProductPage.css';
import { Link } from "react-router-dom";
import FullScrollSlide, {FullScrollSection,FsHandle} from "../../../Feature/FullScrollSlide";
import { useRef} from "react";
import MyCart from "./MyCart";
import ProductPageContext from "../../../hooks/ProductPageContext";
import { UploadFile } from "antd/es/upload";

function ProductPage() {
    const FsRef = useRef<FsHandle>(null)
    const ImageData:UploadFile[] = ProductPageContext().state.landingPageImages

    const ItemShopData:Type_OnlineShopItem[] = [
        {
            'imageurl':'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
            'key':'ISid1',
            'itemName':'Shorts',
            'price':100,'stock':5
        },
        {
            'imageurl':'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
            'key':'ISid2',
            'itemName':'Shorts',
            'price':100,'stock':5
        },
        {
            'imageurl':'https://d346xxcyottdqx.cloudfront.net/wp-content/uploads/2020/07/Utilities-AI-Blg-CGI-800x600-1.jpg',
            'key':'ISid3',
            'itemName':'Shorts',
            'price':100,'stock':5
        },
        {
            'imageurl':'https://d346xxcyottdqx.cloudfront.net/wp-content/uploads/2020/07/Utilities-AI-Blg-CGI-800x600-1.jpg',
            'key':'ISid4',
            'itemName':'Shorts',
            'price':100,'stock':5
        },
        {
            'imageurl':'https://d346xxcyottdqx.cloudfront.net/wp-content/uploads/2020/07/Utilities-AI-Blg-CGI-800x600-1.jpg',
            'key':'ISid5',
            'itemName':'Shorts',
            'price':100,'stock':5
        },
    ]

    const ItemShopDataSecond:Type_OnlineShopItem[] = [
        {
            'imageurl':'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
            'key':'ISid1',
            'itemName':'Shorts',
            'price':100,'stock':5
        },
        {
            'imageurl':'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
            'key':'ISid2',
            'itemName':'Shorts',
            'price':100,'stock':5
        },
        {
            'imageurl':'https://d346xxcyottdqx.cloudfront.net/wp-content/uploads/2020/07/Utilities-AI-Blg-CGI-800x600-1.jpg',
            'key':'ISid3',
            'itemName':'Shorts',
            'price':100,'stock':5
        },
        {
            'imageurl':'https://d346xxcyottdqx.cloudfront.net/wp-content/uploads/2020/07/Utilities-AI-Blg-CGI-800x600-1.jpg',
            'key':'ISid4',
            'itemName':'Shorts',
            'price':100,'stock':5
        },
        {
            'imageurl':'https://d346xxcyottdqx.cloudfront.net/wp-content/uploads/2020/07/Utilities-AI-Blg-CGI-800x600-1.jpg',
            'key':'ISid5',
            'itemName':'Shorts',
            'price':100,'stock':5
        },
    ]

    const stopSrollonInteract = {
        onTouchStart:()=>{
            FsRef.current!.setScroll(false)
        },
        onTouchEnd:()=>{
            FsRef.current!.setScroll(true)
        },
        onMouseEnter:() => {
            FsRef.current!.setScroll(false)
        },
        onMouseLeave:()=>{
            FsRef.current!.setScroll(true)
        },
    }

    return ( 
        <div>
            <MyCart/>
            <FullScrollSlide ref={FsRef} slideSpeed={500}>
                <FullScrollSection key="section1" classname=".fullscroll-section fullscroll-section-1 flex-center">
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
                             className="productsection-buttons-primary" 
                                onClick={()=>{
                                    const baseGoTo = FsRef.current!.GoTo;
                                    baseGoTo!('section2');
                                }}
                                size='large' 
                                type='primary'>
                                    GETTING STARTED
                                </Button>
                                    
                            <Link to='/aboutus'><Button
                            className="productsection-buttons-secondary" 
                             size='large'>ABOUT US</Button></Link>
                        </div>
                    </section>
               </FullScrollSection>
               <FullScrollSection key="section2" classname=".fullscroll-section fullscroll-section-2 flex-center">
                    <section id="product-shop" className="product-section product-section-shop">
                        <OnlineShop>
                            <OnlineShopCategory 
                            {...stopSrollonInteract} 
                            title="T-SHIRT"
                            >
                                {ItemShopData.map((child) => {
                                    return(
                                        <OnlineShopItem {...child}/>
                                    )
                                })}
                            </OnlineShopCategory>
                            <OnlineShopCategory 
                            {...stopSrollonInteract} 
                            title="HOODIE"
                            >
                                {ItemShopDataSecond.map((child) => {
                                    return(
                                        <OnlineShopItem {...child}/>
                                    )
                                })}
                            </OnlineShopCategory>
                        </OnlineShop>
                    </section>
               </FullScrollSection>
            </FullScrollSlide>
        </div>
     );
}

export default ProductPage;