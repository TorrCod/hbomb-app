import { Button } from "antd";
import ModelProduct from "./ModelProduct";
import OnlineShop from "./OnlineShop";
import './css/ProductPage.css';
import { _uploadFile } from "../../../api/CustomType";
import { Link } from "react-router-dom";
import { useRef } from "react";


function ProductPage() {
    const ImageData:_uploadFile[] = [
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
    ]
    const myRef = useRef<null | HTMLDivElement>()
    const executeScroll = () => myRef.current!.scrollIntoView({behavior:'smooth'})
    

    return ( 
        <div>
            {/* <ClassicteeSlider imgData={[]}/> */}
            <section 
                onScroll={(e) => console.log(e)}
                className="product-section product-section-landingpage flex-center">
                <div className="product-section-container flex-center">
                    <ModelProduct imageData={ImageData}/>
                </div>
                
                <div className="flex-center">
                        <Button 
                        onClick={executeScroll}
                        size='large' 
                        type='primary' 
                        shape='round'>
                            GETTING STARTED
                        </Button>
                    <Link to='/aboutus'><Button size='large' shape='round'>ABOUT US</Button></Link>
                </div>
            </section>
            <section ref={(myRef as React.LegacyRef<HTMLElement>)} id="product-shop" className="product-section product-section-shop">
                <OnlineShop/>
            </section>
        </div>
     );
}

export default ProductPage;