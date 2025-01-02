import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleTurfDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const turf = location.state?.turf;

  const user = useSelector((state) => state.auth.user);

  if (!turf) {
    return <p>Loading turf details...</p>;
  }

  const handleBookNow = () => {
    if (!user) {
      // Redirect to login if user is not logged in
      navigate("/login");
      return;
    }

    // Navigate to the booking page if user is logged in
    navigate(`/turfs/${turf._id}/booking`, { state: { turf } });
  };

  const getWeekDates = () => {
    const startDate = new Date("2024-12-30");
    const endDate = new Date("2025-01-30");
    const weekDates = [];

    while (startDate <= endDate) {
      weekDates.push(
        startDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        })
      );
      startDate.setDate(startDate.getDate() + 1);
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

  const weekDates = getWeekDates();

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

      <div className="flex justify-center mt-6">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          onClick={handleBookNow}
        >
          {user ? "Book Now" : "Please log in to book"}
        </button>
      </div>
    </div>
  );
};

export default SingleTurfDetail;
