import { useLocation, useNavigate } from "react-router-dom";

const SingleTurfDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const turf = location.state?.turf;

  if (!turf) {
    return <p>Loading turf details...</p>;
  }

  const handleBookNow = () => {
    navigate(`/turfs/${turf._id}/booking`, { state: { turf } });
  };

  // Helper to get IST time
  const getISTTime = () => {
    const now = new Date();
    const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000); // Convert to IST
    return istTime;
  };

  const getWeekDates = () => {
    const startDate = new Date("2024-12-30"); // Starting date: December 30, 2024
    const endDate = new Date("2025-01-30"); // Ending date: January 30, 2025
    const weekDates = [];

    // Loop through dates from start to end and add them to the weekDates array
    while (startDate <= endDate) {
      weekDates.push(
        startDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        })
      );
      startDate.setDate(startDate.getDate() + 1); // Increment date by 1
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

  const weekDates = getWeekDates(); // Get dynamic dates from Dec 30, 2024 to Jan 30, 2025

  // Helper function to determine if time is after 6:00 PM
  const isNightTime = (time) => {
    const nightTimes = [
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

    console.log("Checking time:", time, nightTimes.includes(time)); // Debugging line
    return nightTimes.includes(time);
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
                {rowIndex % 2 === 0 && (
                  <td
                    rowSpan={2}
                    className={`border border-gray-300 px-4 py-2 text-center ${
                      isNightTime(time)
                        ? "bg-black text-white"
                        : "bg-lightBlue-100"
                    }`}
                  >
                    {isNightTime(time) ? "🌙" : "🌞"}
                  </td>
                )}
                <td className="border border-gray-300 px-4 py-2 text-center text-red-500">
                  {time}
                </td>
                {weekDates.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-gray-300 px-4 py-2 text-center ${
                      isNightTime(time)
                        ? "bg-black text-white"
                        : "bg-lightBlue-100 text-gray-800"
                    }`}
                  >
                    {time}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          onClick={handleBookNow}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SingleTurfDetail;
