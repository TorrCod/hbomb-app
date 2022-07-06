import { UploadFile } from "antd";
import { RcFile} from "antd/lib/upload";
import React, { createContext, useContext, useReducer } from "react"
import { _imageData, _uploadFile } from "../api/CustomType";
import { ButtonHandle, getBase64, uploadToCloud } from "../api/utils";
import { GlobalContext } from "./GlobalContext";

export type _collectionStateType = {
    dropdownState : {
        isVisible: boolean
    }
}

type _collectionStateAction = 
|{type:'togggledropdown'}

const  _collection_state_init = {
    dropdownState : {
        isVisible: false
    }
}

export function CollectionReducer(state:_collectionStateType,action: _collectionStateAction):_collectionStateType {
    switch(action.type){
        case 'togggledropdown':
            return {...state, dropdownState:{...state.dropdownState,isVisible:!state.dropdownState.isVisible}}
    }
}

type _collection_content = {
    handleDropDown:{
        onCancelSetting:() => void
        onConfirmSetting: () => void
        toggleDropdown: () => void
    }
    state:_collectionStateType
    dispatch:React.Dispatch<_collectionStateAction>
}

const _collection_content_init = {
    handleDropDown:{
        onCancelSetting: () => {},
        onConfirmSetting: () => {},
        toggleDropdown: () => {}
    },
    state:_collection_state_init,
    dispatch:() => {},
}

export const useCollectionContext = createContext<_collection_content>(_collection_content_init)

export const CollectionProvider = ({children}:any) => {
    const [state, dispatch] = useReducer(CollectionReducer,_collection_state_init)
    const globalContext = GlobalContext()

    const handleDropDown = {
        onCancelSetting: () => {
            globalContext.updateImageData(globalContext.globalState.imageApiDefault)
            dispatch({type:'togggledropdown'})
        },

        onConfirmSetting: () => {
            const imageData:_imageData = {modelImgData:[],classicImgData:[],collectionImgData:[]}

            for (const iterator of globalContext.globalState.ImageDataApi.collectionImgData!) {
                const collectonimage:_uploadFile=iterator
                imageData.collectionImgData!.push(collectonimage)
            }

            const path = 'gs://hbomb-d8887.appspot.com/CollectionData';
            uploadToCloud(imageData,path)
            globalContext.dispatch({type:'setdefault',payload:imageData})
            dispatch({type:'togggledropdown'})
        },

        toggleDropdown: () => {
            dispatch({type:'togggledropdown'})
        }
    }

    const value = {
        handleDropDown,
        state,
        dispatch
    }
    return <useCollectionContext.Provider value={value}>{children}</useCollectionContext.Provider>
}

export const CollectionContext = () => useContext(useCollectionContext)

//------- Collection Section-----//
//------- Classic Section -----//
export type ClassicStatetype = {
    previewVisible:boolean
    settingVisible:boolean
    previewTitle:string
    previewImage:string
    classicSlide:number
}

export type ClassicStateAction = 
|{type: 'onCancel'}
|{type: 'onpreview',previewImage:string,previewTitle:string}
|{type: 'previewSetting',payload:boolean}
|{type:'setModelSlide',payload:number}

export const InitClassicState = {
    previewVisible:false,
    settingVisible:false,
    previewTitle:'',
    previewImage:'',
    classicSlide:0
}

export function reducerClassicState(state:ClassicStatetype,action:ClassicStateAction):ClassicStatetype{
    switch(action.type){
        case'onCancel':
        return{
            ...state,
            previewVisible:false,
        };
        case'onpreview':
        return{
            ...state,
            previewImage:action.previewImage,
            previewVisible:true,
            previewTitle:action.previewTitle,
        };
        case'setModelSlide':
        return{
            ...state,
            classicSlide:action.payload
        };
        case"previewSetting" :
        return{
            ...state,
            settingVisible:action.payload
        };

    }
}

export type ClassicStateContent = {
    handlePreview: (fileCollection: UploadFile) => Promise<void>
    handleOk: () => void
    handleCancel: () => void
    previousClassSlide:() => void
    nextClassSlide: ()=>void
    state:ClassicStatetype
    dispatch:React.Dispatch<ClassicStateAction>
}

export const initClassicStateContent = {
    handlePreview: async() => {},
    handleOk: () => {},
    handleCancel: () => {},
    previousClassSlide:() => {},
    state:InitClassicState,
    dispatch:() => {},
    nextClassSlide: ()=>{}
}


export const useClassicContext = createContext<ClassicStateContent>(initClassicStateContent)

