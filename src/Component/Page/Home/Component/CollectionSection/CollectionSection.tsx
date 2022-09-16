import "./CollectionSection.css";
import { GlobalContext } from "../../../../../hooks/GlobalContext";
import { AiTwotoneEdit } from "react-icons/ai";
import { _UploadData } from "../../../../../api/CustomType";
import EditImageButton from "../../../../../Feature/EditImageAdmin";
import { UploadFile } from "antd/es/upload";

function CollectionSection() {
  const globalContext = GlobalContext();
  const globalDispatch = globalContext.dispatch;
  const collectoinData = globalContext.globalState.imageApi.CollectionData;

  const collectionImages = Object.keys(collectoinData).map((child, index) => {
    return (
      <div
        className={"collectionSection-box " + (index === 0 ? "highlight" : "")}
        key={"collectionSection-box-" + collectoinData[child].uid}
      >
        <img
          src={collectoinData[child].url}
          id={collectoinData[child].uid}
          className="image collection-image image-cover"
          alt=""
        />
      </div>
    );
  });

  return (
    <div className="positionRelative">
      <div className="allbg bgViolet bgright"></div>
      <div className="section collectionSection flex-column defaultPadding">
        <h1>COLLECTIONS</h1>
        <div className="collection-box-container">
          {collectionImages.length ? collectionImages : "test"}
          <EditImageButton
            icon={<AiTwotoneEdit />}
            onsave={(file, uploadedFile) => {
              globalDispatch({
                type: "setImageApi",
                payload: {
                  ...globalContext.globalState.imageApi,
                  CollectionData: uploadedFile as unknown as _UploadData,
                },
              });
            }}
            uploadPath={{
              cloudPath: "collection-image",
              databasePath: "collection-data",
            }}
            imageList={collectoinData as unknown as UploadFile[]}
            maxList={3}
          />
        </div>
      </div>
    </div>
  );
}

export default CollectionSection;
