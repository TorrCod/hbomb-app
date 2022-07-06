
import { _imageData } from '../../../../../api/CustomType';
import './OfferSection.css';
import { OfferSectionData } from './OfferSectionData';


function OfferSection() {
    return ( 
        <div className='positionRelative section-overflowx-disabled'>
            <div className='allbg bgViolet bgleft'></div>
            <div className='section offerSection flex-column defaultPadding'>
                <h1>We Offer</h1>
                {
                    OfferSectionData.map((child,index)=>{
                        return (
                            < div className='offerSection-box' key= {'offerSection-box '+ index}>
                                {child.content}
                            </div>
                        )
                    })
                }
            </div>
        </div>
     );
}

export default OfferSection;