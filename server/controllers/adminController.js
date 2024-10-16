import bcrypt from 'bcrypt'

import { generateToken } from '../utils/token.js';
import { Admin } from '../models/adminModel.js';


 
export const adminSignup = async (req, res, next) => {
    try {
        const { name, email, password, mobile, profilePic } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }
        const isAdminExist = await Admin.findOne({ email });

        if (isAdminExist) {
            return res.status(400).json({ message: "admin already exist" });
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const newAdmin = new Admin({ name, email, password: hashedPassword, mobile, profilePic });
        await newAdmin.save();

        const token = generateToken(newAdmin._id);

        res.cookie("token", token);

        res.json({ success: true, message: "Admin created successfully" });
    } catch (error) {
        console.log(error);
    res.status(error.statusCode || 500).json(error.message || 'Internal server error')        
    }
};

export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const adminExist = await Admin.findOne({ email });
        if (!adminExist) {
            return res.status(404).json({ success: false, message: "admin does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, adminExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "admin not autherized" });
        }

        const token = generateToken(adminExist._id);

        res.cookie("token", token);
        res.json({ success: true, message: "admin login successfull" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};


export const adminProfile = async (req, res, next) => {
    try {

        const {admin}=req

        const adminData = await Admin.findById(admin.id).select('-password')

        res.json({ success: true, message: "Admin profile fetched", data:adminData });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};
export const adminLogout = async (req, res, next) => {
    try {

        res.clearCookie('token')
        res.json({ success: true, message: "Admin logged out" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const checkAdmin = async (req, res, next) => {
    try {

        res.json({ success: true, message: "autherized admin" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

