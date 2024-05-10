import { AdminModel } from "../models/Admin.js";
import bcrypt from 'bcrypt';

const adminLogin = async (req, res) => {
    const hashedPassword = await bcrypt.hash("password", 10);

    const newUser = new AdminModel({
        name: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "Admin"

    });
    
    newUser.save();
    
    res.json({ message: 'Admin login successful' });
}

export { adminLogin };
