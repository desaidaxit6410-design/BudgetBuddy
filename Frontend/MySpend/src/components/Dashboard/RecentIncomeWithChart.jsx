import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#875CF5", "#1E90FF", "#32CD32","#FF69B4", "#FFD700', #FA2C37", "#FF6900", "#4f39f6", "#FF00FF", "#00CED1", "#FF4500", "#8A2BE2", "#7FFF00", "#D2691E", "#FF1493", "#00BFFF"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data.map((item)=>({
            name: item?.source,
            value: item?.amount,
        }))

        setChartData(dataArr);
    }

    useEffect(() => {
      prepareChartData()
    
      return () => {}
    }, [data])

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg md:text-xl">Last 60 Days Income</h5>
            </div>

            <div className="w-full h-[350px]"> 
  <CustomPieChart
    data={chartData}
    label="Total Income"
    totalAmount={`₹${Number(totalIncome).toLocaleString("en-IN")}`}
    showTextAnchor
    colors={COLORS}
  />
</div>
        </div>
    )
}

export default RecentIncomeWithChart