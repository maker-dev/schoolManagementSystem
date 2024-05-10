import { Router } from "express";
import { adminLogin } from "../controllers/AdminController.js";

const routes = Router();

routes.get("/", adminLogin);





export {routes};