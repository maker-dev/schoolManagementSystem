import { check } from "express-validator";
import { TypeOfBacModel } from "../../models/TypeOfBac.js";

const validateInsertType = [
    check('typeName')
        .notEmpty().withMessage('typeName is required').bail()
        .custom(async (typeName) => {
            const existingTypeName = await TypeOfBacModel.findOne({typeName});
            if (existingTypeName) throw new Error("Type already exists!");
        })
];

const validateUpdateType = [
    check("typeId")
        .notEmpty().withMessage("typeId is required").bail()
        .custom(async (typeId) => {
            const existingType = await TypeOfBacModel.findOne({_id: typeId});
            if (!existingType) throw new Error("Type is not Registered");
        }),
    check("newTypeName")
        .notEmpty().withMessage("newTypeName is required").bail()
        .custom(async (newTypeName) => {
            const existingType = await TypeOfBacModel.findOne({typeName: newTypeName});
            if (existingType) throw new Error("TypeName already exists !");
        })
];


export {validateInsertType, validateUpdateType}