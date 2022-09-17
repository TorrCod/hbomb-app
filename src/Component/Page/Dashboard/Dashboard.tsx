import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import { BsPeopleFill, BsCalendarDateFill } from "react-icons/bs";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
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
  const userContext = UserContext()
  const orderList = userContext.state.OrderList
  
  const [opt, setOpt] = useState<{ firstHalf?: boolean; lasthalf?: boolean }>(
    {}
  );
  const [yearNow, setYearNow] = useState(0);
  const [orderData, setOrderData] = useState<{ date: string; sales: string }[]>(
    []
  );
  const chartData = [
    {
      name: "Jan",
      sales: 1500,
    },
    {
      name: "Feb",
      sales: 2000,
    },
    {
      name: "March",
      sales: 1600,
    },
    {
      name: "April",
      sales: 1800,
    },
    {
      name: "May",
      sales: 1000,
    },
    {
      name: "Jun",
      sales: 2300,
    },
    {
      name: "Jul",
      sales: 2100,
    },
    {
      name: "Aug",
      sales: 1300,
    },
    {
      name: "Sept",
      sales: 1450,
    },
    {
      name: "Oct",
      sales: 1000,
    },
    {
      name: "Nov",
      sales: 800,
    },
    {
      name: "Dec",
      sales: 2700,
    },
  ];

  type Month =
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sept"
    | "Oct"
    | "Nov"
    | "Dec";

  const yearlyData = (
    orderList: Orders[]
  ): { date: Month; sales: number }[] => {
    orderList.forEach((order, index) => {
      console.log(order.date.getMonth);
    });

    return [];
  };

  const halfYearChartData = (opt: {
    firstHalf?: boolean;
    lasthalf?: boolean;
  }) => {
    if (opt.firstHalf) return chartData.slice(0, 6);
    else return chartData.slice(6);
  };

  useEffect(() => {
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    const monthNow = date.getMonth();
    if (monthNow > 6) setOpt({ lasthalf: true });
    else setOpt({ firstHalf: true });
    setYearNow(date.getFullYear());

    // yearlyData();
  }, []);

  return (
    <div className="bg-white h-30 roundcorner-1em pd-bottop-1 dashboard-containter wd-full">
      <div className="mg-1">
        <div className="fontz-xxl flex-center-start gap-1">
          <FaMoneyBillWaveAlt />
          15.3k
        </div>
        <div className="fontz-l flex-center-start clr-darklight gap-1">
          <BsPeopleFill />
          45 Customers
        </div>
        <div className="fontz-l flex-center-start clr-darklight gap-1">
          <BsCalendarDateFill />
          Year of {yearNow}
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
        <Button
          disabled={opt.firstHalf}
          className="flex-center"
          onClick={() => setOpt({ firstHalf: true })}
        >
          <GrLinkPrevious />
        </Button>
        <Button
          disabled={opt.lasthalf}
          className="flex-center"
          onClick={() => setOpt({ lasthalf: true })}
        >
          <GrLinkNext />
        </Button>
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
