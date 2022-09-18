import { Button } from "antd";
import { BsFillTrashFill } from "react-icons/bs";
import { OLSitems } from "../Component/Page/Product/ShopProduct";
import { UserContext } from "../hooks/UserContext";

const DeleteCartItemBtn = (props: Props) => {
  const userContext = UserContext();
  const deleteItem = userContext.cartItemHandler.delete;

  const buttonHandler = () => {
    deleteItem(props.item);
  };
  return (
    <Button
      className="flex-center"
      onClick={buttonHandler}
      shape="circle"
      size="small"
      icon={<BsFillTrashFill />}
      danger
    />
  );
};

type Props = {
  item: OLSitems;
};

export default DeleteCartItemBtn;
