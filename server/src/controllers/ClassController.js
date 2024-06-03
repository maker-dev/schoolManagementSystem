import { ClassModel } from "../models/Class.js";
import {validationResult} from 'express-validator';
import mongoose from "mongoose";


const showClasses = async (req, res) => {
    try {
        const Classes = await ClassModel.find({});

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

    const {className} = req.body;

    try {

        const Class = new ClassModel({
            className
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

    const {classId, newClassName} = req.body;

    try {
        
        await ClassModel.updateOne({_id: classId}, {className: newClassName});

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
                    msg: "classId doesn't exists !",
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

export {showClasses, showClass, insertClass, updateClass, deleteClass}