import { check } from 'express-validator';

const validateResetPassword = [
    check('newPassword')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
]

export {validateResetPassword}