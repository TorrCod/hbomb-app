import { Button, Divider, Dropdown, Input, Menu, Popover, Space, Tree } from 'antd';
import React, { useRef, useState } from 'react';
import './css/OnlineShopCart.css';
import './css/OnlineShopSetting.css';
import './css/OnlineShop.css'
import { AiFillSetting, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import MyDrawer from '../../../Feature/MyDrawer';
import { useToggle } from 'react-use';
import { CatItem } from './ShopProduct';
import { DownOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/lib/tree';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GiClothes } from 'react-icons/gi';
import OnDelete from '../../../Feature/OnDelete';

export const OnlineShopCart = ({children,buttonCallback}:OSCprops) =>{
  const handleButtonCheckOut = () => {
    buttonCallback();
  }
  return( 
    <div className="onlineshopCart-container">
      <div className="onlineshopCart-item-container">
        {children}
      </div>
      <div className="flex-center flex-column">
        <h2 className="onlineshopCart-total">
          Total: P400
        </h2>
        <div className="onlineshopCart-button">
          <Button 
          shape='round'
          className='box-shadow-solid' 
          onClick={handleButtonCheckOut} 
          type='primary'>
            CHECK OUT
          </Button>
        </div>
      </div>
    </div>
  )
}
type OSCprops = {
  children:React.ReactNode;
  buttonCallback: () => void;
}

export const OnlineShopCartItem = (props:Type_OnlineShopCartItem)=>{
  const imgSrc = props.cartItemImgSrc;
  const itemPrice = props.cartItemPrice;
  const itemCount = props.cartItemCount;

  return(
    <div className="onlineshopCart-item">
      <div className='onlineshopCart-item-main'>
        <img src={imgSrc} alt="" className="onlineshopCart-image" />
        <span>Shorts</span>
      </div>
      <div className='onlineshopCart-item-info'>
        <h3 className='onlineshopCart-numberofitem'>
          <span><Button type='primary' size='small'  shape='circle'>-</Button></span>
          x{itemCount}
          <span><Button type='primary' size='small'  shape='circle'>+</Button></span>
        </h3>
        <h3 className='onlineshopCart-price'>₱{itemPrice}</h3>
      </div>
    </div>
  )
}
type Type_OnlineShopCartItem = {
  cartItemImgSrc:string;
  cartItemPrice:number;
  cartItemCount:number;
}


export const OnlineShopSetting = (props:OnlineShop_props) => {
  const {className,itemData,onSave}=props;
  const [showDrawer,setShowDrawer] = useToggle(false);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer)
  }

  const handleSave = () => {
    setShowDrawer(!showDrawer)
  }
  const handleCancel = () => {

    setShowDrawer(!showDrawer)
  }
  const handleX = () => {
    setShowDrawer(!showDrawer)
  }

  const responseButton = (
    <>
      <Button onClick={handleCancel}>cancel</Button>
      <Button onClick={handleSave} type='primary'>Save</Button>
    </>
  )

  const handleNodeOnclick:(key: string | undefined) => void = (key) => {
    setExpandedKeys([key!])
  }
  const treeData:DataNode[] = [
    {
      title:
        <TreeContent.Category>
          CatItem
        </TreeContent.Category>,
      key:'0',
      children:[
        {
          title:
            <TreeContent.Items>
              shorts
            </TreeContent.Items>,
          key:'0-1',
          switcherIcon:<GiClothes/>
        }
      ]
    }
    
  ]

  return (
    <div  className={"onlineshop-setting " + className}>
      <MyDrawer
      title='Manage Shop' 
      isVisible={showDrawer} 
      placement='right'
      buttonElement={responseButton}
      onCLose={handleX}
      >
          <Tree
            className='onlineshop-setting-tree'
            showIcon={false}
            showLine
            switcherIcon={<DownOutlined/>}
            treeData={treeData}
            selectable={true}
          />

          <Divider/>
          
          <Button type='primary'>Add Category</Button>
      </MyDrawer>
      <Button 
      onClick={toggleDrawer}
      shape='round'
      className='box-shadow-solid align-btn'
      type='primary'
      icon={<AiFillSetting/>}
      >
        MANAGE
      </Button>
    </div>
  )
}

