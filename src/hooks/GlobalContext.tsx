import { createContext, useContext, useReducer } from "react";
import { cloudStorage } from "../api/utils";
import {getMetadata, listAll, getDownloadURL, ref} from "firebase/storage";
import { _imageData, _uploadFile, _uploadFile_init_ } from "../api/CustomType";

export type GlobalStateContent = {
    startFetchingData: () => void,
    globalState:GlobalState,
    updateImageData:(images:_imageData)=>void,
    dispatch:React.Dispatch<GlobalAction>
}
export type GlobalState = {
    imageApiDefault:_imageData
    loadingSlideDown: boolean
    onLoading:boolean
    viewLoadingPage: boolean
    ImageDataApi:_imageData
}
export type GlobalAction = 
| {type:'setdefault',payload:_imageData}
| {type:'loadingDone',payload?:boolean}
| {type: 'loadingPage'}
| {type:'onLoading',payload: _imageData}

export type ImageType = {
    'id':string
    'name':string
    'url':string
    'content':string
    'originFileObj'?:object|any
}[]
export const globalReducerInit:GlobalState = {
    imageApiDefault: {modelImgData:[],classicImgData:[],collectionImgData:[]},
    loadingSlideDown: false,
    viewLoadingPage: true,
    onLoading:true,
    ImageDataApi:{modelImgData:[],classicImgData:[],collectionImgData:[]}
}
const GlobalReducer = (state:GlobalState,action:GlobalAction): GlobalState => {
    switch (action.type){
        case 'setdefault':
            const imageApiDefault:_imageData = {...state.imageApiDefault}
            for (const [key, value] of Object.entries(action.payload)) {
                if(value.length){
                    imageApiDefault[key as keyof _imageData] = value
                }
            }
            return {
                ...state,
                imageApiDefault: imageApiDefault
            }
        case 'loadingDone':
            return (action.payload===undefined||null)?
            {...state,onLoading: false}:
            {...state,loadingSlideDown:action.payload!}
        case 'onLoading':
            let result = {...state}
            for (const [key, value] of Object.entries(action.payload)) {
                if(value.length){
                    (result.ImageDataApi as any )[key] = value
                }
            }
            return {
                ...state,
                ImageDataApi: result.ImageDataApi
            }
        case 'loadingPage':
        return {...state,viewLoadingPage:false}
    }
}

export const globalStateContentinit:GlobalStateContent = {
    updateImageData: () => {},
    startFetchingData: () => {},
    globalState:{...globalReducerInit},
    dispatch:()=>{}
}
const useGlobalContext = createContext<GlobalStateContent>({...globalStateContentinit})
export function GlobalProvider ({children}:any) {
    const [state, dispatch] = useReducer(GlobalReducer,{...globalReducerInit})
    
    const startFetchingData = async () => {
        const modelRef = ref(cloudStorage,"gs://hbomb-d8887.appspot.com/ModelData")
        const classicRef = ref(cloudStorage,"gs://hbomb-d8887.appspot.com/ClassicData")
        const collectionRef = ref(cloudStorage,"gs://hbomb-d8887.appspot.com/CollectionData")
        let classicFetching = true
        let modelFetching = true
        let imageData:_imageData = {modelImgData:[],classicImgData:[],collectionImgData:[]}

        listAll(collectionRef).then((res) => {
            res.items.forEach(async (items) => {
                let collectionData:_uploadFile = {..._uploadFile_init_}
                await getDownloadURL(items).then((url) => {
                    collectionData = {...collectionData, url: url}
                })
                await getMetadata(items).then((metItems) => {
                    collectionData = {
                        ...collectionData,
                        name: metItems.name,
                        id: metItems.name.slice(5),
                        originFileObj: metItems.customMetadata
                    }
                })
                imageData.collectionImgData!.push(collectionData)
                dispatch({type:'setdefault',payload:imageData})
                updateImageData(imageData)
        })}).catch((e) => console.log(e)).finally(() => classicFetching = false)

        listAll(classicRef).then((res) => {
            res.items.forEach(async (items) => {
                let classicData:_uploadFile = {..._uploadFile_init_}
                await getDownloadURL(items).then((url) => {
                    classicData = {...classicData, url: url}
                })
                await getMetadata(items).then((metItems) => {
                    classicData = {
                        ...classicData,
                        name: metItems.name,
                        id: metItems.name.slice(5),
                        originFileObj: metItems.customMetadata
                    }
                })
                imageData.classicImgData.push(classicData)
                dispatch({type:'setdefault',payload:imageData})
                updateImageData(imageData)
        })}).catch((e) => console.log(e)).finally(() => classicFetching = false)
        
        listAll(modelRef).then((res) => {
            let imageData:_imageData = {modelImgData:[],classicImgData:[]}
            res.items.forEach(async (items) => {
                let modelData = {..._uploadFile_init_}
                await getDownloadURL(items).then((url) => {
                    modelData = {...modelData, url: url}
                })
                await getMetadata(items).then((metItems) => {
                    modelData = {
                        ...modelData,
                        name: metItems.name,
                        id: metItems.name.slice(5),
                        originFileObj: metItems.customMetadata
                    }
                })
                imageData.modelImgData.push(modelData)
                dispatch({type:'setdefault',payload:imageData})
                updateImageData(imageData)
                
        })}).catch((e) => console.log(e)).finally(() => modelFetching = false)

        while (modelFetching || classicFetching) await new Promise(r => setTimeout(r, 2000));
        dispatch({type:'loadingDone'})
    }
    const updateImageData = (images:_imageData) => {
        dispatch({type:"onLoading",payload:images})
    }
    const value:GlobalStateContent = {
        startFetchingData,
        globalState:state,
        updateImageData,
        dispatch
    }
    return <useGlobalContext.Provider value={value}>{children}</useGlobalContext.Provider>
}

export  const GlobalContext = ()=> useContext(useGlobalContext)