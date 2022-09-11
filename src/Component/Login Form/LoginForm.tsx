import { Avatar, Button, Checkbox, Form, Input, Menu, MenuProps, message, Space } from 'antd';
import { auth, SignIn } from '../../api/utils';
import { UserContext } from '../../hooks/UserContext';
import './LoginForm.css'
import {UserOutlined} from '@ant-design/icons'
import React from 'react';
import { BsCardChecklist } from 'react-icons/bs';
import {BiStats} from 'react-icons/bi'
import { Link } from 'react-router-dom';

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
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

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

  const orderList = (
    <Link to='/order-list'>
      ORDER LIST
    </Link>
  )

  const shopStats = (
    <Link to='/stats'>
      STATS
    </Link>
  )

  const menuItems: MenuProps['items'] = [
    getItem(orderList,"ordrlst",<BsCardChecklist/>),
    getItem(shopStats,"stats",<BiStats/>)
  ]

  

  return(
        <Space className='user-profile' direction='vertical' align='center' style={{width:"100%"}}>
          <Avatar size={64} icon={<UserOutlined />}/>
          <h4>Admin</h4>
          <Button type='default' shape='round' onClick={handleLogout}>LOGOUT</Button>
          <Menu
            style={{ width: "100%" }}
            mode="inline"
            items={menuItems}
          />
        </Space>
  )
}

export default React.memo(LoginForm);