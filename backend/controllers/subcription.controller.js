import { Subscription } from "../models/subscription.model.js";
export const createSubscription = async (req, res) => {
  try {
    const {
      userId,
      turfId,
      startDate,
      endDate,
      price,
      paymentDetails,
    } = req.body;

    if(  !userId,!turfId,! startDate,!endDate,! price,!paymentDetails){
      return res.status(400).json({ error: "Missing required fields." });


    }

    const newSubscription = new Subscription({
      userId,
      turfId,
      startDate,
      endDate,
      price,
      paymentDetails,
    });

    await newSubscription.save();
    res.status(201).json({
      message: "Subscription created successfully",
      subscription: newSubscription,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating subscription", error: err.message });
  }
};

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate("userId turfId");
    res.status(200).json({ subscriptions });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching subscriptions", error: err.message });
  }
};
