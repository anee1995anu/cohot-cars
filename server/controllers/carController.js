import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Car } from "../models/carModel.js";
import { handleImageUpload } from "../utils/cloudinary.js";

export const findAllCars = async (req, res, next) => {
    try {
        const carList = await Car.find();

        res.json({ message: "car list fetched", data: carList });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};

export const fetchCarDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        const carDetails = await Car.findOne({ _id: id });
        
        

        res.json({ message: "car details fetched", data: carDetails });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};

export const createCar = async (req, res, next) => {
    try {
        let imageUrl;
        const { car_name,description,fuel,image,price_per_day } = req.body;
        console.log("image====", req.file);

        if (!car_name|| !description || !fuel  ||!price_per_day) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }

        if (req.file) {
            const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
            imageUrl= cloudinaryRes.url;
            // imageUrl = await handleImageUpload(req.file.path)
        }

        console.log(imageUrl,'====imageUrl');
        
        const newCar = new Car({  car_name,description,fuel,image,price_per_day,image: imageUrl });
        await newCar.save();

        res.json({ message: "car created successfully", data: newCar });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};


export const updateCar = async (req, res, next) => {
    try {

        const {id} = req.params;
        const { car_name, description, fuel, price_per_day, image } = req.body;
        let imageUrl;

        const isCarExist = await Car.findById(id);
        if(!isCarExist){
           return res.status(404).json({message:"car not found"})
        }

        console.log("image====", req.file);

        if (req.file) {
            const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
            imageUrl= cloudinaryRes.url;
            // imageUrl = await handleImageUpload(req.file.path)
        }

        console.log(imageUrl,'====imageUrl');

        const carUpdated = await Car.findByIdAndUpdate(id,{ car_name, price_per_day, description,fuel,image:imageUrl },{new:true})

        res.json({ message: "car updated successfully", data: carUpdated });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};


export const deleteCar = async (req, res, next) => {
    try {

        const {id} = req.params;
        const carDetails = await Car.findByIdAndDelete(id)

        if(!carDetails){
            return res.status(404).json({message:"car not found"})
        }

        res.json({ message: "car deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};


