import { createContext, useContext, useReducer } from "react";
import {
  _imageData,
  _ImageDataDb,
  _OfferContentTypes,
  _UploadData,
} from "../api/CustomType";
import { getListImageFromCloud } from "../FirebaseService/CloudStorage";
import { readData } from "../FirebaseService/RealtimeDatabase";
import ProductPageContext from "./ProductPageContext";

const newImageSet: _imageData = {
  collectionImgData: [],
  classicImgData: [],
  modelImgData: [],
};

export type GlobalStateContent = {
  updateImageApi: () => void;
  UpdateNewData: (file: _imageData, itemKey: keyof _imageData) => void;
  startFetchingData: () => void;
  globalState: GlobalState;
  updateImageData: (images: _imageData) => void;
  dispatch: React.Dispatch<GlobalAction>;
};
export type GlobalState = {
  navActive: number;
  offerSectionApi: _OfferContentTypes;
  imageApi: _ImageDataDb;
  imageApiDefault: _imageData;
  loadingSlideDown: boolean;
  onLoading: boolean;
  viewLoadingPage: boolean;
  ImageDataApi: _imageData;
};
export type GlobalAction =
  | { type: "onChangeTab"; payload: number }
  | { type: "setOfferApi"; payload: _OfferContentTypes }
  | { type: "setImageApi"; payload: _ImageDataDb }
  | { type: "setdefault"; payload: _imageData }
  | { type: "loadingDone"; payload?: boolean }
  | { type: "loadingPage" }
  | { type: "onLoading"; payload: _imageData };

export type ImageType = {
  id: string;
  name: string;
  url: string;
  content: string;
  originFileObj?: object | any;
}[];
export const globalReducerInit: GlobalState = {
  navActive: 0,
  offerSectionApi: {
    firstBox: { icons: "", content: "" },
    secondBox: { icons: "", content: "" },
    thirdBox: { icons: "", content: "" },
  },
  imageApi: { ModelData: {}, ClassicData: {}, CollectionData: {} },
  imageApiDefault: {
    modelImgData: [],
    classicImgData: [],
    collectionImgData: [],
  },
  loadingSlideDown: false,
  viewLoadingPage: true,
  onLoading: true,
  ImageDataApi: { modelImgData: [], classicImgData: [], collectionImgData: [] },
};
const GlobalReducer = (
  state: GlobalState,
  action: GlobalAction
): GlobalState => {
  switch (action.type) {
    case "onChangeTab":
      return { ...state, navActive: action.payload };
    case "setOfferApi":
      return { ...state, offerSectionApi: action.payload };
    case "setImageApi":
      return { ...state, imageApi: action.payload };

    case "setdefault":
      const imageApiDefault: _imageData = { ...state.imageApiDefault };
      for (const [key, value] of Object.entries(action.payload)) {
        if (value.length) {
          imageApiDefault[key as keyof _imageData] = value;
        }
      }
      return {
        ...state,
        imageApiDefault: imageApiDefault,
      };
    case "loadingDone":
      return action.payload === undefined || null
        ? { ...state, onLoading: false }
        : { ...state, loadingSlideDown: action.payload! };
    case "onLoading":
      let result = { ...state };
      for (const [key, value] of Object.entries(action.payload)) {
        if (value.length) {
          (result.ImageDataApi as any)[key] = value;
        }
      }
      return {
        ...state,
        ImageDataApi: result.ImageDataApi,
      };
    case "loadingPage":
      return { ...state, viewLoadingPage: false };
  }
};

export const globalStateContentinit: GlobalStateContent = {
  updateImageApi: () => { },
  UpdateNewData: () => { },
  updateImageData: () => { },
  startFetchingData: () => { },
  globalState: { ...globalReducerInit },
  dispatch: () => { },
};
const useGlobalContext = createContext<GlobalStateContent>({
  ...globalStateContentinit,
});
export function GlobalProvider({ children }: any) {
  const [state, dispatch] = useReducer(GlobalReducer, { ...globalReducerInit });
  const productPageCtx = ProductPageContext();

  const UpdateNewData = (file: _imageData, itemKey: keyof _imageData) => {
    for (const key in file) {
      const objChild = file[key as keyof _imageData];
      if (objChild?.length) {
        for (const iterator of objChild) {
          newImageSet[itemKey]?.push(iterator);
        }
      }
    }
  };

  const startFetchingData = async () => {
    updateOfferData();
    updateImageApi();
    productPageCtx.onlineShopHandler.fetchOnlineShopData();
  };

  const updateOfferData = () => {
    readData("offer-data").then((res) => {
      dispatch({ type: "setOfferApi", payload: res });
    });
  };

  const updateImageApi = async () => {
    // await getListImageFromCloud('model-image')
    // .then((res)=>{
    //    res.urlList.forEach((val,index)=>{
    //         const file:_UploadData = state.imageApi.ModelData
    //         file[index] = {'url':val,'id':res.MetaDatalist[index].name,'name':res.MetaDatalist[index].name,content:''}

    //         dispatch({type:'setImageApi',payload:{...state.imageApi,ModelData:file}})
    //     })
    // })
    let data: _ImageDataDb = { ...state.imageApi }

    await readData("model-data").then((res) => {
      data['ModelData'] = res;
      if (res === null) {
        data['ModelData'] = [] as any;
      }
      console.log(data);

      dispatch({ type: "setImageApi", payload: data });
    });

    // await getListImageFromCloud("collection-image").then((res) => {
    //   res.urlList.forEach((val, index) => {
    //     const file: _UploadData = state.imageApi.CollectionData;
    //     file[index] = {
    //       url: val,
    //       uid: res.MetaDatalist[index].name,
    //       name: res.MetaDatalist[index].name,
    //     };

    //     dispatch({
    //       type: "setImageApi",
    //       payload: { ...state.imageApi, CollectionData: file },
    //     });
    //   });
    // });

    await readData('collection-data').then((res) => {
      data['CollectionData'] = res;
      if (res === null) {
        data['CollectionData'] = [] as any;
      }
      dispatch({ type: "setImageApi", payload: data });
    });

    await getListImageFromCloud("classic-image").then((res) => {
      res.urlList.forEach((val, index) => {
        const file: _UploadData = state.imageApi.ClassicData;
        file[index] = {
          url: val,
          uid: res.MetaDatalist[index].name,
          name: res.MetaDatalist[index].name,
        };

        dispatch({
          type: "setImageApi",
          payload: { ...state.imageApi, ClassicData: file },
        });
      });
    });

    dispatch({ type: "loadingDone" });
  };

  const updateImageData = (images: _imageData) => {
    dispatch({ type: "onLoading", payload: images });
  };

  const value: GlobalStateContent = {
    updateImageApi,
    UpdateNewData,
    startFetchingData,
    globalState: state,
    updateImageData,
    dispatch,
  };

  return (
    <useGlobalContext.Provider value={value}>
      {children}
    </useGlobalContext.Provider>
  );
}

export const GlobalContext = () => useContext(useGlobalContext);
