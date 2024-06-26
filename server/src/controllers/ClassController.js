import { ClassModel } from "../models/Class.js";
import { FieldModel } from "../models/Field.js";
import { StudentModel } from '../models/Student.js';
import { TeacherModel } from '../models/Teacher.js';
import { validationResult } from 'express-validator';
import mongoose from "mongoose";
import { SubjectModel } from "../models/Subject.js";
import { FileModel } from "../models/File.js";
import fs from 'fs';

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

        if (Class.schedule) {
            const file = await FileModel.findById(Class.schedule);
            await fs.promises.unlink(`.${file.path}/${file.fileName}${file.extension}`);
            await file.deleteOne(); 
        }

        await Class.deleteOne();

        await StudentModel.updateMany({class: classId}, {class: null});

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
            path: 'teachers.id',
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

        const teacherDetails = classWithTeachers.teachers.map(teacher => teacher.id);

        res.json(teacherDetails);

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

        const updateResult = await ClassModel.updateOne({_id: classId}, { $addToSet: { teachers: {id: teacherId, subjects: []} } });
        
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
            { $pull: { teachers: {id: teacherId} } }
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

const showAllSubjectsInClass = async (req, res) => {

    const {classId} = req.params;


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

        const Class = await ClassModel.findById(classId);
        const Field = await FieldModel.findById(Class.field).populate("subjects", "subName labs");

        const fieldSubjects = Field.subjects;

        res.json(fieldSubjects);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }   
}

const attachSubjectToTeacherInClass = async (req, res) => {
    
    const { classId, teacherId, subjectId } = req.body;

    try {
        // Validate inputs (classId, teacherId, subjectId)
        if (!mongoose.Types.ObjectId.isValid(classId) ||
            !mongoose.Types.ObjectId.isValid(teacherId) ||
            !mongoose.Types.ObjectId.isValid(subjectId)) {
            return res.status(400).json({
                errors: [{
                    type: "field",
                    msg: "Invalid IDs",
                    path: "classId, teacherId, subjectId",
                    location: "body"
                }]
            });
        }

        const Class = await ClassModel.findById(classId);

        const teacher = await TeacherModel.findById(teacherId);

        const subject = await SubjectModel.findById(subjectId);

        if (!teacher.teacherSubject.includes(subject._id)) {
            return res.status(400).json({
                errors: [{
                    type: "field",
                    msg: "subject not match with this teacher",
                    path: "teacherId, subjectId",
                    location: "body"
                }]
            });
        }


        // Update the class to reflect the change in teachers
        const teacherIndex = Class.teachers.findIndex(t => t.id.toString() === teacherId);
        if (teacherIndex !== -1) {
            // Ensure the subject is not already attached to this teacher in the class
            if (!Class.teachers[teacherIndex].subjects.includes(subjectId)) {
                Class.teachers[teacherIndex].subjects.push(subjectId);
            }
        }

        await Class.save();

        return res.json({ message: "Subject attached to teacher in class successfully!" });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const detachSubjectFromTeacherInClass = async (req, res) => {

    const { classId, teacherId, subjectId } = req.body;

    try {
        // Validate inputs (classId, teacherId, subjectId)
        if (!mongoose.Types.ObjectId.isValid(classId) ||
            !mongoose.Types.ObjectId.isValid(teacherId) ||
            !mongoose.Types.ObjectId.isValid(subjectId)) {
            return res.status(400).json({
                errors: [{
                    type: "field",
                    msg: "Invalid IDs",
                    path: "classId, teacherId, subjectId",
                    location: "body"
                }]
            });
        }

        const Class = await ClassModel.findById(classId);

        // Update the class to reflect the change in teachers
        const teacherIndex = Class.teachers.findIndex(t => t.id.toString() === teacherId);
        if (teacherIndex !== -1) {
            const subjectIndex = Class.teachers[teacherIndex].subjects.indexOf(subjectId);
            if (subjectIndex !== -1) {
                Class.teachers[teacherIndex].subjects.splice(subjectIndex, 1);
            }
        }

        // Save the updated class
        await Class.save();

        return res.json({ message: "Subject detached from teacher in class successfully!" });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const showSubjectTeacherInClass = async (req, res) => {

    const {classId} = req.params;

    try {
        // Find the class by classId
        const classData = await ClassModel.findById(classId)
        .populate('teachers.id', 'firstName lastName email') // Populate teachers with their names
        .populate('teachers.subjects', 'subName'); // Populate subjects with their names


        // Transform data into desired format
        const transformedData = classData.teachers.map(teacher => ({
            teacher: teacher.id,
            subjects: teacher.subjects
        }));

        // Respond with transformed data
        res.json(transformedData);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
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
    removeStudentFromClass, removeTeacherFromClass, getClassInfo,
    showAllSubjectsInClass, attachSubjectToTeacherInClass, detachSubjectFromTeacherInClass,
    showSubjectTeacherInClass
}