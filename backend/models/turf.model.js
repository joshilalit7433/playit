import mongoose from "mongoose";

const turfSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    address: {
      type: String, // New address field
    },

    description: {
      type: String,
    },

    images: {
      type: String,
    },

    price: {
      type: Number,
    },

    sports_type: {
      type: String,
    },

    ratings: {
      type: Number,
      default: 0,
    },

    linkes: {
      type: String, // Link field
    },

    state: {
      type: Boolean,
      default: false, // true means turf is active/available, false means inactive/unavailable
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Turf = mongoose.model("Turf", turfSchema);
