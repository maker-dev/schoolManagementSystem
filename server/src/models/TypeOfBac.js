import mongoose from "mongoose";

const TypeOfBacSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: true
    }
})

const TypeOfBacModel = mongoose.model("typeofbacs", TypeOfBacSchema);

export {TypeOfBacModel};