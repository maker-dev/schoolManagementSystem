import { Router } from "express";
import multer from 'multer';
import path from 'path'
import { adminLogin } from "../controllers/AdminController.js";
import { teacherRegister, teacherLogin, teacherConfirmation, showTeachersNotInClass, showAllTeachers } from "../controllers/TeacherController.js";
import { studentRegister, studentLogin, studentConfirmation, showFieldStudents } from "../controllers/StudentController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyKey from "../middlewares/verifyKey.js";
import { validateTeacherRegister, validateTeacherLogin } from '../middlewares/validation/teacher.js';
import { validateStudentRegister, validateStudentLogin } from "../middlewares/validation/student.js";
import { validateEmail } from '../middlewares/validation/resendEmail.js';
import { validateAdminLogin } from "../middlewares/validation/admin.js";
import { user, resendEmail } from '../controllers/UserController.js';
import { getTypesOfBac, showType, insertTypeOfBac, updateTypeOfBac, deleteTypeOfBac} from "../controllers/TypeBacController.js";
import { getFields, showFields, showField, insertField, updateField, deleteField } from "../controllers/FieldController.js";
import { showClasses, showClass, insertClass, updateClass, deleteClass,
        showClassStudents, showClassTeachers, addStudentToClass, addTeacherToClass,
        removeStudentFromClass, removeTeacherFromClass, getClassInfo
        } from '../controllers/ClassController.js';
import { showSubjects, showSubject, insertSubject, updateSubject, deleteSubject } from '../controllers/SubjectController.js';
import { 
        uploadClassSchedule, deleteClassSchedule, downloadClassSchedule, 
        uploadTeacherSchedule, deleteTeacherSchedule, downloadTeacherSchedule
        } from '../controllers/FileController.js';
import {validateInsertField, validateUpdateField} from '../middlewares/validation/field.js'
import {validateInsertType, validateUpdateType} from '../middlewares/validation/typeOfBac.js';
import { validateInsertClass, validateUpdateClass} from "../middlewares/validation/Class.js";
import {validateInsertSubject, validateUpdateSubject} from '../middlewares/validation/subject.js';
import {validateClassSchedule, validateTeacherSchedule} from '../middlewares/validation/file.js';

//variables
const routes = Router();

const classesScheduleStorage = multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, "./uploads/classesSchedule");
        },
        filename: (req, file, cb) => {
                const extension = path.extname(file.originalname);
                var fileNameWithoutExtension = path.basename(file.originalname, extension);
                fileNameWithoutExtension = `${Date.now()}-${fileNameWithoutExtension}`; 
                const generatedFileName = `${fileNameWithoutExtension}${extension}`;
                cb(null, generatedFileName);
                // Store both filename and extension in req.locals
                req.locals = { 
                    extension,
                    fileNameWithoutExtension,
                    generatedFileName
                };
        },
});
const teachersScheduleStorage = multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, './uploads/teachersSchedule');
        },
        filename: (req, file, cb) => {
                const extension = path.extname(file.originalname);
                var fileNameWithoutExtension = path.basename(file.originalname, extension);
                fileNameWithoutExtension = `${Date.now()}-${fileNameWithoutExtension}`; 
                const generatedFileName = `${fileNameWithoutExtension}${extension}`;
                cb(null, generatedFileName);
                // Store both filename and extension in req.locals
                req.locals = { 
                    extension,
                    fileNameWithoutExtension,
                    generatedFileName
                };
        },
})

const classesScheduleUpload = multer({
        storage: classesScheduleStorage
});
const teachersScheduleUpload = multer({
        storage: teachersScheduleStorage
})

//admin
routes.post("/adminLogin", verifyKey, validateAdminLogin, adminLogin);

//teacher
routes.post("/teacherRegister", verifyKey, validateTeacherRegister, teacherRegister);
routes.post("/teacherLogin", verifyKey, validateTeacherLogin, teacherLogin);
routes.get("/teacherConfirmation/:token", teacherConfirmation);
routes.get("/showTeachersNotInClass/:classId", verifyKey, verifyToken, verifyRole(["Admin"]), showTeachersNotInClass);
routes.get("/showAllTeachers", verifyKey, verifyToken, verifyRole(["Admin"]), showAllTeachers)

//student
routes.post("/studentRegister", verifyKey, validateStudentRegister, studentRegister);
routes.post("/studentLogin", verifyKey, validateStudentLogin, studentLogin);
routes.get("/studentConfirmation/:token", studentConfirmation);
routes.get("/showFieldStudents/:classId", verifyKey, verifyToken, verifyRole(["Admin"]), showFieldStudents);

