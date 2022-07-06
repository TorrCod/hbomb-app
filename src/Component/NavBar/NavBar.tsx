import * as AiIcons from 'react-icons/ai';
import './NavBar.css';
import Menu from './Menu';
import {useState } from 'react';
import HbombLogo from '../Logo/HbombLogo';


function NavBar() {
    const [Show, setShow] = useState(false);

    function HandleMenu(){
        if (!Show){
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        }else {
            document.getElementsByTagName('body')[0].style.overflow = 'visible';
        }
        setShow(!Show);
    }

    return ( 
        <>
            <Menu state = {Show} HandleButton = {HandleMenu}/>
            <div className='defaultNav'>
                <button className='button' onClick={HandleMenu}>
                    <AiIcons.AiOutlineMenu className='nav-menuIcon'/>
                </button>
                <HbombLogo/>
            </div>
        </>
        
     );
}

export default NavBar;