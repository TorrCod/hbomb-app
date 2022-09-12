import { useState } from "react"

const useSlider = (dataLength:number) => {
    const defaultVal = Math.trunc(dataLength/2);
    const perItemSize = 100/dataLength;
    const evenModeTranslate = perItemSize/2;
    const [slide, setSlide] = useState(defaultVal);
    const [translate, setTranslate] = useState(
        (dataLength%2 === 0)?
        evenModeTranslate:0
    );


    const handleTranslate = (nextSlide:number) => {
        let valueContent = (nextSlide - defaultVal) * perItemSize
        if(dataLength%2 === 0) {
            valueContent = evenModeTranslate+valueContent
            setTranslate(-1*(valueContent));
        }
        else setTranslate(-1*(valueContent));
    }

    const buttonNext = () => {
        let newVal = slide+1;
        if(newVal>=dataLength){
            newVal = 0 ;
            setSlide(newVal)
        }
        else setSlide(newVal)
        handleTranslate(newVal)
    }

    const buttonPrev = () => {
        let newVal = slide-1;
        if(newVal<0){
            newVal = dataLength-1
            setSlide(newVal)
        }
        else setSlide(newVal)
        handleTranslate(newVal)
    }
    return {translate,buttonNext,buttonPrev}
}

export default useSlider