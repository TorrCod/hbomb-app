import { Button, Checkbox, Dropdown, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { SignIn } from '../../api/utils';
import { UserContext } from '../../hooks/UserContext';
import './LoginForm.css'
import HbombLogo from '../Logo/HbombLogo';

interface Props {
  HandleButton: ()=>void
}
const App = (props: Props) => {
  const [checkCredential, setCheckCredential] = useState(false)
  const userContext = UserContext()
  const dispatch = userContext.dispatch
  const isLogin = UserContext().state.UserState.checkCredential

  const onFinish = async (values: any) => {
    const email = values.username;
    const password = values.password;
    const isLogin = await SignIn(email,password);

    if (!isLogin){
      wrongCredentials(true)
      message.error('Mali Pooo password at username');
    }
    else {
      wrongCredentials(false)
      Modal.success({
        content: 'Welcome Admin!',
      });
      props.HandleButton()
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  const wrongCredentials = (isCheck:boolean) => dispatch({type:'signin',payload:!isCheck})
  
  return (
    <>
      {(!isLogin)?<div className='loginform flex-center flex-column'>
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
      </div>:<UserProfile/>}
    </>
  );
};

const UserProfile = () => {
  const userContext = UserContext()

  const handleLogout = () => {
    Modal.success({
      content: 'Thank You Goodbye!',
    });
    userContext.dispatch({type:'signin',payload:false})
  }
  return(
    <Dropdown 
    overlay={(
        <Button type='default' onClick={handleLogout}>LOGOUT</Button>
    )} placement='bottom'>
      <div className='user user-container flex-center'>
        <div className='user-profile'>
          <HbombLogo/>
        </div>
        <div className='user-button-logout'></div>
      </div>
    </Dropdown>
  )
}

export default App;