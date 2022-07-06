import {  getBase64, onSwipe } from '../../../../../api/utils';
import { GlobalContext } from '../../../../../hooks/GlobalContext';
import './ClassicteeSection.css'
import * as AiIcons from 'react-icons/ai'
import { ClassicContext } from '../../../../../hooks/HomeContext';
import { Button, Modal, Space, Upload, UploadFile, UploadProps } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { PlusOutlined } from '@ant-design/icons';
import { _imageData } from '../../../../../api/CustomType';
import { RcFile } from 'antd/lib/upload';

function ClassicteeSection() {
    return ( 
        <div className="section classicteeSection flex-column defaultPadding bgImage">
            <ClassicteeSlider/>
            <div className='dotNavigator'></div>
            <h1>ClassicTee</h1>
            <SliderSetting/>
        </div>
     );
}

function SliderSetting (){
    const classicContext = ClassicContext()
    const isVisible = classicContext.state.settingVisible
    const onCancel = classicContext.handleCancel
    const onOk = classicContext.handleOk
    const handleButton = () =>  classicContext.dispatch({type:'previewSetting',payload:true})

    return(
        <>
            <div className="button classic-buttonsetting">
                <Button 
                    onClick={handleButton}
                    type="primary" 
                    shape="round"
                    icon={<AiIcons.AiTwotoneEdit/>} 
                    size={'large'}/>
            </div>
            <Modal 
            onOk={onOk}
            title="Add | Remove ClassicTee Images" 
            visible={isVisible}
            onCancel={onCancel}>
                {(isVisible)?<ClassicSetting/>:null}
            </Modal>
        </>
    )
}

function ClassicSetting(){
    const globalContext = GlobalContext()
    const classicContext = ClassicContext()
    const fileCollection : UploadFile<any>[] = []
    const previewVisible = classicContext.state.previewVisible

    globalContext.globalState.ImageDataApi.classicImgData.forEach((item) => {
        fileCollection.push({
        uid: item.id,
        name: item.name,
        url: item.url,
        originFileObj: item.originFileObj
        })
    })

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) =>{
        let previewFile:_imageData = {classicImgData:[],modelImgData:[]}
        for (const items of newFileList) {
            if(!items.url){
                items.url = await getBase64(items.originFileObj as RcFile)
            };
            previewFile.classicImgData.push({
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
        <Content style={{background:"aliceblue"}}>
        <div className="site-layout-content">
            <Space direction='vertical'>
                <Upload 
                    customRequest={({file,onSuccess}) => {
                        setTimeout(() => {
                        onSuccess!("ok");
                        },0);
                    }}
                    onPreview={classicContext.handlePreview}
                    listType="picture-card"
                    fileList={fileCollection}
                    onChange={handleChange}
                >
                    {fileCollection.length>= 8 ? null : uploadButton}
                </Upload>
                <Modal 
                visible={previewVisible} 
                title={classicContext.state.previewTitle} 
                footer={null} 
                onCancel={()=>{classicContext.dispatch({type:'onCancel'})}}>
                    <img alt="example" style={{ width: '100%' }} src={classicContext.state.previewImage} />
                </Modal>
            </Space>
        </div>
        </Content>
    )
}

function ClassicteeSlider() {
    const globalState = GlobalContext()
    const classicContext = ClassicContext()
    const classicSlide = classicContext.state.classicSlide
    const imgData = globalState.globalState.ImageDataApi.classicImgData
    const value = 'translateX(-' + (100/imgData.length)*classicSlide + '%)';
    let onSwipeLocation = {start: 0, end: 0}
    const slideStyle = {
        transform: value
    }

    return ( 
        <div 
            className="classictee-slider"
            onTouchStart= {(e) => {
                let startCord = e.nativeEvent.touches[0].clientX;
                onSwipeLocation.start = startCord;
            }}
            onTouchEnd = {(e) => {
                let endCord = e.nativeEvent.changedTouches[0].clientX;
                onSwipeLocation.end = endCord;
                onSwipe(onSwipeLocation, classicContext.nextClassSlide, classicContext.previousClassSlide)
            }}>
            <button  onClick={classicContext.previousClassSlide} className='button aiIcons aiIcons-left'>
                <AiIcons.AiFillCaretLeft/>
            </button>
            <div className='classicSliderImage'  style={slideStyle}>
                {
                    imgData.map((child,index)=>{
                            return (
                                <div key = {"classicSlide" + index} className = "classicImage flex-center">
                                    <img src={child.url} id={child.id} className="image classic-image" alt=''/>
                                </div>
                            )
                    })
                }
            </div>
            <button onClick={classicContext.nextClassSlide} className='button aiIcons aiIcons-right'>
                <AiIcons.AiFillCaretRight/>
            </button>
        </div>
    );
}

export default ClassicteeSection;