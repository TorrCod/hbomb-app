import { createContext, useContext, useReducer } from "react";
import {  readDb } from "../api/utils";
import { _imageData, _ImageDataDb } from "../api/CustomType";

const newImageSet:_imageData = {collectionImgData:[],classicImgData:[],modelImgData:[]}

export type GlobalStateContent = {
    updateImageApi: () => void
    UpdateNewData: (file:_imageData,itemKey:keyof _imageData) => void,
    startFetchingData: () => void,
    globalState:GlobalState,
    updateImageData:(images:_imageData)=>void,
    dispatch:React.Dispatch<GlobalAction>
}
export type GlobalState = {
    imageApi:_ImageDataDb
    imageApiDefault:_imageData
    loadingSlideDown: boolean
    onLoading:boolean
    viewLoadingPage: boolean
    ImageDataApi:_imageData
}
export type GlobalAction = 
| {type:'setImageApi',payload:_ImageDataDb}
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
    imageApi:{ModelData:{},ClassicData:{},CollectionData:{}},
    imageApiDefault: {modelImgData:[],classicImgData:[],collectionImgData:[]},
    loadingSlideDown: false,
    viewLoadingPage: true,
    onLoading:true,
    ImageDataApi:{modelImgData:[],classicImgData:[],collectionImgData:[]}
}
const GlobalReducer = (state:GlobalState,action:GlobalAction): GlobalState => {
    switch (action.type){
        case 'setImageApi':
            return {...state,imageApi:action.payload}

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
    updateImageApi: () => {},
    UpdateNewData:()=>{},
    updateImageData: () => {},
    startFetchingData: () => {},
    globalState:{...globalReducerInit},
    dispatch:()=>{}
}
const useGlobalContext = createContext<GlobalStateContent>({...globalStateContentinit})
export function GlobalProvider ({children}:any) {
    const [state, dispatch] = useReducer(GlobalReducer,{...globalReducerInit})

    const UpdateNewData = (file:_imageData,itemKey:keyof _imageData)=>{
        for (const key in file) {
            const objChild = file[key as keyof _imageData]
            if(objChild?.length){
                for (const iterator of objChild) {
                    newImageSet[itemKey]?.push(iterator)
                }
            }
        }
        console.log('newImageSet: ');
        console.log(newImageSet);
    }

    const startFetchingData = async () => {
        updateImageApi()
    }

    const updateImageApi = () => {
        readDb('ImageDataApi/',(arg) => {
            dispatch({type:'setImageApi',payload:arg})
            dispatch({type:'loadingDone'})
        })
        
    }

    const updateImageData = (images:_imageData) => {
        dispatch({type:"onLoading",payload:images})
    }
    const value:GlobalStateContent = {
        updateImageApi,
        UpdateNewData,
        startFetchingData,
        globalState:state,
        updateImageData,
        dispatch
    }
    return <useGlobalContext.Provider value={value}>{children}</useGlobalContext.Provider>
}

export  const GlobalContext = ()=> useContext(useGlobalContext)