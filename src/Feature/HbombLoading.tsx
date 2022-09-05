import HbombLogo from "../Component/Logo/HbombLogo"

const HbombLoading = ({visible}:{visible:boolean}) => {
    return (
        (visible)?
        <div style={{'height':'100%'}} className='loginform-loadingpage'>
            <HbombLogo/>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
        :<></>
    )
}

export default HbombLoading