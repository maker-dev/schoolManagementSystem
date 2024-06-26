import { SubjectModel } from "../models/Subject.js";
import {validationResult} from 'express-validator';
import mongoose from "mongoose";
import { TeacherModel } from "../models/Teacher.js";
import { FieldModel } from "../models/Field.js";
import { ClassModel } from "../models/Class.js";

const showSubjects = async (req, res) => {
    try {
        const subjects = await SubjectModel.find({});

        res.json(subjects);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showSubject = async (req, res) => {

    const { subjectId }= req.params;
    
    try {


        if (!subjectId) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: subjectId,
                        msg: "subjectId is required",
                        path: "subjectId",
                        location: "body"
                    }
                ]
            });
        }

        // Validate if typeId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: subjectId,
                        msg: "Invalid subjectId",
                        path: "subjectId",
                        location: "body"
                    }
                ]
            });
        }
        const subject = await SubjectModel.findOne({_id: subjectId});
        
        if (!subject) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: subjectId,
                        msg: "subjectId not found",
                        path: "subjectId",
                        location: "body"
                    }
                ]
            });
        }

        res.json(subject);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const insertSubject = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { subName, labs, numberOfExams } = req.body;

    try {

        const subject = new SubjectModel({
            subName,
            labs,
            numberOfExams
        })

        await subject.save();

        return res.json({message: "New Subject Registered Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateSubject = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {subjectId, newSubjectName, newLabs, newNumberOfExams} = req.body;

    try {
        
        await SubjectModel.updateOne({_id: subjectId}, {subName: newSubjectName, labs: newLabs, numberOfExams: newNumberOfExams});

        return res.json({message: "Subject Updated Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteSubject = async (req, res) => {

    const {subjectId} = req.body;

    if (!subjectId) return res.status(400).json({
        errors: [
            {
                type: "field",
                value: subjectId,
                msg: "subjectId is required",
                path: "subjectId",
                location: "body"
            }
        ]
    });

    try {

        const subject  = await SubjectModel.findOne({_id: subjectId});

        const teachers = await TeacherModel.find({teacherSubject: subject._id});

        const fields   = await FieldModel.find({subjects: subject._id}); 

        const Classes  = await ClassModel.find({"teachers.subjects": subject._id});
        
        if (!subject) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: subjectId,
                    msg: "subjectId doesn't exists !",
                    path: "subjectId",
                    location: "body"
                }
            ]
        });

        if (teachers.length > 0) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: subjectId,
                    msg: "subject already attached with teacher",
                    path: "subjectId",
                    location: "body"
                }
            ]
        });

        if (fields.length > 0) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: subjectId,
                    msg: "typeOfBac already attached with field",
                    path: "subjectId",
                    location: "body"
                }
            ]
        });

        if (Classes.length > 0) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: subjectId,
                    msg: "subject already attached with Class",
                    path: "subjectId",
                    location: "body"
                }
            ]
        });



        await subject.deleteOne();

        return res.json({message: "Subject Deleted Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showFieldSubjects = async (req, res) => {
    
    const {classId} = req.params;
    const {teacherId} = req.query;

    try {
        
        const Class = await ClassModel.findById(classId)
        .populate("teachers.subjects")

        const teacher = Class.teachers.find(teacher => {
            return teacher.id.toString() === teacherId;
        })

        res.json(teacher);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {showSubjects, showSubject, insertSubject, updateSubject, deleteSubject, showFieldSubjects}