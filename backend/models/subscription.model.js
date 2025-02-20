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
  
  isActive: {
    type: Boolean,
    default: true,
  },
  
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
