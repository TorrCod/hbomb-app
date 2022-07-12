import HbombLogo from '../Logo/HbombLogo';
import MenuAntd from './MenuAntd';
import LoginForm from "../Login Form/LoginForm"
import { UserContext } from '../../hooks/UserContext';

interface Props {
    state: any; 
    HandleButton: any;
}

function Menu(props: Props) {
    const slideIn = {
        transform: (props.state)? 'translateX(0)': 'translateX(-100%)'
    }
    
    return ( 
        <>
            <div 
            style={{
                visibility:(props.state)? 'visible': 'hidden',
                backgroundColor: (props.state)? 'rgba(0, 0, 0, 0.3)': 'rgba(0, 0, 0, 0)',
                zIndex:'5'
            }} 
            onTouchStart = {props.HandleButton}  
            className={'bgShade '+ ((props.state)? '':'hidden')}
            />
            <div 
                className={"menu flex-column"}
                style={slideIn}>
                <div onClick={props.HandleButton}><HbombLogo/></div>
                <MenuAntd HandleButton = {props.HandleButton}/>
                <div className="menu-loginform">
                <LoginForm HandleButton={props.HandleButton}/>
                </div>
            </div>
        </>
        
     );
}

export default Menu;