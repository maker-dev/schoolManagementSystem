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

const TeacherSchema = new mongoose.Schema({
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
    role: {
        type: String,
        default: "Teacher"
    },
    verified: {
        type: Boolean,
        default: false
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
