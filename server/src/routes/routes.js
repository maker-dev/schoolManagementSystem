import { Router } from "express";
import { adminLogin } from "../controllers/AdminController.js";
import { teacherRegister, teacherLogin, teacherConfirmation } from "../controllers/TeacherController.js";
import { studentRegister, studentLogin, studentConfirmation } from "../controllers/StudentController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyKey from "../middlewares/verifyKey.js";
import { validateTeacherRegister, validateTeacherLogin } from '../middlewares/validation/teacher.js';
import { validateStudentRegister, validateStudentLogin } from "../middlewares/validation/student.js";
import { validateAdminLogin } from "../middlewares/validation/admin.js";
import {user} from '../controllers/UserController.js';
import { getTypesOfBac } from "../controllers/TypeBacController.js";
import { getFields } from "../controllers/FieldController.js";

const routes = Router();

//admin
routes.post("/adminLogin", verifyKey, validateAdminLogin, adminLogin);

//teacher
routes.post("/teacherRegister", verifyKey, validateTeacherRegister, teacherRegister);
routes.post("/teacherLogin", verifyKey, validateTeacherLogin, teacherLogin);
routes.get("/teacherConfirmation/:token", teacherConfirmation);

//student
routes.post("/studentRegister", verifyKey, validateStudentRegister, studentRegister);
routes.post("/studentLogin", verifyKey, validateStudentLogin, studentLogin);
routes.get("/studentConfirmation/:token", studentConfirmation);

//user
routes.post("/user", verifyKey, verifyToken, user);

//typeOfBac
routes.get("/typesOfBac", verifyKey, getTypesOfBac)

//field
routes.get("/getFields", verifyKey, getFields)

export {routes};