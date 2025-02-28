import { Turf } from "../models/turf.model.js";
import { User } from "../models/user.model.js";

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
      owner,
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
      owner,
    });

    if (owner) {
      await User.findByIdAndUpdate(owner, {
        $push: { ownedTurfs: turf._id },
      });
    }

    return res.status(201).json({
      message: "New turf created successfully.",
      turf,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating turf",
      success: false,
    });
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
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Turf ID is required"
      });
    }
    
    const turf = await Turf.findById(id);
    
    if (!turf) {
      return res.status(404).json({
        success: false,
        message: "Turf not found"
      });
    }
    
    return res.status(200).json({
      success: true,
      turf
    });
  } catch (error) {
    console.error("Error fetching turf:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch turf details"
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
    await Turf.findByIdAndDelete(req.params.id);
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

export const getTurfsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    
    if (!ownerId) {
      return res.status(400).json({
        message: "Owner ID is required",
        success: false,
      });
    }
    
    const turfs = await Turf.find({ owner: ownerId });
    
    return res.status(200).json({
      success: true,
      turfs
    });
  } catch (error) {
    console.error("Error fetching owner's turfs:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch owner's turfs"
    });
  }
};
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    
    if (!bookingId || !status) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and status are required"
      });
    }
    
    const validStatuses = ["confirmed", "cancelled", "pending"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }
    
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }
    
    return res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      booking
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update booking status"
    });
  }
};