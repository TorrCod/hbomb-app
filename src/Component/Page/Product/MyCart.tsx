import { Button } from 'antd'
import { useRef } from 'react'
import { BsFillCartFill } from 'react-icons/bs'
import { useWindowSize } from 'react-use'
import ModalAntD, { MADhandle } from '../../../Feature/ModalAntD'
import './css/MyCart.css'
import { OnlineShopCart, OnlineShopCartItem } from './OnlineShop'

const MyCart = (props:Mycart_props) => {
  let modalRef = useRef<MADhandle>(null);
  const {className} = props
  const {width} = useWindowSize()

  const showModal = () => {
    modalRef.current?.showModal()
  }
  
  const onCancelModal = () => {
    modalRef.current?.handleCancel()
  }

  return (
    <>
      {(width <= 700)?
      <div className={className}>
        <ModalAntD ref={modalRef} title='My Cart' handleCancel={()=>{modalRef.current?.handleCancel()}}>
          <OnlineShopCart buttonCallback={onCancelModal}>
            <OnlineShopCartItem cartItemCount={2} cartItemPrice={100} cartItemImgSrc='sdadasd' />
            <OnlineShopCartItem cartItemCount={2} cartItemPrice={100} cartItemImgSrc='sdadasd' />
            <OnlineShopCartItem cartItemCount={2} cartItemPrice={100} cartItemImgSrc='sdadasd' />
          </OnlineShopCart>
        </ModalAntD>
        <Button 
        onClick={showModal} 
        shape='round' 
        className={'mycart box-shadow-solid align-btn'}
        type='primary'
        icon={<BsFillCartFill/>}
        >
          HBOMB CART
        </Button>
      </div>
      :
      <div className='mycart-web flex-center flex-column'>
        <Button 
        shape='round' 
        className='mycart 
        box-shadow-solid ' 
        icon={<BsFillCartFill/>} 
        type='primary'
        >
          HBOMB CART
        </Button>
        <OnlineShopCart buttonCallback={onCancelModal}>
            <OnlineShopCartItem cartItemCount={2} cartItemPrice={100} cartItemImgSrc='sdadasd' />
            <OnlineShopCartItem cartItemCount={2} cartItemPrice={100} cartItemImgSrc='sdadasd' />
            <OnlineShopCartItem cartItemCount={2} cartItemPrice={100} cartItemImgSrc='sdadasd' />
            <OnlineShopCartItem cartItemCount={2} cartItemPrice={100} cartItemImgSrc='sdadasd' />
            <OnlineShopCartItem cartItemCount={2} cartItemPrice={100} cartItemImgSrc='sdadasd' />
            <OnlineShopCartItem cartItemCount={2} cartItemPrice={100} cartItemImgSrc='sdadasd' />
        </OnlineShopCart>
      </div>
      }
    </>
  )
}
type Mycart_props = {
  className?:string
}

export default MyCart