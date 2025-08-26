import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from '../../Utils/data.js';
import CharAvatar from '../Cards/CharAvatar.jsx';
import { LuMenu } from "react-icons/lu";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // toggle state

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-violet-600 text-white p-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <LuMenu className="text-xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-[61px] left-0 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5
          z-20 transform transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:top-0 md:h-auto
        `}
      >
        {/* User Avatar & Name */}
        <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              className='w-20 h-20 bg-slate-400 rounded-full'
              alt="Profile"
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}

          <h5 className='text-gray-950 text-xl font-semibold leading-6'>
            {user?.fullName || ""}
          </h5>
        </div>

        {/* Side Menu Buttons */}
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.label;
          return (
            <button
              key={`menu_${index}`}
              className={`
                w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer active:opacity-70
                ${isActive ? "text-white bg-violet-600" : "text-black hover:bg-purple-600 hover:text-white"}
              `}
              onClick={() => handleClick(item.path)}
            >
              <item.icon className='text-xl' />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
