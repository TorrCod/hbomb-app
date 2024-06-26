import { OLSitems } from "../Component/Page/Product/ShopProduct";

export type Orders = {
  date: string;
  orderNumber: number;
  name: string;
  emailcontact: string;
  address: string;
  totalPrice: number;
  status: "pending" | "success";
  itemOrdered: {
    itemCount: number;
    item: OLSitems;
  }[];
};
//----Order Details------//
//----OfferSection----//
export type _OfferContent_Data = {
  icons: any;
  content: string;
};
export type _OfferContentTypes = {
  firstBox: _OfferContent_Data;
  secondBox: _OfferContent_Data;
  thirdBox: _OfferContent_Data;
};

//----OfferSection----//
//---------NewApi------//
export interface _UploadData
  extends Record<
    string,
    {
      uid: string;
      url: string;
      name: string;
    }
  > {}
export type _ImageDataDb = {
  ModelData: _UploadData;
  CollectionData: _UploadData;
  ClassicData: _UploadData;
  AboutUs: string;
};
export type _Path = "ImageDataApi/" | "User/" | "OfferData/";

//---------NewApi------//
//---------Collection------//
export type _ClassicState = {};
//---------Collection------//
//--------- ImageData------//
export type _imageData = {
  modelImgData: _uploadFile[];
  classicImgData: _uploadFile[];
  collectionImgData?: _uploadFile[];
};

export const _imageData_init = {
  modelImgData: [],
  classicImgData: [],
};

export type _uploadFile = {
  id: string;
  name: string;
  url: string;
  originFileObj?: Blob | Uint8Array | ArrayBuffer | any;
  base64?: any;
};

export const _uploadFile_init_: _uploadFile = {
  id: "",
  name: "",
  url: "",
  originFileObj: {},
};
//---------ImageData------//
