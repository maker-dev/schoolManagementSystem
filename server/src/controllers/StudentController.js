import { StudentModel } from "../models/Student.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const studentRegister = async (req, res) => {
    const {firstName, lastName, tel, typeOfBac, field, email, password} = req.body;

    try {
        if (!firstName || !lastName || !tel || !typeOfBac || !field || !email || !password ) {
            return res.status(400).json({ message: "Some fields are missing ." });
        }
        
        const student = await StudentModel.findOne({email});
        
        if (student) return res.status(401).json({message: "student already exists !"});
        
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
    const {email, password} = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required." });
        }

        const student = await StudentModel.findOne({email: email});
        
        if (!student) return res.status(401).json({message: "User doesn't exists !"});

        if (!student.verified) return res.status(401).json({message: "User not verified"});

        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (!isPasswordValid) return res.status(401).json({message: "Password is incorrect !"});
        
        const token = jwt.sign({id: student._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({token, user: student});
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


export { studentRegister, studentLogin, studentConfirmation };
