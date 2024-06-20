import { check } from 'express-validator';
import { TeacherModel } from '../../models/Teacher.js';

const validateTeacherRegister = [
    check('firstName')
        .notEmpty().withMessage('First name is required').bail()
        .isAlpha().withMessage('First name must contain only letters'),
    check('lastName')
        .notEmpty().withMessage('Last name is required').bail()
        .isAlpha().withMessage('Last name must contain only letters'),
    check('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Invalid email address').bail()
        .custom(async (email) => {
            const existingTeacher = await TeacherModel.findOne({email});
            if (existingTeacher) throw new Error('Email address is already registered');
        }),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter'),
    check('salary')
        .notEmpty().withMessage("salary is required").bail()
        .isNumeric().withMessage("salary should be a Number"),
    check("teacherSubject")
        .notEmpty().withMessage("teacherSubject is required").bail()
];

const validateTeacherLogin = [
    check('email')
        .notEmpty().withMessage("Email is required").bail()
        .isEmail().withMessage('Invalid email address').bail()
        .custom(async (email) => {
            const existingTeacher = await TeacherModel.findOne({email});
            if (!existingTeacher) throw new Error("User doesn't exists !");
        }),
    check('password')
        .notEmpty().withMessage('Password is required')
];

const validateTeacherUpdate = [
    check("teacherId")
        .notEmpty().withMessage("TeacherId is required"),
    check('newSalary')
        .notEmpty().withMessage("salary is required").bail()
        .isNumeric().withMessage("salary should be a Number"),
    check("newTeacherSubject")
        .notEmpty().withMessage("teacherSubject is required")
]

const validateTeacherAttendance = [
    check("date")
        .notEmpty().withMessage("date is required").bail()
        .custom(date => {
            const inputDate = new Date(date);
            const currentDate = new Date();
            if (inputDate >= currentDate) {
                throw new Error('Date must be before the current date');
            }
            return true;
        }),
    check("lessonHours")
        .notEmpty().withMessage("lessonHours is required").bail()
        .isNumeric().withMessage("lessonHours should be a number"),
    check("status")
        .notEmpty().withMessage("status is required").bail()
        .isIn(["present", "absent"]).withMessage("status must be either present or absent")

]

export {validateTeacherRegister, validateTeacherLogin, validateTeacherUpdate, validateTeacherAttendance}