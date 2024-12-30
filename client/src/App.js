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
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/turfs" element={<Turfs />} />
        <Route path="/turfs/:id" element={<ViewTurf />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/turfs/:id/booking" element={<BookingForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
