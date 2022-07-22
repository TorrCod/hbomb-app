import { UploadFile } from "antd";
import { deleteObject, FullMetadata, getDownloadURL, getMetadata, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { cloudStorage } from "./FirebaseConfig";

export const uploadToCloudStorage = async (filetoUplaod:UploadFile,path:path) => {
    let response:string = ''

    const {
        originFileObj:file,
        uid
    } = filetoUplaod;

    const storageRef = ref(cloudStorage, path+'/'+uid);

    await uploadBytes(storageRef, file as Blob).then(() => {
        response = 'success';
    }).catch((e) => {
        response = 'failed';
        console.log(e);
    });

    return response
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

type path = 'modelimages'|'classicimages'|'collectionimages'|'productlandingpage';


