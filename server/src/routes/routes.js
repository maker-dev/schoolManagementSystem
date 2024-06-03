import { Router } from "express";
import { adminLogin } from "../controllers/AdminController.js";
import { teacherRegister, teacherLogin, teacherConfirmation } from "../controllers/TeacherController.js";
import { studentRegister, studentLogin, studentConfirmation } from "../controllers/StudentController.js";
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
import {validateInsertField, validateUpdateField} from '../middlewares/validation/field.js'
import {validateInsertType, validateUpdateType} from '../middlewares/validation/typeOfBac.js';

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

export {routes};