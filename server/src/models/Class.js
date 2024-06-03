import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true
    }
})

const ClassModel = mongoose.model("classes", ClassSchema);

export {ClassModel};