import { TeacherModel } from "../models/Teacher.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { ClassModel } from "../models/Class.js";
import mongoose from "mongoose";


const teacherLogin = async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {

        const teacher = await TeacherModel.findOne({email: email});

        const isPasswordValid = await bcrypt.compare(password, teacher.password);

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
        
        const token = jwt.sign({id: teacher._id, role: teacher.role}, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.json({token});
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }

}

const showTeachersNotInClass = async (req, res) => {

    const {classId} = req.params;

    try {

        const Class = await ClassModel.findById(classId);

        const teachers = await TeacherModel.find({
            _id: { $nin: Class.teachers },
        }).select("-password");
        
        res.json(teachers);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showAllTeachers = async (req, res) => {

    try {

        const teachers = await TeacherModel.find().select("-password");
        
        res.json(teachers);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showTeacher = async (req, res) => {

    const { teacherId }= req.params;
    
    try {


        if (!teacherId) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: teacherId,
                        msg: "teacherId is required",
                        path: "teacherId",
                        location: "body"
                    }
                ]
            });
        }

        // Validate if typeId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: teacherId,
                        msg: "Invalid teacherId",
                        path: "teacherId",
                        location: "body"
                    }
                ]
            });
        }
        const teacher = await TeacherModel.findById(teacherId).select("-password").populate("teacherSubject", "subName");


        res.json(teacher);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const insertTeacher = async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {firstName, lastName, email, password, salary, teacherSubject} = req.body;
    
    try {

        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    
        const newTeacher = new TeacherModel({
            firstName,
            lastName,
            salary,
            teacherSubject,
            email,
            password: hashedPassword, 
            attendance: []
        });
    
        await newTeacher.save();



        return res.json({message: "teacher Registered Successfully !"});

    } catch (err) {

        res.status(500).json({ message: 'Internal server error' });
    
    }
}

const updateTeacher = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {teacherId, newSalary, newTeacherSubject} = req.body;
    
    try {

        await TeacherModel.updateOne({_id: teacherId}, {salary: newSalary, teacherSubject: newTeacherSubject}); 

        return res.json({message: "teacher Updated Successfully !"});

    } catch (err) {

        res.status(500).json({ message: 'Internal server error' });
    
    }
}

const deleteTeacher = async (req, res) => {
    const {teacherId} = req.body;

    if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: teacherId,
                    msg: "teacherId is not valid !",
                    path: "teacherId",
                    location: "body"
                }
            ]
        });
    }

    try {

        const teacher = await TeacherModel.findById(teacherId);

        await teacher.deleteOne();

        return res.json({message: "teacher deleted Successfully !"});

    } catch (err) {

        res.status(500).json({ message: 'Internal server error' });
    
    }
}



export { teacherLogin, showTeachersNotInClass, showAllTeachers, insertTeacher, showTeacher, updateTeacher, deleteTeacher};
