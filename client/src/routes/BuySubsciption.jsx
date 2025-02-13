import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BuySubscription = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState([]);

  const handleAddBooking = (date) => {
    if (!date) return;
    
    // Convert date to string format
    const formattedDate = date.toLocaleDateString("en-GB"); 
    
    // Prevent duplicate dates
    if (bookings.some((booking) => booking.date === formattedDate)) return;

    setBookings([
      ...bookings,
      { date: formattedDate, startTime: "", endTime: "" },
    ]);
  };

  const handleTimeChange = (index, field, value) => {
    const updatedBookings = [...bookings];
    updatedBookings[index][field] = value;
    setBookings(updatedBookings);
  };

  const handleDelete = (index) => {
    setBookings(bookings.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Select a Date</h2>
        <div className="border p-4 rounded-lg">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              handleAddBooking(date);
            }}
            inline
          />
        </div>
      </div>

      {/* Booking Table */}
      {bookings.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Date</th>
                <th className="border p-2">Start Time</th>
                <th className="border p-2">End Time</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{booking.date}</td>
                  <td className="border p-2">
                    <input
                      type="time"
                      value={booking.startTime}
                      onChange={(e) =>
                        handleTimeChange(index, "startTime", e.target.value)
                      }
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="time"
                      value={booking.endTime}
                      onChange={(e) =>
                        handleTimeChange(index, "endTime", e.target.value)
                      }
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Proceed Button */}
      <button className="mt-6 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
        Proceed To Booking
      </button>
    </div>
  );
};

export default BuySubscription;
