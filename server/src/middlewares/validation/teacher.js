import { check } from 'express-validator';
import { TeacherModel } from '../../models/Teacher.js';

const validateTeacherRegister = [
    check('firstName')
        .notEmpty().withMessage('First name is required')
        .isAlpha().withMessage('First name must contain only letters'),
    check('lastName')
        .notEmpty().withMessage('Last name is required')
        .isAlpha().withMessage('Last name must contain only letters'),
    check('email')
        .isEmail().withMessage('Invalid email address')
        .custom(async (email) => {
            const existingTeacher = await TeacherModel.findOne({email});
            if (existingTeacher) throw new Error('Email address is already registered');
        }),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
];

const validateTeacherLogin = [
    check('email')
        .isEmail().withMessage('Invalid email address')
        .custom(async (email) => {
            const existingTeacher = await TeacherModel.findOne({email});
            if (!existingTeacher) throw new Error("User doesn't exists !");
            if (!existingTeacher.verified) throw new Error("User Not verified");
        }),
    check('password')
        .notEmpty().withMessage('Password is required')
];

export {validateTeacherRegister, validateTeacherLogin}