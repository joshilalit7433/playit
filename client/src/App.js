import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Contact from "./routes/Contact";
import Turfs from "./routes/Turfs";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import ViewTurf from "./routes/ViewTurf";
import BookingForm from "./routes/Booking";
import { ToastContainer } from "react-toastify";
import UserProfile from "./components/UserProfile";
import CricketTurfPage from "./routes/CricketTurfPage";
import BadmintonTurfPage from "./routes/BadmintonTurfPage";
import FootballTurfPage from "./routes/FootballTurfPage";
import Sports from "./components/Sports";
import Subscription from "./routes/Subscription";
import CheckOut from "./components/CheckOut";
import DisplayBookings from "./components/DisplayBookings";
import BuySubsciption from "./routes/BuySubsciption";
import TurfForm from "./routes/turfOwner/turfForm";
import AdminDashboard from "./components/AdminDashboard";
import AdminTurfDetails from "./components/AdminTurfDetails";
import DisplayTurfBooking from "./routes/turfOwner/DisplayTurfBooking";
import DisplayTOBooking from "./routes/turfOwner/DisplayTOBooking";
function App() {
  

  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/turfs" element={<Turfs />} />
        <Route path="/turfs/:id" element={<ViewTurf />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/turfs/:id/booking" element={<BookingForm />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/sports/cricket" element={<CricketTurfPage />} />
        <Route path="/sports/badminton" element={<BadmintonTurfPage />} />
        <Route path="/sports/football" element={<FootballTurfPage />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/displaybookings" element={<DisplayBookings />} />
        <Route path="/turfs/:id/buysubscription" element={<BuySubsciption />} />
        <Route path="/turfform" element={<TurfForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/:id" element={<AdminTurfDetails />} />
        <Route path="/turf-bookings" element={<DisplayTOBooking />} />
        <Route path="/turf-bookings/:turfId" element={<DisplayTurfBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
