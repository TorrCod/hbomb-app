import { Button } from "antd";
import ModelProduct from "./ModelProduct";
import OnlineShop from "./OnlineShop";
import './css/ProductPage.css';
import { _uploadFile } from "../../../../api/CustomType";
import { Link } from "react-router-dom";
import FullScrollSlide, {FullScrollSection,FsHandle} from "../../../../Feature/__test__/FullScrollSlide";
import { useRef} from "react";

function ProductPage() {
    const FsRef = useRef<FsHandle>(null)

    const ImageData:_uploadFile[] = [
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
        {id:'sdasd',name:'sdasd',url:'sdaasda'},
    ]

    return ( 
        <div>
            <FullScrollSlide ref={FsRef} slideSpeed={500}>
                <FullScrollSection key="section1" classname="flex-center">
                    <section 
                        className="product-section product-section-landingpage flex-center">
                        <div className="product-section-container flex-center">
                            <ModelProduct imageData={ImageData}/>
                        </div>
                        <div className="flex-center">
                            <Button 
                                onClick={()=>{
                                    const baseGoTo = FsRef.current;
                                    baseGoTo?.GoTo('section2')
                                }}
                                size='large' 
                                type='primary' 
                                shape='round'>
                                    GETTING STARTED
                                </Button>
                                    
                            <Link to='/aboutus'><Button size='large' shape='round'>ABOUT US</Button></Link>
                        </div>
                    </section>
               </FullScrollSection>
               <FullScrollSection key="section2" classname="flex-center">
                    <section id="product-shop" className="product-section product-section-shop">
                            <OnlineShop/>
                    </section>
               </FullScrollSection>
            </FullScrollSlide>
        </div>
     );
}

export default ProductPage;