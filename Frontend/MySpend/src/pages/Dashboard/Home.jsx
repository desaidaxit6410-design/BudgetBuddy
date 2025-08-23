import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../../components/Cards/InfoCard'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from "react-icons/io"
import { addIndianThousandSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransaction from '../../components/Dashboard/ExpenseTransaction';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import SeeMoreDropdown from '../../components/SeeMoreDropdown';
import Skeleton from '../../components/Skeleton';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("something went wrong. Please try again ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* 🔹 Top Info Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {loading ? (
            <>
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-28 w-full" />
            </>
          ) : (
            <>
              <InfoCard
                icon={<IoMdCard />}
                label="Total Balance"
                value={addIndianThousandSeparator(dashboardData?.totalBalance || 0)}
                color="bg-violet-500"
              />
              <InfoCard
                icon={<LuWalletMinimal />}
                label="Total Income"
                value={addIndianThousandSeparator(dashboardData?.totalIncome || 0)}
                color="bg-green-500"
              />
              <InfoCard
                icon={<LuHandCoins />}
                label="Total Expense"
                value={addIndianThousandSeparator(dashboardData?.totalExpense || 0)}
                color="bg-red-500"
              />
            </>
          )}
        </div>

        {/* 🔹 Bottom Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          {loading ? (
            <>
              <Skeleton className="h-60 w-full" />
              <Skeleton className="h-60 w-full" />
              <Skeleton className="h-60 w-full" />
              <Skeleton className="h-60 w-full" />
              <Skeleton className="h-60 w-full" />
              <Skeleton className="h-60 w-full" />
            </>
          ) : (
            <>
              <RecentTransactions
                transactions={dashboardData?.recentTransactions}
                onSeeMore={<SeeMoreDropdown />}
              />

              <FinanceOverview
                totalBalance={dashboardData?.totalBalance || 0}
                totalIncome={dashboardData?.totalIncome || 0}
                totalExpense={dashboardData?.totalExpense || 0}
              />

              <ExpenseTransaction
                transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                onSeeMore={() => { navigate("/expense") }}
              />

              <Last30DaysExpenses
                data={dashboardData?.last30DaysExpenses?.transactions}
              />

              <RecentIncomeWithChart
                data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
                totalIncome={dashboardData?.totalIncome}
              />

              <RecentIncome
                transactions={dashboardData?.last60DaysIncome?.transactions || []}
                onSeeMore={() => navigate("/income")}
              />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
