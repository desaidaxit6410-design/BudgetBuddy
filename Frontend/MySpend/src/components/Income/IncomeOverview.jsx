import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../Utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'

const IncomeOverview = ({ transactions, onAddIncome }) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions )
        setChartData(result)

        return () => { }
    }, [transactions])

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="text-xs md:text-sm text-violet-600 mt-0.5">
                        Track your earning over time and track your income trends.
                    </p>
                </div>

                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className='text-lg md:text-xl' />
                    Add Income
                </button>
            </div>

            <div className="mt-10">
                <CustomBarChart data={chartData} />
            </div>
        </div>
    )
}

export default IncomeOverview