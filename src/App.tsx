import "./App.less";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Page/Home/Home";
import BackgroundImage from "./Component/BackgroundImage/BackgroundImage";
import NavBar from "./Component/NavBar/NavBar";
import AboutUs from "./Component/Page/AboutUs/AboutUs";
import ProductPage, {
  CheckOutPage,
  StorePage,
} from "./Component/Page/Product/ProductPage";
import { useEffect } from "react";
import { GlobalContext } from "./hooks/GlobalContext";
import HbombLogo from "./Component/Logo/HbombLogo";
import { UserContext } from "./hooks/UserContext";
// import { auth } from './api/utils';
import ProductPageContext from "./hooks/ProductPageContext";
import { Dashboard } from "./Component/Page/Dashboard/Dashboard";
import { auth } from "./FirebaseService/FirebaseConfig";
import { onChangeData } from "./FirebaseService/RealtimeDatabase";

//-- Test Mode -- //
// import ProductPage from './Component/Page/Product/__test__/ProductPage';

const App = () => {
  // Get The Images from firebase storage:
  const globalContext = GlobalContext();
  const userContext = UserContext();
  const userLoading = UserContext().state.UserState.isLoading;
  const userCtxDispatch = userContext.dispatch;
  const productPageContext = ProductPageContext();

  useEffect(() => {
    globalContext.startFetchingData();
    productPageContext.fetchProductLandingPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    userCtxDispatch({
      type: "signin",
      payload: auth.currentUser ? true : false,
    });

    if (auth.currentUser !== null) {
      onChangeData("order-list", (val) => {
        const orderList = Object.values(val);
        userCtxDispatch({ type: "updateorderlist", payload: orderList });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);

  // Render Components
  return (
    <div className="App">
      {globalContext.globalState.viewLoadingPage ? <LoadingPage /> : null}
      {!globalContext.globalState.onLoading ? (
        <>
          {userLoading ? <UserLoadingPage /> : null}
          <BackgroundImage />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/product" element={<ProductPage />}>
              <Route path="" element={<StorePage />} />
              <Route path="checkout" element={<CheckOutPage />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </>
      ) : null}
    </div>
  );
};

const UserLoadingPage = () => {
  return (
    <div className="loginform-loadingpage">
      <HbombLogo />
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const LoadingPage = () => {
  const globalContext = GlobalContext();
  const loadingState = globalContext.globalState;
  useEffect(() => {
    if (loadingState.loadingSlideDown) {
      const timer = setTimeout(() => {
        globalContext.dispatch({ type: "loadingPage" });
      }, 400);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingState.loadingSlideDown]);
  let slideOut = {
    transform: "translatey(100%)",
  };
  return (
    <div
      className="loadingpage flex-center"
      style={!loadingState.loadingSlideDown ? {} : slideOut}
    >
      <HbombLogo />
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default App;
