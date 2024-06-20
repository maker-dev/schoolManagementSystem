import { TeacherModel } from "../models/Teacher.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { ClassModel } from "../models/Class.js";
import mongoose from "mongoose";
import nodemailer from 'nodemailer';
import moment from 'moment';

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

        const teacherIdsInClass = Class.teachers.map(teacher => teacher.id);

        const teachers = await TeacherModel.find({
            _id: { $nin: teacherIdsInClass },
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

        // Set up Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'Gmail', // Use your email service provider
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS  // Your email password
            }
        });

        // Email options
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Bienvenue à notre école',
            html: `
            <p>Bienvenue dans notre école !</p>
            <p>Merci de vous être inscrit en tant qu'enseignant. Nous sommes ravis de vous accueillir parmi nous.</p>
            <p>Votre mot de passe est : <strong>${password}</strong></p>
            <p>Veuillez vous connecter avec votre adresse e-mail et ce mot de passe.</p>
            <p>Meilleures salutations,</p>
            <p>Votre équipe</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

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

        if (!teacher) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: teacherId,
                    msg: "TeacherId doesn't exists !",
                    path: "subjectId",
                    location: "body"
                }
            ]
        });

        await ClassModel.updateMany({"teachers.id": teacher._id}, {$pull: {teachers: {id: teacher._id}}})

        await teacher.deleteOne();

        return res.json({message: "teacher deleted Successfully !"});

    } catch (err) {

        res.status(500).json({ message: 'Internal server error' });
    
    }
}

const addTeacherAttendance = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {teacherId} = req.params;

    const {date, lessonHours, status} = req.body;

    try {

        const teacher = await TeacherModel.findById(teacherId);


        if (!teacher) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: teacherId,
                        msg: "teacherId is invalid",
                        path: "teacherId",
                        location: "body"
                    }
                ]
            });
        }


        const requestDate = new Date(date);

        const existingAttendance = teacher.attendance.find(att => {
            // Convert the stored date to string and compare
            return att.date.toISOString().split('T')[0] === requestDate.toISOString().split('T')[0];
        });

        if (existingAttendance) {
            existingAttendance.lessons.push({
                lessonHours,
                status
            });
        } else {
            const attendance = {
                date,
                lessons: [
                    {
                        lessonHours,
                        status
                    }
                ]
            }
            teacher.attendance.push(attendance);
        }

        await teacher.save();

        return res.json({message: "attendance added Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const calculateTeacherTotalAttendance = async (req, res) => {
   
    const {teacherId} = req.params;

    try {
         // Fetch all attendance records for the teacher from the database
         const teacher = await TeacherModel.findById(teacherId);

         // Calculate total attendance
         let totalPresent = 0;
         let totalAbsent = 0;

         teacher.attendance.forEach(record => {
            record.lessons.forEach(lesson => {
                if (lesson.status === "present") totalPresent += lesson.lessonHours;
                else if (lesson.status === "absent") totalAbsent += lesson.lessonHours;
            })
         })

         res.json({totalAbsent, totalPresent});
 

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const calculateTeacherMonthlyAttendance = async (req, res) => {
    const {teacherId} = req.params;

    try {
        // Fetch the teacher document from the database
        const teacher = await TeacherModel.findById(teacherId);

        // Initialize a map to store monthly attendance totals
        const monthlyAttendance = new Map();

        // Iterate through each attendance record of the teacher
        teacher.attendance.forEach(record => {
            const monthYear = moment(record.date).format('MMMM YYYY'); // Format month and year
            if (!monthlyAttendance.has(monthYear)) {
                monthlyAttendance.set(monthYear, { totalPresent: 0, totalAbsent: 0 });
            }
            record.lessons.forEach(lesson => {
                // Accumulate hours based on lesson status
                if (lesson.status === 'present') {
                    monthlyAttendance.get(monthYear).totalPresent += lesson.lessonHours;
                } else if (lesson.status === 'absent') {
                    monthlyAttendance.get(monthYear).totalAbsent += lesson.lessonHours;
                }
            });
        });
        // Convert map to array for easier serialization to JSON
        const monthlyAttendanceArray = [...monthlyAttendance].map(([monthYear, totals]) => ({
            monthYear,
            totalPresent: totals.totalPresent,
            totalAbsent: totals.totalAbsent
        }));

        res.json(monthlyAttendanceArray);

 

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { teacherLogin, showTeachersNotInClass, showAllTeachers,
        insertTeacher, showTeacher, updateTeacher, deleteTeacher,
        addTeacherAttendance, calculateTeacherTotalAttendance, calculateTeacherMonthlyAttendance
};
