import { Menu, Dropdown, Button, Space } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { MenuItemType } from "rc-menu/lib/interface";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const TimeDateDropdown = (props: Props) => {
  const [activeKey, setActiveKey] = useState<string>("weekly");

  const menuItem: MenuItemType[] = [
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
  ];

  const item = (
    <Menu
      onClick={(info) => {
        if (props.onChange != undefined) props.onChange(info.key as Key);
        switch (info.key) {
          case "daily":
            setActiveKey("daily");
            return;
          case "weekly":
            setActiveKey("weekly");
            return;
          case "monthly":
            setActiveKey("monthly");
            return;
        }
      }}
      items={menuItem}
      selectedKeys={[activeKey]}
    />
  );

  return (
    <Dropdown overlay={item}>
      <Button className="flex-center gap-1">
        {menuItem.find((val) => val.key === activeKey)?.label}
        <AiFillCaretDown />
      </Button>
    </Dropdown>
  );
};

export type Key = "daily" | "weekly" | "monthly";
type Props = {
  onChange?: (key: Key) => void;
};

export default TimeDateDropdown;
