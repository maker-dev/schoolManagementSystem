import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
    fieldName: {
        type: String,
        required: true
    },
    bacRequired: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeofbacs"
    }]
})

const FieldModel = mongoose.model("fields", FieldSchema);

export {FieldModel};