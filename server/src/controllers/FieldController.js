import { FieldModel } from "../models/Field.js";
import {validationResult} from 'express-validator';
import mongoose from "mongoose";
import { ClassModel } from "../models/Class.js";
import { StudentModel } from "../models/Student.js";

const getFields = async (req, res) => {
    try {
        const { typeId } = req.query;

        if (!typeId) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: typeId,
                        msg: "TypeId is required",
                        path: "typeId",
                        location: "body"
                    }
                ]
            });
        }

        // Validate if typeId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(typeId)) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: typeId,
                        msg: "Invalid typeId",
                        path: "typeId",
                        location: "body"
                    }
                ]
            });
        }

        const fields = await FieldModel.find({bacRequired: { $in: [typeId] } });
        
        res.json(fields);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showFields = async (req, res) => {
    try {
        const fields = await FieldModel.find({}).populate("bacRequired", "typeName").populate("subjects", "subName");

        res.json(fields);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showField = async (req, res) => {

    const { fieldId }= req.params;
    
    try {


        if (!fieldId) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: fieldId,
                        msg: "fieldId is required",
                        path: "fieldId",
                        location: "body"
                    }
                ]
            });
        }

        // Validate if typeId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(fieldId)) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: fieldId,
                        msg: "Invalid typeId",
                        path: "fieldId",
                        location: "body"
                    }
                ]
            });
        }
        const field = await FieldModel.findOne({_id: fieldId}).populate("bacRequired", "typeName").populate("subjects", "subName");
        
        if (!field) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: fieldId,
                        msg: "Field not found",
                        path: "fieldId",
                        location: "body"
                    }
                ]
            });
        }

        res.json(field);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const insertField = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fieldName, bacRequired, subjects} = req.body;

    try {
        const field = new FieldModel({
            fieldName,
            bacRequired,
            subjects
        });

        await field.save();

        return res.json({message: "New Field Registered Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateField = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fieldId, newFieldName, newBacRequired, newSubjects} = req.body;

    try {
        
        await FieldModel.updateOne({_id: fieldId}, {fieldName: newFieldName, bacRequired: newBacRequired, subjects: newSubjects});

        return res.json({message: "Field Updated Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteField = async (req, res) => {

    const {fieldId} = req.body;

    if (!fieldId) return res.status(400).json({
        errors: [
            {
                type: "field",
                value: fieldId,
                msg: "fieldId is required",
                path: "fieldId",
                location: "body"
            }
        ]
    });

    try {

        const field = await FieldModel.findOne({_id: fieldId});

        const Classes = await ClassModel.find({field: field._id});

        const Student = await StudentModel.find({field: field._id})


        if (!field) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: fieldId,
                    msg: "Field doesn't exists !",
                    path: "fieldId",
                    location: "body"
                }
            ]
        });
        
        if (Classes.length > 0) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: fieldId,
                    msg: "Field already attached with Class",
                    path: "fieldId",
                    location: "body"
                }
            ]
        });

        if (Student.length > 0) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: fieldId,
                    msg: "Field already attached with Student",
                    path: "fieldId",
                    location: "body"
                }
            ]
        });


        await field.deleteOne();

        return res.json({message: "Field Deleted Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


export {getFields, showFields, showField, insertField, updateField, deleteField};