import './OfferSection.css';
import {MdDeliveryDining} from 'react-icons/md'
import { Dropdown, Button, Upload } from 'antd';
import { AiFillPlusCircle, AiTwotoneEdit } from 'react-icons/ai';
import TextArea from 'antd/lib/input/TextArea';
import { OfferContext } from '../../../../../hooks/HomeContext';
import { _OfferContentTypes } from '../../../../../api/CustomType';
import { GlobalContext } from '../../../../../hooks/GlobalContext';


function OfferSection() {
    const globalContext = GlobalContext()
    const offerContext = OfferContext()
    const offerContent = globalContext.globalState.offerSectionApi
    const handleChange = offerContext.handleChange
    const handleVisible = offerContext.handleDropDown.onVisibleChange

    return ( 
        <div className='positionRelative'>
            <div className='allbg bgViolet bgleft'></div>
            <div className='section offerSection flex-column defaultPadding'>
                <h1>We Offer</h1>
                {
                    Object.keys(offerContent).map((child,index)=>{
                        const mainObj = offerContent[child as keyof _OfferContentTypes]
                        const content = mainObj.content
                        
                        return (
                            < div className='offerSection-box' key= {'offerSection-box '+ index}>
                                <div className='buttons offerSection-box-content-buttons'>
                                    <Dropdown 
                                    overlay={(
                                        <TextArea 
                                        onChange={(event) => {handleChange(event,child)}} 
                                        rows={4} 
                                        placeholder="maxLength is 32" 
                                        maxLength={130} 
                                        />)} 
                                    placement="bottomLeft" 
                                    onVisibleChange={handleVisible}
                                    arrow>
                                        <Button 
                                            type="primary" 
                                            shape="round"
                                            icon={<AiTwotoneEdit/>} 
                                            size={'large'}/>
                                    </Dropdown>
                                </div>
                                <div className='buttons offerSection-box-icons-buttons'>
                                    <Upload 
                                        customRequest={({file,onSuccess}) => {
                                            setTimeout(() => {
                                            onSuccess!("ok");
                                            },0);
                                        }}
                                        fileList={[]}
                                        onChange={(info) => {}}
                                    >
                                        <Button 
                                            onClick={(arg) => {}}
                                            type="primary" 
                                            shape="circle"
                                            icon={<AiFillPlusCircle/>} 
                                            size={'large'}/>
                                    </Upload>
                                </div>
                                <div className='icon offerSection-box-icon'>
                                    <MdDeliveryDining/>
                                </div>
                                <div className='content offerSection-box-content'>
                                    {content}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
     );
}

export default OfferSection;