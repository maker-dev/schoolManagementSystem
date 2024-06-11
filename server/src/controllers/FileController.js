import { FileModel } from "../models/File.js";
import { TeacherModel } from "../models/Teacher.js";
import {ClassModel} from '../models/Class.js';
import fs from 'fs';

//for student

const uploadClassSchedule = async (req, res) => {
    
    const {classId} = req.params;

    try {

        const Class = await ClassModel.findById(classId);


        if (Class.schedule) {
            const file = await FileModel.findById(Class.schedule);
            await fs.promises.unlink(`.${file.path}/${file.fileName}${file.extension}`);
            await file.deleteOne(); 
        }

        const newFile = new FileModel({
            fileName: req.locals.fileNameWithoutExtension,
            path: "/uploads/classesSchedule",
            extension: req.locals.extension
        })

        await newFile.save();
        
        Class.schedule = newFile._id;

        await Class.save();
        
        return res.json({message: "File Uploaded Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteClassSchedule = async (req, res) => {

    const {classId} = req.params;

    try {

        const Class = await ClassModel.findById(classId);
        
        const file = await FileModel.findById(Class.schedule);
        
        await fs.promises.unlink(`.${file.path}/${file.fileName}${file.extension}`);
        
        await file.deleteOne(); 

        Class.schedule = null;

        await Class.save();
        
        return res.json({message: "File Deleted Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const downloadClassSchedule = async (req, res) => {
    const {classId} = req.params;

    try {

        const Class = await ClassModel.findById(classId);
        
        const file = await FileModel.findById(Class.schedule);
        
        res.download(`.${file.path}/${file.fileName}${file.extension}`)

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

//for teachers

const uploadTeacherSchedule = async (req, res) => {
    
    const {teacherId} = req.params;

    try {
        const teacher = await TeacherModel.findById(teacherId);


        if (teacher.schedule) {
            const file = await FileModel.findById(teacher.schedule);
            await fs.promises.unlink(`.${file.path}/${file.fileName}${file.extension}`);
            await file.deleteOne(); 
        }

        const newFile = new FileModel({
            fileName: req.locals.fileNameWithoutExtension,
            path: "/uploads/teachersSchedule",
            extension: req.locals.extension
        })

        await newFile.save();
        
        teacher.schedule = newFile._id;

        await teacher.save();
        
        return res.json({message: "File Uploaded Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteTeacherSchedule = async (req, res) => {

    const {teacherId} = req.params;

    try {

        const teacher = await TeacherModel.findById(teacherId);
        
        const file = await FileModel.findById(teacher.schedule);
        
        await fs.promises.unlink(`.${file.path}/${file.fileName}${file.extension}`);
        
        await file.deleteOne(); 

        teacher.schedule = null;

        await teacher.save();
        
        return res.json({message: "File Deleted Successfully !"});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const downloadTeacherSchedule = async (req, res) => {
    const {teacherId} = req.params;

    try {

        const teacher = await TeacherModel.findById(teacherId);
        
        const file = await FileModel.findById(teacher.schedule);
        
        res.download(`.${file.path}/${file.fileName}${file.extension}`)

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {
    uploadClassSchedule, deleteClassSchedule, downloadClassSchedule,
    uploadTeacherSchedule, deleteTeacherSchedule, downloadTeacherSchedule
}