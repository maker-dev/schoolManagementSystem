import { ComplainModel } from "../models/Complain.js";
import {validationResult} from 'express-validator';
import { TeacherModel } from "../models/Teacher.js";
import { StudentModel } from "../models/Student.js";


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

       // Fetch complaints without population
       const complaints = await ComplainModel.find();

       // Manually populate complainant details
       const populatedComplaints = await Promise.all(complaints.map(async (complaint) => {
           let complainantDetails;
           if (complaint.complainant.model === 'Teacher') {
               complainantDetails = await TeacherModel.findById(complaint.complainant.id).select('firstName lastName');
           } else if (complaint.complainant.model === 'Student') {
               complainantDetails = await StudentModel.findById(complaint.complainant.id).select('firstName lastName');
           }

           const fullName = complainantDetails ? `${complainantDetails.firstName} ${complainantDetails.lastName}` : 'Unknown';

           return {
               _id: complaint._id,
               complainant: {
                   id: complainantDetails ? complainantDetails._id : null,
                   name: fullName,
                   model: complaint.complainant.model
               },
               subject: complaint.subject,
               details: complaint.details,
               createdAt: complaint.createdAt,
               updatedAt: complaint.updatedAt
           };
       }));

       res.json(populatedComplaints);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {addComplain, deleteComplain, showComplains}