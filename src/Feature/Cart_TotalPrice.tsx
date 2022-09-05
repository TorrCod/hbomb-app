import { OLSitems } from "../Component/Page/Product/ShopProduct";
import { UserContext } from "../hooks/UserContext"

const Cart_TotalPrice = () => {
    const userContext = UserContext();
    const cartItemList = userContext.state.CartItem
    const priceList = itemPriceList(cartItemList)
    const totalPrice = priceList.reduce((prev,curr) => prev+curr,0)
    return (
        <>
            ₱{totalPrice}
        </>
    )
}

export const itemPriceList = (cartItemList:CartItemList) => {
    const cartItemPriceList:number[] = [];
    for (const cartItem of cartItemList) {
        const cartItemPrice = cartItem.itemCount * cartItem.item.price;
        cartItemPriceList.push(cartItemPrice)
    }
    return cartItemPriceList
}

type CartItemList = {
    itemCount: number;
    item: OLSitems;
}[]

export default Cart_TotalPrice