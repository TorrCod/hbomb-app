import { Modal, Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { checkPassword } from "../FirebaseService/Auth";
import { ConfirmationModalProps } from "./_type/ConfirmationModalProps.d";

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {
    onConfirm: onConfirmCallback,
    onCancel,
    visible,
    onTyped,
    message,
    placedHolder,
  } = props;

  const [status, setStatus] = useState<"" | "warning" | "error">("");
  const [typedPassword, setTypedPassword] = useState("");

  const onConfirm = () => {
    checkPassword(typedPassword).then((isLogin) => {
      if (isLogin) {
        setTypedPassword("");
        onConfirmCallback("success");
      } else if (typedPassword === "") {
        setStatus("warning");
        onConfirmCallback("failed");
      } else {
        setStatus("error");
        onConfirmCallback("failed");
      }
    });
  };

  return (
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
      <p>{message}</p>
      <Input.Password
        value={typedPassword}
        status={status}
        onChange={(e) => {
          const value = e.target.value;
          if (onTyped) onTyped(value);
          setTypedPassword(value);
        }}
        placeholder={placedHolder}
      />
    </Modal>
  );
};
