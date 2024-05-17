import { check } from 'express-validator';
import {StudentModel} from '../../models/Student.js';

const validateStudentRegister = [
    check('firstName')
        .notEmpty().withMessage('First name is required').bail()
        .isAlpha().withMessage('First name must contain only letters'),
    check('lastName')
        .notEmpty().withMessage('Last name is required').bail()
        .isAlpha().withMessage('Last name must contain only letters'),
    check('tel')
        .notEmpty().withMessage('Telephone number is required').bail()
        .isMobilePhone().withMessage('Invalid telephone number'),
    check('typeOfBac')
        .notEmpty().withMessage('Type of Bac is required'),
    check('field')
        .notEmpty().withMessage('Field is required'),
    check('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Invalid email address').bail()
        .custom(async (email) => {
            const student = await StudentModel.findOne({ email });
            if (student) {
                throw new Error('student already exists !');
            }
        }),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
];

const validateStudentLogin = [
    check('email')
        .notEmpty().withMessage("Email is required").bail()
        .isEmail().withMessage('Invalid email address').bail()
        .custom(async (email) => {
            const existingStudent = await StudentModel.findOne({email});
            if (!existingStudent) throw new Error("User doesn't exists !");
            if (!existingStudent.verified) throw new Error("User Not verified");
        }),
    check('password')
        .notEmpty().withMessage('Password is required')
];

export { validateStudentRegister, validateStudentLogin };
