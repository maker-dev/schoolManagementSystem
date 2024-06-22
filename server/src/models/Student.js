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

const examSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects"
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeofbacs"
    },
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fields"
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classes"
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
    confirmation: {
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
