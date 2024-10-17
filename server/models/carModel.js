import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
	car_name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      minLength: 6,
    },
    fuel:{
		    type:String,
            enum:["petrol","diesel"],
		    required:true
		},
    image:{
		   type:String,
		    default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    },
    
    price_per_day:{
      type:Number,
      required:true

    }

  },
  { timestamps: true }
);

export const Car = mongoose.model("Car", carSchema);