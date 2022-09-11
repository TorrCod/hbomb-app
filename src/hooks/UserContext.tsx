import { createContext, useContext, useReducer } from "react";
import { auth } from "../api/utils";
import { OLSitems } from "../Component/Page/Product/ShopProduct";
// import { GlobalContext } from "./GlobalContext";

export type _UserStateType = {
    UserState:{
        checkCredential:boolean
        isLoading:boolean
    }
    CartItem:{
        itemCount:number;
        item:OLSitems
    }[]
}

type _UserStateAction = 
|{type:'signin',payload:boolean}
|{type:'loadingdone',payload:boolean}
|{type:'updatecartitem',payload:{itemCount:number;item:OLSitems}[]}

const  _UserState_init = {
    UserState:{
        checkCredential: (auth.currentUser)?true:false,
        isLoading:false
    },
    CartItem:[]
}

export function userReducer(state:_UserStateType,action: _UserStateAction):_UserStateType {

    switch(action.type){
        case 'signin':
            return {
                ...state,
                UserState:{
                    ...state.UserState,
                    checkCredential:action.payload
                }
            };
        case 'loadingdone':
            return {
                ...state,
                UserState:{
                    ...state.UserState,
                    isLoading:action.payload
                }
            };
        case 'updatecartitem':
            return {
                ...state,
                CartItem:action.payload
            }
    }
}

type _UserState_Content = {
    loadingDone :(payload:boolean) => void
    state:_UserStateType
    dispatch:React.Dispatch<_UserStateAction>
    cartItemHandler: {
        addToCart: (item:OLSitems) => void,
        checkOut:() => void,
        updateCount:(item:OLSitems,payload:number)=>void,
        delete : (item:OLSitems) => void,
        clear: ()=>void
    }
}

const _UserState_Content_init = {
    loadingDone :() =>{},
    state:_UserState_init,
    dispatch:() => {},
    cartItemHandler:{
        addToCart: () => {},
        checkOut:() => {},
        updateCount:()=>{},
        delete : () =>{},
        clear : () =>{}
    },
    
}

export const useUserContext = createContext<_UserState_Content>(_UserState_Content_init)

export const UserProvider = ({children}:any) => {
    const [state, dispatch] = useReducer(userReducer,_UserState_init)

    const loadingDone = (payload:boolean) => dispatch({type:'loadingdone',payload:!payload})

    const cartItemHandler = {
        addToCart: (item:OLSitems) => {
            const myCart = new HbombCart(state.CartItem,dispatch,item)
            myCart.addItem()
        },
        checkOut:() => {

        },

        updateCount:(item:OLSitems,payload:number)=> {
            const myCart = new HbombCart(state.CartItem,dispatch,item)
            myCart.updateCount(payload)
        },
        delete : (item:OLSitems) => {
            const myCart = new HbombCart(state.CartItem,dispatch,item)
            myCart.deleteCartItem()
        },
        
        clear: () => {
            const myCart = new HbombCart(state.CartItem,dispatch)
            myCart.clearCartItem()
        }
    }

    const value = {
        loadingDone,
        state,
        dispatch,
        cartItemHandler
    }
    return <useUserContext.Provider value={value}>{children}</useUserContext.Provider>
}

class HbombCart {
    item: OLSitems;
    cartItemList: {itemCount: number;item: OLSitems;}[];
    dispatch:(value: _UserStateAction) => void

    constructor (cartItemList: {itemCount: number;item: OLSitems;}[],dispatch:(value: _UserStateAction) => void, item?:OLSitems,){
        this.item = item!;
        this.cartItemList = cartItemList;
        this.dispatch = dispatch;
    }
    
    addItem():void {
        const isExist = this.cartItemList.filter(e => e.item.itemId === this.item.itemId)
        
        if(isExist[0]){
            const itemCount = isExist[0].itemCount
            // updateCount(item.itemId!,itemCount+1)
            this.updateCount(itemCount+1)
        }else{
            // addToCart
            const cartList = this.cartItemList;
            cartList.push({itemCount:1,item:this.item})
            this.dispatch({type:'updatecartitem', payload:cartList})
        }
    }

    updateCount(payload:number):void {
        const cartItem =  this.cartItemList.filter(e=>e.item.itemId===this.item.itemId)[0];
        cartItem.itemCount = payload;
        const index = this.cartItemList.findIndex(e=>e.item.itemId === this.item.itemId);
        this.cartItemList[index] = cartItem
        this.dispatch({type:'updatecartitem',payload:this.cartItemList})
    }

    deleteCartItem():void {
        const newCartItemList = this.cartItemList.filter(e=>e.item.itemId !== this.item.itemId)
        this.dispatch({type:'updatecartitem',payload:newCartItemList})
    }

    clearCartItem():void {
        this.dispatch({type:'updatecartitem',payload:[]})
    }
}

export const UserContext = () => useContext(useUserContext)