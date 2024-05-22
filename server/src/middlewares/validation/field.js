import { check } from "express-validator";
import { TypeOfBacModel } from "../../models/TypeOfBac.js";
import { FieldModel } from "../../models/Field.js";


const validateField = [
    check('fieldName')
        .notEmpty().withMessage('fieldName is required').bail()
        .custom(async (fieldName) => {
            const existingField = await FieldModel.findOne({fieldName});
            if (existingField) throw new Error("Field is Already exists !");
        }),
    check('bacRequired')
        .notEmpty().withMessage('backRequired is required').bail()
        .custom(async (bacId) => {
            const existingBac = await TypeOfBacModel.findOne({_id: bacId})
            if (!existingBac) throw new Error("TypeOfBac doesn't exists !");
        })
];

export {validateField}