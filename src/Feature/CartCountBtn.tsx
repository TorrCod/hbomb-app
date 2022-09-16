import { Button } from "antd";
import { OLSitems } from "../Component/Page/Product/ShopProduct";
import { UserContext } from "../hooks/UserContext";

const CartCountBtn = (props:Props) => {
    const userContext = UserContext();
    const itemCount = userContext.state.CartItem.filter(e => e.item.itemId === props.item.itemId)[0].itemCount
    const incrementItemCount =  itemCount + 1;
    const decrementItemCount = itemCount? itemCount - 1: itemCount;
    const updateCount = userContext.cartItemHandler.updateCount
    
    const incrementHandler = () => {
        updateCount(props.item,incrementItemCount)
    }

    const decrementHandler = () => {
        updateCount(props.item,decrementItemCount)
    }

    return (
        (props.type === 'increment')?
        <Button 
            onClick={incrementHandler}
            type='primary' 
            size='small'  
            shape='circle'
        >
            +
        </Button>
        :
        <Button 
            onClick={decrementHandler}
            type='primary' 
            size='small'  
            shape='circle'
        >
            -
        </Button>
    )
}
type Props = {
    item: OLSitems;
    type:'increment'|'decrement';
}
export default CartCountBtn