const TreeContent = {
  Category:(props:TreeTitle_props)=>{
    const {itemKey, onCLick, children,onClickPlus,onClickThreeDot} = props;
    const content = (
      <>
        <Space direction='vertical'>
          <div>Category Name:<Input defaultValue={''} /></div>
          <div>Id:<Input disabled defaultValue={''} /></div>
          <div>Item Count:<Input disabled defaultValue={''} /></div>
          <Divider/>
          <Space style={{'display':'flex','justifyContent':'flex-end'}}>
          <OnDelete 
          >
            Delete
          </OnDelete>
          </Space>
        </Space>
      </>
    )
    return (
      <div onClick={() => onCLick?onCLick(itemKey):{}} className='onlineshop-setting-tree-node box-shadow-solid'>
        <Space direction='horizontal'>
        <span>{children}</span>
        <Button className='align-btn' size='small' type='primary' onClick={() => () => onClickPlus?onClickPlus():{}} shape='circle' icon={<AiOutlinePlus/>}/>
        <Popover
          title='CatItem'
          trigger='click'
          placement = 'bottom'
          content = {content}
        >
          <Button 
            className='align-btn' 
            size='small' 
            type='primary' 
            onClick={() => () => onClickThreeDot?onClickThreeDot():{}} 
            shape='circle' 
            icon={<BsThreeDotsVertical/>}
          />
        </Popover>
        </Space>
      </div>
    )
  },
  Items:(props:TreeTitle_props) => {
    const {itemKey, onCLick, children,onClickThreeDot} = props;

    const content = (
      <Space direction='vertical'>
        <Space direction='vertical'>
          <Space style={{'display':'flex','justifyContent':'center'}}>
            <div className='ols-setting-item-img-container flex-center'>
              <img src="" alt="item-image" />
            </div>
          </Space>
          <div>Name:<Input maxLength={32} size='small' defaultValue={'ItemVal'} /></div>
          <div>Id:<Input maxLength={32} size='small' disabled defaultValue={'ItemVal'} /></div>
          <div>Price:<Input prefix="₱" maxLength={32} size='small' defaultValue={'ItemVal'} /></div>
          <div>Stock:<Input suffix='pcs' maxLength={32} size='small' defaultValue={'ItemVal'} /></div>
        </Space>
        <Divider/>
        <Space style={{'display':'flex','justifyContent':'flex-end'}}>
          {/* <Button danger>Delete</Button> */}
          <OnDelete 
          >
            Delete
          </OnDelete>
        </Space>
      </Space>
    )

    const handleButton = () => {
      if( onClickThreeDot !== undefined){
        onClickThreeDot()
      }
    }

    return (
      <div 
        onClick={() => onCLick?onCLick(itemKey):{}} 
        className='onlineshop-setting-tree-node box-shadow-solid'
      >
        <Space direction='horizontal'>
        <span>{children}</span>
        <Popover
          content={content}
          title='My Title'
          trigger="click"
          placement='bottom'
        >
          <Button 
          className='align-btn' 
          size='small' 
          type='primary' 
          onClick={handleButton} 
          shape='circle' 
          icon={<BsThreeDotsVertical/>}/>
        </Popover>
        </Space>
      </div>
    )
  }
}
type TreeTitle_props = {
  children: React.ReactNode;
  onClickPlus?: () => void;
  onClickThreeDot?: () => void;
  onCLick?:(itemKey:string|undefined) => void;
  itemKey?:string
}
const convertToDAtaNode = (itemData:CatItem):DataNode[] => {
  const toReturn:DataNode[] = [];

  for (const category of itemData) {
    const index = itemData.indexOf(category);
    toReturn[index].title = category.categoryTitle;
    toReturn[index].key = category.categoryId;

  }

  return toReturn
}

type OnlineShop_props = {
  className?: string;
  itemData:CatItem;
  onSave?:() => void;
  onCancel?:() => void;
}


type DefaultProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;