import mongoose from "mongoose";

const ComplainSchema = new mongoose.Schema({
    complainant: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'complainant.model'
        },
        model: {
            type: String,
            required: true,
            enum: ['Teacher', 'Student']
        }
    },
    subject: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

const ComplainModel = mongoose.model("complains", ComplainSchema);

export {ComplainModel};