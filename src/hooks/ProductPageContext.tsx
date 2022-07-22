import { UploadFile } from "antd";
import { createContext, useContext, useReducer } from "react";
import { readData } from "../FirebaseService/RealtimeDatabase";


const productPage_state_init:ProductPage_state = {
    landingPageImages:[],
    productItems:[]
}

const ProductPage_content_init:ProductPage_content = {
    state:productPage_state_init,
    dispatch:() => {},
    fetchProductLandingPage:()=>{},
    updateProductLandingPage:()=>{}
}

const useProductPageContext = createContext<ProductPage_content>(ProductPage_content_init)

export const ProductPageProvider = ({children}:DivElement) => {
    const [state, dispatch] = useReducer(ProductPageReducer, productPage_state_init);

    const fetchProductLandingPage = () => {
        readData('productlandingpage').then((val) => {
            const uploadFileList:UploadFile[] = []
            const valKeyList = Object.keys(val);
            for (const uploadFile of valKeyList) {
                const valChild = (val[uploadFile] as UploadFile)
                uploadFileList.push(valChild)
            }
            dispatch({type:'updatelandingpage',payload:uploadFileList})
        })
    }

    const updateProductLandingPage = (payload:UploadFile[]) => {
        dispatch({type:'updatelandingpage',payload:payload})  
    }

    const value:ProductPage_content = {
        state,
        dispatch,
        fetchProductLandingPage,
        updateProductLandingPage
    }

    return (
        <useProductPageContext.Provider value={value}>
            {children}
        </useProductPageContext.Provider>
    )
}

const ProductPageContext = () => useContext(useProductPageContext);
export default ProductPageContext;

function ProductPageReducer(state:ProductPage_state,action:ProductPage_action):ProductPage_state{
    switch(action.type){
        case 'updatelandingpage':
            return {
                ...state,
                landingPageImages:action.payload
            }
    }
}

type ProductPage_state =  {
    landingPageImages:UploadFile[];
    productItems:string[]
}


type ProductPage_action = 
|{type:'updatelandingpage',payload:UploadFile[]}

type ProductPage_content = {
    state:ProductPage_state;
    dispatch:React.Dispatch<ProductPage_action>;
    fetchProductLandingPage:()=>void;
    updateProductLandingPage : (payload:UploadFile[]) => void
}

type DivElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>