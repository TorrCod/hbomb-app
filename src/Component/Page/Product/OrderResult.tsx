import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const  OrderResult = (props:{orderNumber:number}) => {
    const {orderNumber} = props 
    const subMessage = "Order number: " + orderNumber + " you can save this order number for tracking purposes"
    return (
        <Result
            status="success"
            title="Thankyou for your purchase we will contact you shortly"
            subTitle={subMessage}
            extra={[
                <Link to='/'>
                    <Button type="primary" key="console">
                        Home
                    </Button>
                </Link>,
                <Link to='/product'>
                    <Button key="buy">Buy Again</Button>
                </Link>,
            ]}
        />
    )
}

export default OrderResult