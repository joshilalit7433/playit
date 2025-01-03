import React from "react";

const plans = [
  {
    title: "Mobile",
    resolution: "480p",
    price: "₹149",
    quality: "Fair",
    devices: "Mobile phone, tablet",
    streams: 1,
    downloads: 1,
  },
  {
    title: "Basic",
    resolution: "720p (HD)",
    price: "₹199",
    quality: "Good",
    devices: "TV, computer, mobile phone, tablet",
    streams: 1,
    downloads: 1,
    isPopular: true,
  },
  {
    title: "Standard",
    resolution: "1080p (Full HD)",
    price: "₹499",
    quality: "Great",
    devices: "TV, computer, mobile phone, tablet",
    streams: 2,
    downloads: 2,
  },
  {
    title: "Premium",
    resolution: "4K (Ultra HD) + HDR",
    price: "₹649",
    quality: "Best",
    devices: "TV, computer, mobile phone, tablet",
    streams: 4,
    downloads: 6,
    additionalFeature: "Spatial audio (immersive sound) Included",
  },
];

const Subscription = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">
        Choose the plan that’s right for you
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`w-72 border rounded-lg p-4 shadow-md ${
              plan.isPopular ? "border-purple-500 bg-purple-50" : "bg-white"
            }`}
          >
            {plan.isPopular && (
              <div className="text-center bg-purple-500 text-white py-1 px-2 rounded-full mb-4 font-bold text-sm">
                Most Popular
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h2>
            <p className="text-gray-500 mb-4">{plan.resolution}</p>
            <p className="text-lg font-bold text-gray-900 mb-4">
              Monthly price: {plan.price}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Video and sound quality:</span>{" "}
              {plan.quality}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Resolution:</span> {plan.resolution}
            </p>
            {plan.additionalFeature && (
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Additional feature:</span>{" "}
                {plan.additionalFeature}
              </p>
            )}
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Supported devices:</span>{" "}
              {plan.devices}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">
                Devices your household can watch at the same time:
              </span>{" "}
              {plan.streams}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Download devices:</span>{" "}
              {plan.downloads}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
