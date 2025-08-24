const mongoose = require('mongoose');
const ExpenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    icon: {
        type: String
    },
    category: {
        type: String,
        required: true // Category of the expense (e.g., Food, Transport, etc.)
    },
    amount: {
        type: Number,
        required: true // Amount of the expense
    },
    date: {
        type: Date,
        default: Date.now // Date of the expense
    },
},
    { timestamps: true }
);

const Expenses = mongoose.model('Expense', ExpenseSchema);
module.exports = Expenses;
