import { SubjectModel } from "../models/Subject.js";
import {validationResult} from 'express-validator';
import mongoose from "mongoose";

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

    const { subName } = req.body;

    try {

        const subject = new SubjectModel({
            subName
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

    const {subjectId, newSubjectName} = req.body;

    try {
        
        await SubjectModel.updateOne({_id: subjectId}, {subName: newSubjectName});

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

        const subject = await SubjectModel.findOne({_id: subjectId});

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

        await subject.deleteOne();

        return res.json({message: "Subject Deleted Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {showSubjects, showSubject, insertSubject, updateSubject, deleteSubject}