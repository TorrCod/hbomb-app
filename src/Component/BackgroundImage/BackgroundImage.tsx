import {ReactComponent as BgImgTop} from './bgtop.svg'
import {ReactComponent as BgImgBot} from './bgbottom.svg'
import { useEffect } from 'react';
import { GlobalContext } from '../../hooks/GlobalContext';

function BackgroundImage() {
    const loadingDispatch = GlobalContext()
    useEffect(() => {
        const timer = setTimeout(() => loadingDispatch.dispatch({type:"loadingDone",payload:true}),800)
        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return ( 
        <div className="allbg">
            <BgImgTop className = 'bgTop'/>
            <BgImgBot className = 'bgBot'/>
        </div>
     );
}

export default BackgroundImage;