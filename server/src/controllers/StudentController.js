import { StudentModel } from "../models/Student.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { validationResult } from "express-validator";
import { ClassModel } from "../models/Class.js";
import mongoose from 'mongoose';

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
        res.redirect("http://localhost:3000/loginEtudiant");
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
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
        const students = await StudentModel.find({verified: true, confirmation: false}).select("-password");
        
        res.json(students);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showConfirmedStudents = async (req, res) => {
    try {

        const students = await StudentModel.find({verified: true, confirmation: true}).select("-password");

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


export { studentRegister, studentLogin, studentConfirmation, showFieldStudents, showNoConfirmedStudents, showConfirmedStudents, confirmStudent };
