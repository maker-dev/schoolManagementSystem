import { check } from "express-validator";
import { ClassModel } from "../../models/Class.js";
import {FieldModel} from '../../models/Field.js';
import {TeacherModel} from '../../models/Teacher.js';

const validateInsertClass = [
    check('className')
        .notEmpty().withMessage('className is required').bail()
        .custom(async (className) => {
            const existingClassName = await ClassModel.findOne({className});
            if (existingClassName) throw new Error("Class already exists!");
        }),
    check("field")
        .notEmpty().withMessage("field is required").bail()
        .custom(async (fieldId) => {
            const existingField = await FieldModel.findOne({_id: fieldId});
            if (!existingField) throw new Error("Field already exists !");
        })
];

const validateUpdateClass = [
    check("classId")
        .notEmpty().withMessage("classId is required").bail()
        .custom(async (classId) => {
            const existingClass = await ClassModel.findOne({_id: classId});
            if (!existingClass) throw new Error("Class is not Registered");
        }),
    check("newClassName")
        .notEmpty().withMessage("newClassName is required").bail()
        .custom(async (newClassName, {req}) => {
            const existingClass = await ClassModel.findOne({className: newClassName});
            if (existingClass) {
                if (req.body.classId !== existingClass.id) throw new Error("className already exists !");
            }
        }),
    check("newField")
        .notEmpty().withMessage("newField is required").bail()
        .custom(async (fieldId) => {
            const existingField = await FieldModel.findOne({_id: fieldId});
            if (!existingField) throw new Error("Field already exists !");
        })

];

export {validateInsertClass, validateUpdateClass}