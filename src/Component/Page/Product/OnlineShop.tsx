import { Button } from 'antd';
import React from 'react';
import useHoverStyle from '../../../customhooks/useHoverStyle';
import useSlider from '../../../customhooks/useSlider';
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

export const OnlineShopItem = (props:OSItem) => {
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

export const OnlineShopCartItem = ()=>{
  return(
    <div className="onlineshopCart-item">
      <img src="" alt="" className="onlineshopCart-image" />
      <h3 className='onlineshopCart-price'>P100</h3>
    </div> 
  )
}

export default OnlineShop;

export type OSItem = {
  imageurl:string;
  itemName:string;
  price:number;
  stock:number;
  key:string;
}

type DefaultProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;