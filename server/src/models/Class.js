import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
        unique: true
    },
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fields"
    },
    teachers: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teachers"
        },
        subjects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "subjects"
        }]
    }],
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "files"
    }
})

const ClassModel = mongoose.model("classes", ClassSchema);

export {ClassModel};