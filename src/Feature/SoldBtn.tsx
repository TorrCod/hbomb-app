import { Button, message, Modal } from "antd";
import { useState } from "react";
import { writeDatabase } from "../FirebaseService/RealtimeDatabase";
import { ConfirmationModal } from "./ConfirmationModal";
import { Sold_Btn_Props } from "./_type/SoldBtnProp.d";

export const SoldBtn = (props: Sold_Btn_Props) => {
  const [visible, setVisible] = useState(false);

  const onCLick = () => {
    if (props.onSold) props.onSold();
    setVisible(true);
  };

  const updateOrders = () => {
    try {
      const orders = props.itemSold;
      orders!["status"] = "success";
      writeDatabase("order-list/" + orders?.orderNumber, orders!);
    } catch (e) {
      alert(e);
    }
  };

  const onConfirm = (isLogin: "failed" | "success") => {
    if (isLogin === "success") {
      updateOrders();
      setVisible(false);
      successTransaction();
      message.success({
        content: "Congratulation On your Business",
        className: "mt-10",
      });
    }
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={onCLick} size="large" type="primary">
        {props.content ?? "SOLD"}
      </Button>
      <ConfirmationModal
        visible={visible}
        onConfirm={onConfirm}
        onCancel={onCancel}
        placedHolder={"Type Password to confirm"}
        message="By clicking the Sold button it means the item has been successfully delivered and received by the customers."
      />
    </>
  );
};

const successTransaction = () => {
  let secondsToGo = 5;

  const modal = Modal.success({
    title: "Congratulations",
    content: `This modal will be destroyed after ${secondsToGo} second.`,
  });

  const timer = setInterval(() => {
    secondsToGo -= 1;
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};
