import { Orders } from "../../api/CustomType";

export type CancelledOrderedProps = {
  onCancelledOrder?: () => void;
  orderDetails: Orders | undefined;
};
