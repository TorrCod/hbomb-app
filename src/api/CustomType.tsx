//---------Collection------//
export type _ClassicState = {
    
}
//---------Collection------//
//--------- ImageData------//
export type _imageData = {
    'modelImgData': _uploadFile[]
    'classicImgData':_uploadFile[]
    'collectionImgData'?:_uploadFile[]
}

export const _imageData_init = {
    'modelImgData': [],
    'classicImgData':[],
}

export type _uploadFile = {
    'id':string 
    'name':string 
    'url': string 
    'originFileObj':Blob | Uint8Array | ArrayBuffer | any,
    'base64'?:any
}

export const _uploadFile_init_:_uploadFile = {
    id:"" ,
    name:"" ,
    url: "" ,
    originFileObj:{},
}
//---------ImageData------//
