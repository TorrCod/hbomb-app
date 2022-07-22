import { Button, Modal } from 'antd';
import React, { useState,forwardRef,useImperativeHandle, ReactNode } from 'react';
import './css/ModalAntD.css'

const ModalAntD = forwardRef<MADhandle,MADprops>((props, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    className,children,handleCancel,handleOk,title
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
      <Modal className='removefooter center-title' onOk={handleOk} onCancel={handleCancel} title={title} visible={isModalVisible}>
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
    handleCancel:MADmouseevent;
    title?:string;
    className?:string;
}
type MADmouseevent = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
export type MADhandle = {
    showModal:() => void;
    handleOk:() => void;
    handleCancel:() => void;
}