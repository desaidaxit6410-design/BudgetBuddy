import React, { useState, useRef, useEffect } from "react";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const SeeMoreDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="card-btn cursor-pointer"
      >
        See All <LuArrowRight className="text-base" />
      </button>

      {open && (
        <div className="card-btn cursor-pointer flex flex-row ">
          <button
            onClick={() => {
              setOpen(false);
              navigate("/expense");
            }}
            className="card-btn cursor-pointer"
          >
            Expense
          </button>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/income");
            }}
            className="card-btn cursor-pointer"
          >
            Income  
          </button>
        </div>
      )}
    </div>
  );
};

export default SeeMoreDropdown;
