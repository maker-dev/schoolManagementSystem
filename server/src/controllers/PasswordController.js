import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TeacherModel } from '../models/Teacher.js';
import { StudentModel } from '../models/Student.js';
import { AdminModel } from '../models/Admin.js';
import {validationResult} from 'express-validator';

const forgotPassword = async (req, res) => {
    const {email, role} = req.body;
    var user;

    try {

        if (role === "Student") {
            user = await StudentModel.findOne({ email });
        } else if (role === "Teacher") {
            user = await TeacherModel.findOne({ email });
        } else if (role === "Admin") {
            user = await AdminModel.findOne({ email });
        }

        if (!user) {
            return res.status(404).json({
                errors: [{
                    type: 'field',
                    value: email,
                    msg: 'User not found',
                    path: 'email',
                    location: 'body'
                }]
            });
        }

        const resetToken = jwt.sign({ userId: user._id, role }, process.env.EMAIL_SECRET, { expiresIn: '10m' });

        const url = `http://localhost:3000/resetPassword/${resetToken}`;

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
            subject: 'Demande de réinitialisation de mot de passe',
            html: `
            <p>Vous avez demandé une réinitialisation de mot de passe.</p>
            <p>Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :</p>
            <p><a href="${url}" target="_blank">${url}</a></p>
            <p>Veuillez noter que ce lien expirera dans 10 minutes</p>
            <p>Si vous n'avez pas demandé cela, veuillez ignorer cet email et votre mot de passe restera inchangé.</p>
            <p>Cordialement,</p>
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

        res.json({ message: 'Email sent successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const resetPassword  = async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const {resetToken} = req.params;
    const {newPassword} = req.body;

    try {

        const {userId, role} = jwt.verify(resetToken, process.env.EMAIL_SECRET);

        const hashedPassword = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS));

        if (role === "Admin") {
            await AdminModel.updateOne({_id: userId}, {password: hashedPassword});
        } else if (role === "Student") {
            await StudentModel.updateOne({_id: userId}, {password: hashedPassword});
        } else if (role === "Teacher") {
            await TeacherModel.updateOne({_id: userId}, {password: hashedPassword});
        }

        res.json({ message: 'Password changed successfully' });

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: resetToken,
                        msg: "token expired !",
                        path: "resetToken",
                        location: "body"
                    }
                ]
            });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: resetToken,
                        msg: "invalid verification link !",
                        path: "resetToken",
                        location: "body"
                    }
                ]
            });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {forgotPassword, resetPassword};