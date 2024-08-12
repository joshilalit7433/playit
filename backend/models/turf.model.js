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

    description: {
      type: String,
    },

    images: {
      type: String,
    },

    price: {
      type: String,
    },

    ratings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Turf = mongoose.model("Turf", turfSchema);
