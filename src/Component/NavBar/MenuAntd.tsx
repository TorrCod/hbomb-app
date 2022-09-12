import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {Link} from 'react-router-dom';
import {AiFillHome, AiFillShopping} from 'react-icons/ai'
import {BsFillPeopleFill} from "react-icons/bs"
import { useEffect, useState } from 'react';
import { TbLayoutDashboard } from 'react-icons/tb';
import { useAdminSignedin } from '../../customhooks/useAdminSignedIn';

type MenuItem = Required<MenuProps>['items'][number];
let menuItem: { itemkey: React.Key; keypath: string; }[] =  []

function getItem(
  label: React.ReactNode,
  key: React.Key,
  itempath: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  menuItem.push({itemkey: key, keypath: itempath})
  return {
    key,
    itempath,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


const items: MenuProps['items'] = [
  getItem(<Link to='/'>Home</Link>, '1','/', <AiFillHome/>),

  getItem(<Link to='/product' >Online Store</Link>, '2','/product',<AiFillShopping/>),

  getItem(<Link to='/aboutus'>About</Link>, '3','/aboutus',<BsFillPeopleFill/>),

  getItem(<Link to='/dashboard'>Dashboard</Link>, '4','/aboutus',<TbLayoutDashboard/>),
];

const MenuAntd = (props: { HandleButton: () => void}) => {

  const onClick: MenuProps['onClick'] = e => {
    props.HandleButton();
  };

  const isAdminSignedIn = useAdminSignedin()

  const noDashboard: MenuProps['items'] = [
    getItem(<Link to='/'>Home</Link>, '1','/', <AiFillHome/>),
  
    getItem(<Link to='/product' >Online Store</Link>, '2','/product',<AiFillShopping/>),
  
    getItem(<Link to='/aboutus'>About</Link>, '3','/aboutus',<BsFillPeopleFill/>),
  ]

  return (
    <>
      <Menu
        onClick={onClick}
        style={{ width: 256, background:"none"}}
        mode="inline"
        items={(isAdminSignedIn)?items:noDashboard}
      />
  </>
  );
};

export default MenuAntd;