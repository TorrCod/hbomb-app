import './Footer.css'
import * as aiIcons from 'react-icons/ai'
import {FaTiktok} from 'react-icons/fa'
import {BsFillMapFill} from 'react-icons/bs'
import HbombLogo from '../Logo/HbombLogo'

function Footer() {
    
    const footerContent = [
        {
            title: "GET IN TOUCH",
            className: "footer-contact",
            content: [
                <>
                    <aiIcons.AiFillContacts/>
                    <div className='footerContent-item'>Contact Number</div>
                </>,
                <>
                    <aiIcons.AiTwotoneMail/>
                    <div className='footerContent-item'>Email@email.com</div>
                </>
            ]
        },
        {
            title: "ADDRESS",
            className: "footer-contact",
            content: [
                <>
                    <BsFillMapFill/>
                    <div className='footerContent-item'>My Address</div>
                </>
            ]
        },
        {
            title: "SERVICES",
            className: "footer-contact",
            content: [
                <>
                    <div className='footerContent-item'>Deliver</div>
                </>,
                <>
                    <div className='footerContent-item'>Clothing</div>
                </>,
                <>
                    <div className='footerContent-item'>Online Shop</div>
                </>
            ]
        }
    ]

    return ( 
        <footer className="flex-center defaultPadding flex-column">
            <HbombLogo/>
            {/* <FooterLogo className='footer-logo'/> */}
            <div className='footer-content'>
                {
                    footerContent.map((child, index) => {
                        return(
                            <div className={child.className} key = {'contactid '+ index}>
                                <div className='footerContent-title'>{child.title}</div>
                                {child.content.map((child,index) => {
                                    return(
                                        <div className='flex-center' key = {'footercontentid'+ index}>
                                            {child}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
            <div className='footer-social'>
                <aiIcons.AiTwotoneMail/>
                <FaTiktok/>
                <aiIcons.AiFillFacebook/>
                <aiIcons.AiFillContacts/>
                <BsFillMapFill/>
            </div>
            <p style={{color: 'rgb(173, 173, 173)'}}>© HBOMB CLOTHING</p>
        </footer>
     );
}

export default Footer;