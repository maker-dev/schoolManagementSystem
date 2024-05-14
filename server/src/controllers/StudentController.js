import { StudentModel } from "../models/Student.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const studentRegister = async (req, res) => {
    const {name, email, password, age, address} = req.body;

    try {
        if (!name || !email || !password || !age || !address) {
            return res.status(400).json({ message: "Username, email, age, address and password are required." });
        }
        
        const student = await StudentModel.findOne({email});
        
        if (student) return res.status(401).json({message: "student already exists !"});
        
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    
        const newStudent = new StudentModel({
            name: name,
            email,
            age,
            address,
            password: hashedPassword, 
            attendance: []
        });
    
        newStudent.save();
    
        return res.json({message: "student Registered Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

const studentLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required." });
        }

        const student = await StudentModel.findOne({email: email});
        
        if (!student) return res.status(401).json({message: "User doesn't exists !"});

        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (!isPasswordValid) return res.status(401).json({message: "Password is incorrect !"});
        
        const token = jwt.sign({id: student._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({token, id: student._id});
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }

}


export { studentRegister, studentLogin };
