import React, { useState } from "react";
import CARD_2 from "../../assets/images/card_2.png";
import CARD_1 from "../../assets/images/card_1.svg";
import { LuTrendingUpDown } from "react-icons/lu";
import { Link } from "react-router-dom";
import Footer from "../../pages/headerFooter/Footer";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const AuthLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER */}
      <header className="w-full bg-[#f5f3f2] shadow-sm sticky top-0 z-50">
        <div className="w-full px-6 md:px-12 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={CARD_1} alt="Logo" className="h-6 w-6" />
            <span className="text-lg font-semibold text-black">MySpend</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://github.com/shivam15102005/MySpend-Expense-Tracker.git"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md bg-violet-600 text-white text-sm hover:bg-blue-700 cursor-pointer transition-transform hover:scale-105"
            >
              Documentation
            </a>

            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-violet-600 text-white text-sm hover:bg-blue-700 cursor-pointer transition-transform hover:scale-105"
            >
              Sign in
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 rounded-md bg-violet-600 text-white text-sm hover:bg-blue-700 cursor-pointer transition-transform hover:scale-105">
                Sign up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-violet-700 text-2xl cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Sidebar Menu for Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-[#f5f3f2] shadow-lg z-50 flex flex-col p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
            >
              {/* Close Button */}
              <button
                className="self-end text-2xl text-violet-700 mb-6 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                <FiX />
              </button>

              {/* Links */}
              <a
                href="https://github.com/shivam15102005/MySpend-Expense-Tracker.git"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 rounded-md bg-violet-600 text-white text-sm hover:bg-blue-700 text-center mb-4 cursor-pointer transition-transform hover:scale-105"
              >
                Documentation
              </a>

              <Link
                to="/login"
                className="w-full px-4 py-2 rounded-md bg-violet-600 text-white text-sm hover:bg-blue-700 text-center mb-4 cursor-pointer transition-transform hover:scale-105"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link to="/signup" className="w-full">
                <button
                  className="w-full px-4 py-2 rounded-md bg-violet-600 text-white text-sm hover:bg-blue-700 cursor-pointer transition-transform hover:scale-105"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </button>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex flex-1 flex-col md:flex-row">
        {/* LEFT - form */}
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

      {/* HERO SECTION */}
      <section className="bg-white flex items-center flex-col ">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-primary sm:text-5xl">
              Manage Your Expenses{" "}
              <strong className="text-indigo-600">Control Your Money </strong>
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-900 sm:text-lg/relaxed">
              Start tracking your expenses today with{" "}
              <strong className="font-bold">MySpend</strong> and save tons of
              money!
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <a
                className="inline-block rounded border bg-violet-600 border-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 cursor-pointer transition-transform hover:scale-105"
                href="#"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer className="mt-200" />
    </div>
  );
};

export default AuthLayout;

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
