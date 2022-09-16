import { Button } from "antd";
import ModelProduct, { ModelProductItems } from "./ModelProduct";
import "./css/ProductPage.css";
import { Link, Outlet } from "react-router-dom";
import FullScrollSlide, {
  FullScrollSection,
  FsHandle,
} from "../../../Feature/FullScrollSlide";
import { useReducer, useRef, useState } from "react";
import MyCart from "./MyCart";
import ProductPageContext from "../../../hooks/ProductPageContext";
import OnlineShopSwipe, {
  Category,
  CategoryItems,
  CatItem,
  OLSitems,
  ViewItems,
} from "./ShopProduct";
import VerticalSlideCtrl from "../../../Feature/VerticalSlideCtrl";
import TextArea from "antd/lib/input/TextArea";
import "./css/CheckOutPage.css";
import { UserContext } from "../../../hooks/UserContext";
import { AiOutlineClose } from "react-icons/ai";
import Cart_TotalPrice, {
  itemPriceList,
} from "../../../Feature/Cart_TotalPrice";
import { writeDatabase } from "../../../FirebaseService/RealtimeDatabase";
import OrderResult from "./OrderResult";

function ProductPage() {
  const productPageCtx = ProductPageContext();
  const { landingPageImages: ImageData } = productPageCtx.state;
  const FsRef = useRef<FsHandle>(null);
  const myCartRef = useRef<HTMLDivElement>(null);

  const modelItems = ImageData.map((child, index) => {
    return (
      <ModelProductItems key={child.uid + index} className="flex-center">
        <img className="image" src={child.url} alt="product items" />
      </ModelProductItems>
    );
  });

  return (
    <div>
      <FullScrollSlide selectedRef={[myCartRef]} ref={FsRef} slideSpeed={500}>
        <FullScrollSection
          key="section1"
          classname="fullscroll-section fullscroll-section-1 flex-center"
        >
          <section className="product-section product-section-landingpage flex-center">
            <div className="product-section-container flex-center">
              <ModelProduct>
                {modelItems.length ? (
                  modelItems
                ) : (
                  <ModelProductItems key={"default"} className="flex-center">
                    <img className="image" src={""} alt="product items" />
                  </ModelProductItems>
                )}
              </ModelProduct>
            </div>
            <div className="productsection-buttons flex-center web-left">
              <Button
                shape="round"
                className="productsection-buttons-primary"
                onClick={() => {
                  const baseGoTo = FsRef.current!.GoTo;
                  baseGoTo!("section2");
                }}
                size="large"
                type="primary"
              >
                GETTING STARTED
              </Button>

              <Link to="/aboutus">
                <Button
                  shape="round"
                  className="productsection-buttons-secondary"
                  size="large"
                >
                  About Us
                </Button>
              </Link>
            </div>
          </section>
        </FullScrollSection>
        <FullScrollSection
          key="section2"
          classname="fullscroll-section fullscroll-section-2 flex-center"
        >
          <Outlet />
        </FullScrollSection>
      </FullScrollSlide>
    </div>
  );
}

export const StorePage = () => {
  const nextSlide = useRef<HTMLDivElement>(null);
  const prevSlide = useRef<HTMLDivElement>(null);
  const productPageCtx = ProductPageContext();
  const [onViewItem, setOnViewItem] = useState<OLSitems>();
  const [itemOnEdit, setItemOnEdit] = useState(false);
  const { categoryList: catListObj } = productPageCtx.state;
  const categoryList = _toCategoryArray(catListObj);

  const { updateCategory, updateItems } = productPageCtx.onlineShopHandler;

  const onAddCategoryHandler: (defaultCategory: CatItem) => void = (
    defaultCategory
  ) => {
    updateCategory.add(defaultCategory);
  };

  const onRenameCategoryHandler = (id: string, value: string) => {
    updateCategory.edit(id, value);
  };

  const onDeleteCategoryHandler = (id: string) => {
    updateCategory.delete(id);
  };

  const addItemCategoryHandler = (id: string, defaultItem: OLSitems) => {
    updateCategory.itemAdd(id, defaultItem);
  };

  const itemOnDeleteHandler = (itemId: string, catId: string) => {
    updateItems.delete(itemId, catId);
  };

  const onSaveEdit_VI_Handler = (items: OLSitems) => {
    updateItems.edit(items);
    setOnViewItem(items);
  };

  const handleItemOnview: (item: OLSitems) => void = (item) => {
    setOnViewItem(item);
    prevSlide.current?.click();
  };

  const handleItemOnEdit: (item: OLSitems) => void = (item) => {
    setOnViewItem(item);
    setItemOnEdit(true);
    prevSlide.current?.click();
  };

  return (
    <>
      <Button style={{ display: "none" }} ref={nextSlide}>
        test
      </Button>
      <Button style={{ display: "none" }} ref={prevSlide}>
        test
      </Button>
      <div className="shopcart">
        <MyCart className="productshop-cart flex-center" />
      </div>
      <div className="shop">
        <VerticalSlideCtrl nextBtnRef={nextSlide} prevBtnRef={prevSlide}>
          <OnlineShopSwipe onAddCategory={onAddCategoryHandler}>
            {categoryList.map(({ categoryTitle, items, categoryId }, index) => {
              return (
                <div key={"cat-id-" + index}>
                  <Category
                    onAddItem={addItemCategoryHandler}
                    onDeleteCategory={onDeleteCategoryHandler}
                    onRename={onRenameCategoryHandler}
                    info={{ title: categoryTitle, id: categoryId }}
                  >
                    {items.map((child, index) => {
                      return (
                        <CategoryItems
                          itemOndelete={itemOnDeleteHandler}
                          onEdit={handleItemOnEdit}
                          onView={handleItemOnview}
                          key={"cat-items-" + index}
                          items={{ ...child }}
                        />
                      );
                    })}
                  </Category>
                </div>
              );
            })}
          </OnlineShopSwipe>
          <ViewItems
            onSaveEdit={onSaveEdit_VI_Handler}
            onEdit={{
              state: itemOnEdit,
              updateOnEdit: (payload) => setItemOnEdit(payload),
            }}
            onBackButton={() => nextSlide.current?.click()}
            items={{ ...onViewItem! }}
          />
        </VerticalSlideCtrl>
      </div>
    </>
  );
};

