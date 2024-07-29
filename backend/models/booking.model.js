import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
    bookingId: {
        type: Schema.Types.ObjectId,
        required: true
      },

      turf: {
        type: Schema.Types.ObjectId,
        ref: 'Turf',
        required: true
      },

      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

      bookingDate: {
        type: Date,
        required: true
      },

      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true 
      },

      status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'   
    
      },

      amountPaid: {
        type: Number,
        default: 0
      },

      paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
      },

},{timestamps:true})

export const Booking=mongoose.model("Booking",bookingSchema)