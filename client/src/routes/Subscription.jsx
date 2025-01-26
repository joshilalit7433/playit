import React from "react";
import { Link } from "react-router-dom";

const SubscriptionPlans = () => {
  const plans = [
    {
      duration: "1 Month",
      content: [
        {
          type: "Basic",
          bookings: "4 booking, 1 hour each",
          discount: "25% discount on 4th booking",
        },
        {
          type: "Premium",
          bookings: "4 booking, 2 hour each",
          discount: "30% discount on 4th booking",
        },
      ],
    },
    {
      duration: "3 Month",
      content: [
        {
          type: "Basic",
          bookings: "4 booking, 1 hour each",
          discount: "25% discount on 4th booking",
        },
        {
          type: "Premium",
          bookings: "4 booking, 2 hour each",
          discount: "30% discount on 4th booking",
        },
      ],
    },
    {
      duration: "6 Month",
      content: [
        {
          type: "Basic",
          bookings: "4 booking, 1 hour each",
          discount: "25% discount on 4th booking",
        },
        {
          type: "Premium",
          bookings: "4 booking, 2 hour each",
          discount: "30% discount on 4th booking",
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 p-10 min-h-screen flex justify-center items-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="card bg-white shadow-lg rounded-xl border border-green-300"
          >
            <div className="bg-green-500 rounded-t-xl pt-8">
              <h3 className="text-2xl font-bold text-center pb-7">
                {plan.duration}
              </h3>
            </div>
            <div className="flex justify-between items-center">
              {/* Basic Plan */}
              <div className="flex-1 border-r h-full border-gray-300 pr-6">
                <h4 className="text-xl font-semibold text-center pt-8">
                  Basic
                </h4>
                <p className="text-base text-gray-700 mt-4 text-center pt-10 pl-6">
                  {plan.content[0].bookings}
                </p>
                <p className="text-base text-gray-700 mt-2 text-center pt-9 pb-20 pl-6">
                  {plan.content[0].discount}
                </p>
              </div>
              {/* Premium Plan */}
              <div className="flex-1 pl-6">
                <h4 className="text-xl font-semibold text-center pt-8">
                  Premium
                </h4>
                <p className="text-base text-gray-700 mt-4 text-center pt-10 pr-6">
                  {plan.content[1].bookings}
                </p>
                <p className="text-base text-gray-700 mt-2 text-center pt-9 pb-20 pr-6">
                  {plan.content[1].discount}
                </p>
              </div>
            </div>
            <div className="flex justify-center pb-8">
              <Link to={"/turfs"}>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full">
                Select Subscription for Turf
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
