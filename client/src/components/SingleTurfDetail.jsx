import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const SingleTurfDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const turf = location.state?.turf;

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [startSlot, setStartSlot] = useState(null);
  const [endSlot, setEndSlot] = useState(null);

  if (!turf) {
    return <p>Loading turf details...</p>;
  }

  const getCurrentWeekDates = () => {
    const startDate = new Date(); // Current date
    const weekDates = [];

    // Generate 7 days starting from today
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      weekDates.push(
        currentDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        })
      );
    }
    return weekDates;
  };

  const times = [
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
    "12:00 AM",
  ];

  const weekDates = getCurrentWeekDates();

  const isNightTime = (time) => {
    const [hourString, minuteString] = time.split(":");
    const period = time.slice(-2); // Extract AM/PM
    let hour = parseInt(hourString, 10);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }
    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return hour >= 18 || hour < 6; // Nighttime is between 6 PM and 6 AM
  };

  const toggleSlotSelection = (date, time) => {
    const slot = { date, time };
    if (!startSlot) {
      setStartSlot(slot);
    } else if (!endSlot) {
      setEndSlot(slot);
    } else {
      setStartSlot(slot);
      setEndSlot(null);
    }
  };

  const handleProceedToBooking = () => {
    if (!startSlot || !endSlot) {
      alert("Please select both a start time and an end time.");
      return;
    }

    if (startSlot.date !== endSlot.date) {
      alert("Start time and end time must be on the same day.");
      return;
    }

    // Redirect to /turfs/:id/booking and pass the data
    navigate(`/turfs/${turf._id}/booking`, {
      state: { turf, startSlot, endSlot },
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 shadow-lg border rounded-lg mb-6">
      <h1 className="text-3xl font-bold mb-4">{turf.name}</h1>
      <img
        src={turf.images}
        alt={turf.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-lg text-gray-700 mb-2">
        <strong>Location:</strong> {turf.location}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Price:</strong> ₹{turf.price} per hour
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Ratings:</strong> {turf.ratings} / 5
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Description:</strong> {turf.description}
      </p>

      {/* Schedule UI */}
      <div
        className="overflow-y-auto overflow-x-auto mb-6"
        style={{ maxHeight: "400px" }}
      >
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2"></th>
              {weekDates.map((date, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-red-500"
                >
                  {date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, rowIndex) => (
              <tr key={rowIndex}>
                <td
                  className={`border border-gray-300 px-4 py-2 text-center ${
                    isNightTime(time) ? "bg-black text-white" : "bg-yellow-100"
                  }`}
                >
                  {isNightTime(time) ? "🌙" : "🌞"}
                </td>
                {weekDates.map((date, colIndex) => {
                  const isSelected =
                    (startSlot &&
                      startSlot.date === date &&
                      startSlot.time === time) ||
                    (endSlot && endSlot.date === date && endSlot.time === time);

                  return (
                    <td
                      key={colIndex}
                      className={`border border-gray-300 px-4 py-2 text-center cursor-pointer ${
                        isNightTime(time)
                          ? isSelected
                            ? "bg-green-500 text-white"
                            : "bg-black text-white hover:bg-gray-800"
                          : isSelected
                          ? "bg-green-500 text-white"
                          : "bg-yellow-100 text-gray-800 hover:bg-yellow-200"
                      }`}
                      onClick={() => toggleSlotSelection(date, time)}
                    >
                      {time}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleProceedToBooking}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Proceed to Booking
        </button>
      </div>
    </div>
  );
};

export default SingleTurfDetail;
