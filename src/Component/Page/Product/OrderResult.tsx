import React from 'react'
import { Button, Result } from 'antd';

const  OrderResult = (props:{orderNumber:number}) => {
    const {orderNumber} = props 
    const subMessage = "Order number: " + orderNumber + " you can save this order number for tracking purposes"
    return (
        <Result
            status="success"
            title="Thankyou for your purchase we will contact you shortly"
            subTitle={subMessage}
            extra={[
            <Button type="primary" key="console">
                Home
            </Button>,
            <Button key="buy">Buy Again</Button>,
            ]}
        />
    )
}

export default OrderResult