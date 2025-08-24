const Income = require("../models/Income");
const xlsx = require("xlsx");

// Add Income Source
exports.addIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, source, amount, date } = req.body;

    // Check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new income entry
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    // Save income to database
    await newIncome.save();

    res.status(201).json(newIncome);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding income", error: error.message });
  }
};

// Get All Income Sources
exports.getAllIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching income", error: error.message });
  }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting income", error: error.message });
  }
};

// Download Income as Excel
exports.downloadIncomeExcel = async (req, res) => {
  try {
    const userId = req.user._id;
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    if (!incomes || incomes.length === 0) {
      return res.status(404).json({ message: "No incomes found" });
    }

    // Prepare Excel data
    const excelData = incomes.map((income) => ({
      Source: income.source,
      Amount: income.amount,
      Date: income.date ? income.date.toISOString().split("T")[0] : "",
    }));

    // Create workbook
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(excelData);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Write workbook to buffer
    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set headers for file download
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=income_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send file buffer
    res.send(buffer);
  } catch (error) {
    console.error("Error downloading income:", error);
    return res
      .status(500)
      .json({ message: "Error downloading income", error: error.message });
  }
};
