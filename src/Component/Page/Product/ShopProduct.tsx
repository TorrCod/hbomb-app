import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "./css/OnlineShopSwipe.css";
import { useWindowSize } from "react-use";
import { Button, Divider, Input, Space, UploadFile } from "antd";
import useHoverStyle from "../../../customhooks/useHoverStyle";
import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlinePlus,
  AiTwotoneEdit,
} from "react-icons/ai";
import AdminPreviledge from "../../../Feature/AdminPreviledge";
import OnDelete from "../../../Feature/OnDelete";
import { BsFillBackspaceFill, BsFillTrashFill } from "react-icons/bs";
import { MdDriveFileRenameOutline } from "react-icons/md";
import "./css/ViewItems.css";
import TextArea from "antd/lib/input/TextArea";
import EditImageButton from "../../../Feature/EditImageAdmin";
import { debounce, getBase64 } from "../../../api/utils";
import { RcFile } from "antd/lib/upload";
import ModalAntD from "../../../Feature/ModalAntD";
import {
  getListImageFromCloud,
  uploadToCloudStorage,
} from "../../../FirebaseService/CloudStorage";
import { UserContext } from "../../../hooks/UserContext";
import HbombLoading from "../../../Feature/HbombLoading";
import AddtoCart from "../../../Feature/AddToCart";
import CheckOutBtn from "../../../Feature/CheckOutBtn";

