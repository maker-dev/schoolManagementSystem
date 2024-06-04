import { check } from "express-validator";
import { SubjectModel } from "../../models/Subject.js";

const validateInsertSubject = [
    check('subName')    
        .notEmpty().withMessage('subName is required').bail()
        .custom(async (subName) => {
            const existingSubName = await SubjectModel.findOne({subName});
            if (existingSubName) throw new Error("Subject already exists!");
        })
];

const validateUpdateSubject = [
    check("subjectId")
        .notEmpty().withMessage("subjectId is required").bail()
        .custom(async (subjectId) => {
            const existingSubject = await SubjectModel.findOne({_id: subjectId});
            if (!existingSubject) throw new Error("Subject is not Registered");
        }),
    check("newSubjectName")
        .notEmpty().withMessage("newSubjectName is required").bail()
        .custom(async (newSubjectName) => {
            const existingSubject = await SubjectModel.findOne({subName: newSubjectName});
            if (existingSubject) throw new Error("subjectName already exists !");
        })
];


export {validateInsertSubject, validateUpdateSubject}