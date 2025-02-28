import { Turf } from "../models/turf.model.js";

export const postTurf = async (req, res) => {
  try {
    const {
      name,
      location,
      description,
      images,
      price,
      sports_type,
      ratings,
      linkes,
      address,
      state,
    } = req.body;

    if (
      !name ||
      !location ||
      !description ||
      !images ||
      !price ||
      !sports_type ||
      !linkes ||
      !address
    ) {
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
      linkes,
      address,
      state,
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

export const getPendingTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find({ state: false });

    if (!turfs || turfs.length === 0) {
      return res.status(404).json({
        message: "No pending turf requests found.",
        success: false,
      });
    }

    return res.status(200).json({
      turfs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching pending turfs:", error.message, error.stack);
    return res.status(500).json({
      message: "An error occurred while fetching pending turfs.",
      success: false,
    });
  }
};

export const getTurfById = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    if (!turf) {
      return res.status(404).json({
        message: "Turf not found",
        success: false,
      });
    }
    return res.status(200).json({
      turf,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching turf details",
      success: false,
    });
  }
};

export const approveTurf = async (req, res) => {
  try {
    const turf = await Turf.findByIdAndUpdate(
      req.params.id,
      { state: true },
      { new: true }
    );
    if (!turf) {
      return res.status(404).json({
        message: "Turf not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Turf approved successfully",
      turf,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error approving turf",
      success: false,
    });
  }
};

export const rejectTurf = async (req, res) => {
  try {
    const turf = await Turf.findByIdAndDelete(req.params.id);
    if (!turf) {
      return res.status(404).json({
        message: "Turf not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Turf rejected and deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error rejecting turf",
      success: false,
    });
  }
};
