import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import IncomeList from '../../components/Income/IncomeList'
import { API_PATHS } from '../../Utils/apiPaths';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../Utils/axiosInstance';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import DeleteAlert from '../../components/DeleteAlert';
import toast from "react-hot-toast";

// ✅ Skeleton Loader Component
const IncomeSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-32 bg-gray-200 rounded-lg"></div>
    <div className="h-48 bg-gray-200 rounded-lg"></div>
  </div>
);

const Income = () => {
  useUserAuth()

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false) // 🔄 set default false

  // Fetch income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  };

  // Add income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income

    if (!source.trim()) {
      toast.error("Source is required.")
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.")
      return;
    }
    if (!date) {
      toast.error("Date is required.")
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source, amount, date, icon
      })

      setOpenAddIncomeModal(false)
      toast.success("Income added successfully")
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding Income", error.response?.data?.message || error.message)
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Income details deleted successfully")
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income", error.response?.data?.message || error.message)
    }
  };

  // Download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, { responseType: "blob" })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "income_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading income details", error.message)
      toast.error("Failed to download income details")
    }
  };

  useEffect(() => {
    fetchIncomeDetails()
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto"></div>
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <IncomeSkeleton />
        ) : (
          <div className="flex flex-col gap-6">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
            <IncomeList
              transactions={incomeData}
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              onDownload={handleDownloadIncomeDetails}
            />
          </div>
        )}

        {/* Add Income Modal */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Delete Alert Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
