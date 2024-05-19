import { check } from "express-validator";
import { StudentModel } from "../../models/Student.js";
import { TeacherModel } from "../../models/Teacher.js";


const validateEmail = [
    check('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Invalid email address').bail()
        .custom(async (email, {req}) => {
            if (req.body.role === "Student") {
                const existingStudent = await StudentModel.findOne({email});
                if (!existingStudent) throw new Error("Email is not registered !");
                if (existingStudent.verified) throw new Error("Email is already verified !");
            } else if (req.body.role === "Teacher") {
                const existingTeacher = await TeacherModel.findOne({email});
                if (!existingTeacher) throw new Error("Email is not registered !");
                if (existingTeacher.verified) throw new Error("Email is already verified !");
            } else {
                throw new Error("Invalid user role");
            }
        })
];

export {validateEmail}