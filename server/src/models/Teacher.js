import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
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

const TeacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    salary: {
        type: Number
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
    teacherSubject: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects"
    }],
    role: {
        type: String,
        default: "Teacher"
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "files"
    },
    attendance: [{
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        lessons: [LessonSchema]
    }]
}, { timestamps: true });

const TeacherModel = mongoose.model("teachers", TeacherSchema);

export {TeacherModel};
