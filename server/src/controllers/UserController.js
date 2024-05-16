import { AdminModel } from "../models/Admin.js";
import { TeacherModel } from "../models/Teacher.js";
import { StudentModel } from '../models/Student.js';

const user = async (req, res) => {
    try {
        const user = req.user;

        if (user.role === "Admin") {
            const admin = await AdminModel.findOne({_id: user.id});
            return res.json(admin);
        } else if (user.role === "Teacher") {
            const teacher = await TeacherModel.findOne({_id: user.id});
            return res.json(teacher);
        } else if (user.role === "Student") {
            const student = await StudentModel.findOne({_id: user.id});
            return res.json(student);
        }

        res.status(400).json({ message: 'No User logged in' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {user};