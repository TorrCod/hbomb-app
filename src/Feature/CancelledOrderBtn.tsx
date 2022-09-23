import { message, Button } from "antd";
import { useState } from "react";
import { clearPath } from "../FirebaseService/RealtimeDatabase";
import { ConfirmationModal } from "./ConfirmationModal";
import { CancelledOrderedProps } from "./_type/CancelledOrdered.d";

export const CancelledOrderBtn = (props: CancelledOrderedProps) => {
  const [visible, setVisible] = useState(false);

  const onCLick = () => {
    if (props.onCancelledOrder) props.onCancelledOrder();
    setVisible(true);
  };

  const updateOrders = () => {
    try {
      const orders = props.orderDetails!.orderNumber;
      clearPath("order-list/" + orders);
    } catch (e) {
      alert(e);
    }
  };

  const onConfirm = (isLogin: "failed" | "success") => {
    if (isLogin === "success") {
      updateOrders();
      setVisible(false);
      message.success({
        content: "Item Cancelled",
        className: "mt-10",
      });
    }
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={onCLick} size="large">
        Cancelled
      </Button>
      <ConfirmationModal
        visible={visible}
        onConfirm={onConfirm}
        onCancel={onCancel}
        placedHolder={"Type Password to confirm"}
        message="By clicking the Cancelled button it means the item has been cancelled or not received by customers"
      />
    </>
  );
};
