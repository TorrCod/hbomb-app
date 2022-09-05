import './css/OnlineShopCart.css';
import './css/OnlineShopSetting.css';
import './css/OnlineShop.css'
import { debounce } from '../../../api/utils';
import { OLSitems } from './ShopProduct';
import Cart_CountBtn from '../../../Feature/Cart_CountBtn';
import Cart_TotalPrice from '../../../Feature/Cart_TotalPrice';
import DeleteCartItemBtn from '../../../Feature/DeleteCartItemBtn';
import CheckOutBtn from '../../../Feature/CheckOutBtn';

export const OnlineShopCart = ({children,buttonCallback}:OSCprops) =>{
  return( 
    <div className="onlineshopCart-container">
      <div onScroll={() =>{ debounce(() => {},100)}} className="onlineshopCart-item-container">
        {children}
      </div>
      <div className="flex-center flex-column">
        <h2 className="onlineshopCart-total">
          Total: {Cart_TotalPrice()}
        </h2>
        <div className="onlineshopCart-button">
          <CheckOutBtn/>
        </div>
      </div>
    </div>
  )
}
type OSCprops = {
  children:React.ReactNode;
  buttonCallback: () => void;
  childRef?:React.RefObject<HTMLDivElement>
}

export const OnlineShopCartItem = (props:OnlineShopCartItem_props)=>{
  const itemCount = props.itemCount;
  const {url:imgSrc,price:itemPrice,name,itemId} = props.item;

  return(
    <div className="onlineshopCart-item">
      <div className='onlineshopCart-item-main'>
        <img src={imgSrc} alt="" className="onlineshopCart-image" />
        <span>{name}</span>
      </div>

      <div style={{placeSelf:'center end'}}>
        <DeleteCartItemBtn
          item={props.item}
        />
      </div>

      <div className='onlineshopCart-item-info'>
        <h3 className='onlineshopCart-numberofitem'>
          <span>
            <Cart_CountBtn type='decrement' item={props.item} />
          </span>
          x{itemCount}
          <span>
            <Cart_CountBtn type='increment' item={props.item} />
          </span>
        </h3>
        <h3 className='onlineshopCart-price'>₱{itemPrice}</h3>
      </div>
    </div>
  )
}

type OnlineShopCartItem_props = {
  item : OLSitems;
  itemCount : number
}

