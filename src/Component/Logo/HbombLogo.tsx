import {ReactComponent as Logo} from './Logo.svg'
import {Link} from 'react-router-dom'

function HbombLogo() {
  return (
    <div className="hbomblogo">
      <Link to="./"><Logo className='logo'/></Link>
    </div>
  )
}

export default HbombLogo