import { Menu, Dropdown, Button, Space } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { MenuItemType } from "rc-menu/lib/interface";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const TimeDateDropdown = () => {
  const [activeKey, setActiveKey] = useState<string>("weekly");

  const menuItem: MenuItemType[] = [
    { key: "dayly", label: "Dayly" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
  ];

  const item = (
    <Menu
      onClick={(info) => {
        switch (info.key) {
          case "dayly":
            setActiveKey("dayly");
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

export default TimeDateDropdown;
