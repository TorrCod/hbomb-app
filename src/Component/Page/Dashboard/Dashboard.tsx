import { ReactNode, useEffect, useState } from "react";
import { BsPeopleFill, BsCalendarDateFill } from "react-icons/bs";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Orders } from "../../../api/CustomType";
import { UserContext } from "../../../hooks/UserContext";
import "./Dashboard.css";
import { Breadcrumb, Button, Divider, Menu, Table } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { ColumnsType } from "antd/lib/table";
import { SoldBtn } from "../../../Feature/SoldBtn";
import { CancelledOrderBtn } from "../../../Feature/CancelledOrderBtn";
import { AiFillFileUnknown } from "react-icons/ai";

const monthlyData = (data: Orders[]): { date: string; sales: string }[] => {
  const chartData: { date: string; sales: string }[] = [];
  data.forEach((orders) => {
    const month = getDate(orders.date).getMonth();
    const monthName = getMonthName(month);
    const sales = orders.totalPrice;
    chartData.push({ date: monthName.toString(), sales: sales.toString() });
  });
  const simplified = simpliFyArr(chartData);
  return simplified;
};

// const dailyData = (data: Orders[]) => {
//   const chartData: { date: string; sales: string }[] = [];
//   data.forEach((orders) => {
//     const day = getDate(orders.date).getDay();
//     const sales = orders.totalPrice;
//     chartData.push({ date: day.toString(), sales: sales.toString() });
//   });
//   const simplified = simpliFyArr(chartData);
//   return simplified;
// };

const getDate = (stringDate: string) => {
  const dataDate = Date.parse(stringDate);
  const formatedDate = new Date(dataDate);
  return formatedDate;
};

const getMonthName = (number: number) => {
  const data = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return data[number];
};

const simpliFyArr = (datasss: { date: string; sales: string }[]) => {
  const res = Array.from(
    datasss.reduce(
      (m, { date, sales }) => m.set(date, (m.get(date) || 0) + Number(sales)),
      new Map()
    ),
    ([date, sales]) => ({ date, sales })
  );
  return res;
};

