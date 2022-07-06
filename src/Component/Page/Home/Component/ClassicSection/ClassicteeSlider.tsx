import { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { ButtonHandle, onSwipe } from '../../../../../api/utils';

interface SliderProps {
    imgData: any[];
}

function ClassicteeSlider(props: SliderProps) {
    const imgData = props.imgData
    const defaultPosition = Math.trunc(imgData.length/2);
    const [modelSlide , setModelSlide] = useState(defaultPosition);
    const value = 'translateX(-' + (100/imgData.length)*modelSlide + '%)';
    let onSwipeLocation = {start: 0, end: 0}

    const slideStyle = {
        transform: value
    }

    const nextSlide = () => {
        setModelSlide(ButtonHandle.carousel.next(modelSlide,imgData))
    }
    const previousSlide = () => {
        setModelSlide(ButtonHandle.carousel.previous(modelSlide,imgData))
    }

    return ( 
        <div 
            className="classictee-slider"
            onTouchStart= {(e) => {
                let startCord = e.nativeEvent.touches[0].clientX;
                onSwipeLocation.start = startCord;
            }}
            onTouchEnd = {(e) => {
                let endCord = e.nativeEvent.changedTouches[0].clientX;
                onSwipeLocation.end = endCord;
                onSwipe(onSwipeLocation, nextSlide, previousSlide)
            }}>
            <button  onClick={previousSlide} className='button aiIcons aiIcons-left'>
                <AiIcons.AiFillCaretLeft/>
            </button>
            <div className='classicSliderImage'  style={slideStyle}>
                {
                    imgData.map((child,index)=>{
                            return (
                                <div key = {"classicSlide" + index} className = "classicImage flex-center">
                                    {child.content}
                                </div>
                            )
                    })
                }
            </div>
            <button onClick={nextSlide} className='button aiIcons aiIcons-right'>
                <AiIcons.AiFillCaretRight/>
            </button>
            
        </div>
     );
}

export default ClassicteeSlider;