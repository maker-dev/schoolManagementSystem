import mongoose from 'mongoose';
import { ClassModel } from '../../models/Class.js';
import { TeacherModel } from '../../models/Teacher.js';

const validateClassSchedule = async (req, res, next) => {
    
    const { classId } = req.params;

    // Validate classId
    if (!classId || !mongoose.Types.ObjectId.isValid(classId)) {
        return res.status(400).json({
            errors: [{
                type: 'field',
                value: classId,
                msg: 'Invalid Class ID',
                path: 'classId',
                location: 'params'
            }]
        });
    }
    
    // Check if the class exists in the database
    try {
        const existingClass = await ClassModel.findById(classId);
        if (!existingClass) {
            return res.status(404).json({
                errors: [{
                    type: 'field',
                    value: classId,
                    msg: 'Class not found',
                    path: 'classId',
                    location: 'params'
                }]
            });
        }
    } catch (err) {
        console.error('Error checking class existence:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    next();
};

const validateTeacherSchedule = async (req, res, next) => {
       
    const { teacherId } = req.params;

    // Validate classId
    if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({
            errors: [{
                type: 'field',
                value: teacherId,
                msg: 'Invalid teacher ID',
                path: 'teacherId',
                location: 'params'
            }]
        });
    }
    
    // Check if the class exists in the database
    try {
        const existingTeacher = await TeacherModel.findById(teacherId);
        if (!existingTeacher) {
            return res.status(404).json({
                errors: [{
                    type: 'field',
                    value: teacherId,
                    msg: 'teacher not found',
                    path: 'teacherId',
                    location: 'params'
                }]
            });
        }
    } catch (err) {
        console.error('Error checking teacher existence:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    next(); 
}


export { validateClassSchedule, validateTeacherSchedule };
