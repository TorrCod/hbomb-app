import { Button, Drawer, DrawerProps, Space } from "antd";
import { useState } from "react";

const MyDrawer = (props:Drawer_props) => {
    const {
        title,
        isVisible,
        onCLose,
        children,
        buttonElement,
        placement
    } = props;

    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
        onCLose!()
    };

    return (
        <>
          <Drawer
            title={title}
            placement={(placement)? placement:"right"}
            onClose={onClose}
            visible={isVisible? isVisible:visible}
            extra={
              <Space>
                {buttonElement}
              </Space>
            }
          >
            {children}
          </Drawer>
        </>
      );
}

type Drawer_props = {
    title:string;
    isVisible:boolean;
    children:React.ReactNode;
    onCLose?: () => void;
    buttonElement?: React.ReactNode;
    placement?: 'top'|'right'|'bottom'|'left'
}

export default MyDrawer