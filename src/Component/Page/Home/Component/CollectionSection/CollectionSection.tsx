import './CollectionSection.css'
import { Dropdown, Button, Space, UploadProps, UploadFile, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import { getBase64 } from "../../../../../api/utils";
import { GlobalContext } from "../../../../../hooks/GlobalContext";
import { CollectionContext } from "../../../../../hooks/HomeContext";
import {AiTwotoneEdit} from 'react-icons/ai';
import {PlusOutlined} from '@ant-design/icons'

function CollectionSection() {
    const globalContext = GlobalContext();
    const collectoinData = globalContext.globalState.imageApi.CollectionData

    return ( 
        <div className='positionRelative'>
            <div className='allbg bgViolet bgright'></div>
            <div className="section collectionSection flex-column defaultPadding">
                <h1>Collections</h1>
                {
                    Object.keys(collectoinData).map((child,index) => {
                        return(
                            <div className={'collectionSection-box ' + ((index === 0)? 'highlight':'')} key={'collectionSection-box-' + collectoinData[child].id}>
                                <img src={collectoinData[child].url} id={collectoinData[child].id} className="image collection-image" alt=''/>
                            </div>
                        )
                    })
                }
                <SliderSetting/>
            </div>
        </div>
     );
}
function SliderSetting (){
    const collectionContext = CollectionContext()
    const isVisible = collectionContext.state.dropdownState.isVisible
    const handleButton = collectionContext.handleDropDown.toggleDropdown

    return(
        <>
            <div className="button collection-buttonsetting">
                <Dropdown visible={isVisible} overlay={(<SettingContainer/>)} placement='bottom'>
                    <Button 
                        onClick={handleButton}
                        type="primary" 
                        shape="round"
                        icon={<AiTwotoneEdit/>} 
                        size={'large'}/>
                </Dropdown>
            </div>
        </>
    )
}

const SettingContainer = () => {
    const collectionContext = CollectionContext()
    const HandleOk = collectionContext.handleDropDown.onConfirmSetting
    const HandleCancel = collectionContext.handleDropDown.onCancelSetting

    return(
        <div className='collection-setting flex-center'>
            <Space direction='vertical' className='flex-center'>
                <WindowSetting/>
                <Space>
                    <Button type='default' onClick={HandleCancel}>Cancel</Button>
                    <Button type='primary' onClick={HandleOk}>Confirm</Button>
                </Space>
            </Space>
        </div>
    )
} 

let onRemove = true

function WindowSetting(){
    const collectionContext = CollectionContext()
    const onUploadImage = collectionContext.state.previewState.imageSetting
    const onUploadImageLength = onUploadImage.length

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) =>{
        let previewChange:UploadFile[] = []
        for (const iterator of newFileList) {
        if(!iterator.url) iterator.url = await getBase64(iterator.originFileObj as RcFile)
        previewChange.push({
            uid:iterator.uid,
            name:iterator.name,
            url:iterator.url,
        })
        }
        collectionContext.dispatch({type:'onUpload',payload:previewChange})
    }

    const uploadButton = (
        <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Space direction='vertical' className='flex-center' >
            {onUploadImageLength>= 3 ? <div className=''>Remove One Image to upload</div> : null}
            <Upload 
                customRequest={({file,onSuccess}) => {
                    setTimeout(() => {
                    onSuccess!("ok");
                    },0);
                }}
                listType="picture-card"
                fileList={onUploadImage}
                onChange={handleChange}
                onPreview = {() => {}}
                showUploadList={{showPreviewIcon:false}}
                onRemove={() => {onRemove = !onRemove;return onRemove}}
            >
                {onUploadImageLength >= 3 ? null : uploadButton}
            </Upload>
        </Space>
    )
}

export default CollectionSection;