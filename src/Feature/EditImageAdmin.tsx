import { Button, Upload, UploadFile } from "antd";
import ModalAntD, { MADhandle } from "./ModalAntD";
import { PlusOutlined } from "@ant-design/icons";
import { DetailedHTMLProps, useRef, useState } from "react";
import "./css/EditImageAdmin.css";
import { UploadChangeParam } from "antd/lib/upload";
import AdminPreviledge from "./AdminPreviledge";
import {
  deleteImageFromCloudStorage,
  getImageFromCloud,
  path,
  uploadToCloudStorage,
} from "../FirebaseService/CloudStorage";
import { writeDatabase } from "../FirebaseService/RealtimeDatabase";

const EditImageButton = (props: type_EditImageButton) => {
  const modalAntDRef = useRef<MADhandle>(null);
  const { icon, children, maxList } = props;
  const maxCount = maxList ? maxList : 8;
  const [deletedFiles, setDeletedFiles] = useState<UploadFile[]>([]);

  const [imageList, setImageList] = useState<UploadFile<any>[]>(
    props.imageList
  );

  const onChange = ({
    fileList: newFileList,
  }: UploadChangeParam<UploadFile<any>>) => {
    setImageList(newFileList);
    if (props.onchange) {
      props.onchange();
    }
  };

  const showModal = () => {
    modalAntDRef.current?.showModal();
  };

  const onCancel = () => {
    const hidelModal = modalAntDRef.current?.handleCancel;
    setDeletedFiles([]);
    hidelModal!();
  };

  const handleEditImageCancel = () => {
    setImageList(props.imageList);
    onCancel();
  };

  const handleEditImageSave = async () => {
    let uploadedData: UploadFile[] = [];

    if (props.uploadPath !== undefined) {
      uploadedData = await uploadData(props.uploadPath["cloudPath"]);
      await writeDatabase(props.uploadPath["databasePath"], uploadedData);

      console.log(deletedFiles);
      for (const fileToDelete of deletedFiles) {
        console.log(fileToDelete);

        deleteImageFromCloudStorage(
          props.uploadPath["cloudPath"] + "/" + fileToDelete.uid
        );
      }
    }

    if (props.onsave) {
      props.onsave(imageList, uploadedData);
    }
    onCancel();
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadData = async (path: path): Promise<UploadFile[]> => {
    const data: UploadFile[] = [];
    for (const file of imageList) {
      if (!file.url) await uploadToCloudStorage(file, path);
    }

    for (const file of imageList) {
      const fileName = file["uid"];
      const storagePath: path = path;
      const url = await getImageFromCloud(storagePath, fileName);
      data.push({ url: url, name: file.name, uid: file.uid });
    }
    return data;
  };

  const onDelete = (file: UploadFile<any>) => {
    const delfile = deletedFiles;
    delfile.push(file);
  };

  return (
    <AdminPreviledge>
      <ModalAntD title="SETTING" ref={modalAntDRef} handleCancel={onCancel}>
        <Upload
          accept="image/png, image/jpeg"
          customRequest={(e) => {
            setTimeout(() => {
              e.onSuccess!("ok");
            }, 0);
          }}
          // action='gs://hbomb-d8887.appspot.com/'
          listType="picture-card"
          fileList={imageList}
          onChange={onChange}
          showUploadList={{ previewIcon: false, showPreviewIcon: false }}
          onRemove={onDelete}
        >
          {imageList.length < maxCount ? uploadButton : null}
        </Upload>
        <div className="editimage-button-modal">
          <Button onClick={handleEditImageCancel}>Cancel</Button>
          <Button onClick={handleEditImageSave} type="primary">
            Save
          </Button>
        </div>
      </ModalAntD>
      <div className="editimage-button-container">
        <Button
          size="large"
          icon={icon}
          type="primary"
          shape="round"
          className="editimagebutton"
          onClick={showModal}
        >
          {children}
        </Button>
      </div>
    </AdminPreviledge>
  );
};

type type_EditImageButton = {
  uploadPath?: { cloudPath: path; databasePath: string };
  maxList?: number;
  onCancel?: () => void;
  onsave?: (imageList: UploadFile<any>[], data?: UploadFile[]) => void;
  onchange?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode | undefined;
  imageList: UploadFile<any>[];
  title?: string;
  buttonProps?: DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
};

export default EditImageButton;
