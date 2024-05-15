import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    subName: {
        type: String,
        required: true
    }
})

const SubjectModel = mongoose.model("subjects", SubjectSchema);

export {SubjectModel};