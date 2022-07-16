import { AiFillCaretLeft, AiFillCaretRight} from 'react-icons/ai';
import { _imageData, _uploadFile } from '../../../api/CustomType';
import useSlider from '../../../customhooks/useSlider';
import './css/ModelProduct.css';

interface Props {
  imageData:_uploadFile[]
}

const ModelProduct = (props:Props) => {
  const imageDataLength = props.imageData.length;
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
          <div className="modelproduct-items flex-center">mp1</div>
          <div className="modelproduct-items flex-center">mp2</div>
          <div className="modelproduct-items flex-center">mp3</div>
          <div className="modelproduct-items flex-center">mp4</div>
          <div className="modelproduct-items flex-center">mp5</div>
          <div className="modelproduct-items flex-center">mp6</div>
        </div>
        <AiFillCaretRight 
          onClick={buttonNext}
          className='aiIcons aiIcons-right'
        />
      </div>
    </div>
  )
}


export default ModelProduct
