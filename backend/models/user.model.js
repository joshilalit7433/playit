import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobilenumber: {
      type: Number,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "owner", "admin"],
      required: true,
    },

    // This will store the ID of the turf document the owner created
    ownedTurf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turf", // Reference to the Turf model
      default: null, // Regular users and admins won't have a turf
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
