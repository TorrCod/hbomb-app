import { Space } from "antd";
import { useEffect, useState } from "react";
import { BsPeopleFill, BsCalendarDateFill } from "react-icons/bs";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
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
    <div className="fullpage-center pd-1">
      <Charts />
      <Sales />
      <PendingOrders />
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

    if (dropdownChange === "daily") {
      data = dailyData(orderList);
    }

    if (dropdownChange === "monthly") {
      data = monthlyData(orderList);
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
    <div className="bg-white h-30 roundcorner-1em pd-bottop-1 dashboard-containter wd-full">
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

const Sales = () => {
  return <div>Sales</div>;
};

const PendingOrders = () => {
  return (
    <div className="bg-white roundcorner-1em pd-bottop-1 dashboard-containter">
      PENDING ORDERS
      <table>
        <tbody>
          <tr>
            <td>User1</td>
            <td>Jan 2 2022</td>
            <td>P500</td>
          </tr>
          <tr>
            <td>User2</td>
            <td>Jan 3 2022</td>
            <td>P400</td>
          </tr>
          <tr>
            <td>User3</td>
            <td>Jan 6 2022</td>
            <td>P5000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
