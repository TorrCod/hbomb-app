import { Upload, Button, Space, Divider } from "antd"
import { UploadFile } from "antd/es/upload";
import { RcFile } from "antd/lib/upload"
import React, { useState } from "react"
import { getBase64 } from "../api/utils";
import ModalAntD from "./ModalAntD";
import './css/UploadImg.css'
import TextArea from "antd/lib/input/TextArea";

const UploadAntD = (props:UploadAnt_props) => {
    const {
        children,
        shape,type,
        icon, onUpload
    }=props;

    const [imgFile, setImgFile] = useState<UploadFile>();
    const [modalVisible, setModalVisible] = useState(false);

    const dummyRequest = ({file,onSuccess}:any) => {
        setTimeout(() => {
            onSuccess("ok");
         }, 0);
    }

    const hdlBeforeUpload: ((file: RcFile, FileList: RcFile[]) =>Promise<void>) = async (file) =>{
        if(file.type === 'image/jpeg' || file.type === 'image/png'){
            console.log('viewing');
            
            let imgToView:UploadFile = {url:'',name:'',uid:''};
            imgToView.url = await getBase64(file)
            imgToView.name = file.name;
            imgToView.uid = file.uid;
            setImgFile(imgToView);
            setModalVisible(true);
        }
    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    const handleUpload = () => {
        setModalVisible(false)
        if(onUpload){
            onUpload(imgFile!)
        }
    }

    return (
        <>
            <ModalAntD 
                modalVisible={modalVisible}
                handleCancel={() => setModalVisible(false)}
            >
                <Space 
                    className="flex-center"
                    direction='vertical'
                >
                    <div className="upld-img-container flex-center">
                        <img src={imgFile?.url} alt='img to upload'/>
                    </div>
                    <TextArea
                        placeholder="Description"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        style={{
                            'width':'30em',
                            'maxWidth':'80vw'
                        }}
                    />
                </Space>
                <Divider/>
                <Space className="flex-right">
                    <Button 
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button type='primary'
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                </Space>
            </ModalAntD>
            <Upload
                showUploadList={false}
                customRequest={dummyRequest}
                beforeUpload={hdlBeforeUpload}
            >
                <Button 
                    icon={icon}
                    shape={shape}
                    type={type}
                >
                    {children}
                </Button>
            </Upload>
        </>
    )
}
type UploadAnt_props = {
    onCancel?:() => void;
    onUpload?:(file:UploadFile) => void
    children?:React.ReactNode;
    icon?:React.ReactNode;
    shape?:"circle" | "default" | "round" | undefined
    type?:"default" | "link" | "text" | "ghost" | "primary" | "dashed" | undefined
}

export default UploadAntD