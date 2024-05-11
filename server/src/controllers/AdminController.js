import { AdminModel } from "../models/Admin.js";
import { TeacherModel } from '../models/Teacher.js';
import { StudentModel } from "../models/Student.js";
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

const createTeacher = async (req, res) => {
    const {name, email, password} = req.body;

    
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
}

const createStudent = async (req, res) => {
    const {name, email, password, age, address} = req.body;

    
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
}

export { adminLogin, createTeacher, createStudent};
