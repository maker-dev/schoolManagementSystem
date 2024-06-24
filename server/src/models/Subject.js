import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    subName: {
        type: String,
        required: true,
        unique: true
    },
    labs: {
        type: Number,
        required: true
    },
    numberOfExams: {
        type: Number,
        required: true
    }
})

const SubjectModel = mongoose.model("subjects", SubjectSchema);

export {SubjectModel};