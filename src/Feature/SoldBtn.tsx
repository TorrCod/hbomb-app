import { Button, Input, message, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { checkPassword } from "../FirebaseService/Auth";
import { auth } from "../FirebaseService/FirebaseConfig";
import { writeDatabase } from "../FirebaseService/RealtimeDatabase";
import { Sold_Btn_Props } from "./_type/SoldBtnProp.d";

export const SoldBtn = (props: Sold_Btn_Props) => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"" | "warning" | "error">("");
  const [typedPassword, setTypedPassword] = useState("");

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

  const onConfirm = () => {
    checkPassword(typedPassword).then((isLogin) => {
      if (isLogin) {
        updateOrders();
        setStatus("");
        setVisible(false);
        setTypedPassword("");
        successTransaction();
        message.success({
          content: "Congratulation On your Business",
          className: "mt-10",
        });
      } else if (typedPassword === "") {
        setStatus("warning");
      } else {
        setStatus("error");
      }
    });
  };

  const onCancel = () => {
    console.log("tets");

    setTypedPassword("");
    setVisible(false);
  };

  return (
    <>
      <Button onClick={onCLick} size="large" type="primary">
        {props.content ?? "SOLD"}
      </Button>
      <Modal
        footer={[
          <Button key="confirm" onClick={onConfirm} type="primary">
            Confirm
          </Button>,
          <Button onClick={onCancel} key="cancel">
            Cancel
          </Button>,
        ]}
        onCancel={onCancel}
        visible={visible}
        title="CONFIRMATION"
      >
        <p>
          By clicking the Sold button it means the item has been successfully
          delivered and received by the customers.
        </p>
        <Input.Password
          value={typedPassword}
          status={status}
          onChange={(e) => setTypedPassword(e.target.value)}
          placeholder="Type password to Confirm"
        />
      </Modal>
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
    // modal.update({
    //   content: `This modal will be destroyed after ${secondsToGo} second.`,
    // });
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};
