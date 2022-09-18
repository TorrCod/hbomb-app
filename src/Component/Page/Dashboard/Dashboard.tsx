import { Space } from "antd";
import { useEffect, useState } from "react";
import { BsPeopleFill, BsCalendarDateFill } from "react-icons/bs";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
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
import TimeDateDropdown, { Key } from "../../../Feature/TimeDateDropdown";
import { UserContext } from "../../../hooks/UserContext";
import "./Dashboard.css";

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

const dailyData = (data: Orders[]) => {
  const chartData: { date: string; sales: string }[] = [];
  data.forEach((orders) => {
    const day = getDate(orders.date).getDay();
    const sales = orders.totalPrice;
    chartData.push({ date: day.toString(), sales: sales.toString() });
  });
  const simplified = simpliFyArr(chartData);
  return simplified;
};

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
  return (
    <div className="pd-1 grid gap-5">
      <div className="h-12" />
      <Charts />
      <Sales />
      <Link to="/dashboard/pending-orders">
        <PendingOrders />
      </Link>
    </div>
  );
};

const Charts = () => {
  const userContext = UserContext();
  const orderList = userContext.state.OrderList;
  const [transacCount, setTransacCount] = useState(0);
  const [dropdownChange, setDropdownChange] = useState<Key>("monthly");
  const [orderData, setOrderData] = useState<{ date: string; sales: string }[]>(
    []
  );
  const [dateNow, setDateNow] = useState<Date>(new Date());
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let data: { date: string; sales: string }[] = [];

    const salesData = orderList.filter(({ status }) => status === "sucess");

    if (dropdownChange === "daily") {
      data = dailyData(salesData);
    }

    if (dropdownChange === "monthly") {
      data = monthlyData(salesData);
    }

    setOrderData(data);
  }, [dropdownChange, orderList]);

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

  const onChangeDropdown = (key: any) => {
    setDropdownChange(key);
  };

  return (
    <div className="bg-white box-shadow-default h-30 roundcorner-1em pd-bottop-1 dashboard-containter wd-full">
      <div className="mg-1">
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

      <ResponsiveContainer width="100%" height="50%">
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

      <Space direction="horizontal" className="wd-full flex-center">
        <TimeDateDropdown onChange={onChangeDropdown} />
      </Space>
    </div>
  );
};

type TableData = { name: string; date: Date; price: string }[];

const Sales = () => {
  const userContext = UserContext();
  const orderList = userContext.state.OrderList;
  const tableData = useOrderListTable("success", orderList);

  return (
    <div className="box-shadow-default overflow-hidden bg-white cursor-pointer roundcorner-1em pd-bottop-3 dashboard-containter wd-full">
      <h1 className="flex-center text-2xl">SALES</h1>
      <div className="flex-center p-2">
        <table className="dashboard-table text-lg text-black opacity-75 max-h-40">
          <tbody>
            {tableData.map(({ date, name, price }, index) => (
              <tr key={index}>
                <td>{name}</td>
                <td className="text-left">
                  {date.toLocaleDateString("en-US")}
                </td>
                <td className="text-end">{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PendingOrders = () => {
  const userContext = UserContext();
  const orderList = userContext.state.OrderList;
  const tableData = useOrderListTable("pending", orderList);

  // const [tableData, setTableData] = useState<TableData>([]);
  // const userContext = UserContext();
  // const orderList = userContext.state.OrderList;

  // useEffect(() => {
  //   //Update Table Data
  //   const holder: TableData = [];
  //   const getData = (name: string, date: Date, price: string) => ({
  //     name: name,
  //     date: date,
  //     price: price,
  //   });
  //   for (const { name, date, totalPrice, status } of orderList) {
  //     const isPending = status === "pending";
  //     if (isPending)
  //       holder.push(getData(name, getDate(date), "P" + totalPrice));
  //   }
  //   setTableData(holder);

  //   return () => {
  //     holder.length = 0;
  //   };
  // }, [orderList]);

  // useEffect(() => {
  //   // fetch orders every 5 seconds
  //   const updateOrderList = userContext.updateOrderList;
  //   const interval = setInterval(() => {
  //     updateOrderList();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="box-shadow-default bg-white cursor-pointer overflow-hidden hover:scale-105 transition ease-out roundcorner-1em pd-bottop-3 dashboard-containter wd-full max-h-96">
      <h1 className="flex-center text-2xl">PENDING ORDERS</h1>
      <div className="flex-center p-2">
        <table className="dashboard-table text-lg text-black opacity-75">
          <tbody>
            {tableData.map(({ date, name, price }, index) => (
              <tr className="mb-3" key={index}>
                <td>{name}</td>
                <td className="text-left">
                  {date.toLocaleDateString("en-US")}
                </td>
                <td className="text-end">{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const useOrderListTable = (
  status: "pending" | "success",
  orderList: Orders[]
) => {
  const [tableData, setTableData] = useState<TableData>([]);
  const userContext = UserContext();

  useEffect(() => {
    //Update Table Data
    const holder: TableData = [];
    const getData = (name: string, date: Date, price: string) => ({
      name: name,
      date: date,
      price: price,
    });
    for (const { name, date, totalPrice, status: orderStatus } of orderList) {
      const isPending = orderStatus === status;
      if (isPending)
        holder.push(getData(name, getDate(date), "P" + totalPrice));
    }
    setTableData(holder);

    return () => {
      holder.length = 0;
    };
  }, [orderList]);

  useEffect(() => {
    // fetch orders every 5 seconds
    const updateOrderList = userContext.updateOrderList;
    const interval = setInterval(() => {
      updateOrderList();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return tableData;
};
