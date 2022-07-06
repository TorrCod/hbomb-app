import { createContext, useContext } from "react"

export type ImageDataType = {
  'modelImgData': {'id':string,'name':string,'content':string,'url':string|any,'originFileObj'?:object|any}[]
  'classicImgData':{'id':string,'name':string,'content':string,'url':string|any,'originFileObj'?:object|any}[]
}
export type ApiGlobalContent = {
  imageDataApi: ImageDataType
  setImageDataApi: (c:ImageDataType) => void
}
export const useImageDataContext = createContext<ApiGlobalContent>(
  {
    imageDataApi: {
      modelImgData:[{id:"",name:"",url:"",content:""}],
      classicImgData:[{id:"",name:"",url:"",content:""}]
    },
    setImageDataApi: ()=>{},
  }
)
export const ImageDataContext = () => useContext(useImageDataContext)




