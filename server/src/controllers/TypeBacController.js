import mongoose from "mongoose";
import {validationResult} from 'express-validator';
import { TypeOfBacModel } from "../models/TypeOfBac.js";
import { StudentModel } from "../models/Student.js";
import { FieldModel } from "../models/Field.js";

const getTypesOfBac = async (req, res) => {
    try {
        const types = await TypeOfBacModel.find();

        res.json(types);
        
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showType = async (req, res) => {
    const {typeId} = req.params;

    try {

        if (!typeId) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: typeId,
                        msg: "typeId is required",
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

        const typeOfBac = await TypeOfBacModel.findOne({_id: typeId});

        if (!typeOfBac) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        value: typeId,
                        msg: "type not found",
                        path: "typeId",
                        location: "body"
                    }
                ]
            });
        }

        return res.json(typeOfBac);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const insertTypeOfBac = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {typeName} = req.body; 

    try {
        const newTypeOfBac = new TypeOfBacModel({
            typeName
        })

        await newTypeOfBac.save();

        return res.json({message: "New TypeOfBac Registered Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateTypeOfBac = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {typeId, newTypeName} = req.body;

    try {
        await TypeOfBacModel.updateOne({_id: typeId}, {typeName: newTypeName});

        return res.json({message: "TypeOfBac Updated Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteTypeOfBac = async (req, res) => {
    const {typeId} = req.body;

    if (!typeId) return res.status(400).json({
        errors: [
            {
                type: "field",
                value: typeId,
                msg: "typeId is required",
                path: "typeId",
                location: "body"
            }
        ]
    });

    try {
        
        const typeOfBac = await TypeOfBacModel.findOne({_id: typeId});

        const fields    = await FieldModel.find({bacRequired: typeOfBac._id});
        
        const students  = await StudentModel.find({typeOfBac: typeOfBac._id});


        if (!typeOfBac) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: typeId,
                    msg: "typeId doesn't exists !",
                    path: "typeId",
                    location: "body"
                }
            ]
        });

        
        if (fields.length > 0) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: typeId,
                    msg: "typeOfBac already attached with field",
                    path: "typeId",
                    location: "body"
                }
            ]
        });

        if (students.length > 0) return res.status(400).json({
            errors: [
                {
                    type: "field",
                    value: typeId,
                    msg: "typeOfBac already attached with student",
                    path: "typeId",
                    location: "body"
                }
            ]
        });



        await typeOfBac.deleteOne();

        return res.json({message: "Type Deleted Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {getTypesOfBac, showType, insertTypeOfBac, updateTypeOfBac, deleteTypeOfBac}