const inputReducer = (
  state: InptRdcerState,
  action: InptRdcerAct
): InptRdcerState => {
  switch (action.type) {
    case "updatename":
      return {
        ...state,
        name: action.payload,
      };
    case "updatecontactinfo":
      return {
        ...state,
        contactInfo: action.payload,
      };

    case "updateaddress":
      return {
        ...state,
        address: action.payload,
      };
  }
};
type InptRdcerState = {
  name: string;
  contactInfo: string;
  address: string;
  orderNumber: number;
};
const InptState_init = {
  name: "",
  contactInfo: "",
  address: "",
  orderNumber: Math.floor(Date.now() * Math.random()),
};
type InptRdcerAct =
  | { type: "updatename"; payload: string }
  | { type: "updatecontactinfo"; payload: string }
  | { type: "updateaddress"; payload: string };

export const CheckOutPage = () => {
  const userContext = UserContext();
  const cartItemList = userContext.state.CartItem;
  const [onSubmit, setOnSubmit] = useState(false);
  const [state, dispatch] = useReducer(inputReducer, InptState_init);
  const emailCheck =
    state.contactInfo.includes(".com") ||
    state.contactInfo.includes("+63") ||
    state.contactInfo.includes("09");
  const isFilled =
    emailCheck && state.address.length !== 0 && state.name.length !== 0;
  const dateNow = new Date().toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const priceList = itemPriceList(cartItemList);
  const totalPrice = priceList.reduce((prev, curr) => prev + curr, 0);

  const onPlaceOrder = () => {
    const orderDetailes = {
      date: dateNow,
      orderNumber: state.orderNumber,
      name: state.name,
      emailcontact: state.contactInfo,
      address: state.address,
      totalPrice: totalPrice,
      itemOrdered: cartItemList,
    };
    const clearCartItem = userContext.cartItemHandler.clear;

    writeDatabase("order-list/" + orderDetailes.orderNumber, orderDetailes);
    clearCartItem();
  };

  return onSubmit ? (
    <div className="box-shadow-default padding-1em bg-white roundcorner-1em">
      <OrderResult orderNumber={state.orderNumber} />
    </div>
  ) : (
    <div className="checkout-page box-shadow-default">
      <Link className="chkout-close-btn" to="/product">
        <AiOutlineClose />
      </Link>
      <div className="checkout-page-form checkout-page-area1">
        <div>
          <p>{dateNow}</p>
          Order no.
          <div>{state.orderNumber}</div>
        </div>
        <TextArea
          onChange={({ target }) => {
            dispatch({ type: "updatename", payload: target.value });
          }}
          autoSize={{ maxRows: 1 }}
          placeholder="name"
        />
        <TextArea
          onChange={({ target }) => {
            dispatch({ type: "updatecontactinfo", payload: target.value });
          }}
          autoSize={{ maxRows: 1 }}
          placeholder="email/contact no."
        />
        <div>
          <TextArea
            onChange={({ target }) => {
              dispatch({ type: "updateaddress", payload: target.value });
            }}
            autoSize={{ maxRows: 4 }}
            placeholder="meetup location"
          />
          {/* {content} */}
        </div>
      </div>

      <div className="checkout-page-area2">
        <span style={{ placeSelf: "end center" }}>Cart</span>
        <div style={{ placeSelf: "start center" }}>
          {cartItemList.map((child, index) => {
            return (
              <div key={child.item.itemId} className="checkout-page-item">
                <img src={child.item.url} alt="cart-item" />
                <span style={{ placeSelf: "end center" }}>
                  x{child.itemCount}
                </span>
                <span style={{ placeSelf: "end end" }}>
                  P{child.item.price}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="checkout-page-plc-order"
        style={{ gap: "0", placeItems: "center", marginTop: "2em" }}
      >
        Total: {Cart_TotalPrice()}
        <Button
          onClick={() => {
            onPlaceOrder();
            setOnSubmit(true);
          }}
          style={{
            paddingInline: "2em",
            fontSize: "1em",
          }}
          className="flex-center"
          size="large"
          type="primary"
          disabled={!isFilled}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

const _toCategoryArray = (catListObj: any) => {
  const categoryList: CatItem[] = [];
  for (const catInfo of Object.keys(catListObj)) {
    categoryList.push(catListObj[catInfo]);
  }
  return categoryList;
};

export default ProductPage;
