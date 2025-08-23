import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />
        {type === 'password' && (
          showPassword ? (
            <FaRegEye
              size={20}
              className="cursor-pointer text-primary"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
