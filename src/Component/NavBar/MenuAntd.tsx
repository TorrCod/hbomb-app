import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {Link} from 'react-router-dom';
import {AiFillHome, AiFillShopping} from 'react-icons/ai'
import {BsFillPeopleFill} from "react-icons/bs"
import { useEffect, useState } from 'react';

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
];

const MenuAntd = (props: { HandleButton: () => void}) => {
  const getKey = () => {
    const currentPath = window.location.pathname;
    let menuKey:any;
    for (let index = 0; index < menuItem.length; index++) {
      const keypath = menuItem[index].keypath;
      const itemKey = menuItem[index].itemkey
      if (keypath === currentPath){
        menuKey = itemKey
        break;
      }
    }
    return menuKey
  }
  const [defaultkey, setDefaultkey] = useState(getKey)
  let comPath:string = window.location.pathname
  // const [compPath, setCompPath] = useState(window.location.pathname)
  // useEffect(() => {
  //   setDefaultkey(menuKey)
  // },[])

  const onClick: MenuProps['onClick'] = e => {
    props.HandleButton();
    setDefaultkey(getKey);
  };
  useEffect(() => {
    setDefaultkey(getKey);
  },[comPath])
  return (
    <>
      <Menu
      onClick={onClick}
      style={{ width: 256, background:"none"}}
      mode="inline"
      items={items}
      selectedKeys = {[defaultkey]}/>
  </>
  );
};

export default MenuAntd;