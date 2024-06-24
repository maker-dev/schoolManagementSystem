import { check } from 'express-validator';
import { SubjectModel } from '../../models/Subject.js';
import mongoose from 'mongoose';

const validateExamInsert = [
    check("subject")
        .notEmpty().withMessage("subject is required").bail()
        .custom(async (subjectId) =>  {
            const subject = await SubjectModel.findById(subjectId);
            if (!subject) {
                throw new Error("subjectId isn't exist !");
            }
            return true;
        }),
    check("mark")
        .notEmpty().withMessage("mark is required").bail()
        .isNumeric().withMessage("lessonHours should be a number").bail()
        .custom(mark => {
            if (mark > 20) {
                throw new Error("mark should be lower or equal to 20");
            }
            return true;
        }),
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
]


const validateExamUpdate = [
    check("subject")
        .notEmpty().withMessage("subject is required").bail()
        .custom(async (subjectId) =>  {
            const subject = await SubjectModel.findById(subjectId);
            if (!subject) {
                throw new Error("subjectId isn't exist !");
            }
            return true;
        }),
    check("examId")
        .notEmpty().withMessage("examId is required").bail()
        .custom(examId => {
            if (!mongoose.Types.ObjectId.isValid(examId)) {
                throw new Error("examId is not valid !");
            }
            return true;
        }),
    check("newMark")
        .notEmpty().withMessage("mark is required").bail()
        .isNumeric().withMessage("lessonHours should be a number").bail()
        .custom(mark => {
            if (mark > 20) {
                throw new Error("mark should be lower or equal to 20");
            }
            return true;
        }),
    check("newDate")
        .notEmpty().withMessage("date is required").bail()
        .custom(date => {
            const inputDate = new Date(date);
            const currentDate = new Date();
            if (inputDate >= currentDate) {
                throw new Error('Date must be before the current date');
            }
            return true;
        }),
]

export {validateExamInsert, validateExamUpdate};