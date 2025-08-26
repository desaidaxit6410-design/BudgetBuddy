import React, { useRef, useState, useEffect } from "react";
import { LuUpload } from "react-icons/lu";
import User from "../Userprofile/User";
import Delete from "../Userprofile/Delete";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Generate preview URL when file changes
  useEffect(() => {
    if (image && image instanceof File) {
      const preview = URL.createObjectURL(image);
      setPreviewUrl(preview);

      return () => URL.revokeObjectURL(preview); // cleanup
    } else if (!image) {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // update parent state with File object
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = ""; // reset file input
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <User stroke="#9333ea" width={32} height={32} />

          <button
            type="button"
            onClick={onChooseFile}
            className="h-8 w-8 flex items-center justify-center bg-purple-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile preview"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="h-8 w-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <Delete stroke="#ffffff" width={20} height={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
