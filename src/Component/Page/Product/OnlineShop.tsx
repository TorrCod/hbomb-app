import { Button } from 'antd';
import React from 'react';
import useHoverStyle from '../../../customhooks/useHoverStyle';
import './css/OnlineShopCart.css';
import './css/OnlineShop.css'

const OnlineShop = (props:DefaultProps) => {

  return (
    <div {...props} className='online-shop'>
        <div className="online-shop-container">
          {/* <div className="online-shop-category">
            <h1>Category Title</h1>
            <div className="online-shop-item-container">
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
            </div>
          </div>

          <div className="online-shop-category">
            <h1>Category Title</h1>
            <div className="online-shop-item-container">
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
            </div>
          </div>

          <div className="online-shop-category">
            <h1>Category Title</h1>
            <div className="online-shop-item-container">
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
            </div>
          </div>

          <div className="online-shop-category">
            <h1>Category Title</h1>
            <div className="online-shop-item-container">
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
              <div className="online-shop-item flex-center">
                item1
              </div>
            </div>
          </div> */}
        {props.children}
        </div>
    </div>
  )
}

export const OnlineShopCategory = (props:DefaultProps) => {
  return(
    <div className='online-shop-category-container'>
      <div className='online-shop-category-title'><h1>{props.title}</h1></div>
      <div {...props} className="online-shop-category">
        <div className="online-shop-item-container">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export const OnlineShopItem = (props:Type_OnlineShopItem) => {
  const imageurl = props.imageurl;
  const itemName = props.itemName;
  const itemStock = props.stock;
  const itemPrice = props.price
  const hover =  useHoverStyle({
    height: '42vh',
  })
  const hoverProps = hover.props;
  const hoverState = hover.state;

  return(
      <div {...hoverProps} style={hoverState}  className="online-shop-item">
        <img src={imageurl} alt='OnlineShopItem'/>
        <div className="online-shop-item-des">
          <h1>{itemName}</h1>
          <p>Price: {itemPrice}₱</p>
          <p>Stock: {itemStock}pcs</p>
          <Button type='primary'>CHECK OUT</Button>
          <Button>ADD TO CART</Button>
        </div>
      </div>
  )
}
export type Type_OnlineShopItem = {
  imageurl:string;
  itemName:string;
  price:number;
  stock:number;
  key:string;
}

export const OnlineShopCart = ({children,buttonCallback}:OSCprops) =>{
  const handleButtonCheckOut = () => {
    buttonCallback();
  }
  return( 
    <div className="onlineshopCart-container">
      <div className="onlineshopCart-item-container">
        {children}
      </div>
      <div className="flex-center flex-column">
        <h2 className="onlineshopCart-total">
          Total: P400
        </h2>
        <div className="onlineshopCart-button">
          <Button onClick={handleButtonCheckOut} type='primary'>CHECK OUT</Button>
        </div>
      </div>
    </div>
  )
}
type OSCprops = {
  children:React.ReactNode;
  buttonCallback: () => void;
}

export const OnlineShopCartItem = (props:Type_OnlineShopCartItem)=>{
  const imgSrc = props.cartItemImgSrc;
  const itemPrice = props.cartItemPrice;
  const itemCount = props.cartItemCount;

  return(
    <div className="onlineshopCart-item">
      <div className='onlineshopCart-item-main'>
        <img src={imgSrc} alt="" className="onlineshopCart-image" />
        <span>Shorts</span>
      </div>
      <div className='onlineshopCart-item-info'>
        <h3 className='onlineshopCart-numberofitem'>
          <span><Button type='primary' size='small'  shape='circle'>-</Button></span>
          x{itemCount}
          <span><Button type='primary' size='small'  shape='circle'>+</Button></span>
        </h3>
        <h3 className='onlineshopCart-price'>₱{itemPrice}</h3>
      </div>
    </div>
  )
}
type Type_OnlineShopCartItem = {
  cartItemImgSrc:string;
  cartItemPrice:number;
  cartItemCount:number;
}

export default OnlineShop;
type DefaultProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;