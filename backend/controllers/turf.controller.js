import { Turf } from "../models/turf.model.js";

export const postTurf = async (req, res) => {
  try {
    const { name, location, description, images, price, sports_type, ratings } = req.body;

    if (!name || !location || !description || !images || !price ||! sports_type || !ratings) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }
    const turf = await Turf.create({
      name,
      location,
      description,
      images,
      price,
      sports_type,
      ratings,
    });
    return res.status(201).json({
      message: "New turf created successfully.",
      turf,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find();

    if (!turfs || turfs.length === 0) {
      return res.status(404).json({
        message: "No turfs found.",
        success: false,
      });
    }

    return res.status(200).json({
      turfs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching turfs:", error.message, error.stack);
    return res.status(500).json({
      message: "An error occurred while fetching turfs.",
      success: false,
    });
  }
};

