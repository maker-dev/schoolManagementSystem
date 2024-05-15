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

const examSchema = new mongoose.Schema({
    subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects"
    },
    semester: {
        type: Number,
        required: true
    },
    marksObtained: {
        type: Number,
        default: 0
    }

})

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    typeOfBac: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
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
        default: "Student"
    },
    verified: {
        type: Boolean,
        default: false
    },
    examResults: [{
        date: {
            type: Date,
            default: Date.now
        },
        examInfo: [examSchema]
    }],
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
