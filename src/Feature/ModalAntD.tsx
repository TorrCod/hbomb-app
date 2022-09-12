import { Button, Modal } from 'antd';
import React, { useState,forwardRef,useImperativeHandle, ReactNode } from 'react';
import './css/ModalAntD.css'

const ModalAntD = forwardRef<MADhandle,MADprops>((props, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    className,children,handleCancel,handleOk,title,modalVisible
  } = props;
  useImperativeHandle(ref,() => ({
    showModal:() => {
        setIsModalVisible(true);
      },
    handleOk:() => {
        setIsModalVisible(false);
      },
    handleCancel:() => {
        setIsModalVisible(false);
      },
  }))

  return (
      <Modal 
        zIndex={1032}
        className='removefooter center-title' 
        onOk={handleOk} 
        onCancel={handleCancel?handleCancel:()=>{
          console.log('clicked');
          setIsModalVisible(false)
        }} 
        title={title} 
        visible={modalVisible?modalVisible:isModalVisible}>
        <div className={className}>
          {children}
        </div>
      </Modal>
  );
})
export default ModalAntD;

type MADprops = {
    children:ReactNode;
    handleOk?:MADmouseevent;
    handleCancel?:MADmouseevent;
    title?:string;
    className?:string;
    modalVisible?:boolean
}
type MADmouseevent = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
export type MADhandle = {
    showModal:() => void;
    handleOk:() => void;
    handleCancel:() => void;
}