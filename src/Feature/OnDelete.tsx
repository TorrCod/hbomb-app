import { Button, Divider, Input, InputRef, Space } from "antd"
import TextArea from "antd/lib/input/TextArea";
import React, { ChangeEventHandler, useRef, useState } from "react"
import ModalAntD from "./ModalAntD"

const OnDelete = ({
    children,
    onDelete,
    onClick,
    onCancel,
    icon,
    type,
    shape,
    className
}:Ondelete_props) => {
    const [visibModal, setVisibModal] = useState(false);

    const showModal = () => {
        setVisibModal(true)
    };

    const inputOnChangeReact:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if(e.target.value === 'yes') ConfirmDelete()
    }

    const ConfirmDelete = () => {
        setVisibModal(false)
        if(onDelete !== undefined)onDelete()
    }

    return (
    <>
        <ModalAntD 
            handleCancel={() => {
                setVisibModal(false);
                if(onCancel !== undefined){
                    onCancel()
                }
            }}
            modalVisible={visibModal}
        > 
            <Space direction="vertical">
                <span style={{'color':'red'}}>Deleting ...</span> <br/>Type 'Yes' to confirm
                <Input 
                    onChange={inputOnChangeReact} 
                    placeholder="yes"
                    defaultValue={''}
                />
            </Space>
            <Divider/>
            <Space style={{'display':'flex','justifyContent':'center'}}>
                <Button onClick={() => {setVisibModal(false)}}>Cancel</Button>
            </Space>
        </ModalAntD>
        <Button 
            className={className}
            onClick={onClick?() => {onClick();showModal()}:showModal} 
            danger
            type = {type}
            icon = {icon}
            shape = {shape}
        >
            {children}
        </Button>
    </>
    )
}
type Ondelete_props = {
    className?: string;
    children?:React.ReactNode;
    onDelete?:() => void;
    onClick?:() => void;
    onCancel?:()=>void;
    type?:"link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined;
    icon?:React.ReactNode;
    shape?:"circle" | "round" | "default" | undefined
}

export default OnDelete