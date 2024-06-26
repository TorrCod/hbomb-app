import "./ModelSection.css";
import * as AiIcons from "react-icons/ai";
import { onSwipe } from "../../../../../api/utils";
import { Button } from "antd";
import HbombLogo from "../../../../Logo/HbombLogo";
import { GlobalContext } from "../../../../../hooks/GlobalContext";
import { ModelContext } from "../../../../../hooks/HomeContext";
import { UploadFile } from "antd/es/upload";
import { UserContext } from "../../../../../hooks/UserContext";
import React from "react";
import { Link } from "react-router-dom";
import EditImageButton from "../../../../../Feature/EditImageAdmin";
import { _UploadData } from "../../../../../api/CustomType";

function ModelSection() {
  const userContext = UserContext();
  const modelContext = ModelContext();
  const globalContext = GlobalContext();
  const globalDispatch = globalContext.dispatch;
  const isLogin = userContext.state.UserState.checkCredential;
  const modelSectionState = modelContext.state.ModelSectionState;
  const modelData = globalContext.globalState.imageApi.ModelData;
  const modelSlide = modelSectionState.modelSlide;
  let onSwipeLocation = { start: 0, end: 0 };
  const modelImagelist: UploadFile[] = modelData as unknown as UploadFile[];
  const imageActive = {
    transform: "scale(1.3)",
    zIndex: "5",
  };

  return (
    <div className="section flex-column flex-center">
      <div
        className="slider"
        onTouchStart={(e) => {
          let startCord = e.nativeEvent.touches[0].clientX;
          onSwipeLocation.start = startCord;
        }}
        onTouchEnd={(e) => {
          let endCord = e.nativeEvent.changedTouches[0].clientX;
          onSwipeLocation.end = endCord;
          onSwipe(
            onSwipeLocation,
            modelContext.modelSlideHandle.handlePrevious,
            modelContext.modelSlideHandle.handleNext
          );
        }}
      >
        <button
          onClick={modelContext.modelSlideHandle.handleNext}
          className="button aiIcons aiIcons-left"
        >
          <AiIcons.AiFillCaretLeft />
        </button>
        <div
          className="dummy-box"
          style={{
            transform: "translateX(" + modelSectionState.effectValue + "%)",
          }}
        >
          {Object.keys(modelData).map((child, index) => {
            return (
              <div
                className="model-img-item flex-center"
                key={"" + modelData[child].uid + index}
                style={modelSlide === index ? imageActive : {}}
              >
                <img
                  src={modelData[child].url}
                  id={modelData[child].uid}
                  className="image model-image"
                  alt={modelData[child].name}
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={modelContext.modelSlideHandle.handlePrevious}
          className="button aiIcons aiIcons-right"
        >
          <AiIcons.AiFillCaretRight />
        </button>
        <div className="model-navigator"></div>
        {isLogin ? (
          <div className="button model-editbutton">
            <EditImageButton
              icon={<AiIcons.AiTwotoneEdit />}
              onsave={(file, uploadedFile) => {
                globalDispatch({
                  type: "setImageApi",
                  payload: {
                    ...globalContext.globalState.imageApi,
                    ModelData: uploadedFile as unknown as _UploadData,
                  },
                });
              }}
              uploadPath={{
                cloudPath: "model-image",
                databasePath: "model-data",
              }}
              onCancel={() => { }}
              onchange={() => { }}
              imageList={modelImagelist}
            />
          </div>
        ) : null}
      </div>
      <div className="model-logo">
        <HbombLogo />
      </div>
      <div className="model-button">
        <Link
          to="/product"
          onClick={() => globalDispatch({ type: "onChangeTab", payload: 1 })}
        >
          <Button type="primary" size="large">
            ONLINE SHOP
          </Button>
        </Link>
        <Link
          to="/aboutus"
          onClick={() => globalDispatch({ type: "onChangeTab", payload: 2 })}
        >
          <Button type="default" size="large">
            ABOUT US
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default React.memo(ModelSection);
