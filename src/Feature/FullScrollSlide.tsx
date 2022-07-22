import React, {useRef,forwardRef,useImperativeHandle,useReducer} from "react"
import useSwipe from "../customhooks/useSwipe";
import './css/FullScrollSlide.css'

type FsChild = {
    children?: React.ReactNode;
    style?:React.CSSProperties;
    classname?:string;
    key?:string;
    slideSpeed?:number;
};

export type FsHandle = {
    GoTo:(key:string)=>void;
    setScroll:(onScroll:boolean) => void;
}

let onScrollReady = true;
const FullScrollSlide = forwardRef<FsHandle,FsChild>(({slideSpeed,style,children,classname},ref) => {
    const childrenLength = (children as string[]).length
    const fssChildRef = useRef<HTMLDivElement>(null);
    const scrollSlide = useScrollSlide(childrenLength);
    const readSwipe = scrollSlide.readSwipe;
    const goToSlide = scrollSlide.goToSlide;
    const state = scrollSlide.state;
    const nextSlide = scrollSlide.nextSlide;
    const prevSlide = scrollSlide.prevSlide;
    const shouldScroll = scrollSlide.shouldScroll;
    const swiper = useSwipe({
        onSwiping:(e) => {
            if(e?.direction === 'Up'){
                readSwipe(e.moveClientY)
                
            }else if(e?.direction === 'Down'){
                readSwipe(e.moveClientY)
            }
        },
        onSwiped:(e) => {
            const fullScrollElHeight = (fssChildRef.current?.clientHeight as number);
            if(e?.direction === 'Up'){
                nextSlide(fullScrollElHeight)
            }else if(e?.direction === 'Down'){
                prevSlide(fullScrollElHeight)
            }
        }
    })

    useImperativeHandle(ref,() => ({
        GoTo:(key:string)=>{
            for (const iterator of (children as JSX.Element[])) {
                const checkKey = iterator['key'] === key;
                if(checkKey){
                    const itemIndex = (children as JSX.Element[]).indexOf(iterator)
                    goToSlide(itemIndex,(fssChildRef.current?.clientHeight!))
                }
            }
        },
        setScroll:(onScroll:boolean) => {
            shouldScroll(onScroll);
        }
    }))

    const fsStyle:React.CSSProperties = {
        transform:'translatey('+state.translate+')',
        transitionDuration:state.transition,
        transitionTimingFunction:'ease-out'
    }

    const handleScroll: React.WheelEventHandler<HTMLDivElement> = (e) => {
        if(onScrollReady){
            const fullScrollElHeight = (fssChildRef.current?.clientHeight as number)
            onScrollReady = false;
            if(e.deltaY>0){
                nextSlide(fullScrollElHeight)
            }
            else {
                prevSlide(fullScrollElHeight)
            }
            const timer = setTimeout(() => {
                onScrollReady = true;
                clearTimeout(timer)
            },(slideSpeed)?slideSpeed:1000)
        }
    }

    const elemProps = (state.shouldscroll)?{
        onWheel:handleScroll,
        ...swiper.divProps,
    }:{}

    return (
        <div 
        {...elemProps}
        id='fullscroll-component'
        className={"fullscroll-container " + classname}>
            <div 
            ref={fssChildRef}
            style={{...fsStyle,...style}}  
            className="fullscroll-child">
                {children}

            </div>
        </div>
    )
})

export const FullScrollSection = ({children,style,classname}:FsChild) => {
    return (
        <div 
        style={{...style}}
        className={"fullscroll-section " + classname}>
            {children}
        </div>
    )
}

type ScrollState = {
    transition:string;
    translate:string;
    slide:number;
    currTranslate:number;
    shouldscroll:boolean;
}

const ScrollStateInit = {
    slide:0,
    currTranslate:0,
    transition:'0%',
    translate:'0.3s',
    shouldscroll:true
}

type ScrollAction = 
|{type:'shouldscroll',payload:boolean}
|{type:'setcurrentstate',payload:number}
|{type:'setslide',payload:number}
|{type:'onswipe',payload:string}
|{type:'onscroll',payload:string}

function ScrollReducer (state:ScrollState,action:ScrollAction):ScrollState{
    switch(action.type){
        case 'shouldscroll':
            return {...state,
                shouldscroll:action.payload
            };
        case 'setcurrentstate':
            return {...state,
                currTranslate:action.payload
            };
        case 'setslide':
            return {...state,
                slide:action.payload
            };
        case 'onscroll':
            return {...state,
                translate:action.payload,
                transition:'0.3s'
            };
        case 'onswipe':
            return {...state,
                translate:action.payload,
                transition:'0s'
            };
        default: return state
    }
}

type USR = {
    shouldScroll:(payload:boolean) => void;
    readSwipe:(value:number) => void;
    goToSlide:(givenSlide:number,elHeight:number) => void;
    state:ScrollState;
    prevSlide:(elHeight:number)=>void;
    nextSlide:(elHeight:number)=>void;
    resetScroll : () => void;
}

const useScrollSlide:(childrenLength:number) => USR = (childrenLength:number) => {
    const [state, dispatch] = useReducer(ScrollReducer, ScrollStateInit);

    const shouldScroll = (payload:boolean) => {
        dispatch({type:'shouldscroll',payload:payload})
    }

    const resetScroll = () => {
        handleTranslate(-1*state.slide)
    }

    const readSwipe = (value:number) => {
        dispatch({type:'onswipe',payload:-1*value+state.currTranslate+'px'})
    }

    const goToSlide = (givenSlide:number,elHeight:number) => {
        dispatch({type:'setslide',payload:givenSlide})
        const newTranslate =  handleTranslate(-1*givenSlide);
        const newCurTrans = (newTranslate/100)*elHeight;
        dispatch({type:'setcurrentstate',payload:newCurTrans})
    }

    const handleTranslate = (newval:number) => {
        const itemsize = 100/childrenLength;
        const newTranslate = newval*itemsize;
        dispatch({type:'onscroll',payload:newTranslate+'%'})
        return newTranslate;
    }

    const nextSlide = (elHeight:number) => {
        const newVal = state.slide+1
        if(newVal !== childrenLength){
            dispatch({type:'setslide',payload:newVal})

            const newTranslate =  handleTranslate(-1*newVal);
            const newCurTrans = (newTranslate/100)*elHeight;
            dispatch({type:'setcurrentstate',payload:newCurTrans})
        }else resetScroll()
    }

    const prevSlide = (elHeight:number) => {
        const newVal = state.slide-1
        if(newVal >= 0){
            dispatch({type:'setslide',payload:newVal})

            const newTranslate =  handleTranslate(-1*newVal);
            const newCurTrans = (newTranslate/100)*elHeight;
            dispatch({type:'setcurrentstate',payload:newCurTrans})
        }
        else resetScroll()
    }

    const value:USR = {
        shouldScroll,
        resetScroll,
        readSwipe,
        goToSlide,
        state,
        prevSlide,
        nextSlide
    }

    return value
}

export default FullScrollSlide;