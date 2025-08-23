import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../Utils/helper'
import CustomBarChartForLast30DaysExpense from '../Charts/CustomBarChartForLast30DaysExpense'

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareExpenseBarChartData(data)
    console.log("Prepared Bar Chart Data:", result)
    setChartData(result)
  }, [data])

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg md:text-xl">Last 30 Days Expense</h5>
      </div>

      {/* amount = bar height, category = x-axis */}
      <CustomBarChartForLast30DaysExpense
        data={chartData} 
        dataKey="amount" 
        xAxisKey="category" 
      />
      
    </div>
  )
}

export default Last30DaysExpenses
