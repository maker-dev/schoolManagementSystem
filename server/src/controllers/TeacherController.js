import { TeacherModel } from "../models/Teacher.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const teacherRegister = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Username, email and password are required." });
        }
        
        const teacher = await TeacherModel.findOne({email});
        
        if (teacher) return res.status(401).json({message: "teacher already exists !"});
        
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    
        const newTeacher = new TeacherModel({
            name: name,
            email,
            password: hashedPassword, 
            attendance: []
        });
    
        newTeacher.save();
    
        return res.json({message: "teacher Registered Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const teacherLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required." });
        }

        const teacher = await TeacherModel.findOne({email: email});
        
        if (!teacher) return res.status(401).json({message: "User doesn't exists !"});

        const isPasswordValid = await bcrypt.compare(password, teacher.password);

        if (!isPasswordValid) return res.status(401).json({message: "Password is incorrect !"});
        
        const token = jwt.sign({id: teacher._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({token, id: teacher._id});
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }

}

export { teacherRegister, teacherLogin};
