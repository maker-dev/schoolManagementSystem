import { TeacherModel } from "../models/Teacher.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { validationResult } from 'express-validator';
import { ClassModel } from "../models/Class.js";

const teacherRegister = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {firstName, lastName, email, password} = req.body;
    
    try {

        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    
        const newTeacher = new TeacherModel({
            firstName,
            lastName,
            salary: null,
            email,
            password: hashedPassword, 
            attendance: []
        });
    
        await newTeacher.save();

        const emailToken = jwt.sign({id: newTeacher._id}, process.env.EMAIL_SECRET, { expiresIn: '20m' });

        const url = `http://localhost:8080/teacherConfirmation/${emailToken}`

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
            to: newTeacher.email,
            subject: 'Vérification de votre compte enseignant',
            html: `
            <p>Bienvenue dans notre école !</p>
            <p>Merci de vous être inscrit en tant que professeur. Nous sommes ravis de vous accueillir parmi nous.</p>
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

        return res.json({message: "teacher Registered Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

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

const teacherConfirmation = async (req, res) => {
    try {
        const {id} = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        await TeacherModel.updateOne({_id: id}, {verified: true});
        res.redirect("http://localhost:3000/loginProf");
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
            verified: true
        }).select("-password");
        
        res.json(teachers);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showAllTeachers = async (req, res) => {

    try {

        const teachers = await TeacherModel.find({verified: true}).select("-password");
        
        res.json(teachers);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


export { teacherRegister, teacherLogin, teacherConfirmation, showTeachersNotInClass, showAllTeachers};
