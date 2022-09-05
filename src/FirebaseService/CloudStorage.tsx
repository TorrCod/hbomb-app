import { UploadFile } from "antd";
import { deleteObject, FullMetadata, getDownloadURL, getMetadata, listAll, ref, StorageReference, uploadBytes } from "firebase/storage";
import { cloudStorage } from "./FirebaseConfig";

export const uploadToCloudStorage = async (filetoUplaod:UploadFile,path:path,specificId?:string) => {
    let response:string = ''

    const {
        originFileObj:file,
        uid
    } = filetoUplaod;
    
    const storageRef = specificId? ref(cloudStorage, path+'/'+specificId):ref(cloudStorage, path+'/'+uid);
    await uploadBytes(storageRef, file as Blob).then(() => {
        response = 'success';
    }).catch((e) => {
        response = 'failed';
        console.log(e);
    });

    return response
}
export const getImageFromCloud = (path:string) => {
    
}
export const getListImageFromCloud: GLI = async (path:path) => {
    const storageRef = ref(cloudStorage, path);
    const urlList:string[] = [];
    const MetaDatalist:FullMetadata[] = [];
    // const blobList:Blob[] = []

    await listAll(storageRef)
    .then(async (res) => {
        const itemRefList = res.items;
        for (const itemRef of itemRefList) {
            // All the items under listRef.
            await getDownloadURL(itemRef).then((url) => {
                urlList.push(url);
                // const xhr = new XMLHttpRequest();

                // xhr.responseType = 'blob';
                // xhr.onload = (event) => {
                //     const blob = xhr.response;
                //     blobList.push(blob)
                // };
                // xhr.open('GET', url);
                // xhr.send();
            })
            await getMetadata(itemRef).then((metaDataFile) => {
                MetaDatalist.push(metaDataFile)
            })
        }
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
    });

    const returnValue: UrlorMetaData = {
        urlList,
        MetaDatalist
    }

    return returnValue;
}
type GLI = (path: path) => Promise<UrlorMetaData>;
type UrlorMetaData = {
    urlList:string[],
    MetaDatalist:FullMetadata[],
    blobList?:Blob[]
}

export const deleteImageFromCloudStorage = async (path?:path,itemRef?:StorageReference) => {
    console.log(itemRef);
    
    const deleteRef = itemRef? itemRef:ref(cloudStorage,path)
    deleteObject(deleteRef).then((response) => {
        
    }).catch((error) => {
        console.log(error);
    });
}

export const deleteCloudStoragePath = async (path:path) => {
    console.log('deleting path');
    
    const deleteRef = ref(cloudStorage, path);

    (await listAll(deleteRef)).items.forEach(async (itemRef) => {
        await deleteObject(itemRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            console.log(error);
        });
    })

    console.log('deleting path - done');
    
}

export const isImageAlreadyExist = async (path:path,filetoUplaod:UploadFile) =>  {
    const listRef = ref(cloudStorage,path)
    const itemRefList = (await listAll(listRef)).items;
    const itemRefNameList = [''];
    const fileName = filetoUplaod.uid;
    let isAlreadyExist = false;
    for (const itemRef of itemRefList) {
        const itemRefName = itemRef.name;
        itemRefNameList.push(itemRefName);
    }
    isAlreadyExist = itemRefNameList.includes(fileName);
    return isAlreadyExist;
}

export const itemRefNotExistList = async (path:path,fileList:UploadFile[]) => {
    const listRef = ref(cloudStorage,path)
    const itemRefList = (await listAll(listRef)).items;
    const itemRefsNotexist: StorageReference[] = [];
    const fileNameList = ['']

    for (const file of fileList) {
        const fileName = file.uid;
        fileNameList.push(fileName)
    }

    for (const itemRef of itemRefList) {
        const itemRefName = itemRef.name;
        const isExist = fileNameList.includes(itemRefName);
        if(!isExist){
            itemRefsNotexist.push(itemRef)
        }
    }
    
    return itemRefsNotexist;
}


type path = 'modelimages'|'classicimages'|'collectionimages'|'productlandingpage'|'online-shop';


