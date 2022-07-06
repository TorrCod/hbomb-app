import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { SignIn } from '../../api/utils';
import './LoginForm.css'

interface Props {
  HandleButton: ()=>void
}
const App = (props: Props) => {
  const [checkCredential, setCheckCredential] = useState(false)

  const onFinish = async (values: any) => {
    console.log(values);
    const email = values.username;
    const password = values.password;
    const isLogin = await SignIn(email,password);
    console.log(isLogin);
    
    if (!isLogin)wrongCredentials(true)
    else {
      wrongCredentials(false)
      props.HandleButton()
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  const wrongCredentials = (isCheck:boolean) => setCheckCredential(isCheck)
  
  return (
    <>
      <div className='loginform flex-center flex-column' 
      >
        {(checkCredential)?
          <Button className='error' style={{background:"red"}}>Email or Password Incorrect</Button>:null
        }
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
        >
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
      </div>
    </>
  );
};

export default App;