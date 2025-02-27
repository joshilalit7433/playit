import React, { useState } from 'react';

const TurfForm = () => {
  const [formData, setFormData] = useState({
    turfName: '',
    turfImages: '',
    turfAddress: '',
    pricePerHour: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can replace this with your form submission logic
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-2 border-black">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Turf Name:</label>
            <input
              type="text"
              name="turfName"
              value={formData.turfName}
              onChange={handleChange}
              className="w-2/3 p-2 border border-black rounded"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Turf Images:</label>
            <input
              type="text"
              name="turfImages"
              value={formData.turfImages}
              onChange={handleChange}
              className="w-2/3 p-2 border border-black rounded"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Turf Address:</label>
            <input
              type="text"
              name="turfAddress"
              value={formData.turfAddress}
              onChange={handleChange}
              className="w-2/3 p-2 border border-black rounded"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Price per hour:</label>
            <input
              type="number"
              name="pricePerHour"
              value={formData.pricePerHour}
              onChange={handleChange}
              className="w-2/3 p-2 border border-black rounded"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-2/3 p-2 border border-black rounded"
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-white border-2 border-black rounded hover:bg-gray-200 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TurfForm;
