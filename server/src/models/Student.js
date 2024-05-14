import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
    lessonNumber: {
        type: Number,
        required: true
    },
    lessonHours: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true
    }
});

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Student"
    },
    verified: {
        type: Boolean,
        default: false
    },
    attendance: [{
        date: {
            type: Date,
            default: Date.now
        },
        lessons: [LessonSchema]
    }]
}, { timestamps: true });

const StudentModel = mongoose.model("students", StudentSchema);

export {StudentModel};
