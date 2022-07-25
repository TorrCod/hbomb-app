import { RefObject, useEffect, useRef, useState } from "react";
import { useScroll, useScrolling } from "react-use";


const useAfterScroll = (ref:RefObject<HTMLElement>,callback:(arg:{x:number,y:number,isScrolling:boolean,isTouch:boolean}) => void):React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> => {
    const stateScroll = useScroll(ref);
    const isScrolling = useScrolling(ref);
    const [isTouch, setIsTouch] = useState(false)

    
    useEffect(() => {
        callback({...stateScroll,isTouch,isScrolling});
        return () => {
            // callback({x:0,y:0})
        }
    }, [stateScroll,isTouch,isScrolling])

    return {
        onTouchStart:() => {
            setIsTouch(true);
        },
        onTouchEnd:()=>{
            console.log('triggered');
            setIsTouch(false);
        }
    }
}

export default useAfterScroll;