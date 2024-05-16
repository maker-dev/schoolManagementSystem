import { check } from "express-validator";
import { AdminModel } from '../../models/Admin.js';


const validateAdminLogin = [
    check('email')
        .isEmail().withMessage('Invalid email address')
        .custom(async (email) => {
            const existingAdmin = await AdminModel.findOne({email});
            if (!existingAdmin) throw new Error("User doesn't exists !");
        }),
    check('password')
        .notEmpty().withMessage('Password is required')
];

export {validateAdminLogin}