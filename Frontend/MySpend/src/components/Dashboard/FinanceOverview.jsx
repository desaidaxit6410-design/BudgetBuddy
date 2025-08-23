import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875cf5", "#22C55E", "#EF4444"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

  const balanceData = [
  { name: "Total Balance", value: totalBalance },
  { name: "Total Income", value: totalIncome },
  { name: "Total Expense", value: totalExpense },
]
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg md:text-xl">Finance Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${Number(totalBalance).toLocaleString("en-IN")}`}

        colors={COLORS}
        showTextAnchor
      />
    </div>
  )
}

export default FinanceOverview