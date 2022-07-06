import { Content } from 'antd/lib/layout/layout'
import { PlusOutlined } from '@ant-design/icons';
import {Upload, Space, Modal } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { ModelContext } from '../../../../../hooks/HomeContext';
import {GlobalContext} from '../../../../../hooks/GlobalContext';
import { getBase64} from '../../../../../api/utils';
import { _imageData} from '../../../../../api/CustomType';

function EditModelSlide() {
  const globalContext = GlobalContext();
  const modelHooks = ModelContext();
  const fileCollection : UploadFile<any>[] = [];
  const myImageState = globalContext.globalState.ImageDataApi.modelImgData;
  // const deletedItems = globalContext.globalState.imageDelete
  
  
  myImageState.forEach((item) => {
    fileCollection.push({
      uid: item.id,
      name: item.name,
      url: item.url,
      originFileObj: item.originFileObj,
    })
  })

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) =>{
    let previewFile:_imageData = {classicImgData:[],modelImgData:[]}
    for (const items of newFileList) {
      console.log(!items.url);
      if(!items.url){
        items.url = await getBase64(items.originFileObj as RcFile)
      };
      previewFile.modelImgData.push({
        url:items.url!,
        name:'model'+items.uid,
        id: items.uid,
        originFileObj: items.originFileObj,
      })
    }
    globalContext.updateImageData(previewFile)
    modelHooks.modelSlideHandle.handleAddNewItem(previewFile)
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
          listType="picture-card"
          fileList={fileCollection}
          onPreview={modelHooks.handlePreview}
          onChange={handleChange}
          // onRemove= {(file:UploadFile) => globalContext.handleDeleteImages(file,'modelImgData')}
        >
          {fileCollection.length>= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={modelHooks.state.previewVisible} title={modelHooks.state.previewTitle} footer={null} onCancel={modelHooks.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={modelHooks.state.previewImage} />
        </Modal>
        </Space>
      </div>
    </Content>
  )
}

export default EditModelSlide
