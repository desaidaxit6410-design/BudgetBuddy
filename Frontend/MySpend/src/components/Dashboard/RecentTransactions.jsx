import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from "moment";
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg md:text-xl">Recent Transactions</h5>

                {/* If onSeeMore is a React element, render it.
                    Otherwise, render the old button fallback */}
                {React.isValidElement(onSeeMore) ? (
                    onSeeMore
                ) : (
                    <button className='card-btn cursor-pointer' onClick={onSeeMore}>
                        See All <LuArrowRight className="text-base" />
                    </button>
                )}
            </div>

            <div className="mt-6">
                {transactions && transactions.length > 0 ? (
                    transactions.slice(0, 5).map((item) => (
                        <TransactionInfoCard
                            key={item._id || item.date} // fallback key if no _id
                            title={item.category || item.source || "Unknown"}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={item.type || "expense"} // default to expense
                            hideDeleteBtn
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No recent transactions</p>
                )}
            </div>
        </div>
    )
}

export default RecentTransactions
