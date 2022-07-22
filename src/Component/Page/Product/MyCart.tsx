import { Button } from 'antd'
import { useRef } from 'react'
import ModalAntD, { MADhandle } from '../../../Feature/ModalAntD'
import './css/MyCart.css'
import { OnlineShopCart, OnlineShopCartItem } from './OnlineShop'

const MyCart = () => {
  let modalRef = useRef<MADhandle>(null)
  const showModal = () => {
    modalRef.current?.showModal()
  }
  
  const onCancelModal = () => {
    modalRef.current?.handleCancel()
  }

  return (
    <>
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
      className='mycart' 
      type='primary'
      >
        MY CART
      </Button>
    </>
  )
}

export default MyCart