export const ClassicProvider =({children}:any) => {
    const [state, dispatch] = useReducer(reducerClassicState,InitClassicState);
    const globalContext = GlobalContext()

    const handlePreview = async (fileCollection:UploadFile) => {
        if (!fileCollection.url) {
            fileCollection.preview = await getBase64(fileCollection.originFileObj as RcFile);
            }
        dispatch({
            type:'onpreview',
            previewImage:fileCollection.url || (fileCollection.preview as string),
            previewTitle:fileCollection.name || fileCollection.url!.substring(fileCollection.url!.lastIndexOf('/') + 1)
        })
    }

    const handleOk = () => {
        const imageData:_imageData = {modelImgData:[],classicImgData:[]}
        for (const iterator of globalContext.globalState.ImageDataApi.classicImgData) {
            const classicImages:_uploadFile=iterator
            imageData.classicImgData.push(classicImages)
        }
        const path = 'gs://hbomb-d8887.appspot.com/ClassicData';
        uploadToCloud(imageData,path)
        dispatch({type:"previewSetting",payload:false})
        globalContext.dispatch({type:'setdefault',payload:imageData})
    }
    
    const handleCancel = () => {
        globalContext.updateImageData(globalContext.globalState.imageApiDefault)
        dispatch({type:"previewSetting",payload:false})
    }

    const handleChange = () => {

    }

    const nextClassSlide = () => {
        const nextButton =  ButtonHandle.carousel.next
        const dataState = state.classicSlide
        const imageArr = globalContext.globalState.ImageDataApi.classicImgData
        const value = nextButton(dataState,imageArr)
        dispatch({type:'setModelSlide',payload:value})
    }
    const previousClassSlide = () => {
        const nextButton =  ButtonHandle.carousel.previous
        const dataState = state.classicSlide
        const imageArr = globalContext.globalState.ImageDataApi.classicImgData
        const value = nextButton(dataState,imageArr)
        dispatch({type:'setModelSlide',payload:value})
    }
    const value = {
        handlePreview,
        handleOk,
        handleChange,
        handleCancel,
        state,
        dispatch,
        nextClassSlide,
        previousClassSlide
    }
    return <useClassicContext.Provider value={value}>{children}</useClassicContext.Provider>
}
export const ClassicContext = () => useContext(useClassicContext)


//------- Classic Section -----//
//------- Model Section-----//

export type ModelStateType = {
    previewVisible:boolean;
    previewImage:string;
    previewTitle:string;
    ModelSectionState: {
        modelSlide:number,
        effectValue:number,
        isModalVisible:boolean,
        onConfirm:boolean
    }
}

export type ModelAction =  
|{type: 'onpreview',previewImage:string,previewTitle:string}
|{type:'oncancel'}
|{type:'slidingState', payload: number}
|{type:'nextslide',payload:number}
|{type: 'previousslide',payload:number}
|{type: 'showmodal'}
|{type:'handleok'}
|{type:'handlecancel'}

export const initializeModelState: ModelStateType = {
    ModelSectionState:{
        modelSlide:2,
        effectValue:0,
        isModalVisible:false,
        onConfirm:false
    },
    previewVisible:false,
    previewImage:"",
    previewTitle:"",
}
export function editModelReducer(state:ModelStateType,action:ModelAction):ModelStateType{
    switch(action.type){
        case'oncancel':
        return{
            ...state,
            previewVisible:false
        };
        case'onpreview':
        return{
            ...state,
            previewImage:action.previewImage,
            previewVisible:true,
            previewTitle:action.previewTitle,
        };
        case 'handlecancel':
            return{
                ...state,
                ModelSectionState:{
                    ...state.ModelSectionState,
                    isModalVisible:false
                }
            };
        case  'handleok':
            return {
                ...state,
                ModelSectionState:{
                    ...state.ModelSectionState,
                    isModalVisible:false,
                    onConfirm:!state.ModelSectionState.onConfirm
                }
            };
        case 'showmodal':
            return {
                ...state,
                ModelSectionState:{
                    ...state.ModelSectionState,
                    isModalVisible:true
                }
            };
        case 'nextslide':
            return{
                ...state,
                ModelSectionState:{
                    ...state.ModelSectionState,
                    modelSlide:action.payload
                }
            };
        case 'previousslide':
            return {
                ...state,
                ModelSectionState:{
                    ...state.ModelSectionState,
                    modelSlide:action.payload
                }
            };
        case 'slidingState':
            return{
                ...state,
                ModelSectionState:{
                    ...state.ModelSectionState,
                    effectValue:action.payload
                }
            }
    }
}

