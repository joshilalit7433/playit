import mongoose from "mongoose";
const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  turfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Turf",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, // in days, weeks, or months
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  timeSlots: [
    {
      date: {
        type: Date,
        required: true,
      },
      startTime: {
        type: String, // Format: "HH:mm" (e.g., "14:00")
        required: true,
      },
      endTime: {
        type: String, // Format: "HH:mm" (e.g., "16:00")
        required: true,
      },
      status: {
        type: String,
        enum: ["available", "booked"],
        default: "available",
      },
    },
  ],
  paymentDetails: {
    method: {
      type: String,
      enum: ["credit_card", "debit_card", "upi", "net_banking", "cash"],
    },
    transactionId: String,
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
});

export const Subscription = mongoose.model("Subcription", SubscriptionSchema);
