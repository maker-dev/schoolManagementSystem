import { Router } from "express";
import { adminLogin, createTeacher, createStudent } from "../controllers/AdminController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyKey from "../middlewares/verifyKey.js";

const routes = Router();

routes.post("/adminLogin", verifyKey, adminLogin);
routes.post("/createTeacher", verifyKey, verifyToken, verifyRole(["admin"]), createTeacher);
routes.post("/createStudent", verifyKey, verifyToken, verifyRole(["admin"]), createStudent);


export {routes};