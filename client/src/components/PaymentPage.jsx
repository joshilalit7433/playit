// import React, { useState } from "react";
// import { useSelector } from "react-redux"; // Import useSelector to access Redux state
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import PaymentForm from "./CheckOut";

// const PaymentPage = () => {
//   const [clientSecret, setClientSecret] = useState(""); // To store the client secret
//   const [error, setError] = useState(""); // To store any error message
//   const location = useLocation();
//   const { amount } = location.state || {}; // Retrieve amount from location.state

//   const user = useSelector((state) => state.auth.user); // Get user data from Redux
//   const userId = user?._id; // Extract userId from user object in Redux

//   const createPaymentIntent = async () => {
//     if (!userId) {
//       setError("User is not logged in.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/v1/payment/post-payment",
//         {
//           amount: amount,
//           currency: "inr",
//           userId: userId, // Include userId from Redux
//         }
//       );

//       if (response.data.clientSecret) {
//         setClientSecret(response.data.clientSecret);
//         setError(""); // Clear any previous error
//       } else {
//         setError("Failed to fetch client secret.");
//       }
//     } catch (error) {
//       console.error("Error creating payment intent:", error.message);
//       setError("An error occurred while creating the payment intent.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">Payment Page</h1>

//       <p className="mb-4 text-lg text-gray-700">Total Amount: ₹{amount}</p>

//       <button
//         onClick={createPaymentIntent}
//         className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//       >
//         Create Payment Intent
//       </button>

//       {clientSecret && (
//         <PaymentForm
//           clientSecret={clientSecret}
//           amount={amount}
//           userId={userId} // Pass userId as a prop
//         />
//       )}

//       {error && (
//         <div className="mt-4 text-red-500">
//           <p>{error}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;
