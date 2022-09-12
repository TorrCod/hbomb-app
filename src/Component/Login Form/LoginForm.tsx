import { Avatar, Button, Checkbox, Form, Input, Menu, MenuProps, message, Space } from 'antd';
// import { auth, SignIn } from '../../api/utils';
import { UserContext } from '../../hooks/UserContext';
import './LoginForm.css'
import {UserOutlined} from '@ant-design/icons'
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserModalCtx } from '../../hooks/UserModalContext';
import {TbLayoutDashboard} from 'react-icons/tb'
import { SignIn } from '../../FirebaseService/Auth';
import { auth } from '../../FirebaseService/FirebaseConfig';

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
        <Space className='user-profile' direction='vertical' align='center' style={{width:"100%"}}>
          <Avatar size={64} icon={<UserOutlined />}/>
          <h4>Admin</h4>
          <Button type='default' shape='round' onClick={handleLogout}>LOGOUT</Button>
        </Space>
  )
}

export default React.memo(LoginForm);