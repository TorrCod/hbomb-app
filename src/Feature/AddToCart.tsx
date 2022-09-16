import { Button, message } from "antd";
import { BsFillCartFill } from "react-icons/bs";
import { OLSitems } from "../Component/Page/Product/ShopProduct";
import { UserContext } from "../hooks/UserContext";
import "./css/AddToCart.css";

const AddtoCart = (props: AddtoCart_props) => {
  const userContext = UserContext();
  const addToCart = userContext.cartItemHandler.addToCart;
  const { size, type, shape } = props;

  const buttonHandler = () => {
    message.success(props.item.name + " added to cart");
    addToCart(props.item);
  };

  return (
    <Button
      style={{ gap: "1em" }}
      className="flex-center"
      onClick={buttonHandler}
      shape={shape ?? "round"}
      size={size ?? "large"}
      type={type ?? "primary"}
      icon={<BsFillCartFill />}
      disabled={props.disabled}
    >
      ADD TO CART
    </Button>
  );
};

type AddtoCart_props = {
  disabled?: boolean;
  item: OLSitems;
  type?:
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "primary"
    | "dashed"
    | undefined;
  size?: "small" | "middle" | "large";
  shape?: "default" | "circle" | "round" | undefined;
};

export const addtoCartFunc = (
  item: OLSitems,
  cartItemList: CartItemList,
  updateCount: (itemId: string, payload: number) => void,
  addToCart: (item: OLSitems) => void
) => {
  const isExist = cartItemList.filter((e) => e.item.itemId === item.itemId);

  if (isExist[0]) {
    const itemCount = isExist[0].itemCount;
    updateCount(item.itemId!, itemCount + 1);
  } else {
    addToCart(item);
  }

  message.success({
    content: item.name + " is added to cart",
    icon: <BsFillCartFill />,
    className: "addtocart-message",
  });
};

type CartItemList = {
  itemCount: number;
  item: OLSitems;
}[];

export default AddtoCart;
