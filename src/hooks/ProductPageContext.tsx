import { UploadFile } from "antd";
import { createContext, useContext, useReducer } from "react";
import { CatItem, OLSitems } from "../Component/Page/Product/ShopProduct";
import { clearPath, pushItemKey, readData, writeDatabase } from "../FirebaseService/RealtimeDatabase";


const productPage_state_init:ProductPage_state = {
    landingPageImages:[],
    productItems:[],
    onViewItem:undefined,
    onViewItemEdit:false,
    categoryList:{},
}

const ProductPage_content_init:ProductPage_content = {
    state:productPage_state_init,
    dispatch:() => {},
    fetchProductLandingPage:()=>{},
    updateProductLandingPage:()=>{},
    onlineShopHandler:{
        fetchOnlineShopData:() => {},
        updateCategory:{
            add:() => {},
            edit:() => {},
            delete:() => {},
            itemAdd:() => {}
        },
        updateItems:{
            edit:() => {},
            delete:() => {}
        }
    }
    
}

const useProductPageContext = createContext<ProductPage_content>(ProductPage_content_init)

export const ProductPageProvider = ({children}:DivElement) => {
    const [state, dispatch] = useReducer(ProductPageReducer, productPage_state_init);

    const fetchProductLandingPage = () => {
        readData('productlandingpage').then((val) => {
            try {
                const uploadFileList:UploadFile[] = []
                const valKeyList = Object.keys(val);
                for (const uploadFile of valKeyList) {
                    const valChild = (val[uploadFile] as UploadFile)
                    uploadFileList.push(valChild)
                }
                dispatch({type:'updatelandingpage',payload:uploadFileList})
            }catch {

            }
        })
    }

    const updateProductLandingPage = (payload:UploadFile[]) => {
        dispatch({type:'updatelandingpage',payload:payload})  
    }

    const onlineShopHandler = {
        fetchOnlineShopData:() => {
            readData('onlineshop-category').then((response) => {
                try {
                    const itemToSet:CatListState = {}
                    const data = Object.values(response) 
                    for (const child of data) {
                        const category = (child as CatItem)
                        itemToSet[category.categoryId] = {...category,'items':[]}
                    }
                    readData('onlineshop-items').then((items) => {
                        const itemArr = Object.values(items)
                        for (const item of itemArr) {
                            // console.log(item);
                            const shopItem = item as OLSitems
                            itemToSet[shopItem.categoryId!].items.push(shopItem)
                        }

                        dispatch({'type':'updateOnlineShopData','payload':itemToSet})
                    })
                } catch {}
                
            })
        },
        updateCategory:{
            add:(payload:CatItem) => {
                const catList = state.categoryList
                const catId = pushItemKey('onlineshop-category/')
                payload['categoryId'] = catId!;
                catList[catId!] = payload;
                dispatch({type:'updateOnlineShopData',payload:catList})
                writeDatabase('onlineshop-category/'+catId,{...payload,items:{}})
            },

            edit:(catId:string,value:string) => {
                const categoryList = state.categoryList
                categoryList[catId] = {...categoryList[catId],categoryTitle:value}
                for (const item of categoryList[catId].items) {
                    item.categoryName = value
                    writeDatabase('onlineshop-items/'+item.itemId!,item)
                }
                dispatch({type:'updateOnlineShopData',payload:categoryList})
                writeDatabase('onlineshop-category/'+catId,{
                    ...categoryList[catId],
                    categoryTitle:value,
                    items:{}
                })
                
            },

            delete:(catId:string) => {
                const categoryList = state.categoryList;

                const {items} = categoryList[catId];

                for (const item of items) {
                    clearPath('onlineshop-items/'+ item.itemId)
                }

                delete categoryList[catId]
                dispatch({type:'updateOnlineShopData',payload:categoryList})
                clearPath('onlineshop-category/'+catId)
            },

            itemAdd:(catId:string,value:OLSitems) => {
                const categoryList = state.categoryList;
                let {items,categoryTitle,categoryId} = categoryList[catId]
                const itemId = pushItemKey('onlineshop-items/');

                const today = new Date();
                const dateNow = today.toLocaleDateString('en-us',{'day':'numeric','month':'long','year':'numeric'})
                
                value.itemId = itemId!;
                value.categoryName = categoryTitle;
                value.categoryId = categoryId;
                value.date = dateNow;
                items.unshift(value)
                
                dispatch({type:'updateOnlineShopData','payload':{...categoryList,[catId]:{...categoryList[catId],itemCount:categoryList[catId].itemCount+1}}})
                writeDatabase('onlineshop-category/'+catId,{...categoryList[catId],items:{},itemCount:categoryList[catId].itemCount+1})
                writeDatabase('onlineshop-items/'+itemId,value)
            }
        },
        updateItems:{
            edit:(items:OLSitems) => {
                const categoryId = items.categoryId!;
                const itemId = items.itemId!;
                const categoryItemList = state.categoryList[categoryId].items
                const categoryItem = categoryItemList.find(e=>e.itemId===itemId)
                const itemIndex = categoryItemList.indexOf(categoryItem!);

                categoryItemList[itemIndex] = items;

                dispatch({type:'updateOnlineShopData',payload:{
                    ...state.categoryList,
                    [items.categoryId!]:{
                        ...state.categoryList[items.categoryId!],
                        items:categoryItemList
                    }
                }})

                writeDatabase('onlineshop-items/'+itemId,items)
            },
            delete:(itemId:string,categoryId:string) => {
                const categoryItems = state.categoryList[categoryId].items.filter(e=>e.itemId!==itemId)
                console.log(categoryItems);
                dispatch({'type':'updateOnlineShopData','payload':{
                    ...state.categoryList,
                    [categoryId]:{...state.categoryList[categoryId],items:categoryItems
                    }
                }})
                clearPath('onlineshop-items/'+itemId)
            }
        }
    }
    
    const value:ProductPage_content = {
        state,
        dispatch,
        fetchProductLandingPage,
        updateProductLandingPage,
        onlineShopHandler
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
        case 'updateOnlineShopData':
        return {
            ...state,
            categoryList: action.payload
        }
    }
}

type ProductPage_state =  {
    landingPageImages:UploadFile[];
    productItems:string[];
    onViewItem:OLSitems|undefined;
    onViewItemEdit:boolean;
    categoryList:CatListState;
}

interface CatListState {
    [key: string]: CatItem;
}



type ProductPage_action = 
|{type:'updatelandingpage',payload:UploadFile[]}
|{type:'updateOnlineShopData',payload:CatListState}

type ProductPage_content = {
    state:ProductPage_state;
    dispatch:React.Dispatch<ProductPage_action>;
    fetchProductLandingPage:()=>void;
    updateProductLandingPage : (payload:UploadFile[]) => void;
    onlineShopHandler:{
        fetchOnlineShopData:() => void,
        updateCategory:{
            add:(payload:CatItem) => void,
            edit:(catId:string,value:string) => void,
            delete:(catId:string) => void,
            itemAdd:(catId:string,value:OLSitems) => void
        },
        updateItems:{
            edit:(items:OLSitems) => void,
            delete:(itemId:string,categoryId:string) => void
        }
    }
}

type DivElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>