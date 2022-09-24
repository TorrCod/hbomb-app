import "./OfferSection.css";
import { MdDeliveryDining } from "react-icons/md";
import { Dropdown, Button } from "antd";
import { GiClothes } from "react-icons/gi";
import { AiTwotoneEdit } from "react-icons/ai";
import TextArea from "antd/lib/input/TextArea";
import { OfferContext } from "../../../../../hooks/HomeContext";
import { _OfferContentTypes } from "../../../../../api/CustomType";
import { GlobalContext } from "../../../../../hooks/GlobalContext";
import { UserContext } from "../../../../../hooks/UserContext";
import { FaHandsHelping } from "react-icons/fa";

function OfferSection() {
  const userContext = UserContext();
  const globalContext = GlobalContext();
  const offerContent = globalContext.globalState.offerSectionApi;
  const isLogin = userContext.state.UserState.checkCredential;

  return (
    <div className="positionRelative">
      <div className="allbg bgViolet bgleft"></div>
      <div className="section offerSection flex-column defaultPadding">
        <h1 className="text-4xl font-semibold opacity-80">WE OFFER</h1>
        <div className="offerbox-container">
          {Object.keys(offerContent).map((child, index) => {
            const mainObj = offerContent[child as keyof _OfferContentTypes];
            const content = mainObj.content;
            // const icons = mainObj.icons

            return (
              <div
                className="offerSection-box"
                key={"offerSection-box " + index}
              >
                {isLogin ? (
                  <EditButtons child={child} content={content} />
                ) : null}
                <div className="icon offerSection-box-icon">
                  {index === 0 ? (
                    <MdDeliveryDining />
                  ) : index === 1 ? (
                    <GiClothes />
                  ) : (
                    <FaHandsHelping />
                  )}
                </div>
                <div className="content offerSection-box-content">
                  {content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const EditButtons = (props: { child: string; content: string }) => {
  const offerContext = OfferContext();
  const handleChange = offerContext.handleChange;
  const handleVisible = offerContext.handleDropDown.onVisibleChange;
  return (
    <>
      <div className="buttons offerSection-box-content-buttons">
        <Dropdown
          overlay={
            <TextArea
              value={props.content}
              onChange={(event) => {
                handleChange(event, props.child);
              }}
              rows={4}
              placeholder="maxLength is 32"
              maxLength={130}
            />
          }
          placement="bottomLeft"
          onVisibleChange={handleVisible}
          arrow
        >
          <Button
            type="primary"
            shape="round"
            icon={<AiTwotoneEdit />}
            size={"large"}
          />
        </Dropdown>
      </div>
    </>
  );
};

export default OfferSection;
