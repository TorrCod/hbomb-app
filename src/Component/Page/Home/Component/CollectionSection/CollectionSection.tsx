import './CollectionSection.css'
import { Button, Upload } from "antd";
import { GlobalContext } from "../../../../../hooks/GlobalContext";
import { CollectionContext } from "../../../../../hooks/HomeContext";
import {AiTwotoneEdit} from 'react-icons/ai';
import { UserContext } from '../../../../../hooks/UserContext';

function CollectionSection() {
    const globalContext = GlobalContext();
    const collectionContext = CollectionContext();
    const collectoinData = globalContext.globalState.imageApi.CollectionData;
    const onUpload = collectionContext.onUploadImage
    const isLogin = UserContext().state.UserState.checkCredential
    
    return ( 
        <div className='positionRelative'>
            <div className='allbg bgViolet bgright'></div>
            <div className="section collectionSection flex-column defaultPadding">
                <h1>COLLECTIONS</h1>
                <div className='collection-box-container'>
                {
                    Object.keys(collectoinData).map((child,index) => {
                        return(
                            <div  
                            className={'collectionSection-box ' + ((index === 0)? 'highlight':'')} 
                            key={'collectionSection-box-' + collectoinData[child].id}>
                                {(isLogin)?<div className="button collection-buttonsetting">
                                    <Upload 
                                        customRequest={({file,onSuccess}) => {
                                            setTimeout(() => {
                                            onSuccess!("ok");
                                            },0);
                                        }}
                                        fileList={[]}
                                        onChange={(info) => {onUpload(info,index)}}
                                    >
                                    <Button 
                                        onClick={(arg) => {}}
                                        type="primary" 
                                        shape="round"
                                        icon={<AiTwotoneEdit/>} 
                                        size={'large'}/>
                                    </Upload>
                                </div>:null}
                                <img src={collectoinData[child].url} id={collectoinData[child].id} className="image collection-image" alt=''/>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
     );
}


export default CollectionSection;