import { check } from 'express-validator';
import {StudentModel} from '../../models/Student.js';
import { TypeOfBacModel } from '../../models/TypeOfBac.js';
import { FieldModel } from '../../models/Field.js';
import { SubjectModel } from '../../models/Subject.js';

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
        .notEmpty().withMessage('Type of Bac is required').bail()
        .custom(async (typeOfBacId) => {
            const type = await TypeOfBacModel.findOne({_id: typeOfBacId});
            if (!type) throw new Error("typeOfBac doesn't exists !"); 
        }),
    check('field')
        .notEmpty().withMessage('Field is required').bail()
        .custom(async (fieldId, {req}) => {
            const field = await FieldModel.findOne({_id: fieldId});
            if (!field) throw new Error("field doesn't exists !");
            if (!field.bacRequired.includes(req.body.typeOfBac)) throw new Error("this field required another typeOfBac !");
        }),
    check('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Invalid email address').bail()
        .custom(async (email) => {
            const student = await StudentModel.findOne({ email });
            if (student) throw new Error('student already exists !');
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

const validateStudentAttendance = [
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
    check("subject")
        .notEmpty().withMessage("subject is required").bail()
        .custom(async (subjectId) =>  {
            const subject = await SubjectModel.findById(subjectId);
            if (!subject) {
                throw new Error("subjectId isn't exist !");
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


export { validateStudentRegister, validateStudentLogin, validateStudentAttendance };
