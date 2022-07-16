import * as AiIcons from 'react-icons/ai';
import './NavBar.css';
import Menu from './Menu';
import { useState } from 'react';
import HbombLogo from '../Logo/HbombLogo';
import { useWindowDimensions } from '../../api/utils';
import { BsFillPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../hooks/GlobalContext';
import LoginForm from '../Login Form/LoginForm';
import { Avatar, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserContext } from '../../hooks/UserContext';
import { FaSignInAlt } from 'react-icons/fa';


function NavBar() {
    const globalContext = GlobalContext();
    const userContext = UserContext();
    const globalDispatch = globalContext.dispatch;
    const [visible, setVisible] = useState(false)
    const [Show, setShow] = useState(false);
    const {width} = useWindowDimensions()
    const navActiveState = globalContext.globalState.navActive
    const isAdmin = userContext.state.UserState.checkCredential
    

    const showModal = () => {
        setVisible(true);
      };
    
      const hideModal = () => {
        setVisible(false);
      };

    function HandleMenu(){
        if (!Show){
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        }else {
            document.getElementsByTagName('body')[0].style.overflow = 'visible';
        }
        setShow(!Show);
    }

    const handleActive = (index:number) => {
        globalDispatch({type:'onChangeTab',payload:index})
    }

    const NavBar = [
        {
            title: 'Home',
            link: '/',
            icons: <AiIcons.AiFillHome/>
        },
        {
            title: 'Online Shops',
            link: '/product',
            icons: <AiIcons.AiFillShopping/>
        },
        {
            title: 'About Us',
            link: '/aboutus',
            icons: <BsFillPeopleFill/>
        },
    ]

    const mobileStyleNav:React.CSSProperties = {
        position: 'fixed',
        zIndex: '3',
        backgroundColor: 'var(--primary)',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        paddingBlock: '0.5em'
    }

    return ( 
        <> 
            {(width <= 600)?<Menu state = {Show} HandleButton = {HandleMenu}/>:null}
            <div className='defaultNav' style={(width <= 600)? mobileStyleNav:{}}>
                <Modal 
                    zIndex={4}
                    onCancel={hideModal}
                    className='defaultNav-signin' 
                    visible={visible}
                >
                    <HbombLogo/>
                    <LoginForm HandleButton={()=>{}}/>
                </Modal>
                    {(width <= 600)?<>
                        <button className='button' onClick={HandleMenu}>
                            <AiIcons.AiOutlineMenu className='nav-menuIcon'/>
                        </button>
                        <HbombLogo/>
                    </>:<>
                        <div className='web-navbar'>
                            <div onClick={()=>handleActive(0)}><HbombLogo/></div>
                            {
                                NavBar.map((child, index) => {return(
                                    <Link 
                                        key={'nav-item-'+index}
                                        style={(navActiveState === index)?{borderBottom: '1px solid white',color:'white'}:{}}
                                        onClick={()=>handleActive(index)} 
                                        to={child.link}>
                                            {child.icons}{child.title}
                                    </Link>
                                )})
                            }
                            <button className='defaultNav-button-signin'
                                style={{color:'white'}}
                                onClick={showModal}
                            >
                                {(!isAdmin)?<><FaSignInAlt/>Admin?</>:<Avatar icon={<UserOutlined/>}/>}
                            </button>
                        </div>
                    </>}
            </div>
        </>
        
     );
}

export default NavBar;