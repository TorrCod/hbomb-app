import './App.less';
import {Route, Routes} from 'react-router-dom'
import Home from './Component/Page/Home/Home';
import BackgroundImage from './Component/BackgroundImage/BackgroundImage';
import NavBar from './Component/NavBar/NavBar';
import AboutUs from './Component/Page/AboutUs/AboutUs';
import Product from './Component/Page/Product/Product';
import Footer from './Component/Footer/Footer';
import { useEffect} from 'react';
import { GlobalContext } from './hooks/GlobalContext';
import HbombLogo from './Component/Logo/HbombLogo';
import { UserContext } from './hooks/UserContext';

const App = () => {
  // Get The Images from firebase storage:
  const globalContext = GlobalContext()
  const userLoading = UserContext().state.UserState.isLoading
  useEffect(() => {
    globalContext.startFetchingData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  // Render Components
  return (
      <div className="App">
        {(globalContext.globalState.viewLoadingPage)?<LoadingPage/>:null}
        {(!globalContext.globalState.onLoading)?
        <>
          {(userLoading)?<UserLoadingPage/>:null}
          <BackgroundImage/>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/product' element={<Product/>}/>
          </Routes>
          <Footer/>
        </>:null}
      </div>
  );
}
const UserLoadingPage = () => {
  return(
      <div className='loginform-loadingpage'>
        <HbombLogo/>
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
  )
}

const LoadingPage = () => {
  const globalContext = GlobalContext()
  const loadingState = globalContext.globalState
  useEffect(() => {
    if(loadingState.loadingSlideDown){
      const timer = setTimeout(() => {globalContext.dispatch({type:"loadingPage"})},400)
      return ()=>clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loadingState.loadingSlideDown])
  let slideOut =  {
    transform: "translatey(100%)"
  }
  return (
    <div className="loadingpage flex-center" style={(!loadingState.loadingSlideDown)?{}:slideOut}>
      <HbombLogo/>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div> 
  )
}

export default App;