const OnlineShopSwipe = ({ children, autoplay, onAddCategory }: DivProp) => {
  const OLSref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isLogin = UserContext().state.UserState.checkCredential;

  useEffect(() => {
    const AiButtonLeft = document.getElementsByClassName("-aiIcons-left")[0];
    const AiButtonRight = document.getElementsByClassName("-aiIcons-right")[0];
    OLSref.current
      ?.getElementsByClassName("swiper-button-next")[0]
      .replaceChildren(AiButtonRight);
    OLSref.current
      ?.getElementsByClassName("swiper-button-prev")[0]
      .replaceChildren(AiButtonLeft);
    return () => {};
  }, []);

  const viewCount = width < 500 ? 1 : width < 1150 ? 2 : 3;

  const defaultCategory: CatItem = {
    categoryTitle: "Category Name",
    categoryId: "generate-to-database",
    itemCount: 0,
    items: [],
  };

  return (
    <div ref={OLSref} className="olsp-container">
      <AiFillCaretRight className="-aiIcons -aiIcons-right" />
      <AiFillCaretLeft className="-aiIcons -aiIcons-left" />
      <Swiper
        autoplay={autoplay ? autoplay : true}
        modules={[Navigation, Autoplay]}
        slidesPerView={viewCount}
        spaceBetween={30}
        navigation={true}
        className="olsp-swiper"
        {...(width <= 500
          ? {
              centeredSlides: true,
              init: true,
              initialSlide: 1,
            }
          : {
              centeredSlides: false,
              init: false,
              initialSlide: 0,
            })}
      >
        {isLogin ? (
          <SwiperSlide>
            <div className="olsp-category olsp-category-add box-shadow-default">
              <Button
                onClick={() =>
                  onAddCategory ? onAddCategory(defaultCategory) : {}
                }
                className="flex-center"
                size="large"
                type="primary"
                shape="circle"
                icon={<AiOutlinePlus />}
              />
            </div>
          </SwiperSlide>
        ) : (
          <></>
        )}
        {(children as [])
          .slice(0)
          .reverse()
          .map((child, index) => (
            <SwiperSlide key={"swiper-child-" + index}>{child}</SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
export const Category = ({
  info,
  children,
  onRename: catOnRename,
  onDeleteCategory,
  onAddItem,
}: Category_props) => {
  const [onRename, setOnRename] = useState(false);
  const [onNameChange, setOnNameChange] = useState<string>("");
  const title = info ? info.title : "";
  const id = info ? info.id : "";

  const onRenameHandler = () => {
    if (onRename) {
      if (catOnRename) catOnRename(id, onNameChange);
    }
    setOnRename(!onRename);
  };

  const defaultItem = {
    categoryName: "Category Name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus felis ac dolor cursus, ac commodo justo luctus. Aliquam nec turpis vitae massa dignissim dictum congue in augue. Nulla vel elit ac magna ultrices vestibulum. Suspendisse lacinia ac ligula et semper. Nulla accumsan scelerisque vulputate. Vestibulum vehicula placerat ipsum. Maecenas sit amet maximus eros, eu eleifend nibh.",
    url: "https://www.fastcat.com.ph/wp-content/uploads/2016/04/dummy-post-horisontal.jpg",
    name: "ITEM NAME",
    price: 100,
    stock: 5,
    date: "",
  };

  return (
    <div className="olsp-category box-shadow-default">
      <Space className="flex-center" style={{ width: "100%" }}>
        {!onRename ? (
          <h2>{title.toUpperCase()}</h2>
        ) : (
          <Input
            onChange={({ target }) => setOnNameChange(target.value)}
            className="olsp-cat-input"
            maxLength={10}
            defaultValue={title.toUpperCase()}
            style={{
              width: "7em",
              textAlign: "center",
            }}
          />
        )}
        <AdminPreviledge>
          <Space>
            <Button
              className="flex-center"
              type="primary"
              icon={<MdDriveFileRenameOutline />}
              shape="circle"
              onClick={onRenameHandler}
            />
            <Button
              className="flex-center"
              onClick={() => (onAddItem ? onAddItem(id, defaultItem) : {})}
              type="primary"
              icon={<AiOutlinePlus />}
              shape="circle"
            />
            <OnDelete
              className="flex-center"
              shape="circle"
              icon={<BsFillTrashFill />}
              onDelete={() => (onDeleteCategory ? onDeleteCategory(id) : {})}
            />
          </Space>
        </AdminPreviledge>
      </Space>
      <div
        onScroll={() => {
          debounce(() => {}, 100);
        }}
        className="olsp-item-container"
      >
        {children}
      </div>
    </div>
  );
};

type DivProp = {
  children: React.ReactNode;
  autoplay?: boolean;
  onAddCategory?: (defaultCategory: CatItem) => void;
};

export type CatItem = {
  categoryTitle: string;
  categoryId: string;
  items: OLSitems[];
  itemCount: number;
};

type Category_props = {
  info?: {
    title: string;
    id: string;
  };
  children: React.ReactNode;
  onRename?: (id: string, value: string) => void;
  onDeleteCategory?: (id: string) => void;
  onAddItem?: (id: string, defaultItem: OLSitems) => void;
};

export const CategoryItems = (props: OLSitem_props) => {
  const itemInfoRef = useRef<HTMLDivElement>(null);
  const { url, name, price, stock, itemId, categoryId } = props.items;
  const { itemOndelete } = props;
  const { state, props: hoverProps } = useHoverStyle({
    height: "28em",
  });
  const handleOnView = () => {
    if (props.onView) {
      props.onView(props.items);
    }
  };

  return (
    <div
      {...hoverProps}
      style={state}
      className="olsp-category-item box-shadow-default"
    >
      <img className="image" src={url} alt="olsp-items" />
      <div ref={itemInfoRef} className="olsp-category-desc">
        <Space>
          <h3>{name.toUpperCase()}</h3>
          <AdminPreviledge>
            <Space>
              <Button
                className="flex-center"
                type="primary"
                icon={<MdDriveFileRenameOutline />}
                shape="circle"
                onClick={() => (props.onEdit ? props.onEdit(props.items) : {})}
              />
              <OnDelete
                className="flex-center"
                shape="circle"
                icon={<BsFillTrashFill />}
                onDelete={() =>
                  itemOndelete && itemId && categoryId
                    ? itemOndelete(itemId, categoryId)
                    : {}
                }
              />
            </Space>
          </AdminPreviledge>
        </Space>
        <span>Price:₱{price}</span>
        <span>Stock:{stock}pcs</span>
        <Button onClick={handleOnView} type="primary">
          View
        </Button>
        <CheckOutBtn size="middle" item={props.items} />
        <AddtoCart
          size="middle"
          shape="default"
          type="default"
          item={props.items}
        />
      </div>
    </div>
  );
};
export type OLSitems = {
  url: string;
  price: number;
  stock: number;
  name: string;
  itemId?: string;
  categoryName?: string;
  categoryId?: string;
  description?: string;
  date: string;
};

export type OLSitem_props = {
  onView?: (item: OLSitems) => void;
  onCheckOut?: () => void;
  onAddToCart?: () => void;
  onEdit?: (item: OLSitems) => void;
  items: OLSitems;
  itemOndelete?: (itemId: string, catId: string) => void;
};

const ViewItemsReducer = (
  state: ViewItems_state,
  action: ViewItems_action
): ViewItems_state => {
  switch (action.type) {
    case "onChange":
      return (state = action.payload);
    default:
      return state;
  }
};

export const ViewItems = (props: ViewItem_props) => {
  const onEdit = props.onEdit?.state;
  const { onBackButton, items, onSaveEdit } = props;
  const [onPreview, setOnPreview] = useState(false);
  const [state, dispatch] = useReducer(ViewItemsReducer, items);
  const [isLoading, setIsLoading] = useState(false);
  const { url, name, categoryName, price, stock, description, date, itemId } =
    state;

  useEffect(() => {
    dispatch({ type: "onChange", payload: items });
  }, [items]);

  const setOnEdit = (payload: boolean) => {
    props.onEdit?.updateOnEdit(payload);
  };

  const onCancelHandle = () => {
    setOnEdit(false);
  };

  const onSaveHandle = () => {
    if (onSaveEdit) onSaveEdit(state);
    setOnEdit(false);
  };

  const backHandler = () => {
    if (onBackButton) onBackButton();
    onCancelHandle();
  };

  const onSaveUploadHandler = async (imageList: UploadFile<any>[]) => {
    setIsLoading(true);
    let itemUrl = url;
    try {
      imageList[0].url = await getBase64(imageList[0].originFileObj as RcFile);
      await uploadToCloudStorage(imageList[0], "online-shop", itemId);
      const responseData = await getListImageFromCloud("online-shop");
      const itemMetaData = responseData.MetaDatalist.filter(
        (e) => e.name === itemId
      );
      const index = responseData.MetaDatalist.indexOf(itemMetaData[0]);
      itemUrl = responseData.urlList[index];
    } catch {
      itemUrl = url;
    }

    setIsLoading(false);
    dispatch({
      type: "onChange",
      payload: {
        ...state,
        url: itemUrl,
      },
    });
  };

  const onChangeText = (key: keyof OLSitems, payload: string | number) => {
    dispatch({
      type: "onChange",
      payload: {
        ...state,
        [key]: payload,
      },
    });
  };

  return (
    <div className="ols-item-view box-shadow-default">
      <ModalAntD
        handleCancel={() => setOnPreview(false)}
        className="ols-item-view-img-preview"
        modalVisible={onPreview}
      >
        <img className="image-cover" src={url} alt="onview-img" />
      </ModalAntD>
      <div className="ols-item-view-top">
        <Button
          onClick={backHandler}
          style={{ fontSize: "1em" }}
          className="flex-center box-shadow-solid"
          type="primary"
          shape="circle"
          icon={<BsFillBackspaceFill />}
        />
        <Space style={{ placeSelf: "center end" }}>
          {onEdit ? (
            <>
              <Button onClick={onCancelHandle}>Cancel</Button>
              <Button onClick={onSaveHandle} type="primary">
                Save
              </Button>
            </>
          ) : (
            <AdminPreviledge>
              <Button
                type="primary"
                shape="circle"
                className="flex-center"
                icon={<AiTwotoneEdit />}
                onClick={() => setOnEdit(true)}
              />
            </AdminPreviledge>
          )}
        </Space>
      </div>
      <div className="flex-center flex-column">
        <main>
          <div className="ols-item-view-img-container box-shadow-default">
            {onEdit ? (
              <EditImageButton
                icon={<MdDriveFileRenameOutline />}
                imageList={[]}
                onsave={onSaveUploadHandler}
                onchange={() => {}}
                onCancel={() => {}}
                maxList={1}
              />
            ) : null}
            <img
              onClick={() => setOnPreview(true)}
              className="image-cover"
              src={url}
              alt="onview-img"
            />
            <HbombLoading visible={isLoading} />
          </div>
          <div className="ols-item-view-info">
            <h1>
              <div>{categoryName?.toUpperCase()}</div>
              {onEdit ? (
                <TextArea
                  onChange={({ target }) => onChangeText("name", target.value)}
                  maxLength={20}
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  style={{
                    fontSize: "1em",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                  placeholder={name}
                  // defaultValue={name}
                />
              ) : name ? (
                name.toUpperCase()
              ) : (
                ""
              )}
            </h1>
            <h3>
              Price: ₱
              {onEdit ? (
                <Input
                  onChange={({ target }) => onChangeText("price", target.value)}
                  placeholder={price ? price.toString() : ""}
                  style={{
                    fontSize: "1em",
                    fontWeight: "600",
                    width: "3.5em",
                  }}
                  // defaultValue={price}
                />
              ) : (
                price
              )}
            </h3>
            <h3>
              Stock:
              {onEdit ? (
                <Input
                  onChange={({ target }) => onChangeText("stock", target.value)}
                  style={{
                    fontSize: "1em",
                    fontWeight: "600",
                    width: "3.5em",
                  }}
                  // defaultValue={stock}
                  placeholder={stock ? stock.toString() : ""}
                />
              ) : (
                " " + stock
              )}
              pcs
            </h3>
            <AddtoCart item={state} />
            <CheckOutBtn type={"default"} shape={"round"} item={state} />
          </div>

          <div
            className="ols-item-view-desc"
            style={{
              justifySelf: "flex-start",
            }}
          >
            <Divider>
              <p>{date}</p>
            </Divider>
            <h3>Description:</h3>
            <span>
              {onEdit ? (
                <TextArea
                  // defaultValue={description}
                  onChange={({ target }) =>
                    onChangeText("description", target.value)
                  }
                  style={{ minWidth: "20em" }}
                  autoSize={{ minRows: 5 }}
                  placeholder={description}
                />
              ) : (
                description
              )}
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};
type ViewItem_props = {
  items: OLSitems;
  onEdit?:
    | { state: boolean; updateOnEdit: (payload: boolean) => void }
    | undefined;
  onBackButton?: () => void;
  onAddToCart?: () => void;
  onCheckOut?: () => void;
  onSaveEdit?: (items: OLSitems) => void;
  onCancelEdit?: () => void;
};
type ViewItems_state = OLSitems;
type ViewItems_action = { type: "onChange"; payload: OLSitems };
export default OnlineShopSwipe;
