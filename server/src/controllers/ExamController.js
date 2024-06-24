import {StudentModel} from '../models/Student.js';

const addExamMarks = async (req, res) => {

    const {studentId} = req.params;
    const {subject, arrOfExams} = req.body;

    try {

        //fetch student object
        const student = await StudentModel.findById(studentId);
        
        const subjectExams = student.examResults.find(ele => {
            return ele.subject.toString() === subject;
        })

        if (subjectExams) {

            subjectExams.exams = arrOfExams;

        } else {
            const subjectExams = {
                subject,    
                exams: arrOfExams
            };
            student.examResults.push(subjectExams);
        }
      

        await student.save();

        return res.json({message: "Mark Added Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {addExamMarks};