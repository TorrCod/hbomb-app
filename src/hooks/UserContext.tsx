import { createContext, useContext, useReducer } from "react";
import { Orders } from "../api/CustomType";
// import { auth } from "../api/utils";
import { OLSitems } from "../Component/Page/Product/ShopProduct";
import { auth } from "../FirebaseService/FirebaseConfig";
import { readData } from "../FirebaseService/RealtimeDatabase";
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
    OrderList:Orders[]
}

type _UserStateAction = 
|{type:'updateorderlist',payload:Orders[]}
|{type:'signin',payload:boolean}
|{type:'loadingdone',payload:boolean}
|{type:'updatecartitem',payload:{itemCount:number;item:OLSitems}[]}

const  _UserState_init = {
    UserState:{
        checkCredential: (auth.currentUser)?true:false,
        isLoading:false
    },
    CartItem:[],
    OrderList:[]
}

export  function userReducer(state:_UserStateType,action: _UserStateAction):_UserStateType {
    const {type,payload} = action;
    switch(type){
        case 'updateorderlist':
            return {...state,OrderList:payload};
        case 'signin':
            return {
                ...state,
                UserState:{
                    ...state.UserState,
                    checkCredential:payload
                }
            };
        case 'loadingdone':
            return {
                ...state,
                UserState:{
                    ...state.UserState,
                    isLoading:payload
                }
            };
        case 'updatecartitem':
            return {
                ...state,
                CartItem:payload
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
    updateOrderList:() => void
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
    updateOrderList: ()=>{}
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

    const updateOrderList = ()=>{
        const dashboard = new Dashboard()
        dashboard.fetchOrderList()
        .then((orderList)=>dispatch({type:'updateorderlist',payload:orderList}))
    }

    const value = {
        loadingDone,
        state,
        dispatch,
        cartItemHandler,
        updateOrderList
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

class Dashboard {
    ordesList:Orders[] = []

    async fetchOrderList():Promise<Orders[]>{
        const response = await readData('order-list')
        const orderList:Orders[] =  Object.values(response)

        return orderList
    }
}

export const UserContext = () => useContext(useUserContext)