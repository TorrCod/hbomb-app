import './ModelSection.css'
import * as AiIcons from 'react-icons/ai'
import { onSwipe } from '../../../../../api/utils';
import { Button , Modal} from 'antd';
import HbombLogo from '../../../../Logo/HbombLogo';
import EditModelSlide from './EditModelSlide';
import { GlobalContext } from '../../../../../hooks/GlobalContext';
import { ModelContext } from '../../../../../hooks/HomeContext';
import { UploadFile } from 'antd/es/upload';
import { UserContext } from '../../../../../hooks/UserContext';

function ModelSection() {
    const userContext = UserContext()
    const modelContext= ModelContext()
    const globalContext = GlobalContext()
    const isLogin = userContext.state.UserState.checkCredential
    const modelSectionState = modelContext.state.ModelSectionState
    const modelData = globalContext.globalState.imageApi.ModelData
    const modelSlide = modelSectionState.modelSlide
    let onSwipeLocation = {start: 0, end: 0};
    

    const imageActive = {
        transform: "scale(1.3)",
        zIndex:'5'
    }

    const showModal = () => {
        const modelData = globalContext.globalState.imageApi.ModelData
        let addImage:UploadFile[] = []
        for (const iterator of Object.keys(modelData)) {
            addImage.push({
                uid : modelData[iterator].id,
                name : modelData[iterator].name,
                url : modelData[iterator].url,
            })
        }
        modelContext.dispatch({type:'onupload',payload:addImage})
        modelContext.dispatch({type:'showmodal'})
    };
    
    return ( 
        <div className='section flex-column flex-center'>
            <div 
                className='slider'
                onTouchStart= {(e) => {
                    let startCord = e.nativeEvent.touches[0].clientX;
                    onSwipeLocation.start = startCord;
                }}
                onTouchEnd = {(e) => {
                    let endCord = e.nativeEvent.changedTouches[0].clientX;
                    onSwipeLocation.end = endCord;
                    onSwipe(onSwipeLocation,modelContext.modelSlideHandle.handlePrevious, modelContext.modelSlideHandle.handleNext)
                }}
                >
                <button onClick={modelContext.modelSlideHandle.handleNext} className='button aiIcons aiIcons-left'><AiIcons.AiFillCaretLeft/></button>
                <div className="dummy-box" 
                style={{transform: 'translateX('+modelSectionState.effectValue+'%)'}}
                >
                    {
                        Object.keys(modelData).map((child,index) => {
                            return(
                                <div 
                                className="model-img-item flex-center" 
                                key={""+modelData[child].id+index}
                                style = {(modelSlide===index)?imageActive:{}}
                                >
                                    <img src={modelData[child].url} id={modelData[child].id} className="image model-image" alt=''/>
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={modelContext.modelSlideHandle.handlePrevious} className='button aiIcons aiIcons-right'><AiIcons.AiFillCaretRight/></button>
                <div className='model-navigator'></div>
                {(isLogin)?<div className='button model-editbutton' >
                    <Button 
                    onClick={showModal}
                    type="primary" 
                    shape="round"
                    icon={<AiIcons.AiTwotoneEdit/>} 
                    size={'large'}/>
                </div>:null}
            </div>
            <div className='model-logo'><HbombLogo/></div>
            <div className='model-button'>
                <Button type='primary' >ONLINE SHOP</Button>
                <Button>ABOUT US</Button>
            </div>
            <Modal title="Add | Remove Models" visible={modelSectionState.isModalVisible} 
            onOk={modelContext.modelSlideHandle.handleOk} 
            onCancel={modelContext.modelSlideHandle.handleCancelSetting}>
                {(modelSectionState.isModalVisible)?
                <EditModelSlide/>:null
                }
            </Modal>
        </div>
     );
}

export default ModelSection;