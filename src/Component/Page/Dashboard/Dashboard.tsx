
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
  return <div>Charts</div>
}

const Sales = ()=>{
  return <div>Sales</div>
}

const PendingOrders = ()=>{
  return <div>Pending Orders</div>
}

