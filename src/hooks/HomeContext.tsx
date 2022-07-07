import { UploadFile } from "antd";
import { RcFile} from "antd/lib/upload";
import React, { createContext, useContext, useEffect, useReducer } from "react"
import { ButtonHandle, getBase64, HomeFunction, updateDb } from "../api/utils";
import { GlobalContext } from "./GlobalContext";

export type _collectionStateType = {
    dropdownState : {
        isVisible: boolean
    }
    previewState:{
        imageSetting:UploadFile[]
    }
}

type _collectionStateAction = 
|{type:'togggledropdown'}
|{type:'onUpload',payload:UploadFile[]}

const  _collection_state_init = {
    previewState:{
        imageSetting:[]
    },
    dropdownState : {
        isVisible: false
    }
}

export function CollectionReducer(state:_collectionStateType,action: _collectionStateAction):_collectionStateType {

    switch(action.type){
        case 'togggledropdown':
            return {...state, 
                dropdownState:{
                ...state.dropdownState,
                isVisible:!state.dropdownState.isVisible
                }
            };
        case 'onUpload':
            return {
                ...state,
                previewState:{
                    ...state.previewState,
                    imageSetting:action.payload
                }
            }
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
            dispatch({type:'togggledropdown'})
        },

        onConfirmSetting: () => {
            dispatch({type:"togggledropdown"})
            const defaultImageApi = globalContext.globalState.imageApi;
            const result = HomeFunction.toImageApi(state.previewState.imageSetting,defaultImageApi,'CollectionData')
            globalContext.dispatch({type:'setImageApi',payload:result})
            updateDb('ImageDataApi/','CollectionData',result.CollectionData)
        },

        toggleDropdown: () => {
            const CollectionData = globalContext.globalState.imageApi.CollectionData
            let addImage:UploadFile[] = []
            for (const iterator of Object.keys(CollectionData)) {
                addImage.push({
                    uid : CollectionData[iterator].id,
                    name : CollectionData[iterator].name,
                    url : CollectionData[iterator].url,
                })
            }
            dispatch({type:'onUpload',payload:addImage})
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
    previewState: {imageSetting:UploadFile[]}
    previewVisible:boolean
    settingVisible:boolean
    previewTitle:string
    previewImage:string
    classicSlide:number
}

export type ClassicStateAction = 
|{type:'onUpload',payload:UploadFile[]}
|{type: 'onCancel'}
|{type: 'onpreview',previewImage:string,previewTitle:string}
|{type: 'previewSetting',payload:boolean}
|{type:'setModelSlide',payload:number}

export const InitClassicState = {
    previewState:{
        imageSetting:[]
    },
    previewVisible:false,
    settingVisible:false,
    previewTitle:'',
    previewImage:'',
    classicSlide:0
}

export function reducerClassicState(state:ClassicStatetype,action:ClassicStateAction):ClassicStatetype{
    switch(action.type){
        case 'onUpload':
            return {
                ...state,
                previewState:{
                    ...state.previewState,
                    imageSetting:action.payload
                }
            };
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
        dispatch({type:"previewSetting",payload:false})
        const defaultImageApi = globalContext.globalState.imageApi;
        const result = HomeFunction.toImageApi(state.previewState.imageSetting,defaultImageApi,'ClassicData')
        globalContext.dispatch({type:'setImageApi',payload:result})
        updateDb('ImageDataApi/','ClassicData',result.ClassicData)
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
        const imageArr = Object.keys(globalContext.globalState.imageApi.ClassicData)
        const value = nextButton(dataState,imageArr)
        dispatch({type:'setModelSlide',payload:value})
    }
    const previousClassSlide = () => {
        const nextButton =  ButtonHandle.carousel.previous
        const dataState = state.classicSlide
        const imageArr = Object.keys(globalContext.globalState.imageApi.ClassicData)
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
    previewChange:UploadFile[]
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
|{type:'onupload',payload:UploadFile[]}
|{type: 'onpreview',previewImage:string,previewTitle:string}
|{type:'oncancel'}
|{type:'slidingState', payload: number}
|{type:'nextslide',payload:number}
|{type:'previousslide',payload:number}
|{type:'showmodal'}
|{type:'handleok'}
|{type:'handlecancel'}

export const initializeModelState: ModelStateType = {
    ModelSectionState:{
        modelSlide:2,
        effectValue:0,
        isModalVisible:false,
        onConfirm:false
    },
    previewChange:[],
    previewVisible:false,
    previewImage:"",
    previewTitle:"",
}
export function editModelReducer(state:ModelStateType,action:ModelAction):ModelStateType{
    switch(action.type){
        case 'onupload':
        return{
            ...state,
            previewChange:action.payload
        };
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
        handleCancelSetting: () => void
        handleOk:() => void
        handleSliding:(nextSlide:number) => void
        handleNext:() => void
        handlePrevious:() => void
    }
}

export const useModelContext = createContext<ModelStateContent>(
    {
        modelSlideHandle: {
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
export const ModelProvider = ({children}:any) => {
    const globalContext = GlobalContext()
    const [state, dispatch] = useReducer(editModelReducer,initializeModelState);
    const modelLength = Object.keys(globalContext.globalState.imageApi.ModelData).length/2
    
    useEffect(() => {
        dispatch({type:'nextslide',payload:Math.trunc(modelLength)})
    },[modelLength])

    const handleCancelSetting = () => {
        globalContext.updateImageData(globalContext.globalState.imageApiDefault)
        dispatch({type:'handlecancel'})
    }
    
    const handleOk = () => {
        const defaultImageApi = globalContext.globalState.imageApi;
        const result = HomeFunction.toImageApi(state.previewChange,defaultImageApi,'ModelData')
        dispatch({type:"handleok"})
        globalContext.dispatch({type:'setImageApi',payload:result})
        updateDb('ImageDataApi/','ModelData',result.ModelData)
    }

    const handleSliding = (nextSlide:number) => {
        const modelImgApi = globalContext.globalState.imageApi.ModelData
        const length = Object.keys(modelImgApi).length
        const defaultVal = Math.trunc(length/2)
        let valueContent = 0;

        if(length%2===0){
            let x =100/length
            let y = x/2
            if(length===6){
                valueContent = y-((-x)*(1-nextSlide+1))
            }else if(length === 8){
                valueContent = y-((-x)*(1-nextSlide+2))
            }else{
                valueContent = y-((-x)*(1-nextSlide))
            }
        }
        else {
            let x =100/length
            valueContent = -1*(nextSlide-defaultVal)*(x)
        }

        dispatch({type:'slidingState',payload:valueContent})
    }

    const handleNext = () => {
        const prevButton =  ButtonHandle.carousel.previous
        const arrayData = Object.keys(globalContext.globalState.imageApi.ModelData)
        const imageSlideState = state.ModelSectionState.modelSlide
        const payloadValue = prevButton(imageSlideState,arrayData)
        dispatch({type:'nextslide',payload:payloadValue})
        handleSliding(payloadValue)
    }

    const handlePrevious = () => {
        const nexButton =  ButtonHandle.carousel.next
        const arrayData = Object.keys(globalContext.globalState.imageApi.ModelData)
        const imageSlideState = state.ModelSectionState.modelSlide
        const payloadValue = nexButton(imageSlideState,arrayData)
        dispatch({type:'nextslide',payload:payloadValue})
        handleSliding(payloadValue)
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

