import { AdminModel } from "../models/Admin.js";
import { TeacherModel } from "../models/Teacher.js";
import { StudentModel } from '../models/Student.js';
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const user = async (req, res) => {
    try {
        const user = req.user;

        if (user.role === "Admin") {
            const admin = await AdminModel.findOne({_id: user.id});
            return res.json(admin);
        } else if (user.role === "Teacher") {
            const teacher = await TeacherModel.findOne({_id: user.id})
            
            return res.json(teacher);
        } else if (user.role === "Student") {
            const student = await StudentModel.findOne({_id: user.id})
            .populate('typeOfBac')
            .populate('field')
            .populate('class');
            return res.json(student);
        }

        res.status(400).json({ message: 'No User logged in' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const resendEmail = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, role} = req.body;

    try {

        if (role === "Student") {
            var currUser = await StudentModel.findOne({email});
        } else {
            var currUser = await TeacherModel.findOne({email});
        }



        const emailToken = jwt.sign({id: currUser._id}, process.env.EMAIL_SECRET, { expiresIn: '20m' });

        // Set up Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'Gmail', // Use your email service provider
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS  // Your email password
            }
        });


        if (role === "Student") {
            const url = `http://localhost:8080/studentConfirmation/${emailToken}`

            // Email options
            var mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
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

        } else {
            const url = `http://localhost:8080/teacherConfirmation/${emailToken}`

            // Email options
            var mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
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
        
        }

        // Send email
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.json({message: "email sent Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {user, resendEmail};