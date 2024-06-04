import mongoose from "mongoose";

const TypeOfBacSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: true,
        unique: true
    }
})

const TypeOfBacModel = mongoose.model("typeofbacs", TypeOfBacSchema);

export {TypeOfBacModel};