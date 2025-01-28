import { Link } from "react-router-dom";
export default function SubscriptionPlans() {
  const plans = [
    {
      title: "Starter Plan",
      features: [
        "5 bookings per month",
        "Unused bookings roll over",
        "Basic customer support",
      ],
    },
    {
      title: "Pro Plan (Most Popular)",
      features: [
        "Unlimited bookings (Peak & Non-peak)",
        "Priority support",
        "Exclusive event discounts",
      ],
      popular: true,
    },
    {
      title: "Premium Plan",
      features: [
        "Unlimited bookings with flexible cancellations",
        "Dedicated account manager",
        "Access to premium time slots",
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Subscription Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition"
            >
              {plan.popular && (
                <div className="text-xs font-medium text-white bg-black px-2 py-1 rounded-md w-max mx-auto mb-3">
                  Most Popular
                </div>
              )}
              <h2 className="text-lg font-medium text-gray-900 text-center">
                {plan.title}
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    • {feature}
                  </li>
                ))}
              </ul>
              <Link to={"/turfs"}>
              <button className="mt-5 w-full text-sm text-gray-900 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                Choose Plan
              </button>
              </Link>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          * Price varies for individual turfs
        </p>
      </div>
    </div>
  );
}
