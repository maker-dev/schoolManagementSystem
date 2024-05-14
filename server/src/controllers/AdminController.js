import { AdminModel } from "../models/Admin.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const adminLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required." });
        }

        const admin = await AdminModel.findOne({email: email});
        
        if (!admin) return res.status(401).json({message: "User doesn't exists !"});

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) return res.status(401).json({message: "Password is incorrect !"});
        
        const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({token, id: admin._id});
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


export { adminLogin };
