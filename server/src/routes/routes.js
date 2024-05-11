import { Router } from "express";
import { adminLogin, createTeacher, createStudent } from "../controllers/AdminController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";

const routes = Router();

routes.post("/adminLogin", adminLogin);
routes.post("/createTeacher",verifyToken, verifyRole(["admin"]), createTeacher);
routes.post("/createStudent", verifyToken, verifyRole(["admin"]), createStudent);


export {routes};