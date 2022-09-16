import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillShopping } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { TbLayoutDashboard } from "react-icons/tb";
import { useAdminSignedin } from "../../customhooks/useAdminSignedIn";
import { useLocation } from "react-use";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];
let menuItem: { itemkey: React.Key; keypath: string }[] = [];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  itempath: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  menuItem.push({ itemkey: key, keypath: itempath });
  return {
    key,
    itempath,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const MenuAntd = (props: { HandleButton: () => void }) => {
  const [activeKey, setActiveKey] = useState<string>("");
  const { pathname } = useLocation();

  const items: MenuProps["items"] = [
    getItem(<Link to="/">Home</Link>, "1", "/", <AiFillHome />),

    getItem(
      <Link to="/product">Online Store</Link>,
      "2",
      "/product",
      <AiFillShopping />
    ),

    getItem(
      <Link to="/aboutus">About Us</Link>,
      "3",
      "/aboutus",
      <BsFillPeopleFill />
    ),
  ];

  useEffect(() => {
    const locationData = [
      { key: "1", label: "/" },
      { key: "2", label: "/product" },
      { key: "3", label: "/aboutus" },
      { key: "4", label: "/dashboard" },
    ];
    const result = locationData.find((val) => val.label === pathname);
    setActiveKey(result!.key);
  }, [pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    props.HandleButton();
  };

  const isAdminSignedIn = useAdminSignedin();

  if (isAdminSignedIn) {
    items.push(
      getItem(
        <Link to="/dashboard">Dashboard</Link>,
        "4",
        "/aboutus",
        <TbLayoutDashboard />
      )
    );
  }

  return (
    <>
      <Menu
        selectedKeys={[activeKey]}
        onClick={onClick}
        style={{ width: 256, background: "none" }}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default MenuAntd;
