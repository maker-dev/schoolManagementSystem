import { FieldModel } from "../models/Field.js";
import {validationResult} from 'express-validator';

const getFields = async (req, res) => {
    try {
        const { typeId } = req.query;

        const fields = await FieldModel.find({bacRequired: typeId});
        
        res.json(fields);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showFields = async (req, res) => {
    try {
        const fields = await FieldModel.find({}).populate("bacRequired", "typeName");

        res.json(fields);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const insertField = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fieldName, bacRequired} = req.body;

    try {
        const field = new FieldModel({
            fieldName,
            bacRequired
        });

        await field.save();

        return res.json({message: "New Field Registered Successfully !"});

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

        await field.deleteOne();

        return res.json({message: "Field Deleted Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {getFields, showFields, insertField, deleteField};