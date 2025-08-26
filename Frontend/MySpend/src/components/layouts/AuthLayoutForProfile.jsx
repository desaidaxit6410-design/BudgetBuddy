import React, { useContext } from "react";
import CARD_2 from "../../assets/images/card_2.png";
import CARD_1 from "../../assets/images/card_1.svg";
import { LuTrendingUpDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Footer from "../../pages/headerFooter/Footer";
import { UserContext } from "../../context/userContext";

const AuthLayout = ({ children }) => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER */}
      <header className="w-full bg-[#f5f3f2] shadow-sm sticky top-0 z-50"> 
        <div className="w-full px-6 md:px-12 py-4 flex items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={CARD_1} alt="Logo" className="h-6 w-6" />
            <span className="text-lg font-semibold text-black">MySpend</span>
          </div>

          <div className="ml-auto flex items-center gap-5">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-violet-600 cursor-pointer text-white text-sm hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex flex-1 flex-col md:flex-row">
        {/* LEFT - form / content */}
        <section className="w-full md:w-[60vw] px-6 md:px-12 pt-8 pb-12 flex flex-col">
          {children}
        </section>

        {/* RIGHT - stat + image */}
        <aside className="flex flex-col items-center justify-start md:w-[40vw] bg-violet-600 bg-auth-bg-img bg-cover bg-center p-8">
          {/* Stat card */}
          <div className="mt-6">
            <StatsInfoCard
              icon={<LuTrendingUpDown />}
              label="Track Your Expenses and Income"
              value="₹43,000"
              color="bg-primary"
            />
          </div>

          {/* CARD_2 image */}
          <div className="mt-12">
            <img
              src={CARD_2}
              alt="Card"
              className="w-64 mt-20 lg:w-[90%] shadow-lg"
            />
          </div>
        </aside>
      </main>

      {/* Promo Section */}
      <section className="bg-white flex items-center flex-col">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-primary sm:text-5xl">
              Manage Your Expenses{" "}
              <strong className="text-indigo-600">Control Your Money</strong>
            </h1>

            <p className="mt-4 text-base text-gray-900 sm:text-lg/relaxed">
              Start tracking your expenses today with{" "}
              <strong className="font-bold">MySpend</strong> and save tons of money!
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <a
                className="inline-block rounded border bg-violet-600 border-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                href="#"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer className="mt-20" />
    </div>
  );
};

export default AuthLayout;

// StatsInfoCard Component
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-md border border-gray-200">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] bg-violet-600 text-white ${color} rounded-full`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-sm text-black mb-1">{label}</h3>
        <p className="text-[20px] font-semibold">{value}</p>
      </div>
    </div>
  );
};
