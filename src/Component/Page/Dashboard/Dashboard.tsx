import { BsPeople, BsCalendarDate, BsPeopleFill, BsCalendarDateFill } from 'react-icons/bs';
import { FaMoneyBillWaveAlt } from 'react-icons/fa';
import { useWindowSize } from 'react-use';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css'

export const Dashboard = () => {
  return (
    <div className="fullpage-center">
        <Charts/>
        <Sales/>
        <PendingOrders/>
    </div>
  )
}

const Charts = ()=>{
  const firstSixMonthsData = [
    {
      name: 'Jan',
      sales: 1500,
    },
    {
      name: 'Feb',
      sales: 2000,
    },
    {
      name: 'March',
      sales: 1600,
    },
    {
      name: 'April',
      sales: 1800,
    },
    {
      name: 'May',
      sales: 1000,
    },
    {
      name: 'Jun',
      sales: 2300,
    },
  ];

  const secondSixMonthsData = [
    {
      name:'Jul',
      sales:2100
    },
    {
      name: 'Aug',
      sales: 1300,
    },
    {
      name: 'Sept',
      sales: 1450,
    },
    {
      name: 'Oct',
      sales: 1000,
    },
    {
      name: 'Nov',
      sales: 800,
    },
    ,
    {
      name: 'Dec',
      sales: 2700,
    },
    ,
    {
      name: 'Jul',
      sales: 2400,
    },
  ];

  const {width} = useWindowSize()

  return (
    <div className='bg-white roundcorner-1em pd-top-1 dashboard-containter'> 

      <div className='mg-1'>
        <div className='fontz-xxl flex-center-start gap-1'><FaMoneyBillWaveAlt/>15.3k</div>
        <div className='fontz-l flex-center-start clr-darklight gap-1'><BsPeopleFill/>45 Customers</div>
        <div className='fontz-l flex-center-start clr-darklight gap-1'><BsCalendarDateFill/>Month of <b>December</b> 2022</div>   
      </div>

      <BarChart
        width = {(width <= 400)?width-50:400}
        height={200}
        data={firstSixMonthsData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#e3bd9b" />
      </BarChart>
    </div>
  )
}

const Sales = ()=>{
  return <div>Sales</div>
}

const PendingOrders = ()=>{
  return <div>Pending Orders</div>
}

