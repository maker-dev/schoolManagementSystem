import { check } from 'express-validator';

const validateComplainInsert = [
    check("role")
        .notEmpty().withMessage("subject is required").bail()
        .isIn(['Teacher', 'Student']).withMessage('Complainant  must be either "Teacher" or "Student"'),
    check("subject")
        .notEmpty().withMessage("subject is required"),
    check("details")
        .notEmpty().withMessage("details is required")
]

export {validateComplainInsert}