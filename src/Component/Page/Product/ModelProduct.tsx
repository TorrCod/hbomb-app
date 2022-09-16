import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiTwotoneEdit,
} from "react-icons/ai";
import useSlider from "../../../customhooks/useSlider";
import "./css/ModelProduct.css";
import "./css/AddModelProductItems.css";
import { useEffect, useState } from "react";
import EditImageAdmin from "../../../Feature/EditImageAdmin";
import { UploadFile } from "antd";
import {
  deleteImageFromCloudStorage,
  getListImageFromCloud,
  isImageAlreadyExist,
  itemRefNotExistList,
  uploadToCloudStorage,
} from "../../../FirebaseService/CloudStorage";
import {
  clearPath,
  writeDatabase,
} from "../../../FirebaseService/RealtimeDatabase";
import ProductPageContext from "../../../hooks/ProductPageContext";
import { getBase64 } from "../../../api/utils";
import { RcFile } from "antd/lib/upload";

interface Props {
  children: React.ReactNode;
}

const ModelProduct = (props: Props) => {
  const imageDataLength = (props.children as {}[]).length;
  const [length, setLength] = useState(imageDataLength);
  const productPageContext = ProductPageContext();
  const imageState = productPageContext.state.landingPageImages;
  const updateImageState = productPageContext.updateProductLandingPage;

  useEffect(() => {
    setLength(imageDataLength);
  }, [imageDataLength]);

  const { translate, buttonNext, buttonPrev } = useSlider(length);

  const slideStyle: React.CSSProperties = {
    transform: "translatex(" + translate + "%)",
  };

  const editOncancel = () => {};

  const editOnSave = async (imageList: UploadFile<any>[]) => {
    //add base64 url to image url
    for (const image of imageList) {
      if (!image.url)
        image.url = await getBase64(image.originFileObj as RcFile);
    }

    //update state
    updateImageState(imageList);

    //Upload Images from imageList to Cloud if image not exit:
    for (const file of imageList) {
      const isImageExist = await isImageAlreadyExist(
        "productlandingpage",
        file
      );
      if (!isImageExist) {
        await uploadToCloudStorage(file, "productlandingpage");
      }
    }

    // Delete Images from Cloud if not exist in imagelist:
    const itemRefList = await itemRefNotExistList(
      "productlandingpage",
      imageList
    );
    for (const itemRef of itemRefList) {
      await deleteImageFromCloudStorage(undefined, itemRef);
    }

    // clear productlandingpage data in db:
    await clearPath("productlandingpage");

    //Get the links of images from cloud
    await getListImageFromCloud("productlandingpage").then((response) => {
      const urlList = response.urlList;
      for (const url of urlList) {
        const index = response.urlList.indexOf(url);
        const name = response.MetaDatalist[index].name;
        const itemToWrite: UploadFile = {
          uid: name,
          url: url,
          name: name,
        };
        writeDatabase("productlandingpage/" + name, itemToWrite);
      }
    });
  };

  const editOnChange = () => {};

  return (
    <div className="modelproduct flex-center">
      <div className="flex-center">
        <AiFillCaretLeft
          className="aiIcons aiIcons-left"
          onClick={buttonPrev}
        />

        <div style={slideStyle} className="modelproduct-container">
          {props.children}
        </div>

        <AiFillCaretRight
          onClick={buttonNext}
          className="aiIcons aiIcons-right"
        />

        <EditImageAdmin
          onCancel={editOncancel}
          onsave={editOnSave}
          onchange={editOnChange}
          icon={<AiTwotoneEdit />}
          imageList={imageState}
        />
      </div>
    </div>
  );
};

export const ModelProductItems = ({
  children,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="modelproduct-items flex-center">
      <div>{children}</div>
    </div>
  );
};

export default ModelProduct;
