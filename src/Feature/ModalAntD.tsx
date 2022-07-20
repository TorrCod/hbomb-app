import { Button, Modal } from 'antd';
import React, { useState,forwardRef,useImperativeHandle, ReactNode } from 'react';
import './ModalAntD.css'

const ModalAntD = forwardRef<MADhandle,MADprops>(({title,children,handleOk,handleCancel}, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      <Modal className='removefooter center-title' onCancel={handleCancel} title={title} visible={isModalVisible}>
        {children}
      </Modal>
  );
})
export default ModalAntD;

type MADprops = {
    children:ReactNode;
    handleOk?:MADmouseevent;
    handleCancel:MADmouseevent;
    title?:string
}
type MADmouseevent = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
export type MADhandle = {
    showModal:() => void;
    handleOk:() => void;
    handleCancel:() => void;
}