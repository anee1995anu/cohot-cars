import { Car } from "../models/carModel.js";
import { Cart } from "../models/cartModel.js";


export const getCart = async (req, res, next) => {
    try {
        const { user } = req;
        const cart = await Cart.findOne({ userId: user.id }).populate("cars.carId");

        if (!cart) {
            return res.status(404).json({ message: "cart is empty" });
        }

        res.json({ message: "cart details fetched", data: cart });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};

export const addCarToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { carId } = req.body;
        

        // Find the course to ensure it exists and fetch its price
        const car = await Car.findById(carId);
        
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, cars: [] });
        }

        // Check if the course is already in the cart
        const carExists = cart.cars.some((item) => item.carId.equals(carId));
        if (carExists) {
            return res.status(400).json({ message: "Car already in cart" });
        }

        // Add the course to the cart
        cart.cars.push({
            carId,
            price: car.price_per_day,
        });

        // Recalculate the total price
        cart.calculateTotalPrice();
        console.log(cart);
        await cart.save();
        

        res.status(200).json({ message: "added to cart", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const removeCarFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { carId } = req.body;

        // Find the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the course from the cart
        cart.cars = cart.cars.filter((item) => !item.carId.equals(carId));

        // Recalculate the total price
        cart.calculateTotalPrice();

        // Save the cart
        await cart.save();

        res.status(200).json({ message: "car removed from cart", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
