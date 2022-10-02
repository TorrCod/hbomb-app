import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./hooks/GlobalContext";
import {
  ClassicProvider,
  CollectionProvider,
  ModelProvider,
  OfferProvider,
} from "./hooks/HomeContext";
import { UserProvider } from "./hooks/UserContext";
import { ProductPageProvider } from "./hooks/ProductPageContext";
import "./MediaQuery.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <ProductPageProvider>
        <GlobalProvider>
          <OfferProvider>
            <CollectionProvider>
              <ModelProvider>
                <ClassicProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </ClassicProvider>
              </ModelProvider>
            </CollectionProvider>
          </OfferProvider>
        </GlobalProvider>
      </ProductPageProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
