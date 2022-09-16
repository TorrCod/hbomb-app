import { getBase64, onSwipe } from "../../../../../api/utils";
import { GlobalContext } from "../../../../../hooks/GlobalContext";
import "./ClassicteeSection.css";
import * as AiIcons from "react-icons/ai";
import { ClassicContext } from "../../../../../hooks/HomeContext";
import { Button, Modal, Space, Upload, UploadFile, UploadProps } from "antd";
import { Content } from "antd/lib/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import { UserContext } from "../../../../../hooks/UserContext";
import EditImageButton from "../../../../../Feature/EditImageAdmin";

function ClassicteeSection() {
  const globalContext = GlobalContext();
  const classicContext = ClassicContext();
  const classicData = globalContext.globalState.imageApi.ClassicData;
  const currentSlide = classicContext.state.classicSlide;

  let backgStyle: object = {};

  for (const iterator of Object.keys(classicData)) {
    const index = Object.keys(classicData).indexOf(iterator);
    if (index === currentSlide) {
      const url = classicData[iterator].url;
      backgStyle = {
        backgroundImage: "url(" + url + ")",
      };
    }
  }

  return (
    <div className="section classicteeSection " style={backgStyle}>
      <ClassicteeSlider />
      {/* <div className='dotNavigator'></div> */}
    </div>
  );
}

function ClassicteeSlider() {
  const globalContext = GlobalContext();
  const globalDispatch = globalContext.dispatch;
  const classicContext = ClassicContext();
  const classicSlide = classicContext.state.classicSlide;
  const clasicData = globalContext.globalState.imageApi.ClassicData;
  const classicLength = Object.keys(clasicData).length;
  const isLogin = UserContext().state.UserState.checkCredential;
  const value = "translateX(-" + (100 / classicLength) * classicSlide + "%)";
  let onSwipeLocation = { start: 0, end: 0 };
  const slideStyle = {
    transform: value,
  };

  return (
    <>
      <div
        className="classictee-slider"
        onTouchStart={(e) => {
          let startCord = e.nativeEvent.touches[0].clientX;
          onSwipeLocation.start = startCord;
        }}
        onTouchEnd={(e) => {
          let endCord = e.nativeEvent.changedTouches[0].clientX;
          onSwipeLocation.end = endCord;
          onSwipe(
            onSwipeLocation,
            classicContext.nextClassSlide,
            classicContext.previousClassSlide
          );
        }}
      >
        <button
          onClick={classicContext.previousClassSlide}
          className="button aiIcons aiIcons-left"
        >
          <AiIcons.AiFillCaretLeft />
        </button>
        <div className="classicSliderImage" style={slideStyle}>
          {Object.keys(clasicData).map((child, index) => {
            return (
              <div
                key={"classicSlide" + index}
                className="classicImage flex-center"
              >
                <img
                  src={clasicData[child].url}
                  id={clasicData[child].uid}
                  className="image collection-image"
                  alt=""
                />
              </div>
            );
          })}
        </div>

        <EditImageButton
          icon={<AiIcons.AiTwotoneEdit />}
          onsave={(file, uploadedFile) => {
            globalDispatch({
              type: "setImageApi",
              payload: {
                ...globalContext.globalState.imageApi,
                ClassicData: uploadedFile as any,
              },
            });
          }}
          uploadPath={{
            cloudPath: "classic-image",
            databasePath: "classic-data",
          }}
          onCancel={() => {}}
          onchange={() => {}}
          imageList={clasicData as unknown as UploadFile[]}
        />

        <button
          onClick={classicContext.nextClassSlide}
          className="button aiIcons aiIcons-right"
        >
          <AiIcons.AiFillCaretRight />
        </button>
        {/* {isLogin ? <SliderSetting /> : null} */}
      </div>
      <div className="classicteeSection-description">
        <div className="title classicteeSection-description-title">
          CLASSIC TEE
        </div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor nemo
          nesciunt neque ex fugit. Ipsum qui, libero neque labore aliquid fuga
          nam accusamus dicta quod aspernatur, earum sit iusto culpa.
        </p>
      </div>
    </>
  );
}

export default ClassicteeSection;