export const Dashboard = () => {
  const [swiper, setSwiper] = useState<any>();
  const orderList = UserContext().state.OrderList;
  return (
    <div className="h-screen">
      <Swiper
        spaceBetween={50}
        allowTouchMove={false}
        onSwiper={(swiper) => setSwiper(swiper)}
        className="dashboard-swiper"
      >
        <SwiperSlide className="dashbboard-main">
          <div className="p-5 my-5 w-fit rounded-r-lg bg-white opacity-80">
            <Breadcrumb>
              <BreadcrumbItem>DASHBOARD</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="flex-center">
            <div className="dashboard">
              <Charts />
              <Sales />
              <PendingOrders onClick={() => swiper.slideTo(1)} />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="overflow-scroll">
          <div className="p-5 my-5 w-fit rounded-r-lg bg-white opacity-80">
            <Breadcrumb>
              <BreadcrumbItem
                className="cursor-pointer"
                onClick={() => swiper.slideTo(0)}
              >
                DASHBOARD
              </BreadcrumbItem>
              <BreadcrumbItem>PENDING ORDERS</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <PendingOrdersMenu orderList={orderList} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
/* <div className="dashboard-container">
      <div className="dashboard">
        <Charts />
        <Sales />
        <PendingOrders />
      </div>
    </div> */

const Charts = () => {
  const userContext = UserContext();
  const orderList = userContext.state.OrderList;
  const [transacCount, setTransacCount] = useState(0);
  const [orderData, setOrderData] = useState<{ date: string; sales: string }[]>(
    []
  );
  const [dateNow, setDateNow] = useState<Date>(new Date());
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let data: { date: string; sales: string }[] = [];
    const salesData = orderList.filter(({ status }) => status === "success");
    data = monthlyData(salesData);
    setOrderData(data);
  }, [orderList]);

  useEffect(() => {
    //Update total
    const salesList = orderList.map((val) => {
      return val.totalPrice;
    });
    const sum = salesList.reduce((partialSum, a) => partialSum + a, 0);
    setTotal(sum);

    //update transaction count
    setTransacCount(orderList.length);

    //update Date
    const dateNow = Date.now();
    const date = new Date(dateNow);
    setDateNow(date);
  }, [orderList]);

  return (
    <div className="dashboard-child charts box-shadow-default">
      <div className="flex-column">
        <div className="fontz-xxl flex-center-start gap-1">
          <FaMoneyBillWaveAlt />
          {total}
        </div>
        <div className="fontz-l flex-center-start clr-darklight gap-1">
          <BsPeopleFill />
          {transacCount} Transaction
        </div>
        <div className="fontz-l flex-center-start clr-darklight gap-1">
          <BsCalendarDateFill />
          Year of {dateNow?.getFullYear()}
        </div>
      </div>

      <ResponsiveContainer width={"100%"} height={"70%"}>
        <BarChart
          height={200}
          width={300}
          data={orderData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#e3bd9b" />
        </BarChart>
      </ResponsiveContainer>

      {/* <Space direction="horizontal" className="wd-full flex-center">
        <TimeDateDropdown onChange={onChangeDropdown} />
      </Space> */}
    </div>
  );
};

type TableData = {
  name: string;
  date: Date;
  price: string;
  orderNumber: number;
}[];

const Sales = () => {
  const userContext = UserContext();
  const orderList = userContext.state.OrderList;
  const tableData = useOrderListTable("success", orderList);

  return (
    <div className="dashboard-child box-shadow-default">
      <h1 className="text-2xl flex-center mb-10">SALES</h1>
      <table className="dashboard-table text-lg text-black opacity-75 max-h-40 w-full">
        <tbody>
          {tableData.map(({ date, name, price }, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td className="text-left">{date.toLocaleDateString("en-US")}</td>
              <td className="text-end">{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
type PropsPendingOrders = { onClick?: () => void };
const PendingOrders = (props: PropsPendingOrders) => {
  const userContext = UserContext();
  const orderList = userContext.state.OrderList;
  const tableData = useOrderListTable("pending", orderList);
  return (
    <div
      onClick={() => (props.onClick ? props.onClick() : {})}
      className="dashboard-child box-shadow-default hover:scale-105 transition ease-in cursor-pointer"
    >
      <h1 className="text-2xl flex-center mb-10">PENDING ORDERS</h1>
      <table className="dashboard-table text-lg text-black opacity-75 w-full">
        <tbody>
          {tableData.map(({ date, name, price, orderNumber }, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td className="text-left">{date.toLocaleDateString("en-US")}</td>
              <td className="text-end">{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const useOrderListTable = (
  status: "pending" | "success",
  orderList: Orders[]
) => {
  const [tableData, setTableData] = useState<TableData>([]);

  useEffect(() => {
    //Update Table Data
    const holder: TableData = [];
    const getData = (
      name: string,
      date: Date,
      price: string,
      orderNumber: number
    ) => ({
      name: name,
      date: date,
      price: price,
      orderNumber: orderNumber,
    });
    for (const {
      name,
      date,
      totalPrice,
      status: orderStatus,
      orderNumber,
    } of orderList) {
      const isPending = orderStatus === status;
      if (isPending)
        holder.push(
          getData(name, getDate(date), "P" + totalPrice, orderNumber)
        );
    }
    setTableData(holder);

    return () => {
      holder.length = 0;
    };
  }, [orderList, status]);

  return tableData;
};
const itemColumns: ColumnsType<ItemSource> = [
  { dataIndex: "itemName", key: "name" },
  { dataIndex: "itemCount", key: "price" },
  { dataIndex: "itemPrice", key: "price" },
];
type ItemSource = {
  key: string;
  itemName: ReactNode;
  itemPrice: string;
  itemCount: string;
};
const PendingOrdersMenu = (props: PropsOrderMenu) => {
  const pendingOrdersList = useOrderListTable("pending", props.orderList);
  const [menuItem, setMenuItem] = useState<ItemType[]>([]);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState<number>(0);
  const [itemList, setItemList] = useState<ItemSource[]>();
  const [defaultKey, setDefaultKey] = useState<string>("");
  const orderDetails = useFindOrderDetails(selectedOrderNumber);

  useEffect(() => {
    const holder: ItemType[] = [];
    if (pendingOrdersList.length === 0) setSelectedOrderNumber(0);
    else {
      const sortedByDate = pendingOrdersList.sort(
        (a, b) => -a.date.getTime() + b.date.getTime()
      );

      for (const pendingOrders of sortedByDate) {
        const date = pendingOrders.date.toLocaleDateString("en-US");

        const label = (
          <div className="grid grid-cols-2">
            <div>{pendingOrders.name.toLocaleUpperCase()}</div>
            <div className="place-self-end">{date}</div>
          </div>
        );

        const key = pendingOrders.orderNumber;
        holder.push({ key: key, label: label });
      }

      if (holder[0]) {
        setDefaultKey(holder[0].key!.toString());
      }
    }
    setMenuItem(holder);
  }, [pendingOrdersList]);

  useEffect(() => {
    const holder: ItemSource[] = [];
    orderDetails?.itemOrdered.forEach((val, index) => {
      let { name, itemId, price, url } = val.item;
      const itemCount = val.itemCount;
      const tableName = (
        <div className="flex gap-3 text-sm items-center">
          <div className="h-10 w-7 rounded overflow-hidden">
            <img className="object-cover w-full h-full" src={url} alt="item" />
          </div>
          {name}
        </div>
      );
      holder.push({
        key: itemId!,
        itemName: tableName,
        itemCount: "x " + itemCount,
        itemPrice: "₱ " + price,
      });
    });
    setItemList(holder);
  }, [orderDetails]);

  useEffect(() => {
    setSelectedOrderNumber(Number(defaultKey));
  }, [defaultKey]);

  return (
    <div className="w-full px-5 grid gap-5 pb-10 md:grid-cols-2">
      <div className="dashboard-child pending-menu md-pc-60vh">
        <h1 className="text-2xl flex-center mb-5">PENDING ORDERS</h1>
        <div className="h-4/5 overflow-scroll">
          <Menu
            selectedKeys={[selectedOrderNumber.toString()]}
            defaultOpenKeys={[defaultKey]}
            onClick={(val) => {
              setSelectedOrderNumber(Number(val.key));
            }}
            mode="inline"
            items={menuItem}
          />
        </div>
      </div>
      {selectedOrderNumber === 0 ? (
        <div className="dashboard-child grid gap-4 md-pc-60vh place-items-center">
          <div className="grid place-items-center gap-5 text-black opacity-70">
            <AiFillFileUnknown className="text-6xl" />
            {pendingOrdersList.length === 0
              ? "No Pending Orders"
              : "Select items on Pending Orders"}
          </div>
        </div>
      ) : (
        <>
          <div className="dashboard-child order-details grid gap-4 md-pc-60vh">
            <div className="area-a grid gap-5">
              <div>NAME: {orderDetails?.name.toLocaleUpperCase()}</div>
              <div>ADDRESS: {orderDetails?.address.toLocaleUpperCase()}</div>
              <div>
                PHONE/EMAIL: {orderDetails?.emailcontact.toLocaleUpperCase()}
              </div>
              <div>DATE ORDERED: {orderDetails?.date.toLocaleUpperCase()}</div>
            </div>
            <div className="justify-self-end self-center grid gap-3 p-5 w-11/12 bg-black/25 rounded-l-lg pr-13 translate-x-7 area-b md:w-full">
              <div className="text-3xl">TOTAL: {orderDetails?.totalPrice}</div>
              <div className="flex gap-5">
                <SoldBtn itemSold={orderDetails} />
                <CancelledOrderBtn orderDetails={orderDetails} />
              </div>
            </div>
            <div className="area-c">
              <div className="flex-center text-xl mt-7">ITEMS</div>
              <Table
                pagination={false}
                showHeader={false}
                columns={itemColumns}
                dataSource={itemList}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const useFindOrderDetails = (orderNumber: number) => {
  const [orderDetails, setorderDetails] = useState<Orders>();
  const orderList = UserContext().state.OrderList;

  useEffect(() => {
    const details = orderList.find((val) => val.orderNumber === orderNumber);
    if (details) {
      setorderDetails(details);
    }
  }, [orderNumber, orderList]);
  return orderDetails;
};

type PropsOrderMenu = {
  orderList: Orders[];
};
