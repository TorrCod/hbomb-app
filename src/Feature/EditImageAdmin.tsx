import { Button, Upload, UploadFile } from "antd";
import ModalAntD, { MADhandle } from "./ModalAntD";
import { PlusOutlined } from '@ant-design/icons';
import { DetailedHTMLProps, useRef, useState } from "react";
import './css/EditImageAdmin.css'
import { UploadChangeParam } from "antd/lib/upload";
import AdminPreviledge from "./AdminPreviledge";

const EditImageButton = (props:type_EditImageButton) => {
    const modalAntDRef = useRef<MADhandle>(null);
    const {
        icon, children,maxList
    } = props
    const maxCount = maxList? maxList: 8

    const [imageList, setImageList] = useState<UploadFile<any>[]>(props.imageList);

    const onChange = ({ fileList: newFileList}: UploadChangeParam<UploadFile<any>>) => {
            setImageList(newFileList);
            props.onchange();
    }

    const showModal = () => {
        modalAntDRef.current?.showModal();
    };

    const onCancel = () => {
        const hidelModal = modalAntDRef.current?.handleCancel;
        hidelModal!();
    }

    const handleEditImageCancel = () => {
        setImageList(props.imageList)
        onCancel()
    }

    const handleEditImageSave = () => {
        props.onsave(imageList);
        onCancel()
    }

    const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <AdminPreviledge>
            <ModalAntD title='SETTING' ref = {modalAntDRef} handleCancel={onCancel}>
                <Upload 
                accept="image/png, image/jpeg"
                customRequest={(e) => {setTimeout(() => {e.onSuccess!("ok")},0)}}
                // action='gs://hbomb-d8887.appspot.com/'
                listType="picture-card"
                fileList={imageList}
                onChange={onChange}
                showUploadList = {{previewIcon:false,showPreviewIcon:false}}
                >
                    {(imageList.length < maxCount)? uploadButton : null}
                </Upload>
                <div className="editimage-button-modal">
                    <Button onClick={handleEditImageCancel}>Cancel</Button>
                    <Button onClick={handleEditImageSave} type="primary">Save</Button>
                </div>
            </ModalAntD>
            <div className="editimage-button-container">
                <Button size="large" icon={icon} type="primary" shape="round" className="editimagebutton" onClick={showModal}>
                    {children}
                </Button>
            </div>
        </AdminPreviledge>
    )
}

type type_EditImageButton={
    maxList?:number;
    onCancel:() => void;
    onsave:(imageList:UploadFile<any>[]) => void;
    onchange:() => void;
    icon?: React.ReactNode;
    children?:React.ReactNode | undefined;
    imageList:UploadFile<any>[];
    title?: string;
    buttonProps?: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

export default EditImageButton;