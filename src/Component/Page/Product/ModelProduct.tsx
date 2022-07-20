import { AiFillCaretLeft, AiFillCaretRight} from 'react-icons/ai';
import useSlider from '../../../customhooks/useSlider';
import './css/ModelProduct.css';

interface Props {
  children:React.ReactNode
}

const ModelProduct = (props:Props) => {
  const imageDataLength = (props.children as {}[]).length;
  const {translate,buttonNext,buttonPrev} = useSlider(imageDataLength);
  
  const slideStyle: React.CSSProperties = {
    transform:'translatex('+translate+'%)'
  }

  return (
    <div className='modelproduct flex-center'>
      <div className="flex-center">
        <AiFillCaretLeft  
          className='aiIcons aiIcons-left'
          onClick={buttonPrev}
        />
        <div style={slideStyle} className='modelproduct-container'>
          {props.children}
        </div>
        <AiFillCaretRight 
          onClick={buttonNext}
          className='aiIcons aiIcons-right'
        />
      </div>
    </div>
  )
}

export const ModelProductItems = ({children}:React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="modelproduct-items flex-center">
      {children}
    </div>
  )
}

export default ModelProduct
