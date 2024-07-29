import mongoose from "mongoose"

const turfSchema=new mongoose.Schema({

    turfid:{
        type:Number,
        unique:true
    },

    name:{
        type:String,
        required:true
    },

    location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true 

    }
},

    description:{
        type:String
    },

    images:[
        {type:String}
    ],

    price:{
        type: Object,
        required: true,
        hourlyrate: Number,
        weekdayrate: Number,
        weekendrate: Number, 
        
    },

    ratings: {
        type: Number,
        default: 0
      },

    
},{timestamps:true})

export const Turf=mongoose.model("Turf",turfSchema)