import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../Utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions)
        setChartData(result)

        return () => { }
    }, [transactions])

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Expense Overview</h5>
                    <p className="text-xs md:text-sm text-violet-600 mt-0.5">
                        Track your spending trends over time and gain insights over your money.
                    </p>
                </div>

                <button className="add-btn" onClick={onExpenseIncome}>
                    <LuPlus className='text-lg md:text-xl' />
                    Add Expense
                </button>
            </div>

            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default ExpenseOverview