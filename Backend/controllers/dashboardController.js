const Income = require("../models/Income");
const Expense = require("../models/Expense");

const { isValidObjectId, Types } = require("mongoose");

// @desc    Get dashboard data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId =   new Types.ObjectId(String(userId));

        // Fetch total expenses and total income for the user
        const totalIncome = await Income.aggregate([
            {
                $match: {
                    userId: userObjectId,
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);
     console.log("Total Income:", {totalIncome, userId: isValidObjectId(userId)});
 
        const totalExpense = await Expense.aggregate([
            {
                $match: {
                    userId: userObjectId,
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);

  // Get income transction in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: {
                $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)}, // 60 days ago    
        }).sort({ date: -1 });

        // Get total income in the last 60 days
        const totalIncomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0);

            // Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 60 days ago
            },
        }).sort({ date: -1 });

        // Get total expense in the last 30 days
        const ExpenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0);

            //Fetch the last 5 income and expense  transactions
        const lastTransactions = [
            ...(await Income.find({ userId })
            .sort({ date: -1 })
            .limit(5)).map((transaction) => ({
                ...transaction.toObject(),
                type: "Income",
            })),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (transaction) => ({
                    ...transaction.toObject(),
                    type: "Expense",
                })
            ),
        ].sort((a, b) => b.date - a.date).slice(0, 5);

        res.status(200).json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
           last30DaysExpenses:{
           total: ExpenseLast30Days,
           transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: totalIncomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,

        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Error fetching dashboard data:", error: error.message });
    }
}

       
