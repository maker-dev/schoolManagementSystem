import { check } from "express-validator";
import { TypeOfBacModel } from "../../models/TypeOfBac.js";
import { FieldModel } from "../../models/Field.js";
import { SubjectModel } from '../../models/Subject.js';

const validateInsertField = [
    check('fieldName')
        .notEmpty().withMessage('fieldName is required').bail()
        .custom(async (fieldName) => {
            const existingField = await FieldModel.findOne({ fieldName });
            if (existingField) throw new Error("Field already exists!");
        }),
    check('bacRequired')
        .notEmpty().withMessage('bacRequired is required').bail()
        .custom(async (bacIds) => {
            if (!Array.isArray(bacIds)) {
                throw new Error("bacRequired should be an array");
            }

            for (let bacId of bacIds) {
                const existingBac = await TypeOfBacModel.findOne({ _id: bacId });
                if (!existingBac) throw new Error(`TypeOfBac with id ${bacId} doesn't exist!`);
            }
        }),
    check("subjects")
        .notEmpty().withMessage('subjects is required').bail()
        .custom(async (subjectIds) => {
            if (!Array.isArray(subjectIds)) {
                throw new Error("subjects should be an array");
            }

            for (let subjectId of subjectIds) {
                const existingSubject = await SubjectModel.findOne({_id: subjectId});
                if (!existingSubject) throw new Error(`Subject with id ${subjectId} doesn't exist!`);
            }
        })
];

const validateUpdateField = [
    check("fieldId")
        .notEmpty().withMessage("fieldId is required").bail()
        .custom(async (fieldId) => {
            const existingField = await FieldModel.findOne({_id: fieldId});
            if (!existingField) throw new Error("Field is not Registered");
        }),
    check("newFieldName")
        .notEmpty().withMessage("fieldName is required").bail()
        .custom(async (newFieldName, {req}) => {
            const existingField = await FieldModel.findOne({fieldName: newFieldName});
            if (existingField) {
                if (req.body.fieldId !== existingField.id) throw new Error("fieldName already exists !");
            }
            
        }),
    check("newBacRequired")
        .notEmpty().withMessage("bacRequired is required")
        .custom(async (newBacids) => {
            if (!Array.isArray(newBacids)) {
                throw new Error("newBacRequired should be an array");
            }

            for (let bacId of newBacids) {
                const existingBac = await TypeOfBacModel.findOne({ _id: bacId });
                if (!existingBac) throw new Error(`TypeOfBac with id ${bacId} doesn't exist!`);
            }
        }),
    check("newSubjects")
        .notEmpty().withMessage("newSubjects is required")
        .custom(async (subjectIds) => {
            if (!Array.isArray(subjectIds)) {
                throw new Error("subjects should be an array");
            }

            for (let subjectId of subjectIds) {
                const existingSubject = await SubjectModel.findOne({_id: subjectId});
                if (!existingSubject) throw new Error(`Subject with id ${subjectId} doesn't exist!`);
            }
        })
];


export {validateInsertField, validateUpdateField}