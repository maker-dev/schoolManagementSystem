import { StudentModel } from "../models/Student.js";
import { FieldModel } from '../models/Field.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { validationResult } from "express-validator";
import { ClassModel } from "../models/Class.js";
import mongoose from 'mongoose';
import moment from "moment";

const studentRegister = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {firstName, lastName, tel, typeOfBac, field, email, password} = req.body;

    try {
                        
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    
        const newStudent = new StudentModel({
            firstName,
            lastName,
            tel,
            typeOfBac,
            field,
            email,
            password: hashedPassword,
            examResults: [], 
            attendance: [],
        });
    
        await newStudent.save();

        const emailToken = jwt.sign({id: newStudent._id}, process.env.EMAIL_SECRET, { expiresIn: '20m' });

        const url = `http://localhost:8080/studentConfirmation/${emailToken}`

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
            to: newStudent.email,
            subject: 'Vérification de votre compte étudiant',
            html: `
            <p>Bienvenue dans notre école !</p>
            <p>Merci de vous être inscrit en tant qu'étudiant. Nous sommes ravis de vous accueillir parmi nous.</p>
            <p>Pour activer votre compte, veuillez cliquer sur le lien ci-dessous.  Veuillez noter que ce lien expirera dans 20 minutes : :</p>
            <a href="${url}">Vérifier mon compte</a>
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

    
        return res.json({message: "student Registered Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

const studentLogin = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {

        const student = await StudentModel.findOne({email: email});

        const isPasswordValid = await bcrypt.compare(password, student.password);

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
        
        const token = jwt.sign({id: student._id, role: student.role}, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.json({token});
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }

}

const studentConfirmation = async (req, res) => {
    try {
        const {id} = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        await StudentModel.updateOne({_id: id}, {verified: true});
        
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verification Success</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f0f0f0;
                        color: #333;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .container {
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    h1 {
                        color: #4CAF50;
                    }
                    a {
                        color: #4CAF50;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Verification Successful</h1>
                    <p>Your email has been successfully verified. You can now <a href="http://localhost:3000/loginEtudiant">login</a>.</p>
                </div>
            </body>
            </html>
        `);
        
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Verification Expired</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            color: #333;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                        }
                        .container {
                            background: white;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }
                        h1 {
                            color: #f44336;
                        }
                        a {
                            color: #4CAF50;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Your verification link has expired.</h1>
                        <p>Try to login <a href="http://localhost:3000/loginEtudiant">here</a> to request a new verification email.</p>
                    </div>
                </body>
                </html>
            `);
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

const showFieldStudents = async (req, res) => {

    const {classId} = req.params;

    try {

        const Class = await ClassModel.findById(classId);

        const students = await StudentModel.find({
            field: Class.field,
            verified: true,
            confirmation: true,
            $or: [
            { class: null },
            { class: { $exists: false } }
        ]}).select('-password');

        res.json(students);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showNoConfirmedStudents = async (req, res) => {
    try {
        const students = await StudentModel.find({verified: true, confirmation: false})
        .select("-password")
        .populate("typeOfBac", "typeName")
        .populate("field", "fieldName");
        
        res.json(students);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showConfirmedStudents = async (req, res) => {
    try {

        const students = await StudentModel.find({verified: true, confirmation: true})
        .select("-password")
        .populate("typeOfBac", "typeName")
        .populate("field", "fieldName")
        .populate("class", "className");

        res.json(students);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showStudent = async (req, res) => {

    const {studentId} = req.params;

    try {

        const students = await StudentModel.findById(studentId)
        .select("-password")
        .populate("typeOfBac", "typeName")
        .populate("field", "fieldName")
        .populate("class", "className");

        res.json(students);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const confirmStudent = async (req, res) => {
    
    const {studentId} = req.params;

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({
            errors: [{
                type: 'field',
                value: studentId,
                msg: 'Invalid student Id',
                path: 'studentId',
                location: 'body'
            }]
        });
    }

    try {

        await StudentModel.updateOne({_id: studentId}, {confirmation: true});

        return res.json({message: "student Confirmed Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addStudentAttendance = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {studentId} = req.params;

    const {date, lessonHours, status} = req.body;

    try {

        const student = await StudentModel.findById(studentId);


        if (!student) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: studentId,
                        msg: "studentId is invalid",
                        path: "studentId",
                        location: "body"
                    }
                ]
            });
        }


        const requestDate = new Date(date);

        const existingAttendance = student.attendance.find(att => {
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
            student.attendance.push(attendance);
        }

        await student.save();

        return res.json({message: "attendance added Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const calculateStudentTotalAttendance = async (req, res) => {
   
    const {studentId} = req.params;

    try {
         // Fetch all attendance records for the teacher from the database
         const student = await StudentModel.findById(studentId);

         // Calculate total attendance
         let totalPresent = 0;
         let totalAbsent = 0;

         student.attendance.forEach(record => {
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

const calculateStudentMonthlyAttendance = async (req, res) => {

    const {studentId} = req.params;

    try {
        // Fetch the teacher document from the database
        const student = await StudentModel.findById(studentId);

        // Initialize a map to store monthly attendance totals
        const monthlyAttendance = new Map();

        // Iterate through each attendance record of the teacher
        student.attendance.forEach(record => {
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

        // Sort the array in ascending order by date
        monthlyAttendanceArray.sort((a, b) => {
            const dateA = moment(a.monthYear, 'MMMM YYYY');
            const dateB = moment(b.monthYear, 'MMMM YYYY');
            return dateB - dateA;
        });


        res.json(monthlyAttendanceArray);

 

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getStudentDashboardInfo = async (req, res) => {

    const {studentId} = req.params;

    try {
        
        var totalSubjects = 0,
            totalTeachers = 0

        const student = await StudentModel.findById(studentId);

        if (student?.class) {
            const Class = await ClassModel.findById(student.class);
            totalTeachers = Class.teachers.length;

            const Field = await FieldModel.findById(Class.field);
            totalSubjects = Field.subjects.length;
        }


        res.json({totalSubjects, totalTeachers});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {studentRegister, studentLogin, studentConfirmation, 
        showFieldStudents, showNoConfirmedStudents, showConfirmedStudents,
        showStudent, confirmStudent, addStudentAttendance, 
        calculateStudentTotalAttendance, calculateStudentMonthlyAttendance,
        getStudentDashboardInfo
    };
