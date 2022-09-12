import React, {forwardRef, useEffect, CSSProperties, useState, ReactNode} from "react"
import { debounce } from "../api/utils";
import './css/FullScrollSlide.css'

type FsChild = {
    children?: React.ReactNode;
    style?:React.CSSProperties;
    classname?:string;
    key?:string;
    slideSpeed?:number;
    stateShouldScroll?:boolean;
    selectedRef?:React.RefObject<HTMLDivElement>[]
};

export type FsHandle = {
    GoTo:(key:string)=>void;
    setScroll:(onScroll:boolean) => void;
}

const FullScrollSlide = forwardRef<FsHandle,FsChild>(({children,classname,selectedRef},ref) => {
    const {
        scrollStyle,
        updateScroll,
        scroll
    } = useFullScroll();
    
    const onWheelHandler:React.WheelEventHandler<HTMLDivElement> = (e) => {
        const {deltaY} = e;
        
        debounce(() => {
            const child:ReactNode[] = [];
            const childList =  child.concat(children)
            if(deltaY > 0) {
                const nextScroll = scroll + 1;
                const isOnMax = nextScroll === childList.length;
                if (!isOnMax) updateScroll(nextScroll);
            }
            else {
                const nextScroll = scroll - 1;
                const isOnMin = nextScroll < 0;
                if (!isOnMin) updateScroll(nextScroll);
            }
        }, 100)
    }

    return (
        <div 
        onWheel={onWheelHandler}
        id='fullscroll-component'
        className={"fullscroll-container " + classname}>
            <div 
            style={{'transitionDuration':'0.3s',...scrollStyle}}
            className="fullscroll-child">
                {children}
            </div>
        </div>
    )
})

export const FullScrollSection = forwardRef<HTMLDivElement,FsChild>(({children,style,classname},ref) => {
    return (
        <div 
        ref={ref}
        style={{...style}}
        className={"fullscroll-section " + classname}>
            {children}
        </div>
    )
})

const useFullScroll = () => {
    const [scroll, setScroll] = useState<number>(0);
    const [scrollStyle, setScrollStyle] = useState<CSSProperties>({})

    useEffect(() => {
      const style = scroll * -100;
      setScrollStyle({'top':style+'%'})
    }, [scroll])
    
    const updateScroll = (payload:number) => {
        setScroll(payload)
    }

    return {scrollStyle,updateScroll,scroll}
}

export default FullScrollSlide;