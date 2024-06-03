import { check } from "express-validator";
import { ClassModel } from "../../models/Class.js";

const validateInsertClass = [
    check('className')
        .notEmpty().withMessage('className is required').bail()
        .custom(async (className) => {
            const existingClassName = await ClassModel.findOne({className});
            if (existingClassName) throw new Error("Class already exists!");
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
        .custom(async (newClassName) => {
            const existingClass = await ClassModel.findOne({className: newClassName});
            if (existingClass) throw new Error("className already exists !");
        })
];


export {validateInsertClass, validateUpdateClass}