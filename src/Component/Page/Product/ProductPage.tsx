import { Button } from "antd";
import ModelProduct, { ModelProductItems} from "./ModelProduct";
import OnlineShop, { OnlineShopCategory, OnlineShopItem, Type_OnlineShopItem } from "./OnlineShop";
import './css/ProductPage.css';
import { _uploadFile } from "../../../api/CustomType";
import { Link } from "react-router-dom";
import FullScrollSlide, {FullScrollSection,FsHandle} from "../../../Feature/FullScrollSlide";
import { useRef} from "react";
import MyCart from "./MyCart";

function ProductPage() {
    const FsRef = useRef<FsHandle>(null)

    const ImageData:_uploadFile[] = [
        {id:'mp1',name:'mp1',url:'sdaasda'},
        {id:'mp2',name:'mp2',url:'sdaasda'},
        {id:'mp3',name:'mp3',url:'sdaasda'},
        {id:'mp4',name:'mp4',url:'sdaasda'},
        {id:'mp5',name:'mp5',url:'sdaasda'},
        {id:'mp6',name:'mp6',url:'sdaasda'},
    ]

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
                <FullScrollSection key="section1" classname="flex-center">
                    <section 
                        className="product-section product-section-landingpage flex-center">
                        <div className="product-section-container flex-center">
                            <ModelProduct>
                                {ImageData.map((child,index) => {return(
                                    <ModelProductItems key={child.id} className='flex-center' >
                                        {child.name}
                                    </ModelProductItems>
                                )})}
                            </ModelProduct>
                        </div>
                        <div className="flex-center">
                            <Button 
                                onClick={()=>{
                                    const baseGoTo = FsRef.current!.GoTo;
                                    baseGoTo!('section2');
                                }}
                                size='large' 
                                type='primary'>
                                    GETTING STARTED
                                </Button>
                                    
                            <Link to='/aboutus'><Button size='large'>ABOUT US</Button></Link>
                        </div>
                    </section>
               </FullScrollSection>
               <FullScrollSection key="section2" classname="flex-center">
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