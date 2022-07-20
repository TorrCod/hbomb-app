// let touchStart: React.TouchEvent<HTMLDivElement>
// let touchEnd:React.TouchEvent<HTMLDivElement>
// let touchMove:React.TouchEvent<HTMLDivElement>

import { useRef } from "react";

const useSwipe:US = (opt:USopt) => {
    let touchStart = useRef<React.TouchEvent<HTMLDivElement>>()
    let touchEnd = useRef<React.TouchEvent<HTMLDivElement>>()
    let touchMove = useRef<React.TouchEvent<HTMLDivElement>>()
    let shouldSwipe = useRef<boolean>(true)

    const handleUseSwipe = (e: React.TouchEvent<HTMLDivElement>, callback?:UsRetCallback) => {
        // const moveClientY = touchStart!.changedTouches[0].clientY - e.changedTouches[0].clientY;
        // const moveClientX = - touchStart!.changedTouches[0].clientX + e.changedTouches[0].clientX;
        const moveClientY = touchStart.current!.changedTouches[0].clientY - e.changedTouches[0].clientY;
        const moveClientX = - touchStart.current!.changedTouches[0].clientX + e.changedTouches[0].clientX;

        const UpDir = (moveClientY > 0)?moveClientY:0
        const DownDir = (moveClientY < 0)?moveClientY:0
        const LeftDir = (moveClientX < 0)?moveClientX:0
        const RightDir = (moveClientX > 0)?moveClientX:0

        if((moveClientX && moveClientY)&& shouldSwipe){
            let direction:DIR = 'Down';

            // 1st Quadrant
            if(((UpDir && RightDir) || UpDir) ||RightDir ) {
                if(UpDir-RightDir < 0)direction='Right';
                else direction='Up'
            };

            // 2nd Quadrant 
            if((UpDir && LeftDir )|| LeftDir ) {
                if(LeftDir + UpDir < 0)direction='Left';
                else direction='Up'
            };

            // 3rd Quadrant 
            if((DownDir && LeftDir )|| DownDir) {
                if(LeftDir - DownDir < 0)direction='Left';
                else direction='Down'
            };

            // 4th Quadrant 
            if(DownDir && RightDir) {
                if(RightDir + DownDir > 0)direction='Right';
                else direction='Down'
            };

            const returnVal:USevent = {
                moveClientY,
                moveClientX,
                direction
            }
            callback!(returnVal)
        }
    }

    const shouldSwipeHandle = (payload:boolean) => {
        shouldSwipe.current = payload
    }

    const divProps:USdefaultprops = {
        onTouchStart:(e) => {
            // touchStart = e
            touchStart.current = e
        },
        onTouchEnd:(e) => {
            // touchEnd = e
            touchEnd.current = e
            // handleUseSwipe(touchEnd,opt.onSwiped)
            handleUseSwipe(touchEnd.current,opt.onSwiped)
        },
        onTouchMove:(e) => {
            // touchMove = e
            touchMove.current = e
            // handleUseSwipe(touchMove,opt.onSwiping)
            handleUseSwipe(touchMove.current,opt.onSwiping)
        }
    }

    return {divProps:divProps,handle:{shouldSwipeHandle}}
}

export default useSwipe;

type US = (opt:USopt)=>USret ;

type USret = {
    divProps:USdefaultprops;
    handle:{
        shouldSwipeHandle: (payload: boolean) => void,
    }
}

type USdefaultprops = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type UsRetCallback = (e?:USevent) => void;

type USopt = {
    onSwiping?:UsRetCallback,
    onSwiped?:UsRetCallback,
}

type USevent = {
    moveClientY:number;
    moveClientX:number;
    direction:DIR
}

type UShandle = {
    shouldSwipeHandle : (payload:boolean) => void;
}


type DIR = |'Left'|'Right'|'Up'|'Down'