export type ConfirmationModalProps = {
  visible: boolean;
  onConfirm: (status: "success" | "failed") => void;
  onCancel: () => void;
  onTyped?: (val: string) => void;
  placedHolder: string;
  value?: string;
  message: string;
};
