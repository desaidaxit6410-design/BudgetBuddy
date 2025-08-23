const Expense = require("../models/Expense");
const xlsx = require("xlsx");

// Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, category, amount, date } = req.body;

    // Check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new expense entry
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    // Save expense to database
    await newExpense.save();

    res.status(201).json(newExpense);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding expense", error: error.message });
  }
};

// Get All Expenses
exports.getAllExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching expenses", error: error.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting expense", error: error.message });
  }
};

// Download Expenses as Excel
exports.downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user._id;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ message: "No expenses found" });
    }

    // Prepare Excel data
    const excelData = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date ? item.date.toISOString().split("T")[0] : "",
    }));

    // Create workbook
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(excelData);
    xlsx.utils.book_append_sheet(wb, ws, "Expenses");

    // Write workbook to buffer
    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set headers for file download
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send file buffer
    res.send(buffer);
  } catch (error) {
    console.error("Error downloading expense:", error);
    return res
      .status(500)
      .json({ message: "Error downloading expense", error: error.message });
  }
};
