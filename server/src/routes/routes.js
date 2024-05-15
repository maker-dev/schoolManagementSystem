import { Router } from "express";
import { adminLogin } from "../controllers/AdminController.js";
import { teacherRegister, teacherLogin, teacherConfirmation } from "../controllers/TeacherController.js";
import { studentRegister, studentLogin, studentConfirmation } from "../controllers/StudentController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyKey from "../middlewares/verifyKey.js";

const routes = Router();

//admin
routes.post("/adminLogin", verifyKey, adminLogin);

//teacher
routes.post("/teacherRegister", verifyKey, teacherRegister);
routes.post("/teacherLogin", verifyKey, teacherLogin);
routes.get("/teacherConfirmation/:token", teacherConfirmation);

//student
routes.post("/studentRegister", verifyKey, studentRegister);
routes.post("/studentLogin", verifyKey, studentLogin);
routes.get("/studentConfirmation/:token", studentConfirmation);

export {routes};