import { OLSitems } from "../Component/Page/Product/ShopProduct";

export type Orders = {
  date: Date;
  orderNumber: number;
  name: string;
  emailcontact: number;
  address: string;
  totalPrice: number;
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
