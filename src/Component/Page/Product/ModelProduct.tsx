import { AiFillCaretLeft, AiFillCaretRight, AiTwotoneEdit} from 'react-icons/ai';
import useSlider from '../../../customhooks/useSlider';
import './css/ModelProduct.css';
import './css/AddModelProductItems.css';
import { useEffect, useState } from 'react';
import EditImageAdmin from '../../../Feature/EditImageAdmin';
import { UploadFile } from 'antd';
import { deleteCloudStoragePath, getListImageFromCloud, uploadToCloudStorage } from '../../../FirebaseService/CloudStorage';
import { pushItemKey, writeDatabase } from '../../../FirebaseService/RealtimeDatabase';

interface Props {
  children:React.ReactNode
}

const ModelProduct = (props:Props) => {
  const imageDataLength = (props.children as {}[]).length;
  const [length, setLength] = useState(imageDataLength);
  
  useEffect(() => {
    setLength(imageDataLength);
  }, [imageDataLength])
  
  const {translate,buttonNext,buttonPrev} = useSlider(length);
  
  const slideStyle: React.CSSProperties = {
    transform:'translatex('+translate+'%)'
  }
  
  const editOncancel = () => {

  }

  const editOnSave = async (imageList: UploadFile<any>[]) => {
    console.log(imageList);

    //Updating ProductLandingPage
    await deleteCloudStoragePath('productlandingpage').catch((error) => {console.log(error);})
    for (const file of imageList) {
      const status = await uploadToCloudStorage(file,'productlandingpage');
      console.log(status);
    }

    await getListImageFromCloud('productlandingpage').then((response) => {
      const urlList = response.urlList;
      for (const url of urlList) {
          console.log('process started');
          const index = response.urlList.indexOf(url);
          console.log(index);
          
          const name = response.MetaDatalist[index].name;
          const itemToWrite: UploadFile = {
            uid: name,
            url: url,
            name:name
          }
          console.log(itemToWrite);
          writeDatabase('productlandingpage/'+name,itemToWrite)
        }
    })
    // try {
    //   await deleteCloudStoragePath('productlandingpage').catch((error) => {console.log(error);})
    
    // } finally {
    //   for (const file of imageList) {
    //     const status = await uploadToCloudStorage(file,'productlandingpage')
    //     console.log(status);
    //   }

    //   console.log('getting now the url and meta data');
      
    //   await getListImageFromCloud('productlandingpage').then((response) => {
    //     console.log(response.urlList);
    //     const urlList = response.urlList;

    //     // for (const url of urlList) {
    //     //   console.log('process started');
    //     //   const index = response.urlList.indexOf(url);
    //     //   console.log(index);
          
    //     //   const name = response.metadaList[index].name;
    //     //   const key = pushItemKey('productlandingpage/');
    //     //   const itemToWrite: UploadFile = {
    //     //     uid: key!,
    //     //     url: url,
    //     //     name:name
    //     //   }
    //     //   console.log(itemToWrite);
    //     //   writeDatabase('productlandingpage/'+key,itemToWrite)
    //     // }
    //   })
    // }
  }

  const editOnChange = () => {
    
  }

  return (
    <div className='modelproduct flex-center'>
      <div className="flex-center">
        <AiFillCaretLeft  
          className='aiIcons aiIcons-left'
          onClick={buttonPrev}
        />

        <div style={slideStyle} className='modelproduct-container'>
          {props.children}
        </div>

        <AiFillCaretRight 
          onClick={buttonNext}
          className='aiIcons aiIcons-right'
        />

        <EditImageAdmin 
            onCancel={editOncancel}
            onsave={editOnSave}
            onchange={editOnChange}
            icon={<AiTwotoneEdit/>} 
            imageList={[]}
            />

      </div>
    </div>
  )
}

export const ModelProductItems = ({children}:React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="modelproduct-items flex-center">
      {children}
    </div>
  )
}


export default ModelProduct
