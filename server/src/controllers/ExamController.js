import {StudentModel} from '../models/Student.js';
import {validationResult} from 'express-validator';

const addExamMark = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {studentId} = req.params;
    const {subject, mark, date} = req.body;

    try {

        //fetch student object
        const student = await StudentModel.findById(studentId);
        
        const subjectExams = student.examResults.find(ele => {
            return ele.subject.toString() === subject;
        })
        
        if (subjectExams) {
            const exam = {
                date,
                marksObtained: mark
            }
            subjectExams.exams.push(exam);

        } else {
            const subjectExams = {
                subject,
                exams: [{
                    date,
                    marksObtained: mark
                }]
            };
            student.examResults.push(subjectExams);
        }

        await student.save();

        return res.json({message: "New Mark Added Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateExamMark = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {studentId} = req.params;
    const {subject, examId, newMark, newDate} = req.body;

    try {

        const student = await StudentModel.findById(studentId);

        const subjectExams    = student.examResults.find(elem => {
            return elem.subject.toString() === subject;
        })

        const exam = subjectExams.exams.find(ele => {
            return ele._id.toString() === examId;
        })

        exam.marksObtained = newMark;
        exam.date          = newDate;

        await student.save();

        return res.json({message: "Mark Updated Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteExamMark = async (req, res) => {
    const {studentId} = req.params;
    const {subject, examId} = req.body;

    try {

        const student = await StudentModel.findById(studentId);

        const subjectExams    = student.examResults.find(elem => {
            return elem.subject.toString() === subject;
        })

        subjectExams.exams = subjectExams.exams.filter(ele => {
            return ele._id.toString() !== examId;
        })
        
        await student.save();
        
        return res.json({message: "Mark Deleted Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {addExamMark, updateExamMark, deleteExamMark};