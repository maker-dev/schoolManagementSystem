import { ComplainModel } from "../models/Complain.js";
import {validationResult} from 'express-validator';

const addComplain = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {userId} = req.params;
    const {role, subject, details} = req.body; 

    try {

        const complain = new ComplainModel({
            complainant: {
                id: userId,
                model: role
            },
            subject,
            details
        })

        await complain.save();

        return res.json({message: "New Complain Added Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteComplain = async (req, res) => {
    
    const {complainId} = req.params;

    try {

        const complain = await ComplainModel.findById(complainId);

        await complain.deleteOne();

        return res.json({message: "Complain Deleted Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const showComplains = async (req, res) => {
    
    try {

        const complaints = await ComplainModel.find()

        res.json(complaints);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {addComplain, deleteComplain, showComplains}