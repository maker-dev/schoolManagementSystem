import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    }
});
  
const FileModel = mongoose.model('Files', FileSchema);

export {FileModel}