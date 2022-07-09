import {  getBase64, onSwipe } from '../../../../../api/utils';
import { GlobalContext } from '../../../../../hooks/GlobalContext';
import './ClassicteeSection.css'
import * as AiIcons from 'react-icons/ai'
import { ClassicContext } from '../../../../../hooks/HomeContext';
import { Button, Modal, Space, Upload, UploadFile, UploadProps } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import { UserContext } from '../../../../../hooks/UserContext';

function ClassicteeSection() {
    const globalContext = GlobalContext();
    const classicContext = ClassicContext();
    const classicData = globalContext.globalState.imageApi.ClassicData;
    const currentSlide = classicContext.state.classicSlide

    let backgStyle:object = {}

    for (const iterator of Object.keys(classicData)) {
        const index = Object.keys(classicData).indexOf(iterator)
        if (index === currentSlide){
            const url = classicData[iterator].url
            backgStyle = {
                backgroundImage: 'url('+url+')'
            }
        } 
    }

    return ( 
        <div className="section classicteeSection flex-column defaultPadding bgImage" style={backgStyle}>
            <ClassicteeSlider/>
            <div className='dotNavigator'></div>
            <h1>ClassicTee</h1>
        </div>
     );
}

function SliderSetting (){
    const globalContext = GlobalContext()
    const classicContext = ClassicContext()
    const isVisible = classicContext.state.settingVisible
    const onCancel = classicContext.handleCancel
    const onOk = classicContext.handleOk

    const handleButton = () =>  {
        const ClassicData = globalContext.globalState.imageApi.ClassicData
            let addImage:UploadFile[] = []
            for (const iterator of Object.keys(ClassicData)) {
                addImage.push({
                    uid : ClassicData[iterator].id,
                    name : ClassicData[iterator].name,
                    url : ClassicData[iterator].url,
                })
            }
           classicContext.dispatch({type:'onUpload',payload:addImage})
        classicContext.dispatch({type:'previewSetting',payload:true})
    }

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
    const onUploadImage = classicContext.state.previewState.imageSetting

    globalContext.globalState.ImageDataApi.classicImgData.forEach((item) => {
        fileCollection.push({
        uid: item.id,
        name: item.name,
        url: item.url,
        originFileObj: item.originFileObj
        })
    })

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
        classicContext.dispatch({type:'onUpload',payload:previewChange})
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
                    fileList={onUploadImage}
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
    const clasicData = globalState.globalState.imageApi.ClassicData
    const classicLength = Object.keys(clasicData).length
    const isLogin = UserContext().state.UserState.checkCredential
    const value = 'translateX(-' + (100/classicLength)*classicSlide + '%)';
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
                    Object.keys(clasicData).map((child,index) => {
                        return(
                            <div key = {"classicSlide" + index} className = "classicImage flex-center">
                                <img src={clasicData[child].url} id={clasicData[child].id} className="image collection-image" alt=''/>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={classicContext.nextClassSlide} className='button aiIcons aiIcons-right'>
                <AiIcons.AiFillCaretRight/>
            </button>
            {(isLogin)?<SliderSetting/>:null}
        </div>
    );
}

export default ClassicteeSection;