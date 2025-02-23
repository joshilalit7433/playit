import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BuySubscription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const turf = location.state?.turf;
  const { user } = useSelector((state) => state.auth);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  // Fetch booked slots when component mounts and when turf changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!turf?._id) return; // Only fetch if we have a turf ID

      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/booking/get-turf-bookings/${turf._id}`
        );
        setBookedSlots(response.data.bookings || []);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, [turf]);

  // Check if a time slot is already booked
  const isSlotBooked = (date, startTime, endTime) => {
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    const convertTimeToMinutes = (time) => {
      const [timeStr, period] = time.split(" ");
      let [hours, minutes] = timeStr.split(":").map(Number);
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const newStartMinutes = convertTimeToMinutes(startTime);
    const newEndMinutes = convertTimeToMinutes(endTime);

    return bookedSlots.some((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      bookingDate.setHours(0, 0, 0, 0);

      // First check if the dates match
      if (inputDate.getTime() !== bookingDate.getTime()) return false;

      const bookingStartMinutes = convertTimeToMinutes(booking.startTime);
      const bookingEndMinutes = convertTimeToMinutes(booking.endTime);

      // Check for any overlap using the simpler overlap detection
      return (
        Math.max(newStartMinutes, bookingStartMinutes) <
        Math.min(newEndMinutes, bookingEndMinutes)
      );
    });
  };

  // Time slots array (similar to what's used in SingleTurfDetail)
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
  ];

  const handleAddSlot = () => {
    if (!startTime || !endTime) {
      alert("Please select both start and end time");
      return;
    }

    // Check if slot is already booked
    if (isSlotBooked(startDate, startTime, endTime)) {
      alert(
        "This time slot is already booked. Please select a different time."
      );
      return;
    }

    const formattedDate = startDate.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const newSlot = {
      date: formattedDate,
      startTime,
      endTime,
    };

    // Check if slot overlaps with already selected slots
    const hasOverlap = selectedSlots.some((slot) => {
      if (slot.date !== formattedDate) return false;

      const convertTimeToMinutes = (time) => {
        const [timeStr, period] = time.split(" ");
        let [hours, minutes] = timeStr.split(":").map(Number);
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };

      const existingStart = convertTimeToMinutes(slot.startTime);
      const existingEnd = convertTimeToMinutes(slot.endTime);
      const newStart = convertTimeToMinutes(startTime);
      const newEnd = convertTimeToMinutes(endTime);

      return newStart < existingEnd && newEnd > existingStart;
    });

    if (hasOverlap) {
      alert("This time slot overlaps with an already selected slot");
      return;
    }

    setSelectedSlots([...selectedSlots, newSlot]);
    setStartTime("");
    setEndTime("");
  };

  const handleRemoveSlot = (index) => {
    const updatedSlots = selectedSlots.filter((_, i) => i !== index);
    setSelectedSlots(updatedSlots);
  };

  // Function to validate if end time is after start time
  const isValidTimeRange = (start, end) => {
    if (!start || !end) return true;

    const [startHour, startMinutes, startPeriod] = start
      .match(/(\d+):(\d+) (AM|PM)/)
      .slice(1);
    const [endHour, endMinutes, endPeriod] = end
      .match(/(\d+):(\d+) (AM|PM)/)
      .slice(1);

    let startHours = parseInt(startHour);
    let endHours = parseInt(endHour);

    // Convert to 24-hour format
    if (startPeriod === "PM" && startHours !== 12) startHours += 12;
    if (endPeriod === "PM" && endHours !== 12) endHours += 12;
    if (startPeriod === "AM" && startHours === 12) startHours = 0;
    if (endPeriod === "AM" && endHours === 12) endHours = 0;

    const startTotal = startHours * 60 + parseInt(startMinutes);
    const endTotal = endHours * 60 + parseInt(endMinutes);

    return endTotal > startTotal;
  };

  const handleEndTimeChange = (time) => {
    if (isValidTimeRange(startTime, time)) {
      setEndTime(time);
    } else {
      alert("End time must be after start time");
    }
  };

  const handleProceedToBooking = () => {
    if (!user) {
      alert("Please log in to proceed with booking.");
      navigate("/login");
      return;
    }

    if (selectedSlots.length === 0) {
      alert("Please select at least one time slot");
      return;
    }

    if (selectedSlots.length < 4) {
      alert("Please select at least 4 time slots for subscription booking");
      return;
    }

    navigate(`/turfs/${turf._id}/booking`, {
      state: {
        turf,
        selectedSlots,
        isSubscription: true,
        totalAmount: totals.discounted,
      },
    });
  };

  // Calculate total amount with discount
  const calculateTotal = () => {
    if (selectedSlots.length === 0)
      return { original: 0, discounted: 0, saved: 0 };

    const pricePerHour = turf.price;
    let totalAmount = 0;

    selectedSlots.forEach((slot) => {
      const convertTimeToMinutes = (time) => {
        const [timeStr, period] = time.split(" ");
        let [hours, minutes] = timeStr.split(":").map(Number);
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };

      const startMinutes = convertTimeToMinutes(slot.startTime);
      const endMinutes = convertTimeToMinutes(slot.endTime);
      const durationHours = (endMinutes - startMinutes) / 60;
      totalAmount += durationHours * pricePerHour;
    });

    const discount = totalAmount * 0.15;
    const discountedTotal = totalAmount - discount;

    return {
      original: totalAmount.toFixed(2),
      discounted: discountedTotal.toFixed(2),
      saved: discount.toFixed(2),
    };
  };

  // Add this before the return statement
  const totals = calculateTotal();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-14 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-8">{turf.name}</h1>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Calendar Section */}
          <div className="w-full md:w-[30%]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Select Date
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                inline
                minDate={new Date()}
                className="w-full scale-105 transform origin-top-left"
              />
            </div>
          </div>

          {/* Time Selection - Middle */}
          <div className="w-full md:w-[28%]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Select Time
            </h2>
            <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Start Time
                </label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 text-lg"
                >
                  <option value="">Select start time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  End Time
                </label>
                <select
                  value={endTime}
                  onChange={(e) => handleEndTimeChange(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 text-lg"
                >
                  <option value="">Select end time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddSlot}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-sm text-lg"
              >
                Add Time Slot
              </button>
            </div>
          </div>

          {/* Selected Slots Preview - Right */}
          <div className="w-full md:w-[30%]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Selected Slots
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl min-h-[200px]">
              {selectedSlots.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">
                  No slots selected
                </p>
              ) : (
                <>
                  <div className="mb-4">
                    <p
                      className={`text-sm ${
                        selectedSlots.length < 4
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {selectedSlots.length} slots selected
                      {selectedSlots.length < 4 && ` (Minimum 4 required)`}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {selectedSlots.map((slot, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold text-gray-800 text-lg">
                            {slot.date}
                          </p>
                          <p className="text-base text-gray-600">
                            {slot.startTime} - {slot.endTime}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveSlot(index)}
                          className="text-red-500 hover:text-red-700 p-2 text-xl"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* New Price Summary Section */}
        <div className="mt-8 border-t pt-6">
          <div className="max-w-md mx-auto bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Price Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Original Price</span>
                <span className="text-gray-800">₹{totals.original}</span>
              </div>
              <div className="flex justify-between items-center text-green-600">
                <span>Subscription Discount (15%)</span>
                <span>- ₹{totals.saved}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200 font-semibold text-lg">
                <span>Final Price</span>
                <span className="text-green-600">₹{totals.discounted}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleProceedToBooking}
          className="w-full mt-6 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold text-lg shadow-md"
        >
          {user
            ? `Proceed to Pay ₹${totals.discounted}`
            : "Please log in to book"}
        </button>
      </div>
    </div>
  );
};

export default BuySubscription;
