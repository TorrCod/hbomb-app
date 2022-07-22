import { Avatar, Button, Checkbox, Form, Input, message, Space } from 'antd';
import { auth, SignIn } from '../../api/utils';
import { UserContext } from '../../hooks/UserContext';
import './LoginForm.css'
import {UserOutlined} from '@ant-design/icons'
import React from 'react';

interface Props {
  HandleButton: ()=>void
}

const LoginForm = (props: Props) => {
  const userContext = UserContext();
  const dispatch = userContext.dispatch;
  const loadingDone = userContext.loadingDone;
  const isLogin = UserContext().state.UserState.checkCredential;
  
  const onFinish = async (values: any) => {
    const email = values.username;
    const password = values.password;

    loadingDone(false)
    const isLogin = await SignIn(email,password);
    loadingDone(true)

    if (!isLogin){
      wrongCredentials(true)
      message.error('Only Admin can access to this site');
    }
    else {
      wrongCredentials(false)
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
          label="Username: "
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
  const dispatch = userContext.dispatch
  const loadingDone = userContext.loadingDone

  const handleLogout = async () => {
    loadingDone(false)
    await auth.signOut()
    dispatch({type:'signin',payload:false})
    loadingDone(true)
  }
  return(
    
      <div>
        <Space direction='vertical' align='center'>
        <Avatar size={64} icon={<UserOutlined />}/>
        <h4>Admin</h4>
        <Button type='default' shape='round' onClick={handleLogout}>LOGOUT</Button>
        </Space>
      </div>
      // {/* <div className='user user-container flex-center'>
      //   <div className='user-profile'>
      //     <HbombLogo/>
      //   </div>
      //   <div className='user-button-logout'></div>
      // </div> */}
  )
}

export default React.memo(LoginForm);