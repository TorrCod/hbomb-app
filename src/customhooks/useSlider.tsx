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

    console.log('useSlide init');
    console.log('default val: '+defaultVal);
    

    const handleTranslate = (nextSlide:number) => {
        console.log('nextslide: ' + nextSlide);
        
        // let valueContent = 0;
        let valueContent = (nextSlide - defaultVal) * perItemSize
        // if(dataLength%2===0){
        //     let x =100/dataLength
        //     let y = x/2
        //     if(dataLength===6){
        //         valueContent = y-((-x)*(1-nextSlide+1))
        //     }else if(dataLength === 8){
        //         valueContent = y-((-x)*(1-nextSlide+2))
        //     }else{
        //         valueContent = y-((-x)*(1-nextSlide))
        //     }
        // }
        // else {
        //     let x =100/dataLength
        //     valueContent = -1*(nextSlide-defaultVal)*(x)
        // }
        console.log(valueContent);
        if(dataLength%2 === 0) {
            console.log('even mode');
            valueContent = evenModeTranslate+valueContent
            setTranslate(-1*(valueContent));
        }
        else setTranslate(-1*(valueContent));
    }

    const buttonNext = () => {
        console.log('next clicked');
        let newVal = slide+1;
        if(newVal>=dataLength){
            newVal = 0 ;
            setSlide(newVal)
        }
        else setSlide(newVal)
        handleTranslate(newVal)
    }

    const buttonPrev = () => {
        console.log('prev clicked');
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