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
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers"
    }],
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "files"
    }
})

const ClassModel = mongoose.model("classes", ClassSchema);

export {ClassModel};