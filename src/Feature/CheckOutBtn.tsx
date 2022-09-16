import { Button } from "antd";
import { Link } from "react-router-dom";
import { OLSitems } from "../Component/Page/Product/ShopProduct";
import { UserContext } from "../hooks/UserContext";

const CheckOutBtn = (props: ChkOut) => {
  const userContext = UserContext();
  const isCartItemEmpty = userContext.state.CartItem.length === 0;
  const handleButtonCheckOut = () => {
    const addToCart = userContext.cartItemHandler.addToCart;
    if (props.item) addToCart(props.item);
  };

  return (
    <Button
      size={props.size ?? "large"}
      className="box-shadow-solid"
      onClick={handleButtonCheckOut}
      type={props.type ?? "primary"}
      shape={props.shape ?? "default"}
      disabled={isCartItemEmpty || props.disabled}
    >
      <Link to="/product/checkout">CHECK OUT</Link>
    </Button>
  );
};

type ChkOut = {
  size?: "small" | "middle" | "large" | undefined;
  type?:
    | "link"
    | "text"
    | "ghost"
    | "primary"
    | "default"
    | "dashed"
    | undefined;
  item?: OLSitems;
  shape?: "default" | "circle" | "round" | undefined;
  disabled?: boolean;
};

export default CheckOutBtn;