export type ModelStateContent = {
    handlePreview: (fileCollection:UploadFile)=>void|any
    handleCancel: (e:React.MouseEvent<HTMLElement, MouseEvent>)=> void
    state: ModelStateType
    dispatch: React.Dispatch<ModelAction>
    modelSlideHandle: {
        handleAddNewItem: (newFile:_imageData) => void
        handleCancelSetting: () => void
        handleOk:() => void
        handleSliding:() => void
        handleNext:() => void
        handlePrevious:() => void
    }
}

export const useModelContext = createContext<ModelStateContent>(
    {
        modelSlideHandle: {
            handleAddNewItem:() => {},
            handleCancelSetting: () => {},
            handleOk:() => {},
            handleSliding:() => {}, 
            handleNext:() => {},
            handlePrevious:() => {}},
        handlePreview:()=>{},
        handleCancel:()=> {},
        state: initializeModelState,
        dispatch: () => {}
    }
)
let fileCollection:_imageData={modelImgData:[],classicImgData:[]}
export const ModelProvider = ({children}:any) => {
    const [state, dispatch] = useReducer(editModelReducer, initializeModelState);
    const globalContext = GlobalContext()

    const handleAddNewItem = (newFile:_imageData) => {
        fileCollection = {...newFile};
    }

    const handleCancelSetting = () => {
        globalContext.updateImageData(globalContext.globalState.imageApiDefault)
        dispatch({type:'handlecancel'})
    }
    
    const handleOk = () => {
        const imageData:_imageData = {modelImgData:[],classicImgData:[]}
        for (const iterator of globalContext.globalState.ImageDataApi.modelImgData) {
            const modelImages:_uploadFile=iterator
            imageData.modelImgData.push(modelImages)
        }
        uploadToCloud(imageData,'gs://hbomb-d8887.appspot.com/ModelData')
        dispatch({type:"handleok"})
        globalContext.dispatch({type:'setdefault',payload:fileCollection})
    }

    const handleSliding = () => {
        const imageDataApi = globalContext.globalState.ImageDataApi
        const defaultVal = Math.trunc(imageDataApi.modelImgData.length/2)
        const modelSlide = state.ModelSectionState.modelSlide
        let valueContent = 0;
        if(imageDataApi.modelImgData.length%2===0){
            let x =100/imageDataApi.modelImgData.length
            let y = x/2
            if(imageDataApi.modelImgData.length===6){
                valueContent = y-((-x)*(1-modelSlide+1))
            }else if(imageDataApi.modelImgData.length === 8){
                valueContent = y-((-x)*(1-modelSlide+2))
            }else{
                valueContent = y-((-x)*(1-modelSlide))
            }
        }
        else {
            valueContent = ((defaultVal-modelSlide)*100/imageDataApi.modelImgData.length)
        }
        dispatch({type:'slidingState',payload:valueContent})
    }

    const handleNext = () => {
        const prevButton =  ButtonHandle.carousel.previous
        const arrayData = globalContext.globalState.ImageDataApi.modelImgData
        const imageSlideState = state.ModelSectionState.modelSlide
        const payloadValue = prevButton(imageSlideState,arrayData)
        dispatch({type:'nextslide',payload:payloadValue})
    }

    const handlePrevious = () => {
        const nexButton =  ButtonHandle.carousel.next
        const arrayData = globalContext.globalState.ImageDataApi.modelImgData
        const imageSlideState = state.ModelSectionState.modelSlide
        const payloadValue = nexButton(imageSlideState,arrayData)
        dispatch({type:'nextslide',payload:payloadValue})
    }

    const handlePreview = async (fileCollection:UploadFile) => {
        if (!fileCollection.url) {
            fileCollection.preview = await getBase64(fileCollection.originFileObj as RcFile);
            }
        dispatch({
            type:'onpreview',
            previewImage:fileCollection.url || (fileCollection.preview as string),
            previewTitle:fileCollection.name || fileCollection.url!.substring(fileCollection.url!.lastIndexOf('/') + 1)
        })
    }

    const handleCancel = () => {
        dispatch({type:"oncancel"})
    }

    const value = {
        modelSlideHandle:{
            handleAddNewItem,
            handleCancelSetting,
            handleOk,
            handleSliding,
            handlePrevious,
            handleNext
        },
        handlePreview,
        handleCancel,
        state,
        dispatch
    }

    return <useModelContext.Provider value={value}>{children}</useModelContext.Provider>
}
export const ModelContext = () => useContext(useModelContext)