//user
routes.post("/user", verifyKey, verifyToken, user);
routes.post("/resendEmail", verifyKey, validateEmail, resendEmail);

//typeOfBac
routes.get("/typesOfBac", verifyKey, getTypesOfBac);
routes.get("/showType/:typeId", verifyKey, verifyToken, verifyRole(["Admin"]), showType);
routes.post("/insertType", verifyKey, verifyToken, verifyRole(["Admin"]), validateInsertType, insertTypeOfBac);
routes.put("/updateType", verifyKey, verifyToken, verifyRole(["Admin"]), validateUpdateType, updateTypeOfBac);
routes.delete("/deleteType", verifyKey, verifyToken, verifyRole("Admin"), deleteTypeOfBac);

//field
routes.get("/getFields", verifyKey, getFields);
routes.get("/showFields", verifyKey, verifyToken, verifyRole(['Admin']), showFields);
routes.get("/showField/:fieldId", verifyKey, verifyToken, verifyRole(["Admin"]), showField);
routes.post("/insertField", verifyKey, verifyToken, verifyRole(["Admin"]), validateInsertField, insertField);
routes.put("/updateField", verifyKey, verifyToken, verifyRole(['Admin']), validateUpdateField, updateField);
routes.delete("/deleteField", verifyKey, verifyToken, verifyRole(["Admin"]), deleteField);

//class
routes.get("/showClasses", verifyKey, verifyToken, verifyRole(["Admin"]), showClasses);
routes.get("/showClass/:classId", verifyKey, verifyToken, verifyRole(['Admin']), showClass);
routes.post("/insertClass", verifyKey, verifyToken, verifyRole(["Admin"]), validateInsertClass, insertClass);
routes.put("/updateClass", verifyKey, verifyToken, verifyRole(['Admin']), validateUpdateClass, updateClass);
routes.delete("/deleteClass", verifyKey, verifyToken, verifyRole(["Admin"]), deleteClass);
routes.get("/showClassStudents/:classId", verifyKey, verifyToken, verifyRole(['Admin']), showClassStudents);
routes.get("/showClassTeachers/:classId", verifyKey, verifyToken, verifyRole(['Admin']), showClassTeachers);
routes.post("/addStudentToClass", verifyKey, verifyToken, verifyRole(["Admin"]), addStudentToClass);
routes.post("/addTeacherToClass", verifyKey, verifyToken, verifyRole(["Admin"]), addTeacherToClass);
routes.post("/removeStudentFromClass", verifyKey, verifyToken, verifyRole(["Admin"]), removeStudentFromClass)
routes.post("/removeTeacherFromClass", verifyKey, verifyToken, verifyRole(["Admin"]), removeTeacherFromClass)
routes.get("/getClassInfo/:classId", verifyKey, verifyToken, verifyRole(["Admin"]), getClassInfo);

//subject
routes.get("/showSubjects", verifyKey, verifyToken, verifyRole(["Admin"]), showSubjects);
routes.get("/showSubject/:subjectId", verifyKey, verifyToken, verifyRole(['Admin']), showSubject);
routes.post("/insertSubject", verifyKey, verifyToken, verifyRole(["Admin"]), validateInsertSubject, insertSubject);
routes.put("/updateSubject", verifyKey, verifyToken, verifyRole(['Admin']), validateUpdateSubject, updateSubject);
routes.delete("/deleteSubject", verifyKey, verifyToken, verifyRole(["Admin"]), deleteSubject);

//file
routes.post("/uploadClassSchedule/:classId", verifyKey, verifyToken, verifyRole(["Admin"]), validateClassSchedule, classesScheduleUpload.single("file"), uploadClassSchedule);
routes.delete("/deleteClassSchedule/:classId", verifyKey, verifyToken, verifyRole(["Admin"]), validateClassSchedule,deleteClassSchedule)
routes.get("/downloadClassSchedule/:classId", verifyKey, verifyToken, verifyRole(["Admin", "Student"]), downloadClassSchedule)
routes.post("/uploadTeacherSchedule/:teacherId", verifyKey, verifyToken, verifyRole(["Admin"]), validateTeacherSchedule, teachersScheduleUpload.single("file"), uploadTeacherSchedule);
routes.delete("/deleteTeacherSchedule/:teacherId", verifyKey, verifyToken, verifyRole(["Admin"]), validateTeacherSchedule, deleteTeacherSchedule)
routes.get("/downloadTeacherSchedule/:teacherId", verifyKey, verifyToken, verifyRole(["Admin", "Teacher"]), downloadTeacherSchedule)


export {routes};