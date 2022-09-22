import { Orders } from "../../api/CustomType";

export type Sold_Btn_Props = {
  content?: string;
  onSold?: () => void;
  itemSold?: Orders;
};
