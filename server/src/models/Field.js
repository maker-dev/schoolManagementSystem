import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
    fieldName: {
        type: String,
        required: true,
        unique: true
    },
    bacRequired: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeofbacs"
    }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects"
    }]
})

const FieldModel = mongoose.model("fields", FieldSchema);

export {FieldModel};