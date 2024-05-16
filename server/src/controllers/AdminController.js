import { AdminModel } from "../models/Admin.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";

const adminLogin = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {

        const admin = await AdminModel.findOne({email});
        
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: password,
                    msg: "Password is Incorrect",
                    path: "password",
                    location: "body"
                }
            ]
        });
        
        const token = jwt.sign({id: admin._id, role: admin.role}, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({token});
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { adminLogin };
