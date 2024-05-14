import { Router } from "express";
import { adminLogin } from "../controllers/AdminController.js";
import { teacherRegister, teacherLogin } from "../controllers/TeacherController.js";
import { studentRegister, studentLogin } from "../controllers/StudentController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyKey from "../middlewares/verifyKey.js";

const routes = Router();

routes.post("/adminLogin", verifyKey, adminLogin);
routes.post("/teacherRegister", verifyKey, teacherRegister);
routes.post("/teacherLogin", verifyKey, teacherLogin);
routes.post("/studentRegister", verifyKey, studentRegister);
routes.post("/studentLogin", verifyKey, studentLogin);

export {routes};