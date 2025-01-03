import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
            {user?.fullname?.charAt(0) || "U"}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">{user?.fullname || "Unknown User"}</h1>
          <p className="text-sm text-gray-500">
            {user?.role === "admin" ? "Administrator" : "User"}
          </p>
        </div>

        {/* Profile Details */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Email */}
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{user?.email || "Not Available"}</p>
            </div>
            {/* Mobile Number */}
            <div>
              <p className="text-sm text-gray-500">Mobile Number</p>
              <p className="font-medium text-gray-800">{user?.mobilenumber || "Not Available"}</p>
            </div>
            {/* Role */}
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-800 capitalize">{user?.role || "Unknown"}</p>
            </div>
            {/* Joined Date */}
           
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Edit Profile
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
