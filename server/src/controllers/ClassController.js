import { ClassModel } from "../models/Class.js";
import { StudentModel } from '../models/Student.js';
import { TeacherModel } from '../models/Teacher.js';
import { validationResult } from 'express-validator';
import mongoose from "mongoose";

//class crud

const showClasses = async (req, res) => {
    try {
        const Classes = await ClassModel.find({}).populate("field", "    fieldName");

        res.json(Classes);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showClass = async (req, res) => {

    const { classId }= req.params;
    
    try {


        if (!classId) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: classId,
                        msg: "classId is required",
                        path: "classId",
                        location: "body"
                    }
                ]
            });
        }

        // Validate if typeId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: classId,
                        msg: "Invalid classId",
                        path: "classId",
                        location: "body"
                    }
                ]
            });
        }
        const Class = await ClassModel.findOne({_id: classId});
        
        if (!Class) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: classId,
                        msg: "classId not found",
                        path: "classId",
                        location: "body"
                    }
                ]
            });
        }

        res.json(Class);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const insertClass = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {className, field} = req.body;

    try {

        const Class = new ClassModel({
            className,
            field
        });

        await Class.save();

        return res.json({message: "New Class Registered Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateClass = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {classId, newClassName, newField} = req.body;

    try {
        
        await ClassModel.updateOne({_id: classId}, {className: newClassName, field: newField});

        return res.json({message: "Class Updated Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteClass = async (req, res) => {

    const {classId} = req.body;

    if (!classId) return res.status(400).json({
        errors: [
            {
                type: "field",
                value: classId,
                msg: "classId is required",
                path: "classId",
                location: "body"
            }
        ]
    });

    try {

        const Class = await ClassModel.findOne({_id: classId});

        if (!Class) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: classId,
                    msg: "class doesn't exists !",
                    path: "classId",
                    location: "body"
                }
            ]
        });

        await Class.deleteOne();

        return res.json({message: "Class Deleted Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

//students

const showClassStudents = async (req, res) => {

    const {classId} = req.params;

    try {

        const students = await StudentModel.find({class: classId}).select('-password');

        res.json(students);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addStudentToClass = async (req, res) => {
    const {classId, studentId} = req.body;

    if (!mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: [classId, studentId],
                    msg: "Invalid classId or studentId",
                    path: "classId and studentId",
                    location: "body"
                }
            ]
        });
    }

    try {

        const student = await StudentModel.findOne({_id: studentId});

        if (!student) {
            return res.status(404).json({
                errors: [
                    {
                        type: "field",
                        value: studentId,
                        msg: "Student not found",
                        path: "studentId",
                        location: "body"
                    }
                ]
            });
        }

        if (student.class && student.class.toString() === classId) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: [classId, studentId],
                        msg: "Student is already in this class",
                        path: "classId and studentId",
                        location: "body"
                    }
                ]
            });
        }

        await StudentModel.updateOne({_id: studentId}, {class: classId});

        res.json("Student added successfully !");

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const removeStudentFromClass = async (req, res) => {
    const {studentId} = req.body;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: studentId,
                    msg: "Invalid studentId",
                    path: "studentId",
                    location: "body"
                }
            ]
        });
    }


    try {

        await StudentModel.updateOne({_id: studentId}, { $set: { class: null } })

        res.json("Student removed successfully !");

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


//teachers

const showClassTeachers = async (req, res) => {

    const {classId} = req.params

    try {

        const classWithTeachers = await ClassModel.findById(classId).populate({
            path: 'teachers',
            select: '-password'  // Exclude the password field
        });

        if (!classWithTeachers) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: classId,
                    msg: "class doesn't exists !",
                    path: "classId",
                    location: "body"
                }
            ]
        });

        res.json(classWithTeachers.teachers);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addTeacherToClass = async (req, res) => {
    const {classId, teacherId} = req.body;

    if (!mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: [classId, teacherId],
                    msg: "Invalid classId or teacherId",
                    path: "classId and teacherId",
                    location: "body"
                }
            ]
        });
    }

    try {

        const updateResult = await ClassModel.updateOne({_id: classId}, { $addToSet: { teachers: teacherId } });
        
        if (updateResult.modifiedCount === 0 ) {
            return res.status(404).json({
                errors: [
                    {
                        type: "field",
                        value: [classId, teacherId],
                        msg: "Class not found or teacher already added",
                        path: "classId and teacherId",
                        location: "body"
                    }
                ]
            });
        }

        res.json("Teacher added successfully !");

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const removeTeacherFromClass = async (req, res) => {
    const {classId, teacherId} = req.body;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: teacherId,
                    msg: "Invalid teacherId",
                    path: "teacherId",
                    location: "body"
                }
            ]
        });
    }


    try {

        const updateResult = await ClassModel.updateOne(
            { _id: classId },
            { $pull: { teachers: teacherId } }
        );

        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({
                errors: [
                    {
                        type: "field",
                        value: { classId, teacherId },
                        msg: "Class not found or teacher not in class",
                        path: "classId and teacherId",
                        location: "body"
                    }
                ]
            });
        }

        res.json("Teacher removed successfully !");

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

//class's information

const getClassInfo = async (req, res) => {

    const { classId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
        return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: classId,
                    msg: "Invalid classId",
                    path: "classId",
                    location: "body"
                }
            ]
        });
    }

    try {

        const Class = await ClassModel.findById(classId).populate("field", "    fieldName");

        if (!Class) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: classId,
                        msg: "Class not found",
                        path: "classId",
                        location: "body"
                    }
                ]
            });
        }

        // Count the number of teachers
        const numberOfTeachers = Class.teachers.length;

        // Query the StudentModel to count the number of students in the class
        const numberOfStudents = await StudentModel.countDocuments({ class: classId });

        const className = Class.className;
        const field = Class.field.fieldName;

        res.json({ numberOfTeachers, numberOfStudents, className, field });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


export {
    showClasses, showClass, insertClass, updateClass, deleteClass,
    showClassStudents, showClassTeachers, addStudentToClass, addTeacherToClass, 
    removeStudentFromClass, removeTeacherFromClass, getClassInfo
}