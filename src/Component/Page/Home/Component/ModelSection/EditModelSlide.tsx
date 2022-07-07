import { Content } from 'antd/lib/layout/layout'
import { PlusOutlined } from '@ant-design/icons';
import {Upload, Space, Modal } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { ModelContext } from '../../../../../hooks/HomeContext';
import { getBase64} from '../../../../../api/utils';

function EditModelSlide() {
  const modelHooks = ModelContext();
  const fileCollection : UploadFile<any>[] = [];

  const handleChange:UploadProps['onChange'] = async ({fileList:newFileList}) =>{
    let previewChange:UploadFile[] = []
    for (const iterator of newFileList) {
      if(!iterator.url) iterator.url = await getBase64(iterator.originFileObj as RcFile)
      previewChange.push({
        uid:iterator.uid,
        name:iterator.name,
        url:iterator.url,
      })
    }
    modelHooks.dispatch({type:'onupload',payload:previewChange})
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
          customRequest={({file,onSuccess}) => {setTimeout(() => {onSuccess!("ok")},0)}}
          listType="picture-card"
          fileList={modelHooks.state.previewChange}
          onPreview={modelHooks.handlePreview}
          onChange={handleChange}
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
