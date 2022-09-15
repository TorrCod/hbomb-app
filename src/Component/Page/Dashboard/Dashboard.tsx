import { Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { BsPeopleFill, BsCalendarDateFill } from 'react-icons/bs';
import { FaMoneyBillWaveAlt } from 'react-icons/fa';
import {GrLinkNext,GrLinkPrevious} from 'react-icons/gr'
import { useWindowSize } from 'react-use';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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

const Charts = () => {
  const [opt, setOpt] = useState<{'firstHalf'?:boolean,'lasthalf'?:boolean}>({})
  const {width} = useWindowSize()
  const [yearNow, setYearNow] = useState(0)
  const chartData = [
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
    {
      name: 'Dec',
      sales: 2700,
    }
  ];

  const halfYearChartData = (opt:{'firstHalf'?:boolean,'lasthalf'?:boolean}) => {
    if (opt.firstHalf) return chartData.slice(0,6);
    else return chartData.slice(6)
  }

  useEffect(() => {
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    const monthNow = date.getMonth();
    if (monthNow > 6) setOpt({lasthalf:true});
    else setOpt({firstHalf:true});
    setYearNow(date.getFullYear())
  }, [])
  

  return (
    <div className='bg-white roundcorner-1em pd-bottop-1 dashboard-containter'> 

      <div className='mg-1'>
        <div className='fontz-xxl flex-center-start gap-1'><FaMoneyBillWaveAlt/>15.3k</div>
        <div className='fontz-l flex-center-start clr-darklight gap-1'><BsPeopleFill/>45 Customers</div>
        <div className='fontz-l flex-center-start clr-darklight gap-1'><BsCalendarDateFill/>Year of {yearNow}</div>   
      </div>

      <BarChart
        width = {(width <= 400)?width-50:400}
        height={200}
        data={halfYearChartData(opt)}
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

      <Space direction='horizontal' className='wd-full flex-center'>
      <Button disabled={opt.firstHalf} className='flex-center' onClick={()=>setOpt({firstHalf:true})}><GrLinkPrevious/></Button>
      <Button disabled={opt.lasthalf} className='flex-center' onClick={()=>setOpt({lasthalf:true})}><GrLinkNext/></Button>
      </Space>

    </div>
  )
}

const Sales = ()=>{
  return <div>Sales</div>
}

const PendingOrders = ()=>{
  return <div>Pending Orders</div>
}

