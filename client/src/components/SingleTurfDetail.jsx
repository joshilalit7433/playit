import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const SingleTurfDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const turf = location.state?.turf;

  const { user } = useSelector((store) => store.auth);
  const [startSlot, setStartSlot] = useState(null);
  const [endSlot, setEndSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/booking/get-turf-bookings/${turf._id}`
        );
        setBookedSlots(response.data.bookings || []);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    if (turf) {
      fetchBookedSlots();
    }
  }, [turf]);

  if (!turf) {
    return <p>Loading turf details...</p>;
  }

  const getCurrentWeekDates = () => {
    const startDate = new Date();
    const weekDates = [];

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
    "11:59 PM",
  ];

  const weekDates = getCurrentWeekDates();

  const isNightTime = (time) => {
    const [hourString] = time.split(":");
    const period = time.slice(-2);
    let hour = parseInt(hourString, 10);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }
    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return hour >= 18 || hour < 6;
  };

  const isSlotBooked = (date, time) => {
    return bookedSlots.some((slot) => {
      const bookedDate = new Date(slot.bookingDate);
      const formattedBookedDate = bookedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });

      if (formattedBookedDate !== date) return false;

      // Convert current slot time to minutes for comparison
      const [slotTime, slotPeriod] = time.split(" ");
      const [slotHours, slotMinutes] = slotTime.split(":").map(Number);
      let slotTotalMinutes = slotHours * 60 + slotMinutes;
      if (slotPeriod === "PM" && slotHours !== 12) slotTotalMinutes += 12 * 60;
      if (slotPeriod === "AM" && slotHours === 12) slotTotalMinutes = 0;

      // Convert booking start time to minutes
      const [startTime, startPeriod] = slot.startTime.split(" ");
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      let startTotalMinutes = startHours * 60 + startMinutes;
      if (startPeriod === "PM" && startHours !== 12)
        startTotalMinutes += 12 * 60;
      if (startPeriod === "AM" && startHours === 12) startTotalMinutes = 0;

      // Convert booking end time to minutes
      const [endTime, endPeriod] = slot.endTime.split(" ");
      const [endHours, endMinutes] = endTime.split(":").map(Number);
      let endTotalMinutes = endHours * 60 + endMinutes;
      if (endPeriod === "PM" && endHours !== 12) endTotalMinutes += 12 * 60;
      if (endPeriod === "AM" && endHours === 12) endTotalMinutes = 0;

      // Check if current slot time falls within the booking period
      return (
        slotTotalMinutes >= startTotalMinutes &&
        slotTotalMinutes <= endTotalMinutes
      );
    });
  };

  const toggleSlotSelection = (date, time) => {
    if (isSlotBooked(date, time)) return;

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

  const isBackwardTiming = () => {
    const startTimeParts = startSlot.time.split(" ");
    const endTimeParts = endSlot.time.split(" ");
    const [startHours, startMinutes] = startTimeParts[0].split(":").map(Number);
    const [endHours, endMinutes] = endTimeParts[0].split(":").map(Number);

    const startPeriod = startTimeParts[1];
    const endPeriod = endTimeParts[1];

    let startHours24 =
      startPeriod === "PM" && startHours !== 12 ? startHours + 12 : startHours;
    let endHours24 =
      endPeriod === "PM" && endHours !== 12 ? endHours + 12 : endHours;

    if (startPeriod === "AM" && startHours === 12) startHours24 = 0;
    if (endPeriod === "AM" && endHours === 12) endHours24 = 0;

    const start = new Date(1970, 0, 1, startHours24, startMinutes);
    const end = new Date(1970, 0, 1, endHours24, endMinutes);

    return end < start;
  };

  const handleProceedToBooking = () => {
    if (!user) {
      alert("Please log in to proceed with booking.");
      navigate("/login");
      return;
    }

    if (!startSlot || !endSlot) {
      alert("Please select both a start time and an end time.");
      return;
    }

    if (startSlot.date !== endSlot.date) {
      alert("Start time and end time must be on the same day.");
      return;
    }

    if (isBackwardTiming()) {
      alert("Invalid time: End time must be after start time.");
      return;
    }

    // Parse the date components
    const [day, monthStr] = startSlot.date.split(" ");
    const months = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    // Parse the time components
    const [timeStr, period] = startSlot.time.split(" ");
    const [hours, minutes] = timeStr.split(":").map(Number);

    // Convert to 24-hour format
    let hours24 = hours;
    if (period === "PM" && hours !== 12) {
      hours24 += 12;
    } else if (period === "AM" && hours === 12) {
      hours24 = 0;
    }

    // Create date object with current year
    const currentYear = new Date().getFullYear();
    const date = new Date(
      currentYear,
      months[monthStr],
      parseInt(day),
      hours24,
      minutes
    );

    const bookingDate = date.toISOString();
    console.log("Generated bookingDate:", bookingDate);

    navigate(`/turfs/${turf._id}/booking`, {
      state: { turf, startSlot, endSlot, bookingDate },
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
        <strong>Address:</strong> {turf.address}
      </p>

      <p>
        <Link to={turf.linkes} target="_blank" rel="noopener noreferrer">
          <button className="bg-white text-black border border-black px-2 py-1 rounded-lg shadow-md hover:bg-blue-50 transition duration-300 mb-2">
            View on Maps
          </button>
        </Link>
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

                  const isBooked = isSlotBooked(date, time);

                  return (
                    <td
                      key={colIndex}
                      className={`border border-gray-300 px-4 py-2 text-center 
                        ${
                          isBooked
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : isNightTime(time)
                            ? isSelected
                              ? "bg-green-500 text-white cursor-pointer"
                              : "bg-black text-white hover:bg-gray-800 cursor-pointer"
                            : isSelected
                            ? "bg-green-500 text-white cursor-pointer"
                            : "bg-yellow-100 text-gray-800 hover:bg-yellow-200 cursor-pointer"
                        }`}
                      onClick={() =>
                        !isBooked && toggleSlotSelection(date, time)
                      }
                    >
                      {isBooked ? "Booked" : time}
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
          {user ? "Proceed to Booking" : "Please log in to book"}
        </button>
      </div>
    </div>
  );
};

export default SingleTurfDetail;
