import {Link} from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs'
import {ReactComponent as Logo} from './Logo.svg'


let activeIndex = 0;

function Menu(props) {
    const menuItem = [
        {
            icons: <AiIcons.AiFillHome/>,
            link : <Link to='/'>Home</Link>,
            id: 'menu1'
        },
        {
            icons: <AiIcons.AiFillShopping/>,
            link : <Link to='/product'>Product</Link>,
            id: 'menu2'
        },
        {
            icons: <BsIcons.BsFillPeopleFill/>,
            link : <Link to='/aboutus'>About</Link>,
            id: 'menu3'
        },
    ]

    const visible = {
        visibility:(props.state)? 'visible': 'hidden',
        backgroundColor: (props.state)? 'rgba(0, 0, 0, 0.3)': 'rgba(0, 0, 0, 0)'
    }

    const slideIn = {
        transform: (props.state)? 'translateX(0)': 'translateX(-100%)'
    }

    const selectedMenu = (index) => {
        props.HandleButton();
        activeIndex = index;
    }
    
    return ( 
        <>
            <div 
                style={visible} 
                onTouchStart = {props.HandleButton}  
                
                className={'bgShade '+ ((props.state)? '':'hidden')}
            />
            <div  
                className={"menu flex-column"}
                style={slideIn}>
                <Logo className='nav-logo-size flex-self-center'/>
                <div className="menu-items">
                    {menuItem.map((child,index) => {return(
                        <h3 
                            onClick = {() => {selectedMenu(index)}} 
                            key = {child.id} 
                            className={(index === activeIndex)? 'activeNav':''}>
                            {child.icons}
                            {child.link}
                        </h3>
                    )})}
                </div>
            </div>
        </>
        
     );
}

export default Menu;