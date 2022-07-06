import { PlusOutlined } from '@ant-design/icons';
import * as AiIcons from 'react-icons/ai'
import { Button, Modal, UploadFile, UploadProps, Space, Upload, Dropdown, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { RcFile } from 'antd/lib/upload';
import { _imageData, _uploadFile } from '../../../../../api/CustomType';
import { getBase64, uploadToCloud } from '../../../../../api/utils';
import { GlobalContext } from '../../../../../hooks/GlobalContext';
import { ClassicContext, CollectionContext } from '../../../../../hooks/HomeContext';
import './CollectionSection.css'
import { CollectionSectionData } from './CollectionSectionData';
import Form from 'antd/lib/form/Form';

function CollectionSection() {
    const globalContext = GlobalContext();
    const collectionData = globalContext.globalState.ImageDataApi.collectionImgData;

    return ( 
        <div className='positionRelative'>
            <div className='allbg bgViolet bgright'></div>
            <div className="section collectionSection flex-column defaultPadding">
                <h1>Collections</h1>
                {
                    collectionData!.map((child,index) => {
                        return (
                            <div className={'collectionSection-box ' + ((index === 0)? 'highlight':'')} key={'collectionSection-box-' + child.id}>
                                <img src={child.url} id={child.id} className="image collection-image" alt=''/>
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
                        icon={<AiIcons.AiTwotoneEdit/>} 
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
    const globalContext = GlobalContext()
    const fileCollection : UploadFile<any>[] = []

    globalContext.globalState.ImageDataApi.collectionImgData!.forEach((item) => {
        fileCollection.push({
        uid: item.id,
        name: item.name,
        url: item.url,
        originFileObj: item.originFileObj
        })
    })

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) =>{
        let previewFile:_imageData = {classicImgData:[],modelImgData:[],collectionImgData:[]}
        for (const items of newFileList) {
            if(!items.url){
                items.url = await getBase64(items.originFileObj as RcFile)
            };
            previewFile.collectionImgData!.push({
                url:items.url!,
                name:'class'+items.uid,
                id: items.uid,
                originFileObj: items.originFileObj,
            })
        }
        globalContext.updateImageData(previewFile)
        // modelHooks.modelSlideHandle.handleAddNewItem(previewFile)
    }

    const uploadButton = (
        <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Space direction='vertical' className='flex-center' >
            {fileCollection.length>= 3 ? <div className=''>Remove One Image to upload</div> : null}
            <Upload 
                customRequest={({file,onSuccess}) => {
                    setTimeout(() => {
                    onSuccess!("ok");
                    },0);
                }}
                listType="picture-card"
                fileList={fileCollection}
                onChange={handleChange}
                onPreview = {() => {}}
                showUploadList={{showPreviewIcon:false}}
                onRemove={() => {onRemove = !onRemove;return onRemove}}
            >
                {fileCollection.length>= 3 ? null : uploadButton}
            </Upload>
        </Space>
    )
}

export default CollectionSection;